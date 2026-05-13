"use client";

import { Bell, CheckCircle, Clock, MessageSquare, BookOpen, Video } from "lucide-react";
import { useAppContext } from "../../providers";

export default function NotificationsPage() {
  const { t } = useAppContext();

  const notifications = [
    { type: "material", title: "New Material Available", desc: "Advanced Phrasal Verbs PDF just dropped in your portal.", time: "2h ago", unread: true },
    { type: "class", title: "Live Class Reminder", desc: "Conversation Practice starts in 15 mins. Check your zoom link.", time: "1d ago", unread: false },
    { type: "feedback", title: "Essay Graded", desc: "Ester has left feedback on your latest writing assignment.", time: "3d ago", unread: false },
    { type: "system", title: "Subscription Renewed", desc: "Your premium mentorship plan has been successfully renewed.", time: "1w ago", unread: false },
    { type: "material", title: "Module Unlocked", desc: "Module 4: Advanced Grammar is now available for you.", time: "2w ago", unread: false },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'material': return <BookOpen size={16} className="text-brand-mauve" />;
      case 'class': return <Video size={16} className="text-brand-peach" />;
      case 'feedback': return <MessageSquare size={16} className="text-brand-taupe" />;
      default: return <Bell size={16} className="text-brand-taupe" />;
    }
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
            Notifications
          </h1>
          <p className="text-brand-taupe mt-2 tracking-wide text-sm">Stay updated with your latest alerts.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 bg-brand-beige/50 dark:bg-brand-navy/50 hover:bg-brand-beige dark:hover:bg-brand-navy text-brand-mauve border border-brand-taupe/20 px-4 py-2 rounded-sm font-medium transition-all text-[10px] tracking-widest uppercase">
          <CheckCircle size={14} />
          Mark All Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20">
        <div className="divide-y divide-brand-taupe/10">
          {notifications.map((n, i) => (
            <div key={i} className={`p-6 transition-colors cursor-pointer flex gap-4 ${n.unread ? 'bg-brand-beige/10 dark:bg-brand-navy-dark/50' : 'hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20'}`}>
              
              <div className="mt-1 flex-shrink-0">
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center border border-brand-taupe/20 ${n.unread ? 'bg-white dark:bg-brand-navy shadow-sm' : 'bg-transparent'}`}>
                  {getIcon(n.type)}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-base ${n.unread ? 'font-bold text-brand-navy dark:text-white' : 'font-medium text-brand-navy/80 dark:text-brand-beige/80'}`}>
                    {n.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-brand-taupe font-mono uppercase tracking-widest">
                    <Clock size={10} />
                    {n.time}
                  </div>
                </div>
                <p className="text-sm text-brand-navy/60 dark:text-brand-taupe mt-1 max-w-2xl leading-relaxed">{n.desc}</p>
              </div>

              {n.unread && (
                <div className="flex-shrink-0 flex items-center justify-center w-8">
                  <div className="w-2.5 h-2.5 bg-brand-mauve rounded-full shadow-sm shadow-brand-mauve/50"></div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
