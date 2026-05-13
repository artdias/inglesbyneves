"use client";

import { ChevronLeft, ChevronRight, Video, Plus } from "lucide-react";

export default function TeacherSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Schedule</h1>
          <p className="text-brand-taupe mt-1 text-sm tracking-wide">Manage your live 1-on-1 sessions.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-navy dark:bg-brand-beige text-white dark:text-brand-navy px-4 py-2 rounded-sm text-xs tracking-widest uppercase font-bold transition-colors">
          <Plus size={14} /> Book Session
        </button>
      </div>

      <div className="bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm flex flex-col md:flex-row">
        
        {/* Calendar Side */}
        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-brand-taupe/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif font-bold text-lg text-brand-navy dark:text-white">October 2026</h2>
            <div className="flex gap-2">
              <button className="p-1 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-white hover:bg-brand-beige/50 dark:hover:bg-brand-navy"><ChevronLeft size={16}/></button>
              <button className="p-1 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-white hover:bg-brand-beige/50 dark:hover:bg-brand-navy"><ChevronRight size={16}/></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-[10px] uppercase tracking-widest font-bold text-brand-taupe py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }).map((_, i) => (
              <button key={i} className={`aspect-square flex items-center justify-center text-sm rounded-sm transition-colors ${i + 1 === 13 ? 'bg-brand-mauve text-white font-bold' : 'text-brand-navy dark:text-brand-beige hover:bg-brand-beige/50 dark:hover:bg-brand-navy'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Agenda Side */}
        <div className="w-full md:w-80 bg-brand-beige/20 dark:bg-brand-navy/10 p-6 flex flex-col">
          <h3 className="font-bold text-brand-navy dark:text-white mb-6 uppercase tracking-widest text-xs border-b border-brand-taupe/20 pb-2">Agenda for Oct 13</h3>
          
          <div className="space-y-4 flex-1">
            {[
              { time: "14:00", name: "Marcos P.", type: "Pronunciation Focus" },
              { time: "15:30", name: "Luanda O.", type: "Interview Prep" },
              { time: "17:00", name: "Julia M.", type: "General Conversation" },
            ].map((session, i) => (
              <div key={i} className="bg-white dark:bg-brand-navy p-4 rounded-sm border border-brand-taupe/30 shadow-sm relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-mauve"></div>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-brand-navy dark:text-white text-sm">{session.time}</p>
                  <Video size={14} className="text-brand-peach" />
                </div>
                <p className="font-bold text-sm text-brand-navy dark:text-brand-beige mb-1">{session.name}</p>
                <p className="text-[10px] text-brand-taupe uppercase tracking-widest">{session.type}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
