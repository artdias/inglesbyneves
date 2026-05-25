"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, FileVideo, Calendar, Settings, LogOut, Sun, Moon, Menu, X, User } from "lucide-react";
import { useAppContext } from "../providers";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";


export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useAppContext();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "teacher") {
        setIsAuthorized(true);
      } else {
        router.push("/dashboard");
      }
    }
    checkAccess();
  }, [router, supabase]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-beige/20 dark:bg-brand-navy-dark">
        <div className="w-8 h-8 border-2 border-brand-taupe/30 border-t-brand-mauve rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { name: "Overview", href: "/teacher", icon: <LayoutDashboard size={18} /> },
    { name: "Students & CRM", href: "/teacher/students", icon: <Users size={18} /> },
    { name: "Content Manager", href: "/teacher/content", icon: <FileVideo size={18} /> },
    { name: "Schedule", href: "/teacher/schedule", icon: <Calendar size={18} /> },
    { name: "Settings", href: "/teacher/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-brand-beige/20 dark:bg-brand-navy-dark font-sans text-brand-navy dark:text-brand-beige transition-colors duration-300">
      
      {/* Sidebar - Desktop & Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0a0f1c] border-r border-brand-taupe/20 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-brand-taupe/20 flex items-center justify-between">
          <Link href="/teacher" className="flex items-center gap-3">
             <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-widest text-brand-navy dark:text-brand-beige uppercase leading-none">
                Ester Neves
              </span>
              <span className="text-[9px] tracking-[0.2em] text-brand-mauve uppercase mt-1">
                Admin Area
              </span>
            </div>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-brand-taupe hover:text-brand-mauve">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${isActive ? 'bg-brand-mauve text-white shadow-sm' : 'text-brand-navy/70 dark:text-brand-taupe hover:bg-brand-beige/50 dark:hover:bg-brand-navy/50'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-brand-taupe/20 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 w-full rounded-sm transition-colors text-sm font-medium text-brand-navy/70 dark:text-brand-taupe hover:bg-brand-beige/50 dark:hover:bg-brand-navy/50">
            <User size={18} />
            Student Dashboard
          </Link>
          <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-3 w-full rounded-sm transition-colors text-sm font-medium text-brand-navy/70 dark:text-brand-taupe hover:bg-brand-beige/50 dark:hover:bg-brand-navy/50">
            {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
            Toggle Theme
          </button>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-sm transition-colors text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut size={18} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-brand-navy-dark/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-[#0a0f1c] border-b border-brand-taupe/20 p-4 flex items-center justify-between sticky top-0 z-30">
           <span className="font-serif font-bold tracking-widest text-brand-navy dark:text-brand-beige uppercase">
              Admin
            </span>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-brand-taupe hover:text-brand-mauve">
              <Menu size={24} />
            </button>
        </header>

        <div className="p-4 md:p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
