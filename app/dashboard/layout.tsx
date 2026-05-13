"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, Bell, User, Moon, Sun, Globe, CheckCircle, X } from "lucide-react";
import { useAppContext } from "../providers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-brand-beige/20 dark:bg-brand-navy-dark font-sans text-brand-navy dark:text-brand-beige transition-colors duration-300 selection:bg-brand-peach/50">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-[#0a0f1c] border-b border-brand-taupe/20 flex items-center justify-between px-6 py-4 sticky top-0 z-40 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="w-10 h-10 flex-shrink-0">
              <img src="/logo.svg" alt="Logo" className="w-full h-full dark:hidden" />
              <img src="/logo-dark.svg" alt="Logo" className="w-full h-full hidden dark:block" />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-serif font-bold text-lg tracking-widest text-brand-navy dark:text-brand-beige uppercase leading-none">
                Ester Neves
              </span>
              <span className="text-[9px] tracking-[0.2em] text-brand-mauve dark:text-brand-taupe uppercase mt-1">
                Portal
              </span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-1 sm:gap-2">
             <button onClick={toggleLanguage} className="p-2 text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy transition-colors flex items-center gap-1 text-xs font-medium uppercase tracking-wider">
               <Globe size={18}/> {language}
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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-mauve rounded-full border border-white dark:border-[#0a0f1c]"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0a0f1c] border border-brand-taupe/20 shadow-xl rounded-sm z-50 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-brand-taupe/10 bg-brand-beige/20 dark:bg-brand-navy/30">
                  <h3 className="font-serif font-bold text-brand-navy dark:text-brand-beige">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-brand-taupe hover:text-brand-mauve transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[
                    { title: "New Material Available", desc: "Advanced Phrasal Verbs PDF just dropped.", time: "2h ago", unread: true },
                    { title: "Live Class Reminder", desc: "Conversation Practice starts in 15 mins.", time: "1d ago", unread: false },
                    { title: "Essay Graded", desc: "Ester has left feedback on your writing.", time: "3d ago", unread: false }
                  ].map((n, i) => (
                    <div key={i} className={`p-4 border-b border-brand-taupe/10 hover:bg-brand-beige/10 dark:hover:bg-brand-navy/20 transition-colors cursor-pointer ${n.unread ? 'bg-brand-beige/5 dark:bg-brand-navy-dark' : ''}`}>
                      <div className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-brand-mauve' : 'bg-transparent'}`}></div>
                        <div>
                          <p className={`text-sm ${n.unread ? 'font-bold text-brand-navy dark:text-white' : 'font-medium text-brand-navy/80 dark:text-brand-beige/80'}`}>{n.title}</p>
                          <p className="text-xs text-brand-taupe mt-1">{n.desc}</p>
                          <p className="text-[10px] text-brand-taupe/70 font-mono mt-2 uppercase tracking-widest">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/notifications" onClick={() => setShowNotifications(false)} className="block w-full p-3 text-center text-[10px] uppercase tracking-widest font-bold text-brand-mauve hover:bg-brand-beige/20 dark:hover:bg-brand-navy/30 transition-colors border-t border-brand-taupe/10">
                  View All
                </Link>
              </div>
            )}
          </div>
          <div className="h-6 w-px bg-brand-taupe/30 hidden sm:block"></div>
          <Link href="/dashboard/profile" className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-brand-navy dark:text-brand-beige leading-tight group-hover:text-brand-mauve dark:group-hover:text-brand-peach transition-colors">Student</p>
              <p className="text-xs text-brand-taupe tracking-wide">{t("planPremium")}</p>
            </div>
            <div className="w-9 h-9 rounded-sm bg-brand-beige dark:bg-brand-navy border border-brand-taupe/30 flex items-center justify-center text-brand-navy dark:text-brand-beige group-hover:border-brand-mauve transition-colors">
              <User size={18} />
            </div>
          </Link>
          <Link href="/" className="p-2 text-brand-taupe hover:text-red-500 dark:hover:text-red-400 rounded-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-2" title="Logout">
             <LogOut size={20} />
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
