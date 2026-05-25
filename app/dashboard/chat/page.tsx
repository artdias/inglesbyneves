"use client";

import { useEffect, useState, useRef } from "react";
import { Send, Users, UserCircle, MessageSquare, Trash2, Search, Megaphone } from "lucide-react";
import { useAppContext } from "../../providers";
import { createClient } from "../../../utils/supabase/client";
import { censorText } from "../../../utils/chatFilter";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  role: string;
};

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string | null;
  content: string;
  created_at: string;
  is_read?: boolean;
  sender?: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
};

export default function ChatPage() {
  const { userProfile, t } = useAppContext();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<string>("community"); // "community" | "broadcast" | uuid
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [contacts, setContacts] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Features State
  const [searchTerm, setSearchTerm] = useState("");
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [latestMessages, setLatestMessages] = useState<Record<string, string>>({});
  const [typingUsers, setTypingUsers] = useState<{name: string, isTyping: boolean}[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const presenceChannelRef = useRef<any>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. Load Contacts, Unreads, and Latest
  useEffect(() => {
    if (!userProfile) return;
    
    async function loadData() {
      // Load Contacts
      const targetRole = userProfile.role === "teacher" ? "student" : "teacher";
      const { data: contactsData } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", targetRole);
        
      if (contactsData) setContacts(contactsData as Profile[]);

      // Load Unread Counts
      const { data: unreadData } = await supabase
        .from("chat_messages")
        .select("sender_id")
        .eq("receiver_id", userProfile.id)
        .eq("is_read", false);
        
      if (unreadData) {
        const counts: Record<string, number> = {};
        unreadData.forEach(msg => {
          counts[msg.sender_id] = (counts[msg.sender_id] || 0) + 1;
        });
        setUnreadCounts(counts);
      }

      // Load Latest Message Times
      const { data: latestData } = await supabase
        .from("chat_messages")
        .select("sender_id, receiver_id, created_at")
        .or(`sender_id.eq.${userProfile.id},receiver_id.eq.${userProfile.id}`);
        
      if (latestData) {
        const latest: Record<string, string> = {};
        latestData.forEach(msg => {
          const otherId = msg.sender_id === userProfile.id ? msg.receiver_id : msg.sender_id;
          if (!otherId) return; // ignore community
          if (!latest[otherId] || new Date(msg.created_at) > new Date(latest[otherId])) {
            latest[otherId] = msg.created_at;
          }
        });
        setLatestMessages(latest);
      }
    }
    loadData();
  }, [supabase, userProfile]);

  // 2. Mark as Read when opening a chat
  useEffect(() => {
    if (!userProfile || activeTab === "community" || activeTab === "broadcast") return;
    
    async function markAsRead() {
      if (unreadCounts[activeTab] > 0) {
        await supabase
          .from("chat_messages")
          .update({ is_read: true })
          .eq("sender_id", activeTab)
          .eq("receiver_id", userProfile.id)
          .eq("is_read", false);
          
        setUnreadCounts(prev => ({ ...prev, [activeTab]: 0 }));
      }
    }
    markAsRead();
  }, [activeTab, unreadCounts, userProfile, supabase]);

  const currentContact = contacts.find(c => c.id === activeTab);

  // 3. Load Messages & Setup Realtime
  useEffect(() => {
    if (!userProfile) return;
    
    let channel: any;
    
    async function fetchMessages() {
      setLoading(true);
      
      let query = supabase
        .from("chat_messages")
        .select(`
          *,
          sender:profiles!chat_messages_sender_id_fkey(first_name, last_name, avatar_url)
        `)
        .order("created_at", { ascending: true })
        .limit(100);

      if (activeTab === "community") {
        query = query.is("receiver_id", null);
      } else if (activeTab === "broadcast") {
        // Broadcast tab doesn't show history
        setMessages([]);
        setLoading(false);
        return;
      } else {
        // Direct messages
        query = query.or(`and(sender_id.eq.${userProfile.id},receiver_id.eq.${activeTab}),and(sender_id.eq.${activeTab},receiver_id.eq.${userProfile.id})`);
      }

      const { data } = await query;
      if (data) setMessages(data as any);
      
      setLoading(false);
      scrollToBottom();
    }

    if (activeTab === "community" || currentContact || activeTab === "broadcast") {
      fetchMessages();
    } else {
      setLoading(false);
    }

    // Setup Realtime Messages
    channel = supabase
      .channel(`chat_messages_${Date.now()}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        async (payload) => {
          if (payload.eventType === 'DELETE') {
            setMessages(prev => prev.filter(m => m.id !== payload.old.id));
            return;
          }

          if (payload.eventType === 'INSERT') {
            const newMsg = payload.new as Message;
            
            // Update latest message time globally
            const otherId = newMsg.sender_id === userProfile.id ? newMsg.receiver_id : newMsg.sender_id;
            if (otherId) {
              setLatestMessages(prev => ({...prev, [otherId]: newMsg.created_at}));
            }

            // Update unread count if it's for me and I'm not looking at it
            if (newMsg.receiver_id === userProfile.id && activeTab !== newMsg.sender_id) {
              setUnreadCounts(prev => ({...prev, [newMsg.sender_id]: (prev[newMsg.sender_id] || 0) + 1}));
            }
            
            // Fetch sender details
            const { data: senderData } = await supabase
              .from("profiles")
              .select("first_name, last_name, avatar_url")
              .eq("id", newMsg.sender_id)
              .single();
              
            const msgWithSender = { ...newMsg, sender: senderData } as Message;

            setMessages(prev => {
              // Only add to UI if it belongs to current view
              if (activeTab === "community" && msgWithSender.receiver_id === null) {
                return [...prev, msgWithSender];
              }
              if (activeTab !== "community" && activeTab !== "broadcast" &&
                  (msgWithSender.receiver_id === activeTab || msgWithSender.sender_id === activeTab) &&
                  (msgWithSender.receiver_id === userProfile?.id || msgWithSender.sender_id === userProfile?.id)) {
                return [...prev, msgWithSender];
              }
              return prev;
            });
          }
        }
      )
      .subscribe();

    // Setup Presence for Typing Indicator
    const presenceChannel = supabase.channel(`chat_presence_${activeTab}`);
    presenceChannelRef.current = presenceChannel;

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const activeTyping = Object.keys(state)
          .filter(key => key !== userProfile.id) // exclude self
          .map(key => state[key][0] as any)
          .filter(data => data && data.typing);
          
        setTypingUsers(activeTyping);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({ typing: false, name: userProfile.first_name });
        }
      });

    return () => {
      if (channel) supabase.removeChannel(channel);
      if (presenceChannel) supabase.removeChannel(presenceChannel);
    }
  }, [activeTab, currentContact, userProfile, supabase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    // Broadcast typing status
    if (presenceChannelRef.current && userProfile && activeTab !== "broadcast") {
      presenceChannelRef.current.track({ typing: true, name: userProfile.first_name });
      
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        if (presenceChannelRef.current) {
          presenceChannelRef.current.track({ typing: false, name: userProfile.first_name });
        }
      }, 2000);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userProfile) return;
    if (activeTab !== "community" && activeTab !== "broadcast" && !currentContact) return; 

    const content = newMessage.trim();
    setNewMessage("");

    // Clear typing status
    if (presenceChannelRef.current && userProfile && activeTab !== "broadcast") {
      presenceChannelRef.current.track({ typing: false, name: userProfile.first_name });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }

    // Broadcast logic
    if (activeTab === "broadcast") {
      const inserts = contacts.map(c => ({
        sender_id: userProfile.id,
        receiver_id: c.id,
        content: content,
      }));
      const { error } = await supabase.from("chat_messages").insert(inserts);
      if (error) console.error("Broadcast failed", error);
      else alert("Message broadcasted to all students successfully!");
      return;
    }

    // Normal Insert
    const msg = {
      sender_id: userProfile.id,
      receiver_id: activeTab === "community" ? null : activeTab,
      content: content,
    };
    
    const { error } = await supabase.from("chat_messages").insert(msg);
    if (error) {
      console.error("Failed to send message", error);
      setNewMessage(content);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    await supabase.from("chat_messages").delete().eq("id", id);
  };

  // Filter and sort contacts
  const filteredContacts = contacts
    .filter(c => 
      c.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (c.last_name && c.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // Sort by latest message descending
      const timeA = latestMessages[a.id] ? new Date(latestMessages[a.id]).getTime() : 0;
      const timeB = latestMessages[b.id] ? new Date(latestMessages[b.id]).getTime() : 0;
      return timeB - timeA;
    });

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col md:flex-row gap-6 transition-colors duration-300">
      
      {/* Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
        <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-brand-beige px-2">Messages</h2>
        
        {/* Search Bar */}
        <div className="relative px-2">
          <input 
            type="text" 
            placeholder="Search contacts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-[#0a0f1c] border border-brand-taupe/20 rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-mauve text-brand-navy dark:text-brand-beige"
          />
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-taupe" />
        </div>
        
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 p-4 space-y-2 flex-grow overflow-y-auto">
          
          <button 
            onClick={() => setActiveTab("community")}
            className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all text-left ${activeTab === 'community' ? 'bg-brand-beige/50 dark:bg-brand-navy border-brand-mauve border-l-2' : 'hover:bg-brand-beige/20 dark:hover:bg-brand-navy/30 border-transparent border-l-2'}`}
          >
            <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center ${activeTab === 'community' ? 'bg-brand-mauve text-white' : 'bg-brand-beige dark:bg-brand-navy text-brand-taupe'}`}>
              <Users size={20} />
            </div>
            <div>
              <h3 className={`font-bold ${activeTab === 'community' ? 'text-brand-navy dark:text-white' : 'text-brand-navy/70 dark:text-brand-beige/70'}`}>Community Chat</h3>
              <p className="text-xs text-brand-taupe mt-1">Talk with everyone</p>
            </div>
          </button>

          {/* Broadcast Option (Teachers Only) */}
          {userProfile?.role === "teacher" && (
            <button 
              onClick={() => setActiveTab("broadcast")}
              className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all text-left ${activeTab === 'broadcast' ? 'bg-brand-peach/10 dark:bg-brand-peach/5 border-brand-peach border-l-2' : 'hover:bg-brand-beige/20 dark:hover:bg-brand-navy/30 border-transparent border-l-2'}`}
            >
              <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center ${activeTab === 'broadcast' ? 'bg-brand-peach text-white' : 'bg-brand-beige dark:bg-brand-navy text-brand-taupe'}`}>
                <Megaphone size={20} />
              </div>
              <div>
                <h3 className={`font-bold ${activeTab === 'broadcast' ? 'text-brand-peach' : 'text-brand-navy/70 dark:text-brand-beige/70'}`}>Broadcast</h3>
                <p className="text-xs text-brand-taupe mt-1">Message all students</p>
              </div>
            </button>
          )}

          <div className="pt-2 pb-1 px-2 border-b border-brand-taupe/10">
            <span className="text-[10px] font-bold text-brand-taupe uppercase tracking-wider">Direct Messages</span>
          </div>

          {/* Dynamic Sorted Contacts */}
          {filteredContacts.map(contact => {
            const unread = unreadCounts[contact.id] || 0;
            return (
              <button 
                key={contact.id}
                onClick={() => setActiveTab(contact.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all text-left relative ${activeTab === contact.id ? 'bg-brand-beige/50 dark:bg-brand-navy border-brand-peach border-l-2' : 'hover:bg-brand-beige/20 dark:hover:bg-brand-navy/30 border-transparent border-l-2'}`}
              >
                <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center overflow-hidden border-2 ${activeTab === contact.id ? 'border-brand-peach' : 'border-transparent bg-brand-beige dark:bg-brand-navy'}`}>
                  {contact.avatar_url ? (
                    <img src={contact.avatar_url} alt={contact.first_name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle size={24} className={activeTab === contact.id ? 'text-brand-peach' : 'text-brand-taupe'} />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className={`font-bold ${activeTab === contact.id ? 'text-brand-navy dark:text-white' : 'text-brand-navy/70 dark:text-brand-beige/70'}`}>
                    {contact.role === 'teacher' ? `Profª ${contact.last_name || contact.first_name}` : `${contact.first_name} ${contact.last_name}`}
                  </h3>
                  <p className="text-xs text-brand-taupe mt-1 truncate max-w-[140px]">
                    {latestMessages[contact.id] ? "Recent activity" : "Private Messaging"}
                  </p>
                </div>
                
                {/* Unread Badge */}
                {unread > 0 && (
                  <div className="absolute right-4 w-6 h-6 bg-brand-mauve text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {unread > 99 ? '99+' : unread}
                  </div>
                )}
              </button>
            );
          })}

        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="h-20 border-b border-brand-taupe/10 flex items-center px-6 gap-4 bg-brand-beige/10 dark:bg-brand-navy/10 flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white overflow-hidden ${activeTab === 'broadcast' ? 'bg-brand-peach' : 'bg-brand-mauve'}`}>
            {activeTab === 'community' ? <Users size={20} /> : activeTab === 'broadcast' ? <Megaphone size={20} /> : (
              currentContact?.avatar_url ? <img src={currentContact.avatar_url} className="w-full h-full object-cover" /> : <UserCircle size={20} />
            )}
          </div>
          <div>
            <h3 className="font-bold text-brand-navy dark:text-brand-beige">
              {activeTab === 'community' ? "Global Community" : 
               activeTab === 'broadcast' ? "Broadcast Mode" :
               (currentContact 
                  ? (currentContact.role === 'teacher' ? `Profª ${currentContact.first_name} ${currentContact.last_name}` : `${currentContact.first_name} ${currentContact.last_name}`) 
                  : "Unknown User")}
            </h3>
            <p className="text-xs text-brand-taupe">
              {activeTab === 'community' ? "Be respectful and practice your English!" : 
               activeTab === 'broadcast' ? "Sends a private message to every student." : 
               "Direct Support"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-brand-beige/5 dark:bg-transparent">
          {activeTab === 'broadcast' ? (
             <div className="h-full flex flex-col items-center justify-center text-brand-taupe text-center px-8">
               <Megaphone size={48} className="mb-4 text-brand-peach/50" />
               <h3 className="font-bold text-brand-navy dark:text-brand-beige mb-2">Mass Private Message</h3>
               <p className="text-sm">When you send a message here, it will automatically be duplicated and sent to every student's private chat. Their replies will remain private between you and them.</p>
             </div>
          ) : loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-brand-taupe/30 border-t-brand-mauve rounded-full animate-spin"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-brand-taupe">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p>No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isMe = msg.sender_id === userProfile?.id;
              const showAvatar = !isMe && (i === 0 || messages[i-1].sender_id !== msg.sender_id);
              
              return (
                <div key={msg.id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-brand-beige dark:bg-brand-navy flex items-center justify-center">
                      {showAvatar ? (
                         msg.sender?.avatar_url ? <img src={msg.sender.avatar_url} className="w-full h-full object-cover" /> : <UserCircle size={16} className="text-brand-taupe"/>
                      ) : null}
                    </div>
                  )}
                  
                  <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                    {showAvatar && (
                      <span className="text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-1 ml-1">
                        {msg.sender?.first_name} {msg.sender?.last_name}
                      </span>
                    )}
                    
                    <div className="relative group/msg">
                      <div 
                        className={`p-4 rounded-sm shadow-sm cursor-default ${isMe ? 'bg-brand-mauve text-white rounded-br-none' : 'bg-white dark:bg-brand-navy border border-brand-taupe/20 text-brand-navy dark:text-brand-beige rounded-bl-none'}`}
                        title={userProfile?.role === "teacher" ? msg.content : undefined}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{censorText(msg.content)}</p>
                      </div>
                      
                      {isMe && (
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="absolute top-1/2 -left-8 -translate-y-1/2 p-1.5 text-brand-taupe hover:text-red-500 opacity-0 group-hover/msg:opacity-100 transition-all rounded-full hover:bg-brand-beige/50 dark:hover:bg-brand-navy"
                          title="Delete message"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    
                    <span className="text-[9px] text-brand-taupe mt-1 font-mono">
                      {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Typing Indicator */}
        {activeTab !== 'broadcast' && typingUsers.length > 0 && (
          <div className="px-6 py-2 bg-brand-beige/5 dark:bg-[#0a0f1c] text-xs text-brand-taupe italic flex items-center gap-2 flex-shrink-0 border-t border-brand-taupe/10">
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-brand-mauve rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-brand-mauve rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="w-1 h-1 bg-brand-mauve rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
            {typingUsers.length === 1 
              ? `${typingUsers[0].name} is typing...` 
              : `${typingUsers.map(u => u.name).join(", ")} are typing...`}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-brand-taupe/10 bg-white dark:bg-[#0a0f1c] flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input 
              type="text" 
              value={newMessage}
              onChange={handleInputChange}
              placeholder={activeTab === 'broadcast' ? "Type message to send to ALL students..." : "Type your message..."}
              disabled={activeTab !== 'community' && activeTab !== 'broadcast' && !currentContact}
              className="flex-grow bg-brand-beige/20 dark:bg-brand-navy/30 border border-brand-taupe/30 rounded-sm px-4 py-3 text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim() || (activeTab !== 'community' && activeTab !== 'broadcast' && !currentContact)}
              className={`text-white px-6 rounded-sm flex items-center justify-center transition-colors disabled:bg-brand-taupe ${activeTab === 'broadcast' ? 'bg-brand-peach hover:bg-orange-500' : 'bg-brand-mauve hover:bg-brand-dark'}`}
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
