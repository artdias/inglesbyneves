"use client";

import { useState, useEffect } from "react";
import { Video, Plus, Check, ChevronLeft, ChevronRight, X, Clock } from "lucide-react";
import { createClient } from "../../../utils/supabase/client";

export default function TeacherSchedulePage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Form State
  const [isBooking, setIsBooking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("All Levels");
  const [studentId, setStudentId] = useState("");
  const [callLink, setCallLink] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    // Fetch Schedule
    const today = new Date();
    today.setHours(0,0,0,0);
    const { data: schedData } = await supabase
      .from("schedule")
      .select("*, profiles(first_name, last_name)")
      .gte("start_time", today.toISOString())
      .order("start_time", { ascending: true });
    if (schedData) setSessions(schedData);

    // Fetch Students
    const { data: stdData } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "student")
      .order("first_name", { ascending: true });
    if (stdData) setStudents(stdData);

    setLoading(false);
  }

  async function handleBookSession(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate) return;
    
    setSaving(true);
    
    // Combine date and time
    const dateStr = selectedDate.toISOString().split("T")[0];
    const startDateTime = new Date(`${dateStr}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

    await supabase.from("schedule").insert({
      title,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      level,
      student_id: studentId || null,
      call_link: callLink || null
    });

    setSaving(false);
    setIsBooking(false);
    setTitle("");
    setTime("");
    setStudentId("");
    setCallLink("");
    fetchData();
  }

  const openBookingModal = (date: Date) => {
    setSelectedDate(date);
    setIsBooking(true);
  };

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Schedule</h1>
          <p className="text-brand-taupe mt-1 text-sm tracking-wide">Manage your live 1-on-1 sessions.</p>
        </div>
      </div>

      {/* Booking Modal Overlay */}
      {isBooking && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 max-w-lg w-full shadow-2xl border border-brand-taupe/20 relative">
            <button onClick={() => setIsBooking(false)} className="absolute top-5 right-5 text-brand-taupe hover:text-brand-mauve transition-colors">
              <X size={24} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-brand-navy dark:text-brand-beige mb-6 border-b border-brand-taupe/10 pb-4">
               Book Session on {selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}
            </h3>
            
            <form onSubmit={handleBookSession} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Title / Topic</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors" placeholder="e.g. Pronunciation Practice" />
                </div>
                <div className="w-1/3">
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Time</label>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} required className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Assign Student (1-to-1)</label>
                  <select value={studentId} onChange={e => setStudentId(e.target.value)} className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors appearance-none">
                    <option value="">No specific student (Group Class)</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {`${s.first_name || ""} ${s.last_name || ""}`.trim() || "Unknown Student"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/3">
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Level</label>
                  <input type="text" value={level} onChange={e => setLevel(e.target.value)} required className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors" placeholder="e.g. Beginner" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Voice / Video Call Link (Jitsi, Google Meet, Zoom)</label>
                <input type="url" value={callLink} onChange={e => setCallLink(e.target.value)} className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors" placeholder="https://meet.jit.si/inglesbyneves-class" />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-brand-taupe/10 mt-6">
                <button type="button" onClick={() => setIsBooking(false)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-taupe hover:text-brand-navy dark:hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="bg-brand-mauve hover:bg-brand-dark text-white px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50">
                  {saving ? "Saving..." : <><Check size={16} /> Save Session</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif font-bold text-xl text-brand-navy dark:text-white">Calendar</h2>
            <div className="flex items-center gap-4 bg-brand-beige/30 dark:bg-brand-navy/30 px-4 py-2 rounded-sm border border-brand-taupe/20">
              <button onClick={prevMonth} className="text-brand-taupe hover:text-brand-mauve transition-colors"><ChevronLeft size={18}/></button>
              <span className="font-semibold tracking-wide text-brand-navy dark:text-brand-beige uppercase text-sm w-32 text-center">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={nextMonth} className="text-brand-taupe hover:text-brand-mauve transition-colors"><ChevronRight size={18}/></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-xs mb-3 text-brand-taupe font-bold tracking-widest uppercase pb-2">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
             {blanks.map(b => (
               <div key={`blank-${b}`} className="aspect-square"></div>
             ))}

             {days.map((day) => {
                const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const isToday = dateObj.toDateString() === new Date().toDateString();
                const daySessions = sessions.filter(s => new Date(s.start_time).toDateString() === dateObj.toDateString());
                
                return (
                  <div 
                    key={day} 
                    onClick={() => openBookingModal(dateObj)}
                    className={`
                    relative aspect-square flex flex-col items-center justify-start pt-2 rounded-sm transition-all border border-brand-taupe/10 cursor-pointer
                    ${isToday ? 'bg-brand-mauve/10 border-brand-mauve text-brand-mauve font-bold' : 'bg-brand-beige/10 dark:bg-brand-navy/10 hover:border-brand-mauve/50 text-brand-navy dark:text-brand-beige'}
                  `}>
                    <span>{day}</span>
                    <div className="mt-1 flex flex-wrap gap-1 justify-center px-1">
                      {daySessions.map((s, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-peach dark:bg-brand-peach/80" title={s.title}></div>
                      ))}
                    </div>
                  </div>
                )
             })}
          </div>
          <p className="text-[10px] text-brand-taupe mt-6 tracking-widest uppercase text-center">Click any day to book a session</p>
        </div>

        {/* Right Col: Upcoming Agenda */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm flex flex-col">
          <div className="p-5 border-b border-brand-taupe/10 bg-brand-beige/10 dark:bg-brand-navy/20">
            <h2 className="font-serif font-bold text-lg text-brand-navy dark:text-white">Upcoming Agenda</h2>
          </div>
          
          <div className="p-5 flex-1 overflow-y-auto max-h-[600px] space-y-4">
            {loading ? (
              <p className="text-center text-brand-taupe">Loading schedule...</p>
            ) : sessions.length === 0 ? (
              <p className="text-center text-brand-taupe">No upcoming sessions.</p>
            ) : (
              sessions.map((session, i) => {
                const d = new Date(session.start_time);
                const dateStr = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const studentName = session.profiles ? `${session.profiles.first_name || ''} ${session.profiles.last_name || ''}`.trim() : null;

                return (
                  <div key={i} className="bg-white dark:bg-brand-navy p-4 rounded-sm border border-brand-taupe/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-mauve"></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-brand-navy dark:text-white">{timeStr}</p>
                        <p className="text-[10px] text-brand-taupe font-mono mt-0.5">{dateStr}</p>
                      </div>
                      <Video size={16} className="text-brand-peach" />
                    </div>
                    <p className="font-bold text-sm text-brand-navy dark:text-brand-beige mb-1" title={session.title}>{session.title}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-brand-taupe/10 text-brand-taupe uppercase tracking-widest">{session.level}</span>
                      {studentName && <span className="text-[10px] px-2 py-0.5 rounded-sm bg-brand-peach/10 text-brand-peach uppercase tracking-widest border border-brand-peach/20">1-on-1: {studentName}</span>}
                    </div>
                    {session.call_link && (
                      <a href={session.call_link} target="_blank" rel="noopener noreferrer" className="mt-4 text-[10px] uppercase tracking-widest font-bold text-brand-mauve hover:text-brand-navy transition-colors flex items-center gap-1 w-fit bg-brand-mauve/10 px-3 py-1.5 rounded-sm border border-brand-mauve/20">
                         <Video size={12}/> Join Call
                      </a>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
