"use client";

import { PlayCircle, BookA, Calendar as CalendarIcon, MessageSquare, ExternalLink, ChevronRight, Volume2, Clock } from "lucide-react";
import { useAppContext } from "../providers";

export default function Dashboard() {
  const { t } = useAppContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors duration-300">
      
      {/* 1. Left Sidebar (Quick Links/Modules) - 3 cols */}
      <div className="lg:col-span-3 space-y-6">
        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-purple-100/50 dark:border-slate-800 transition-colors duration-300">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{t("progress")}</h3>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-500 dark:text-slate-400">Module 3</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">45%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-purple-100/50 dark:border-slate-800 transition-colors duration-300">
          <p className="px-3 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Quick Start</p>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 font-medium transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlayCircle size={20} />
            </div>
            {t("resume")}
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ExternalLink size={20} />
            </div>
            {t("zoom")}
          </a>
        </div>

        {/* Modules List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-purple-100/50 dark:border-slate-800 transition-colors duration-300">
          <p className="px-3 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t("courseModules")}</p>
          {[
            { tag: "M1", title: "The Basics", act: false },
            { tag: "M2", title: "Daily Routines", act: false },
            { tag: "M3", title: "Travel & Business", act: true },
            { tag: "M4", title: "Advanced Grammar", act: false },
          ].map((m, i) => (
             <a href="#" key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${m.act ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-semibold shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'}`}>
               <span className={`text-xs px-2 py-1 rounded-md font-bold ${m.act ? 'bg-purple-200/50 text-purple-700 dark:text-purple-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>{m.tag}</span>
               {m.title}
             </a>
          ))}
        </div>
      </div>

      {/* 2. Middle Column (Agenda/Calendar) - 5 cols */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-purple-100/50 dark:border-slate-800 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t("schedule")}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Upcoming classes and events</p>
            </div>
            <button className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
              <CalendarIcon size={20} />
            </button>
          </div>

          {/* Simple Visual Calendar */}
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 mb-6 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
             <button className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1">&lt;</button>
             <span className="font-semibold text-slate-700 dark:text-slate-300">October 2026</span>
             <button className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1">&gt;</button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2 text-slate-400 dark:text-slate-500 font-medium pb-2">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-8">
             {/* Mocking days */}
             {Array.from({length: 31}).map((_, i) => {
                const day = i + 1;
                const isToday = day === 16;
                const hasClass = day === 18 || day === 21;
                return (
                  <div key={day} className={`
                    aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all
                    ${isToday ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold shadow-md shadow-pink-500/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}
                    ${hasClass && !isToday ? 'bg-pink-50 dark:bg-pink-900/30 font-semibold text-pink-700 dark:text-pink-400 ring-1 ring-pink-200 dark:ring-pink-800' : ''}
                  `}>
                    {day}
                  </div>
                )
             })}
          </div>

          {/* Upcoming Card */}
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 px-1">{t("upcomingLive")}</h3>
          <div className="space-y-3">
             <div className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:border-purple-200 dark:hover:border-purple-800 transition-all cursor-pointer group">
               <div className="bg-white dark:bg-slate-900 rounded-lg p-2 text-center shadow-sm border border-slate-100 dark:border-slate-700 w-16 h-16 flex flex-col justify-center shrink-0">
                 <span className="text-pink-400 dark:text-pink-500 text-xs uppercase font-bold tracking-widest">Oct</span>
                 <span className="text-slate-800 dark:text-slate-200 text-xl font-black group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">18</span>
               </div>
               <div className="flex flex-col justify-center">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">Conversation Practice</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-medium">
                    <Clock size={14} className="text-purple-400 dark:text-purple-500"/> 19:00 - Beginner
                  </p>
               </div>
             </div>
             
             <div className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:border-purple-200 dark:hover:border-purple-800 transition-all cursor-pointer group">
               <div className="bg-white dark:bg-slate-900 rounded-lg p-2 text-center shadow-sm border border-slate-100 dark:border-slate-700 w-16 h-16 flex flex-col justify-center shrink-0">
                 <span className="text-pink-400 dark:text-pink-500 text-xs uppercase font-bold tracking-widest">Oct</span>
                 <span className="text-slate-800 dark:text-slate-200 text-xl font-black group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">21</span>
               </div>
               <div className="flex flex-col justify-center">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">Business Phrasal Verbs</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-medium">
                    <Clock size={14} className="text-purple-400 dark:text-purple-500"/> 20:30 - Advanced
                  </p>
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* 3. Right Column (News & Word of the Day) - 4 cols */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* News & Announcements */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-purple-100/50 dark:border-slate-800 transition-colors duration-300">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{t("announcements")}</h3>
            <span className="text-xs bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-400 font-bold px-2.5 py-1 rounded-md ring-1 ring-pink-200 dark:ring-pink-800">New</span>
          </div>
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-xl text-white relative overflow-hidden group cursor-pointer shadow-md shadow-slate-900/10">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <h4 className="font-bold text-lg mb-1 relative z-10">Halloween Special 🎃</h4>
               <p className="text-slate-400 dark:text-slate-300 text-sm relative z-10 mb-4 line-clamp-2">Join us for a fun vocabulary session this Friday.</p>
               <span className="text-pink-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 relative z-10 group-hover:text-pink-300 transition-colors">
                 Read more <ChevronRight size={14} strokeWidth={3}/>
               </span>
            </div>
            
            <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl flex gap-4 hover:border-purple-200 dark:hover:border-purple-800 hover:shadow-sm bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
                <MessageSquare size={18}/>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Community Challenge</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Post an audio in Telegram!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Word of the Day */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-pink-100/80 dark:border-slate-800 overflow-hidden relative group transition-colors duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 p-4 border-b border-pink-100/50 dark:border-slate-700 relative overflow-hidden transition-colors">
            <div className="absolute -right-4 -top-4 text-pink-500/10 dark:text-pink-500/5 transform rotate-12 group-hover:scale-110 transition-transform">
               <BookA size={100} />
            </div>
            <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 mb-1 relative z-10">
              <BookA size={18} strokeWidth={2.5}/>
              <span className="text-xs font-bold uppercase tracking-widest">{t("wordOfDay")}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Serendipity</h2>
              <button className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 p-2.5 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors active:scale-95">
                 <Volume2 size={20}/>
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-mono mb-6 text-purple-700/80 dark:text-purple-400 font-medium">/ˌser.ənˈdɪp.ə.ti/</p>
            
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tradução</span>
                <p className="text-slate-800 dark:text-slate-200 font-semibold mt-1">Acidente feliz, descoberta afortunada.</p>
              </div>
              
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Meaning</span>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed">The fact of finding interesting or valuable things by chance.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border-l-4 border-purple-400 dark:border-purple-600 mt-2 text-slate-700 dark:text-slate-300 transition-colors">
                <p className="text-sm italic leading-relaxed">
                  "They found each other by pure <strong className="text-purple-700 dark:text-purple-400 font-bold not-italic">serendipity</strong>."
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
