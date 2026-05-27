"use client";

import Link from "next/link";
import { LogOut, LayoutDashboard, Settings, User, Bell, GraduationCap, Moon, Sun, X, Menu, MessageSquare } from "lucide-react";
import { useAppContext } from "../providers";
import { useState, useRef, useEffect } from "react";
import { LogoutButton } from "../../components/LogoutButton";
import { createClient } from "../../utils/supabase/client";
import { Database } from "../../types/supabase";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, language, toggleLanguage, t, userProfile } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const supabase = createClient();

  // Close notifications on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Realtime Notifications Setup
  useEffect(() => {
    let channel: any;
    let chatChannel: any;

    async function setupNotifications() {
      if (!userProfile) return;

      // Initial Fetch
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userProfile.id)
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.is_read).length);
      }

      // Supabase Realtime Listener
      channel = supabase
        .channel(`realtime-notifications-${Date.now()}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userProfile.id}`
          },
          (payload) => {
            const newNotif = payload.new as Notification;
            setNotifications(prev => [newNotif, ...prev].slice(0, 10)); // keep last 10 in UI
            setUnreadCount(prev => prev + 1);
          }
        )
        .subscribe();

      // Initial Fetch for Chat Notifications
      const { data: chatData } = await supabase
        .from("chat_messages")
        .select("id")
        .eq("receiver_id", userProfile.id)
        .eq("is_read", false);
      if (chatData) {
        setUnreadChatCount(chatData.length);
      }

      // Realtime Listener for Chat Messages
      chatChannel = supabase
        .channel(`realtime-chat-notifs-${Date.now()}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `receiver_id=eq.${userProfile.id}` },
          (payload) => {
            const newMsg = payload.new as any;
            if (!newMsg.is_read) setUnreadChatCount(prev => prev + 1);
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'chat_messages', filter: `receiver_id=eq.${userProfile.id}` },
          () => {
            // Refetch to ensure accuracy when messages are marked read
            supabase.from("chat_messages").select("id").eq("receiver_id", userProfile.id).eq("is_read", false).then(({data}) => {
               if(data) setUnreadChatCount(data.length);
            });
          }
        )
        .subscribe();
    }

    setupNotifications();

    return () => {
      if (channel) supabase.removeChannel(channel);
      if (chatChannel) supabase.removeChannel(chatChannel);
    }
  }, [userProfile, supabase]);

  const handleMarkAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0) return;

    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
    await supabase.from("notifications").update({ is_read: true }).in("id", unreadIds);
  };

  const navLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/chat", icon: MessageSquare, label: "Community & Chat" }
  ];

  return (
    <div className="min-h-screen bg-brand-beige/20 dark:bg-brand-navy-dark transition-colors duration-300">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-[#0a0f1c] border-b border-brand-taupe/20 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4 flex-shrink-0">
            <button 
              className="sm:hidden text-brand-navy dark:text-brand-beige hover:text-brand-mauve transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/dashboard" className="flex items-center gap-3 group pl-2">
              <div className="relative flex items-center justify-center w-12 h-12 transition-transform group-hover:scale-105">
                <img src="/logo-dark.svg" alt="Ester Neves" className="w-full h-full object-contain hidden dark:block" />
                <img src="/logo.svg" alt="Ester Neves" className="w-full h-full object-contain block dark:hidden" />
              </div>
              <div className="hidden lg:flex flex-col justify-center ml-1">
                <span className="font-serif font-bold text-2xl text-brand-navy dark:text-brand-beige tracking-widest uppercase leading-none mb-1.5">
                  Ester Neves
                </span>
                <span className="text-[10px] font-sans font-bold tracking-[0.4em] text-brand-taupe uppercase leading-none">
                  Teacher
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center gap-6 px-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="flex items-center gap-2 text-brand-navy/70 dark:text-brand-taupe hover:text-brand-mauve dark:hover:text-brand-peach transition-colors px-2 py-1 font-medium text-sm group whitespace-nowrap"
              >
                <div className="relative">
                  <link.icon size={16} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  {link.href === '/dashboard/chat' && unreadChatCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[14px] h-[14px] px-1 bg-brand-mauve text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-[#0a0f1c]">
                      {unreadChatCount > 99 ? '99+' : unreadChatCount}
                    </span>
                  )}
                </div>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
            <div className="flex items-center gap-3 border-r border-brand-taupe/20 pr-4 sm:pr-6">
               <button onClick={toggleLanguage} className="text-xs font-bold uppercase tracking-wider text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige transition-colors flex items-center gap-1">
                 {language === "en" ? "EN" : "PT"}
               </button>
               <button onClick={toggleTheme} className="p-2 text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy transition-colors">
                 {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
               </button>
            </div>
            
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-sm transition-colors relative ${showNotifications ? 'bg-brand-beige dark:bg-brand-navy text-brand-mauve' : 'text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige hover:bg-brand-beige/50 dark:hover:bg-brand-navy'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[14px] h-[14px] px-1 bg-brand-mauve text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-[#0a0f1c]">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0a0f1c] border border-brand-taupe/20 shadow-xl rounded-sm z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between p-4 border-b border-brand-taupe/10 bg-brand-beige/20 dark:bg-brand-navy/30">
                    <h3 className="font-serif font-bold text-brand-navy dark:text-brand-beige">Notifications</h3>
                    <div className="flex gap-4 items-center">
                      {unreadCount > 0 && (
                        <button onClick={handleMarkAllAsRead} className="text-[10px] font-bold uppercase tracking-widest text-brand-taupe hover:text-brand-mauve transition-colors">
                          Mark all read
                        </button>
                      )}
                      <button onClick={() => setShowNotifications(false)} className="text-brand-taupe hover:text-brand-mauve transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-brand-taupe text-sm">No notifications yet.</div>
                    ) : (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          onClick={() => { if (!n.is_read) handleMarkAsRead(n.id) }}
                          className={`p-4 border-b border-brand-taupe/10 hover:bg-brand-beige/10 dark:hover:bg-brand-navy/20 transition-colors cursor-pointer ${!n.is_read ? 'bg-brand-beige/5 dark:bg-brand-navy-dark' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.is_read ? 'bg-brand-mauve' : 'bg-transparent'}`}></div>
                            <div>
                              <p className={`text-sm ${!n.is_read ? 'font-bold text-brand-navy dark:text-white' : 'font-medium text-brand-navy/80 dark:text-brand-beige/80'}`}>{n.title}</p>
                              <p className="text-xs text-brand-taupe mt-1">{n.content}</p>
                              <p className="text-[10px] text-brand-taupe font-mono mt-2 uppercase tracking-widest">{n.created_at ? new Date(n.created_at).toLocaleDateString() : ''}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {userProfile?.role === 'teacher' && (
              <Link href="/teacher" className="p-2 text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy transition-colors flex items-center gap-2 group" title="Teacher Area">
                <GraduationCap size={20} className="group-hover:text-brand-mauve dark:group-hover:text-brand-peach transition-colors" />
                <span className="hidden md:block text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve dark:group-hover:text-brand-peach transition-colors">Teacher</span>
              </Link>
            )}
            
            <div className="h-6 w-px bg-brand-taupe/30 hidden sm:block"></div>
            
            <Link href="/dashboard/profile" className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-brand-navy dark:text-brand-beige leading-tight group-hover:text-brand-mauve dark:group-hover:text-brand-peach transition-colors">{userProfile?.first_name || "Student"}</p>
                <p className="text-xs text-brand-taupe tracking-wide">{t("planPremium")}</p>
              </div>
              <div className="w-9 h-9 rounded-sm bg-brand-beige dark:bg-brand-navy border border-brand-taupe/30 flex items-center justify-center text-brand-navy dark:text-brand-beige group-hover:border-brand-mauve transition-colors overflow-hidden">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={18} />
                )}
              </div>
            </Link>
            
            <LogoutButton iconOnly />
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-brand-taupe/10 bg-white dark:bg-[#0a0f1c] animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-brand-navy dark:text-brand-beige hover:bg-brand-beige/50 dark:hover:bg-brand-navy px-3 py-3 rounded-sm font-medium transition-colors"
                >
                  <div className="relative">
                    <link.icon size={18} className="text-brand-taupe" />
                    {link.href === '/dashboard/chat' && unreadChatCount > 0 && (
                      <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 bg-brand-mauve text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-[#0a0f1c]">
                        {unreadChatCount > 99 ? '99+' : unreadChatCount}
                      </span>
                    )}
                  </div>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
