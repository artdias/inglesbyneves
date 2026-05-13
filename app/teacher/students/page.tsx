"use client";

import { Search, Mail, Eye } from "lucide-react";

export default function TeacherStudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Student CRM</h1>
          <p className="text-brand-taupe mt-1 text-sm tracking-wide">Manage your student roster and monitor progress.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-taupe/10 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-taupe w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search students by name or email..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-brand-beige/20 dark:bg-brand-navy/30 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-mauve transition-colors"
            />
          </div>
          <select className="bg-brand-beige/20 dark:bg-brand-navy/30 border border-brand-taupe/30 text-brand-navy dark:text-white text-sm px-4 py-2 rounded-sm outline-none">
            <option>All Plans</option>
            <option>Self-Paced</option>
            <option>Premium Mentorship</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-beige/20 dark:bg-brand-navy/30 border-b border-brand-taupe/20 text-[10px] uppercase tracking-widest text-brand-taupe font-bold">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-taupe/10 text-brand-navy dark:text-brand-beige">
              {[
                { name: "Luanda Oliveira", email: "luanda@example.com", plan: "Premium Mentorship", progress: 68, active: "Today" },
                { name: "Carlos Silva", email: "carlos@example.com", plan: "Self-Paced", progress: 12, active: "2 days ago" },
                { name: "Ana Souza", email: "ana@example.com", plan: "Premium Mentorship", progress: 95, active: "Yesterday" },
                { name: "Marcos Paulo", email: "marcos@example.com", plan: "Self-Paced", progress: 45, active: "1 week ago" },
              ].map((student, i) => (
                <tr key={i} className="hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold">{student.name}</p>
                    <p className="text-xs text-brand-taupe">{student.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-sm text-[10px] tracking-widest uppercase font-bold ${student.plan.includes('Premium') ? 'bg-brand-mauve/20 text-brand-mauve dark:text-brand-peach' : 'bg-brand-taupe/20 text-brand-taupe'}`}>
                      {student.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full h-1.5 bg-brand-taupe/20 rounded-full overflow-hidden max-w-[100px]">
                        <div className="h-full bg-brand-mauve" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-mono">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">{student.active}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3">
                    <button className="text-brand-taupe hover:text-brand-mauve transition-colors" title="Message">
                      <Mail size={16} />
                    </button>
                    <button className="text-brand-taupe hover:text-brand-navy dark:hover:text-white transition-colors" title="View Profile">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
