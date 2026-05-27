"use client";

import { useState, useEffect } from "react";
import { Users, BookOpen, TrendingUp, Calendar as CalendarIcon, ArrowUpRight } from "lucide-react";
import { createClient } from "../../utils/supabase/client";

export default function TeacherOverview() {
  const [studentCount, setStudentCount] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);
  const [classesCount, setClassesCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [todayClasses, setTodayClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadStats() {
      // Students count
      const { count: sCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student");
      if (sCount !== null) setStudentCount(sCount);

      // Modules count
      const { count: mCount } = await supabase.from("modules").select("*", { count: "exact", head: true });
      if (mCount !== null) setModuleCount(mCount);

      // Today's classes
      const today = new Date();
      today.setHours(0,0,0,0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data: schedData } = await supabase
        .from("schedule")
        .select("*")
        .gte("start_time", today.toISOString())
        .order("start_time", { ascending: true })
        .limit(5);
        
      if (schedData) {
        setTodayClasses(schedData);
        setClassesCount(schedData.filter(c => new Date(c.start_time) < tomorrow).length);
      }

      // Recent Activity
      const { data: progData } = await supabase
        .from("user_progress")
        .select(`
          updated_at,
          completion_percentage,
          profiles(first_name, last_name),
          modules(title)
        `)
        .order("updated_at", { ascending: false })
        .limit(5);

      if (progData) {
        setRecentActivity(progData.map(p => {
          const profile: any = p.profiles || {};
          const fName = profile.first_name || "";
          const lName = profile.last_name || "";
          return {
            student: `${fName} ${lName}`.trim() || "Unknown",
            action: `Progressed to ${p.completion_percentage}% in ${(p.modules as any)?.title || 'Course'}`,
            time: new Date(p.updated_at || "").toLocaleDateString()
          };
        }));
      }

      setLoading(false);
    }
    loadStats();
  }, []);

  const stats = [
    { label: "Active Students", value: studentCount, icon: <Users size={20}/>, trend: "Live" },
    { label: "Total Modules", value: moduleCount, icon: <BookOpen size={20}/>, trend: "Live" },
    { label: "Avg. Completion", value: "Realtime", icon: <TrendingUp size={20}/>, trend: "Tracked" },
    { label: "Upcoming Classes", value: todayClasses.length, icon: <CalendarIcon size={20}/>, trend: "Live" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Overview</h1>
        <p className="text-brand-taupe mt-1 text-sm tracking-wide">Welcome to your real-time command center.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0a0f1c] p-6 rounded-sm border border-brand-taupe/20 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               {stat.icon}
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-brand-taupe mb-2">{stat.label}</p>
            <p className="text-3xl font-serif font-bold text-brand-navy dark:text-white mb-4">{loading ? "..." : stat.value}</p>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-600 dark:text-green-400 tracking-widest">
              <ArrowUpRight size={12} /> {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm">
          <div className="p-5 border-b border-brand-taupe/10 flex justify-between items-center">
            <h2 className="font-serif font-bold text-brand-navy dark:text-white">Recent Student Progress</h2>
          </div>
          <div className="divide-y divide-brand-taupe/10">
            {recentActivity.length === 0 ? (
              <p className="p-6 text-sm text-brand-taupe">No recent progress recorded.</p>
            ) : (
              recentActivity.map((activity, i) => (
                <div key={i} className="p-4 flex justify-between items-center hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-brand-navy dark:text-brand-beige">{activity.student}</p>
                    <p className="text-xs text-brand-taupe">{activity.action}</p>
                  </div>
                  <p className="text-[10px] font-mono text-brand-taupe">{activity.time}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm">
           <div className="p-5 border-b border-brand-taupe/10">
            <h2 className="font-serif font-bold text-brand-navy dark:text-white">Upcoming Classes</h2>
          </div>
          <div className="p-4 space-y-4">
            {todayClasses.length === 0 ? (
              <p className="text-sm text-brand-taupe">No upcoming classes scheduled.</p>
            ) : (
              todayClasses.map((cls, i) => (
                <div key={cls.id} className="flex gap-4 items-center bg-brand-beige/20 dark:bg-brand-navy/30 p-3 rounded-sm border border-brand-taupe/10">
                  <div className="w-12 h-12 bg-brand-navy dark:bg-brand-beige rounded-sm flex flex-col items-center justify-center text-brand-beige dark:text-brand-navy font-bold text-xs tracking-wider">
                    <span>{new Date(cls.start_time).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-navy dark:text-white">{cls.title}</p>
                    <p className="text-xs text-brand-taupe">{new Date(cls.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {cls.level}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
