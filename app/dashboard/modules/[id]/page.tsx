"use client";

import { PlayCircle, CheckCircle, ArrowLeft, Download, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "../../../providers";

export default function ModulePage({ params }: { params: { id: string } }) {
  const { t } = useAppContext();

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-brand-taupe hover:text-brand-mauve transition-colors uppercase tracking-widest text-[10px] font-bold mb-4">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
          Module 3: Travel & Business
        </h1>
        <p className="text-brand-mauve mt-2 tracking-widest text-[10px] uppercase font-bold">Lesson 2 • Navigating Airports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Video Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brand-navy-dark aspect-video rounded-sm flex items-center justify-center relative overflow-hidden border border-brand-taupe/30 shadow-xl group cursor-pointer">
            <div className="absolute inset-0 bg-brand-navy/50 flex items-center justify-center transition-opacity group-hover:bg-brand-navy/30">
               <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:scale-110 transition-transform">
                 <PlayCircle size={32} />
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 p-8">
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white mb-4">Lesson Overview</h2>
            <p className="text-brand-navy/70 dark:text-brand-taupe leading-relaxed text-sm mb-6">
              In this lesson, we will cover the essential vocabulary needed to confidently navigate international airports, speak with customs agents, and handle unexpected delays without translating from Portuguese.
            </p>
            
            <div className="flex gap-4 border-t border-brand-taupe/10 pt-6">
              <button className="flex-1 bg-brand-beige/50 dark:bg-brand-navy/50 hover:bg-brand-beige dark:hover:bg-brand-navy text-brand-navy dark:text-brand-beige py-3 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2 border border-brand-taupe/20">
                <Download size={14} /> Download PDF Notes
              </button>
              <button className="flex-1 bg-brand-peach hover:bg-white text-brand-navy py-3 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2 border border-brand-peach">
                <CheckCircle size={14} /> Mark Complete
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Playlist */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 overflow-hidden">
            <div className="p-5 border-b border-brand-taupe/10 bg-brand-beige/20 dark:bg-brand-navy/30">
              <h3 className="font-serif font-bold text-brand-navy dark:text-brand-beige">Course Content</h3>
            </div>
            <div className="divide-y divide-brand-taupe/10 max-h-[600px] overflow-y-auto">
              {[
                { title: "Introduction to Business Travel", duration: "12:45", completed: true },
                { title: "Navigating Airports", duration: "18:20", active: true },
                { title: "Hotel Check-in & Requests", duration: "22:10" },
                { title: "Renting a Car", duration: "15:30" },
                { title: "Small Talk with Colleagues", duration: "25:00" },
              ].map((lesson, i) => (
                <div key={i} className={`p-4 transition-colors cursor-pointer flex gap-4 ${lesson.active ? 'bg-brand-beige/50 dark:bg-brand-navy-dark/50' : 'hover:bg-brand-beige/10 dark:hover:bg-brand-navy/20'}`}>
                  <div className="mt-0.5">
                    {lesson.completed ? (
                      <CheckCircle size={16} className="text-brand-mauve" />
                    ) : lesson.active ? (
                      <PlayCircle size={16} className="text-brand-peach" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-taupe/30"></div>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm ${lesson.active ? 'font-bold text-brand-navy dark:text-white' : 'font-medium text-brand-navy/80 dark:text-brand-taupe'}`}>
                      {i + 1}. {lesson.title}
                    </p>
                    <p className="text-[10px] text-brand-taupe font-mono mt-1">{lesson.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-brand-navy dark:bg-brand-navy-dark p-6 rounded-sm border border-brand-taupe/20 text-center">
             <MessageSquare size={24} className="mx-auto text-brand-peach mb-3" />
             <h3 className="font-serif font-bold text-white mb-2">Have questions?</h3>
             <p className="text-brand-beige/70 text-xs mb-4">Drop a voice note in our exclusive Telegram group for personalized pronunciation feedback.</p>
             <button className="w-full bg-brand-mauve hover:bg-brand-dark text-white py-2 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors">
                Open Telegram
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
