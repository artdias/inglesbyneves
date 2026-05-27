"use client";

import Link from "next/link";
import { PlayCircle, BookA, Calendar as CalendarIcon, MessageSquare, ExternalLink, ChevronRight, Volume2, Clock, X } from "lucide-react";
import { useAppContext } from "../providers";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { Database } from "../../types/supabase";

type Module = Database["public"]["Tables"]["modules"]["Row"];
type Announcement = Database["public"]["Tables"]["announcements"]["Row"];
type Schedule = Database["public"]["Tables"]["schedule"]["Row"];

export default function Dashboard() {
  const { t } = useAppContext();
  const supabase = createClient();

  const [modules, setModules] = useState<Module[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<{ module: Module, percentage: number } | null>(null);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [minimalistMode, setMinimalistMode] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      // 1. Fetch Modules
      const { data: modulesData } = await supabase
        .from("modules")
        .select("*")
        .order("tag", { ascending: true });
      if (modulesData) setModules(modulesData);

      // 2. Fetch Announcements
      const { data: announcementsData } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2);
      if (announcementsData) setAnnouncements(announcementsData);

      // 3. Fetch Schedule (upcoming classes)
      const { data: scheduleData } = await supabase
        .from("schedule")
        .select("*")
        .order("start_time", { ascending: true });
      if (scheduleData) setSchedule(scheduleData);

      // 4. Fetch Progress
      const { data: authData } = await supabase.auth.getUser();
      if (authData.user && modulesData && modulesData.length > 0) {
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("*")
          .eq("student_id", authData.user.id)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (progressData) {
          const mod = modulesData.find(m => m.id === progressData.module_id) || modulesData[0];
          setProgress({ module: mod, percentage: progressData.completion_percentage || 0 });
        } else {
          setProgress({ module: modulesData[0], percentage: 0 });
        }
      }

      setLoading(false);
    }
    
    loadDashboardData();
  }, [supabase]);

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Compute minimal days for minimalist view
  const minimalDays = days.map(day => {
    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isToday = dateObj.toDateString() === new Date().toDateString();
    const hasClass = schedule.some(s => new Date(s.start_time).toDateString() === dateObj.toDateString());
    return { day, dateObj, isToday, hasClass };
  }).filter(d => d.isToday || d.hasClass);

  // Future Schedule
  const displayedSchedule = schedule.filter(s => new Date(s.start_time) >= new Date()).slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-taupe/30 border-t-brand-mauve rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors duration-300 relative">
      
      {/* Event Modal Overlay */}
      {showEventModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 max-w-md w-full shadow-2xl border border-brand-taupe/20 relative">
            <button onClick={() => setShowEventModal(false)} className="absolute top-5 right-5 text-brand-taupe hover:text-brand-mauve transition-colors">
              <X size={24} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-brand-navy dark:text-brand-beige mb-6 border-b border-brand-taupe/10 pb-4">
               Events on {selectedDate.toLocaleDateString()}
            </h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
               {schedule.filter(s => new Date(s.start_time).toDateString() === selectedDate.toDateString()).map(s => (
                 <div key={s.id} className="p-5 bg-brand-beige/20 dark:bg-brand-navy-dark rounded-sm border border-brand-taupe/20 hover:border-brand-mauve/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-brand-navy dark:text-brand-beige">{s.title}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-mauve">
                         {new Date(s.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-sm text-brand-taupe mb-5 leading-relaxed">{s.description || "Join us for this scheduled session. Please make sure your camera is ready and you are in a quiet environment."}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {s.call_link ? (
                        <a href={s.call_link} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-brand-mauve hover:bg-brand-dark text-white px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors inline-block">
                          Join Call
                        </a>
                      ) : (
                        <span className="flex-1 text-center bg-brand-taupe/30 text-brand-taupe px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider inline-block cursor-not-allowed">
                          No Link
                        </span>
                      )}
                      <Link href={`/dashboard/modules/${s.module_id || ''}`} className="flex-1 text-center border border-brand-taupe/30 hover:bg-brand-beige dark:hover:bg-brand-navy text-brand-navy dark:text-brand-beige px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors inline-block">
                        View Lesson
                      </Link>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. Left Sidebar (Quick Links/Modules) - 3 cols */}
      <div className="lg:col-span-3 space-y-6">
        {/* Progress Card */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-6 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <h3 className="font-serif text-xl font-bold text-brand-navy dark:text-brand-beige mb-3">{t("progress")}</h3>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-brand-taupe">{progress ? progress.module.title : "No Module Started"}</span>
            <span className="font-semibold text-brand-mauve">{progress ? progress.percentage : 0}%</span>
          </div>
          <div className="w-full bg-brand-beige dark:bg-brand-navy/50 rounded-sm h-1.5 overflow-hidden">
            <div 
              className="bg-brand-mauve h-1.5 rounded-sm transition-all duration-1000 ease-out" 
              style={{ width: `${progress ? progress.percentage : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-3 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <p className="px-3 py-3 text-xs font-bold text-brand-taupe uppercase tracking-widest">Quick Start</p>
          <Link href={`/dashboard/modules/${progress?.module?.id || ''}`} className="flex items-center gap-4 p-3 rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy/30 text-brand-navy dark:text-brand-beige hover:text-brand-mauve dark:hover:text-brand-peach font-medium transition-colors group">
            <div className="w-10 h-10 rounded-sm bg-brand-beige dark:bg-brand-navy text-brand-mauve flex items-center justify-center group-hover:scale-105 transition-transform border border-brand-taupe/20">
              <PlayCircle size={18} strokeWidth={1.5} />
            </div>
            {t("resume")}
          </Link>
          <a href={displayedSchedule.length > 0 && displayedSchedule[0].call_link ? displayedSchedule[0].call_link : "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-sm hover:bg-brand-beige/50 dark:hover:bg-brand-navy/30 text-brand-navy dark:text-brand-beige hover:text-brand-dark dark:hover:text-brand-peach font-medium transition-colors group">
            <div className="w-10 h-10 rounded-sm bg-brand-peach/30 dark:bg-brand-navy text-brand-dark dark:text-brand-peach flex items-center justify-center group-hover:scale-105 transition-transform border border-brand-taupe/20">
              <ExternalLink size={18} strokeWidth={1.5} />
            </div>
            {t("zoom")}
          </a>
        </div>

        {/* Modules List */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-3 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <p className="px-3 py-3 text-xs font-bold text-brand-taupe uppercase tracking-widest">{t("courseModules")}</p>
          {modules.length === 0 ? (
            <p className="p-3 text-sm text-brand-taupe">No modules available.</p>
          ) : (
            modules.map((m) => (
               <Link href={`/dashboard/modules/${m.id}`} key={m.id} className={`flex items-center gap-4 p-3 rounded-sm transition-colors ${m.is_active ? 'bg-brand-beige dark:bg-brand-navy/50 text-brand-navy dark:text-brand-beige font-semibold border-l-2 border-brand-mauve' : 'hover:bg-brand-beige/30 dark:hover:bg-brand-navy/20 text-brand-navy/70 dark:text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige font-medium border-l-2 border-transparent'}`}>
                 <span className={`text-xs px-2.5 py-1 rounded-sm font-bold tracking-wider ${m.is_active ? 'bg-brand-mauve text-white' : 'bg-brand-taupe/20 text-brand-taupe'}`}>{m.tag}</span>
                 {m.title}
               </Link>
            ))
          )}
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

          {/* Interactive Calendar Controls */}
          <div className="flex justify-between items-center bg-brand-beige/30 dark:bg-brand-navy-dark rounded-sm px-5 py-4 mb-6 border border-brand-taupe/30 transition-colors duration-300">
             <div className="flex items-center">
               <button onClick={prevMonth} className="text-brand-taupe hover:text-brand-mauve dark:hover:text-brand-peach transition-colors p-1 px-3">&lt;</button>
               <span className="font-semibold tracking-wide text-brand-navy dark:text-brand-beige uppercase text-sm mx-2">
                 {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
               </span>
               <button onClick={nextMonth} className="text-brand-taupe hover:text-brand-mauve dark:hover:text-brand-peach transition-colors p-1 px-3">&gt;</button>
             </div>
             <button 
               onClick={() => setMinimalistMode(!minimalistMode)} 
               className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors border ${minimalistMode ? 'bg-brand-mauve text-white border-brand-mauve shadow-sm' : 'text-brand-taupe border-brand-taupe/30 hover:border-brand-mauve/50'}`}
             >
               {minimalistMode ? "Show All" : "Events Only"}
             </button>
          </div>
          
          {/* Full Grid View */}
          <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${minimalistMode ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
            <div className="overflow-hidden">
              <div className="grid grid-cols-7 gap-2 text-center text-xs mb-3 text-brand-taupe font-bold tracking-widest uppercase pb-2">
                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm mb-10">
                 {/* Blanks for first row offset */}
                 {blanks.map(b => (
                   <div key={`blank-${b}`} className="aspect-square"></div>
                 ))}

                 {/* Days */}
                 {days.map((day) => {
                    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isToday = dateObj.toDateString() === new Date().toDateString();
                    const hasClass = schedule.some(s => new Date(s.start_time).toDateString() === dateObj.toDateString());
                    
                    return (
                      <div 
                        key={day} 
                        onClick={() => {
                          if (hasClass) {
                            setSelectedDate(dateObj);
                            setShowEventModal(true);
                          }
                        }}
                        className={`
                        relative aspect-square flex items-center justify-center rounded-sm transition-all border border-transparent
                        ${isToday ? 'bg-brand-mauve text-white font-bold shadow-sm' : 'text-brand-navy/80 dark:text-brand-taupe'}
                        ${hasClass ? 'cursor-pointer hover:ring-2 ring-brand-mauve hover:bg-brand-beige/50 dark:hover:bg-brand-navy/50' : ''}
                      `}>
                        {day}
                        {hasClass && !isToday && (
                          <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-brand-peach dark:bg-brand-peach/80"></span>
                        )}
                      </div>
                    )
                 })}
              </div>
            </div>
          </div>

          {/* Minimalist Horizontal View */}
          <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${minimalistMode ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
               <div className="flex flex-wrap gap-4 py-2 mb-6 justify-start">
                 {minimalDays.length === 0 ? (
                   <p className="text-sm text-brand-taupe px-2 w-full text-center py-4 bg-brand-beige/10 dark:bg-brand-navy-dark/30 rounded-sm border border-brand-taupe/10">No events this month.</p>
                 ) : (
                   minimalDays.map((d) => {
                     const weekdayStr = d.dateObj.toLocaleString('en-US', { weekday: 'short' });
                     return (
                       <div 
                         key={`min-${d.day}`} 
                         onClick={() => {
                            if (d.hasClass) {
                              setSelectedDate(d.dateObj);
                              setShowEventModal(true);
                            }
                         }}
                         className={`
                         flex flex-col items-center justify-center p-3 px-4 rounded-sm border transition-all cursor-pointer shadow-sm
                         ${d.isToday ? 'bg-brand-mauve border-brand-mauve text-white hover:scale-105' : 'bg-brand-beige/20 dark:bg-brand-navy/30 border-brand-taupe/20 hover:border-brand-mauve/50 text-brand-navy dark:text-brand-beige hover:scale-105'}
                         `}
                       >
                         <span className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${d.isToday ? 'text-white/80' : 'text-brand-taupe'}`}>{weekdayStr}</span>
                         <span className="text-xl font-serif font-bold">{d.day}</span>
                       </div>
                     )
                   })
                 )}
               </div>
            </div>
          </div>

          {/* Upcoming Card */}
          <div className="flex justify-between items-end mb-5">
            <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-brand-beige">
              {t("upcomingLive")}
            </h3>
          </div>
          
          <div className="space-y-4">
             {displayedSchedule.length === 0 ? (
               <p className="text-brand-taupe text-sm p-4 bg-brand-beige/10 dark:bg-brand-navy-dark/30 rounded-sm border border-brand-taupe/10 text-center">
                 No classes scheduled upcoming.
               </p>
             ) : (
               displayedSchedule.map(s => {
                 const dateObj = new Date(s.start_time);
                 const monthStr = dateObj.toLocaleString('en-US', { month: 'short' });
                 const dayNum = dateObj.getDate();
                 const timeStr = dateObj.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                 
                 return (
                   <div key={s.id} className="flex gap-5 p-5 rounded-sm border border-brand-taupe/20 bg-brand-beige/10 dark:bg-brand-navy-dark/50 hover:bg-brand-beige/30 dark:hover:bg-brand-navy hover:border-brand-mauve/50 transition-all cursor-pointer group">
                     <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-2 text-center border border-brand-taupe/30 w-16 h-16 flex flex-col justify-center shrink-0">
                       <span className="text-brand-mauve dark:text-brand-peach text-[10px] uppercase font-bold tracking-widest">{monthStr}</span>
                       <span className="text-brand-navy dark:text-brand-beige text-xl font-serif font-bold group-hover:text-brand-mauve transition-colors mt-0.5">{dayNum}</span>
                     </div>
                      <div className="flex flex-col justify-center">
                         <h4 className="font-semibold text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve transition-colors tracking-wide">{s.title}</h4>
                         <p className="text-xs text-brand-taupe flex items-center gap-1.5 mt-2 font-medium uppercase tracking-wider">
                           <Clock size={12} className="text-brand-mauve"/> {timeStr} - {s.level}
                         </p>
                         {s.call_link && (
                           <a href={s.call_link} target="_blank" rel="noopener noreferrer" className="mt-2 text-[10px] uppercase tracking-widest font-bold text-brand-mauve hover:text-brand-navy transition-colors flex items-center gap-1 w-fit bg-brand-mauve/10 px-2 py-1 rounded-sm border border-brand-mauve/20">
                              Join Call <ChevronRight size={12}/>
                           </a>
                         )}
                      </div>
                    </div>
                 );
               })
             )}
          </div>

        </div>
      </div>

      {/* 3. Right Column (News & Word of the Day) - 4 cols */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* News & Announcements */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-6 shadow-sm border border-brand-taupe/20 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-brand-navy dark:text-brand-beige text-xl">{t("announcements")}</h3>
          </div>
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <p className="text-brand-taupe text-sm">No new announcements.</p>
            ) : (
              announcements.map((a, i) => (
                i === 0 ? (
                  <div key={a.id} className="p-6 bg-brand-navy dark:bg-brand-navy-dark border border-brand-taupe/20 text-brand-beige relative overflow-hidden group cursor-pointer shadow-sm">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mauve rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                     <div className="flex justify-between items-start mb-2 relative z-10">
                       <h4 className="font-serif font-bold text-lg text-white">{a.title}</h4>
                       {a.is_new && <span className="text-[10px] bg-brand-peach/30 text-brand-peach font-bold px-2 py-1 uppercase tracking-widest border border-brand-peach/20 rounded-sm">New</span>}
                     </div>
                     <p className="text-brand-beige/70 text-sm relative z-10 mb-5 leading-relaxed">{a.content}</p>
                     <span className="text-brand-peach text-xs font-bold uppercase tracking-widest flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
                       Read more <ChevronRight size={14} strokeWidth={2}/>
                     </span>
                  </div>
                ) : (
                  <div key={a.id} className="p-5 border border-brand-taupe/20 rounded-sm flex gap-4 hover:border-brand-mauve/50 hover:bg-brand-beige/20 dark:hover:bg-brand-navy/30 cursor-pointer transition-all">
                    <div className="w-10 h-10 rounded-sm bg-brand-beige dark:bg-brand-navy border border-brand-taupe/30 text-brand-mauve flex items-center justify-center shrink-0">
                      <MessageSquare size={16}/>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-sm font-semibold text-brand-navy dark:text-brand-beige tracking-wide">{a.title}</h4>
                      <p className="text-xs text-brand-taupe mt-1 line-clamp-1">{a.content}</p>
                    </div>
                  </div>
                )
              ))
            )}
          </div>
        </div>

        {/* Word of the Day (Static for now) */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 overflow-hidden relative group transition-colors duration-300">
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
