"use client";

import { useState, useEffect } from "react";
import { Search, Mail, Eye, Save } from "lucide-react";
import { createClient } from "../../../utils/supabase/client";
import { Database } from "../../../types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<Profile[]>([]);
  const [progressData, setProgressData] = useState<Record<string, number>>({});
  const [defaultModuleId, setDefaultModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    // 1. Fetch Students
    const { data: stds } = await supabase.from("profiles").select("*").eq("role", "student");
    if (stds) setStudents(stds);

    // 2. Fetch Progress
    const { data: prog } = await supabase.from("user_progress").select("*").order("updated_at", { ascending: false });
    if (prog) {
      const pMap: Record<string, number> = {};
      prog.forEach(p => {
        // Keep the latest one if multiple exist
        if (pMap[p.student_id] === undefined) {
          pMap[p.student_id] = p.completion_percentage || 0;
        }
      });
      setProgressData(pMap);
    }

    // 3. Fetch an anchor module to attach progress to if they don't have one
    const { data: mods } = await supabase.from("modules").select("id").limit(1);
    if (mods && mods.length > 0) setDefaultModuleId(mods[0].id);
  }

  async function updateProgress(studentId: string, newPercentage: number) {
    if (!defaultModuleId) return;
    setSavingId(studentId);

    // Try to get the specific user_progress row they currently have
    const { data: existingProg } = await supabase
      .from("user_progress")
      .select("*")
      .eq("student_id", studentId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const targetModuleId = existingProg ? existingProg.module_id : defaultModuleId;

    await supabase.from("user_progress").upsert({
      student_id: studentId,
      module_id: targetModuleId,
      completion_percentage: newPercentage,
      updated_at: new Date().toISOString()
    }, { onConflict: "student_id, module_id" });

    // Local state update
    setProgressData(prev => ({ ...prev, [studentId]: newPercentage }));
    setSavingId(null);
  }

  const filteredStudents = students.filter(s => 
    s.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Student CRM</h1>
          <p className="text-brand-taupe mt-1 text-sm tracking-wide">Manage your student roster and override progress manually.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-taupe/10 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-taupe w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search students by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-brand-beige/20 dark:bg-brand-navy/30 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-mauve transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-beige/20 dark:bg-brand-navy/30 border-b border-brand-taupe/20 text-[10px] uppercase tracking-widest text-brand-taupe font-bold">
              <tr>
                <th className="px-6 py-4 w-1/3">Student</th>
                <th className="px-6 py-4">Global Progress Override</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-taupe/10 text-brand-navy dark:text-brand-beige">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-brand-taupe">No students found.</td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const currentProgress = progressData[student.id] || 0;
                  return (
                    <tr key={student.id} className="hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold">{student.display_name || "Unnamed Student"}</p>
                        <p className="text-xs text-brand-taupe">{student.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <input 
                            type="range" 
                            min="0" max="100" 
                            value={currentProgress}
                            onChange={(e) => setProgressData(prev => ({ ...prev, [student.id]: parseInt(e.target.value) }))}
                            onMouseUp={(e) => updateProgress(student.id, parseInt((e.target as HTMLInputElement).value))}
                            onTouchEnd={(e) => updateProgress(student.id, parseInt((e.target as HTMLInputElement).value))}
                            className="w-full max-w-[200px] accent-brand-mauve cursor-pointer"
                          />
                          <span className="text-xs font-mono font-bold w-12">{currentProgress}%</span>
                          {savingId === student.id && <span className="text-[10px] uppercase text-brand-peach animate-pulse font-bold tracking-widest">Saving...</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end gap-3">
                        <button className="text-brand-taupe hover:text-brand-mauve transition-colors" title="Message">
                          <Mail size={16} />
                        </button>
                        <button className="text-brand-taupe hover:text-brand-navy dark:hover:text-white transition-colors" title="View Profile">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
