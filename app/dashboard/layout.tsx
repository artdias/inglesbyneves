"use client";

import Link from "next/link";
import { LogOut, Bell, User, Moon, Sun, Globe } from "lucide-react";
import { useAppContext } from "../providers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-purple-100 dark:border-purple-900/50 flex items-center justify-between px-6 py-3 sticky top-0 z-40 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-1 ring-purple-100 dark:ring-purple-900">
              N
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-white hidden sm:block">
              English<span className="text-purple-600 dark:text-purple-400">ByNeves</span> <span className="text-pink-500 dark:text-pink-400 font-medium">| Portal</span>
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 mr-2">
             <button onClick={toggleLanguage} className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold">
               <Globe size={18}/> {language.toUpperCase()}
             </button>
             <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
               {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
             </button>
          </div>
          
          <button className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full border border-white dark:border-slate-800"></span>
          </button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">Student</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Premium Plan</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-700 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors shadow-sm">
              <User size={18} />
            </div>
          </div>
          <Link href="/" className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-2" title="Logout">
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
