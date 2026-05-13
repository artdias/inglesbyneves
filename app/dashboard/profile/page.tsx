"use client";

import { useAppContext } from "../../providers";
import Link from "next/link";
import { 
  User, Mail, Phone, Calendar as CalendarIcon, 
  CreditCard, Award, Settings, Edit3, 
  Clock, Flame, BookOpen, ChevronRight,
  LogOut, Shield, Bell
} from "lucide-react";

export default function ProfilePage() {
  const { t } = useAppContext();

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
            {t("profile")}
          </h1>
          <p className="text-brand-taupe mt-2 tracking-wide text-sm">{t("accountSettings")}</p>
        </div>
        <Link href="/dashboard/settings" className="hidden sm:flex items-center gap-2 bg-brand-mauve hover:bg-brand-dark text-white px-5 py-2.5 rounded-sm font-medium transition-all text-sm tracking-widest uppercase">
          <Edit3 size={16} />
          {t("editProfile")}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column - User Identity & Stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* User Card */}
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 shadow-sm border border-brand-taupe/20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-32 bg-brand-beige/20 dark:bg-brand-navy/30 pointer-events-none border-b border-brand-taupe/10"></div>
            
            <div className="flex flex-col items-center text-center relative z-10 pt-4">
              <div className="relative group cursor-pointer mb-6">
                <div className="w-24 h-24 rounded-full bg-brand-mauve p-0.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#0a0f1c] flex items-center justify-center overflow-hidden">
                     <span className="text-4xl font-serif font-bold text-brand-mauve">S</span>
                  </div>
                </div>
                <Link href="/dashboard/settings" className="absolute bottom-0 right-0 bg-white dark:bg-[#0a0f1c] p-1.5 rounded-full border border-brand-taupe/30 shadow-sm text-brand-taupe hover:text-brand-mauve transition-colors">
                  <Edit3 size={14} />
                </Link>
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-brand-beige">Student User</h2>
              <p className="text-brand-mauve font-medium text-sm mt-1 tracking-wider uppercase text-[10px]">{t("planPremium")}</p>
              
              <div className="flex items-center gap-2 mt-6 text-[10px] font-bold text-brand-taupe uppercase tracking-widest border-t border-brand-taupe/20 pt-4 w-full justify-center">
                <CalendarIcon size={14} />
                {t("memberSince")} Jan 2026
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-6 shadow-sm border border-brand-taupe/20 hover:border-brand-taupe transition-all">
               <div className="w-10 h-10 rounded-sm bg-brand-peach/20 dark:bg-brand-navy/50 text-brand-dark dark:text-brand-peach border border-brand-taupe/20 flex items-center justify-center mb-4">
                 <Flame size={18} />
               </div>
               <h3 className="text-3xl font-serif text-brand-navy dark:text-white">12</h3>
               <p className="text-[10px] text-brand-taupe uppercase tracking-widest font-bold mt-2">{t("activeStreak")}</p>
            </div>
            <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-6 shadow-sm border border-brand-taupe/20 hover:border-brand-taupe transition-all">
               <div className="w-10 h-10 rounded-sm bg-brand-beige/50 dark:bg-brand-navy/50 text-brand-mauve border border-brand-taupe/20 flex items-center justify-center mb-4">
                 <Clock size={18} />
               </div>
               <h3 className="text-3xl font-serif text-brand-navy dark:text-white">48h</h3>
               <p className="text-[10px] text-brand-taupe uppercase tracking-widest font-bold mt-2">{t("totalHours")}</p>
            </div>
            <div className="col-span-2 bg-brand-navy dark:bg-brand-navy-dark border border-brand-taupe/20 rounded-sm p-6 shadow-sm text-brand-beige relative overflow-hidden">
               <div className="absolute -right-4 -top-4 opacity-10">
                 <BookOpen size={120} />
               </div>
               <div className="relative z-10 flex items-center gap-5">
                 <div className="w-14 h-14 rounded-sm bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                   <BookOpen size={24} className="text-brand-peach" />
                 </div>
                 <div>
                   <h3 className="text-3xl font-serif text-white">450+</h3>
                   <p className="text-brand-beige/60 text-[10px] uppercase tracking-widest font-bold mt-1">{t("vocabLearned")}</p>
                 </div>
               </div>
            </div>
          </div>
          
        </div>

        {/* Right Column - Detailed Info & Settings */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Personal Information */}
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-6 lg:p-8 shadow-sm border border-brand-taupe/20 transition-colors">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-taupe/10">
                <div className="flex items-center gap-3 text-brand-navy dark:text-white font-serif font-bold text-xl">
                  <User className="text-brand-mauve" />
                  {t("personalInfo")}
                </div>
                <Link href="/dashboard/settings" className="sm:hidden text-brand-mauve hover:bg-brand-beige/50 dark:hover:bg-brand-navy/30 p-2 rounded-sm transition-colors border border-brand-taupe/20 inline-block">
                  <Edit3 size={16} />
                </Link>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div>
                 <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Full Name</label>
                 <div className="bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 px-4 py-3.5 rounded-sm text-brand-navy dark:text-brand-beige font-medium">
                   Student User
                 </div>
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Email Address</label>
                 <div className="bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 px-4 py-3.5 rounded-sm text-brand-navy dark:text-brand-beige font-medium flex items-center gap-3">
                   <Mail size={16} className="text-brand-taupe" />
                   student@example.com
                 </div>
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Phone Number</label>
                 <div className="bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 px-4 py-3.5 rounded-sm text-brand-navy dark:text-brand-beige font-medium flex items-center gap-3">
                   <Phone size={16} className="text-brand-taupe" />
                   +1 (555) 123-4567
                 </div>
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Timezone</label>
                 <div className="bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 px-4 py-3.5 rounded-sm text-brand-navy dark:text-brand-beige font-medium">
                   America/New_York (EST)
                 </div>
               </div>
             </div>
          </div>

          {/* Subscription & Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 shadow-sm border border-brand-taupe/20 hover:border-brand-taupe transition-colors group cursor-pointer">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-sm bg-brand-peach/20 dark:bg-brand-navy/50 border border-brand-taupe/20 text-brand-dark dark:text-brand-peach flex items-center justify-center group-hover:scale-105 transition-transform">
                  <CreditCard size={20} />
                </div>
                <h3 className="font-serif font-bold text-brand-navy dark:text-white text-xl">{t("subscription")}</h3>
              </div>
              <p className="text-brand-navy/70 dark:text-brand-taupe text-sm mb-6 leading-relaxed">You are currently on the <strong className="text-brand-mauve">Premium Plan</strong>. Next billing date is Nov 1, 2026.</p>
              <Link href="/dashboard/settings" className="flex items-center gap-2 text-brand-dark dark:text-brand-peach text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-mauve transition-colors">
                Manage Plan <ChevronRight size={14} strokeWidth={3} />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 shadow-sm border border-brand-taupe/20 hover:border-brand-taupe transition-colors group cursor-pointer">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-sm bg-brand-beige/50 dark:bg-brand-navy/50 border border-brand-taupe/20 text-brand-mauve flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Award size={20} />
                </div>
                <h3 className="font-serif font-bold text-brand-navy dark:text-white text-xl">{t("certificates")}</h3>
              </div>
              <p className="text-brand-navy/70 dark:text-brand-taupe text-sm mb-6 leading-relaxed">You have earned <strong className="text-brand-mauve">2 certificates</strong> so far. Keep up the great work!</p>
              <Link href="/dashboard/certificates" className="flex items-center gap-2 text-brand-mauve text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-dark dark:group-hover:text-brand-peach transition-colors">
                View All <ChevronRight size={14} strokeWidth={3} />
              </Link>
            </div>

          </div>

          {/* Preferences Menu */}
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 overflow-hidden">
             <div className="divide-y divide-brand-taupe/20">
               <Link href="/dashboard/settings" className="w-full flex items-center justify-between p-5 hover:bg-brand-beige/20 dark:hover:bg-brand-navy/20 transition-colors group">
                 <div className="flex items-center gap-4 text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve font-medium text-sm tracking-wide">
                   <Settings size={18} className="text-brand-taupe group-hover:text-brand-mauve" />
                   Account Settings
                 </div>
                 <ChevronRight size={16} className="text-brand-taupe" />
               </Link>
               <Link href="/dashboard/settings" className="w-full flex items-center justify-between p-5 hover:bg-brand-beige/20 dark:hover:bg-brand-navy/20 transition-colors group">
                 <div className="flex items-center gap-4 text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve font-medium text-sm tracking-wide">
                   <Bell size={18} className="text-brand-taupe group-hover:text-brand-mauve" />
                   Notification Preferences
                 </div>
                 <ChevronRight size={16} className="text-brand-taupe" />
               </Link>
               <Link href="/dashboard/settings" className="w-full flex items-center justify-between p-5 hover:bg-brand-beige/20 dark:hover:bg-brand-navy/20 transition-colors group">
                 <div className="flex items-center gap-4 text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve font-medium text-sm tracking-wide">
                   <Shield size={18} className="text-brand-taupe group-hover:text-brand-mauve" />
                   Privacy & Security
                 </div>
                 <ChevronRight size={16} className="text-brand-taupe" />
               </Link>
               <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
                 <div className="flex items-center gap-4 text-red-600/80 dark:text-red-500/80 group-hover:text-red-600 font-medium text-sm tracking-wide uppercase text-[10px] tracking-widest font-bold">
                   <LogOut size={18} />
                   {t("logout")}
                 </div>
               </button>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
