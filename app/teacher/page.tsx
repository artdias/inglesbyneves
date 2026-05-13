"use client";

import { Users, DollarSign, TrendingUp, Calendar as CalendarIcon, ArrowUpRight } from "lucide-react";

export default function TeacherOverview() {
  const stats = [
    { label: "Active Students", value: "142", icon: <Users size={20}/>, trend: "+12%" },
    { label: "Monthly Revenue", value: "R$ 42k", icon: <DollarSign size={20}/>, trend: "+8%" },
    { label: "Avg. Completion", value: "68%", icon: <TrendingUp size={20}/>, trend: "+5%" },
    { label: "Classes This Week", value: "24", icon: <CalendarIcon size={20}/>, trend: "Stable" },
  ];

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Overview</h1>
        <p className="text-brand-taupe mt-1 text-sm tracking-wide">Welcome back, Ester. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0a0f1c] p-6 rounded-sm border border-brand-taupe/20 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               {stat.icon}
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-brand-taupe mb-2">{stat.label}</p>
            <p className="text-3xl font-serif font-bold text-brand-navy dark:text-white mb-4">{stat.value}</p>
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
            <h2 className="font-serif font-bold text-brand-navy dark:text-white">Recent Student Activity</h2>
            <button className="text-[10px] uppercase tracking-widest font-bold text-brand-mauve hover:text-brand-navy transition-colors">View All</button>
          </div>
          <div className="divide-y divide-brand-taupe/10">
            {[
              { student: "Luanda Oliveira", action: "Completed Module 3", time: "10 mins ago" },
              { student: "Carlos Silva", action: "Upgraded to Mentorship", time: "2 hours ago" },
              { student: "Ana Souza", action: "Submitted Essay #4", time: "5 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20 transition-colors">
                <div>
                  <p className="text-sm font-medium text-brand-navy dark:text-brand-beige">{activity.student}</p>
                  <p className="text-xs text-brand-taupe">{activity.action}</p>
                </div>
                <p className="text-[10px] font-mono text-brand-taupe">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm">
           <div className="p-5 border-b border-brand-taupe/10">
            <h2 className="font-serif font-bold text-brand-navy dark:text-white">Today's Classes</h2>
          </div>
          <div className="p-4 space-y-4">
            {[
              { time: "14:00", student: "Marcos P." },
              { time: "15:30", student: "Luanda O." },
              { time: "17:00", student: "Julia M." },
            ].map((cls, i) => (
              <div key={i} className="flex gap-4 items-center bg-brand-beige/20 dark:bg-brand-navy/30 p-3 rounded-sm border border-brand-taupe/10">
                <div className="w-12 h-12 bg-brand-navy dark:bg-brand-beige rounded-sm flex items-center justify-center text-brand-beige dark:text-brand-navy font-bold text-xs tracking-wider">
                  {cls.time}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-navy dark:text-white">Live Session</p>
                  <p className="text-xs text-brand-taupe">with {cls.student}</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 bg-transparent border border-brand-taupe hover:border-brand-mauve text-brand-navy dark:text-brand-beige py-2 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-all">
              Open Zoom Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
