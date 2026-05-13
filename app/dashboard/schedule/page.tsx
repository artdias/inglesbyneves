"use client";

import { Calendar as CalendarIcon, Video, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "../../providers";

export default function StudentSchedulePage() {
  const { t } = useAppContext();

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
            My Schedule
          </h1>
          <p className="text-brand-taupe mt-2 tracking-wide text-sm">View upcoming live classes and events.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 bg-brand-mauve hover:bg-brand-dark text-white px-5 py-2.5 rounded-sm font-medium transition-all text-sm tracking-widest uppercase">
          <CalendarIcon size={16} />
          Book Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20">
            <div className="p-6 border-b border-brand-taupe/10 bg-brand-beige/20 dark:bg-brand-navy/30">
              <h2 className="font-serif font-bold text-brand-navy dark:text-white text-lg">Upcoming Live Sessions</h2>
            </div>
            
            <div className="divide-y divide-brand-taupe/10">
              {[
                { date: "Oct 18", name: "Conversation Practice", type: "Group Class", time: "19:00 EST", active: true },
                { date: "Oct 21", name: "Business Phrasal Verbs", type: "Group Class", time: "20:30 EST", active: false },
                { date: "Oct 25", name: "Pronunciation Focus", type: "1-on-1 Mentorship", time: "18:00 EST", active: false },
              ].map((session, i) => (
                <div key={i} className={`p-6 flex flex-col sm:flex-row gap-6 transition-colors group ${session.active ? 'bg-brand-beige/10 dark:bg-brand-navy-dark/50' : 'hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20'}`}>
                  
                  <div className={`w-20 h-20 rounded-sm flex flex-col items-center justify-center border shrink-0 ${session.active ? 'bg-brand-mauve border-brand-mauve text-white shadow-md' : 'bg-white dark:bg-[#0a0f1c] border-brand-taupe/30 text-brand-navy dark:text-brand-beige'}`}>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{session.date.split(' ')[0]}</span>
                    <span className="text-2xl font-serif font-bold mt-0.5">{session.date.split(' ')[1]}</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-brand-navy dark:text-white text-lg group-hover:text-brand-mauve transition-colors">{session.name}</h3>
                      <span className="px-2 py-1 bg-brand-taupe/20 rounded-sm text-[10px] uppercase tracking-widest font-bold text-brand-taupe">{session.type}</span>
                    </div>
                    <p className="text-sm text-brand-navy/70 dark:text-brand-taupe flex items-center gap-1.5 mt-2 font-medium">
                      <Clock size={14} className="text-brand-mauve"/> {session.time}
                    </p>
                    
                    {session.active && (
                      <button className="mt-4 bg-brand-peach hover:bg-white border border-brand-peach hover:border-brand-taupe/30 text-brand-navy py-2 px-4 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-all w-max flex items-center gap-2">
                        <Video size={14} /> Join Zoom Room
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-brand-navy dark:bg-brand-navy-dark p-6 rounded-sm border border-brand-taupe/20 text-center shadow-xl">
             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
               <span className="text-2xl font-serif font-bold text-brand-peach">4</span>
             </div>
             <h3 className="font-serif font-bold text-white mb-2">Mentorship Credits</h3>
             <p className="text-brand-beige/70 text-xs mb-6">You have 4 live 1-on-1 sessions remaining this month.</p>
             <button className="w-full bg-brand-mauve hover:bg-brand-dark text-white py-3 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors">
                Book a Session
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
