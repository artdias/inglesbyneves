"use client";

import Link from "next/link";
import { LogOut, Bell, User, Moon, Sun, Globe } from "lucide-react";
import { useAppContext } from "../providers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();

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
          
          <button className="p-2 text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-mauve rounded-full border border-white dark:border-[#0a0f1c]"></span>
          </button>
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
