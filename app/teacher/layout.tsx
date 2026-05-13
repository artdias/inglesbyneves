"use client";

import Link from "next/link";
import { LayoutDashboard, Users, FileVideo, Calendar, Settings, LogOut, Sun, Moon } from "lucide-react";
import { useAppContext } from "../providers";
import { usePathname } from "next/navigation";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useAppContext();
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/teacher", icon: <LayoutDashboard size={18} /> },
    { name: "Students & CRM", href: "/teacher/students", icon: <Users size={18} /> },
    { name: "Content Manager", href: "/teacher/content", icon: <FileVideo size={18} /> },
    { name: "Schedule", href: "/teacher/schedule", icon: <Calendar size={18} /> },
    { name: "Settings", href: "/teacher/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-brand-beige/20 dark:bg-brand-navy-dark font-sans text-brand-navy dark:text-brand-beige transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#0a0f1c] border-r border-brand-taupe/20 flex flex-col hidden md:flex transition-colors duration-300">
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
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${isActive ? 'bg-brand-mauve text-white shadow-sm' : 'text-brand-navy/70 dark:text-brand-taupe hover:bg-brand-beige/50 dark:hover:bg-brand-navy/50'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-brand-taupe/20 space-y-2">
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-[#0a0f1c] border-b border-brand-taupe/20 p-4 flex items-center justify-between sticky top-0 z-40">
           <span className="font-serif font-bold tracking-widest text-brand-navy dark:text-brand-beige uppercase">
              Admin
            </span>
            {/* Mobile menu toggle would go here */}
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
