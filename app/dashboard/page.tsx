"use client";

import Link from "next/link";
import { PlayCircle, BookA, Calendar as CalendarIcon, MessageSquare, ExternalLink, ChevronRight, Volume2, Clock } from "lucide-react";
import { useAppContext } from "../providers";

export default function Dashboard() {
  const { t } = useAppContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors duration-300">
      
      {/* 1. Left Sidebar (Quick Links/Modules) - 3 cols */}
      <div className="lg:col-span-3 space-y-6">
        {/* Progress Card */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-6 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <h3 className="font-serif text-xl font-bold text-brand-navy dark:text-brand-beige mb-3">{t("progress")}</h3>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-brand-taupe">Module 3</span>
            <span className="font-semibold text-brand-mauve">45%</span>
          </div>
          <div className="w-full bg-brand-beige dark:bg-brand-navy/50 rounded-sm h-1.5">
            <div className="bg-brand-mauve h-1.5 rounded-sm transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-3 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <p className="px-3 py-3 text-xs font-bold text-brand-taupe uppercase tracking-widest">Quick Start</p>
          <Link href="/dashboard/modules/3" className="flex items-center gap-4 p-3 rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy/30 text-brand-navy dark:text-brand-beige hover:text-brand-mauve dark:hover:text-brand-peach font-medium transition-colors group">
            <div className="w-10 h-10 rounded-sm bg-brand-beige dark:bg-brand-navy text-brand-mauve flex items-center justify-center group-hover:scale-105 transition-transform border border-brand-taupe/20">
              <PlayCircle size={18} strokeWidth={1.5} />
            </div>
            {t("resume")}
          </Link>
          <Link href="/dashboard/schedule" className="flex items-center gap-4 p-3 rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy/30 text-brand-navy dark:text-brand-beige hover:text-brand-dark dark:hover:text-brand-peach font-medium transition-colors group">
            <div className="w-10 h-10 rounded-sm bg-brand-peach/30 dark:bg-brand-navy text-brand-dark dark:text-brand-peach flex items-center justify-center group-hover:scale-105 transition-transform border border-brand-taupe/20">
              <ExternalLink size={18} strokeWidth={1.5} />
            </div>
            {t("zoom")}
          </Link>
        </div>

        {/* Modules List */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-3 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <p className="px-3 py-3 text-xs font-bold text-brand-taupe uppercase tracking-widest">{t("courseModules")}</p>
          {[
            { tag: "M1", title: "The Basics", act: false },
            { tag: "M2", title: "Daily Routines", act: false },
            { tag: "M3", title: "Travel & Business", act: true },
            { tag: "M4", title: "Advanced Grammar", act: false },
          ].map((m, i) => (
             <Link href={`/dashboard/modules/${i + 1}`} key={i} className={`flex items-center gap-4 p-3 rounded-sm transition-colors ${m.act ? 'bg-brand-beige dark:bg-brand-navy/50 text-brand-navy dark:text-brand-beige font-semibold border-l-2 border-brand-mauve' : 'hover:bg-brand-beige/30 dark:hover:bg-brand-navy/20 text-brand-navy/70 dark:text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige font-medium border-l-2 border-transparent'}`}>
               <span className={`text-xs px-2.5 py-1 rounded-sm font-bold tracking-wider ${m.act ? 'bg-brand-mauve text-white' : 'bg-brand-taupe/20 text-brand-taupe'}`}>{m.tag}</span>
               {m.title}
             </Link>
          ))}
        </div>
      </div>

      {/* 2. Middle Column (Agenda/Calendar) - 5 cols */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-brand-beige">{t("schedule")}</h2>
              <p className="text-sm text-brand-taupe mt-1 tracking-wide">Upcoming classes and events</p>
            </div>
            <Link href="/dashboard/schedule" className="bg-brand-beige/50 dark:bg-brand-navy/50 hover:bg-brand-beige dark:hover:bg-brand-navy p-2.5 rounded-sm text-brand-mauve dark:text-brand-peach transition-colors border border-brand-taupe/20 inline-block">
              <CalendarIcon size={18} />
            </Link>
          </div>

          {/* Simple Visual Calendar */}
          <div className="flex justify-between items-center bg-brand-beige/30 dark:bg-brand-navy-dark rounded-sm px-5 py-4 mb-6 border border-brand-taupe/30 transition-colors duration-300">
             <button className="text-brand-taupe hover:text-brand-mauve dark:hover:text-brand-peach transition-colors p-1">&lt;</button>
             <span className="font-semibold tracking-wide text-brand-navy dark:text-brand-beige uppercase text-sm">October 2026</span>
             <button className="text-brand-taupe hover:text-brand-mauve dark:hover:text-brand-peach transition-colors p-1">&gt;</button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-xs mb-3 text-brand-taupe font-bold tracking-widest uppercase pb-2">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-10">
             {/* Mocking days */}
             {Array.from({length: 31}).map((_, i) => {
                const day = i + 1;
                const isToday = day === 16;
                const hasClass = day === 18 || day === 21;
                return (
                  <div key={day} className={`
                    aspect-square flex items-center justify-center rounded-sm cursor-pointer transition-all border border-transparent
                    ${isToday ? 'bg-brand-mauve text-white font-bold shadow-sm' : 'text-brand-navy/80 dark:text-brand-taupe hover:bg-brand-beige/50 dark:hover:bg-brand-navy/50'}
                    ${hasClass && !isToday ? 'bg-brand-peach/20 dark:bg-brand-navy font-semibold text-brand-dark dark:text-brand-peach border-brand-peach dark:border-brand-taupe/30' : ''}
                  `}>
                    {day}
                  </div>
                )
             })}
          </div>

          {/* Upcoming Card */}
          <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-brand-beige mb-5">{t("upcomingLive")}</h3>
          <div className="space-y-4">
             <div className="flex gap-5 p-5 rounded-sm border border-brand-taupe/20 bg-brand-beige/10 dark:bg-brand-navy-dark/50 hover:bg-brand-beige/30 dark:hover:bg-brand-navy hover:border-brand-mauve/50 transition-all cursor-pointer group">
               <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-2 text-center border border-brand-taupe/30 w-16 h-16 flex flex-col justify-center shrink-0">
                 <span className="text-brand-mauve dark:text-brand-peach text-[10px] uppercase font-bold tracking-widest">Oct</span>
                 <span className="text-brand-navy dark:text-brand-beige text-xl font-serif font-bold group-hover:text-brand-mauve transition-colors mt-0.5">18</span>
               </div>
               <div className="flex flex-col justify-center">
                  <h4 className="font-semibold text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve transition-colors tracking-wide">Conversation Practice</h4>
                  <p className="text-xs text-brand-taupe flex items-center gap-1.5 mt-2 font-medium uppercase tracking-wider">
                    <Clock size={12} className="text-brand-mauve"/> 19:00 - Beginner
                  </p>
               </div>
             </div>
             
             <div className="flex gap-5 p-5 rounded-sm border border-brand-taupe/20 bg-brand-beige/10 dark:bg-brand-navy-dark/50 hover:bg-brand-beige/30 dark:hover:bg-brand-navy hover:border-brand-mauve/50 transition-all cursor-pointer group">
               <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-2 text-center border border-brand-taupe/30 w-16 h-16 flex flex-col justify-center shrink-0">
                 <span className="text-brand-mauve dark:text-brand-peach text-[10px] uppercase font-bold tracking-widest">Oct</span>
                 <span className="text-brand-navy dark:text-brand-beige text-xl font-serif font-bold group-hover:text-brand-mauve transition-colors mt-0.5">21</span>
               </div>
               <div className="flex flex-col justify-center">
                  <h4 className="font-semibold text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve transition-colors tracking-wide">Business Phrasal Verbs</h4>
                  <p className="text-xs text-brand-taupe flex items-center gap-1.5 mt-2 font-medium uppercase tracking-wider">
                    <Clock size={12} className="text-brand-mauve"/> 20:30 - Advanced
                  </p>
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* 3. Right Column (News & Word of the Day) - 4 cols */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* News & Announcements */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-6 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-brand-navy dark:text-brand-beige text-xl">{t("announcements")}</h3>
            <span className="text-[10px] bg-brand-peach/30 dark:bg-brand-navy text-brand-dark dark:text-brand-peach font-bold px-2 py-1 uppercase tracking-widest border border-brand-taupe/20">New</span>
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-brand-navy dark:bg-brand-navy-dark border border-brand-taupe/20 text-brand-beige relative overflow-hidden group cursor-pointer shadow-sm">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mauve rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <h4 className="font-serif font-bold text-lg mb-2 relative z-10 text-white">Halloween Special 🎃</h4>
               <p className="text-brand-beige/70 text-sm relative z-10 mb-5 leading-relaxed">Join us for a fun vocabulary session this Friday.</p>
               <span className="text-brand-peach text-xs font-bold uppercase tracking-widest flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
                 Read more <ChevronRight size={14} strokeWidth={2}/>
               </span>
            </div>
            
            <div className="p-5 border border-brand-taupe/20 rounded-sm flex gap-4 hover:border-brand-mauve/50 hover:bg-brand-beige/20 dark:hover:bg-brand-navy/30 cursor-pointer transition-all">
              <div className="w-10 h-10 rounded-sm bg-brand-beige dark:bg-brand-navy border border-brand-taupe/30 text-brand-mauve flex items-center justify-center shrink-0">
                <MessageSquare size={16}/>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-brand-navy dark:text-brand-beige tracking-wide">Community Challenge</h4>
                <p className="text-xs text-brand-taupe mt-1">Post an audio in Telegram!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Word of the Day */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 overflow-hidden relative group transition-colors duration-300">
          {/* Header */}
          <div className="bg-brand-beige/30 dark:bg-brand-navy p-5 border-b border-brand-taupe/20 relative overflow-hidden transition-colors">
            <div className="absolute -right-4 -top-4 text-brand-taupe/10 dark:text-brand-taupe/5 transform rotate-12 group-hover:scale-110 transition-transform">
               <BookA size={100} />
            </div>
            <div className="flex items-center gap-3 text-brand-mauve dark:text-brand-peach mb-1 relative z-10">
              <BookA size={16} strokeWidth={2}/>
              <span className="text-xs font-bold uppercase tracking-widest">{t("wordOfDay")}</span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-3xl font-serif font-bold text-brand-navy dark:text-white">Serendipity</h2>
              <button className="text-brand-mauve dark:text-brand-peach border border-brand-taupe/30 p-2 rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy transition-colors">
                 <Volume2 size={18}/>
              </button>
            </div>
            <p className="text-brand-taupe text-sm font-mono mb-8 tracking-wide">/ˌser.ənˈdɪp.ə.ti/</p>
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-brand-taupe uppercase tracking-widest">Tradução</span>
                <p className="text-brand-navy/90 dark:text-brand-beige/90 font-medium mt-1">Acidente feliz, descoberta afortunada.</p>
              </div>
              
              <div>
                <span className="text-[10px] font-bold text-brand-taupe uppercase tracking-widest">Meaning</span>
                <p className="text-brand-navy/80 dark:text-brand-taupe text-sm mt-1 leading-relaxed">The fact of finding interesting or valuable things by chance.</p>
              </div>

              <div className="bg-brand-beige/20 dark:bg-brand-navy-dark p-5 border-l-2 border-brand-mauve mt-4 text-brand-navy/90 dark:text-brand-beige/90 transition-colors">
                <p className="text-sm italic leading-relaxed">
                  "They found each other by pure <strong className="text-brand-navy dark:text-white font-bold not-italic">serendipity</strong>."
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
