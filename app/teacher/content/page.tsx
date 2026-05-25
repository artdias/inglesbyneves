"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { FileText, Plus, Search, Check, PlayCircle, BookOpen } from "lucide-react";
import { Database } from "../../../types/supabase";

type Assignment = Database["public"]["Tables"]["assignments"]["Row"];
type Module = Database["public"]["Tables"]["modules"]["Row"];
type Lesson = any; // Will use proper typing when generated

export default function ContentManager() {
  const [activeTab, setActiveTab] = useState<"courses" | "assignments">("courses");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  
  // UI States
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [creatingLessonFor, setCreatingLessonFor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Assignment Form
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Module Form
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleTag, setModuleTag] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");

  // Lesson Form
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDesc, setLessonDesc] = useState("");
  const [lessonUrl, setLessonUrl] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchAssignments();
    fetchModulesAndLessons();
  }, []);

  async function fetchAssignments() {
    const { data } = await supabase.from("assignments").select("*").order("created_at", { ascending: false });
    if (data) setAssignments(data);
  }

  async function fetchModulesAndLessons() {
    const { data: mods } = await supabase.from("modules").select("*").order("created_at", { ascending: true });
    if (mods) {
      setModules(mods);
      const { data: less } = await supabase.from("lessons").select("*").order("order_index", { ascending: true });
      if (less) {
        const grouped: Record<string, Lesson[]> = {};
        mods.forEach(m => grouped[m.id] = []);
        less.forEach(l => {
          if (grouped[l.module_id]) {
            grouped[l.module_id].push(l);
          }
        });
        setLessons(grouped);
      }
    }
  }

  async function handleCreateAssignment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await supabase.from("assignments").insert({
        title, instructions, due_date: dueDate ? new Date(dueDate).toISOString() : null, teacher_id: userData.user.id,
      });
    }
    setLoading(false); setIsCreatingAssignment(false); setTitle(""); setInstructions(""); setDueDate(""); fetchAssignments();
  }

  async function handleCreateModule(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("modules").insert({
      title: moduleTitle, tag: moduleTag, description: moduleDesc, is_active: true
    });
    setLoading(false); setIsCreatingModule(false); setModuleTitle(""); setModuleTag(""); setModuleDesc(""); fetchModulesAndLessons();
  }

  async function handleCreateLesson(e: React.FormEvent) {
    e.preventDefault();
    if (!creatingLessonFor) return;
    setLoading(true);
    const orderIndex = lessons[creatingLessonFor]?.length ? lessons[creatingLessonFor].length + 1 : 1;
    await supabase.from("lessons").insert({
      module_id: creatingLessonFor,
      title: lessonTitle,
      description: lessonDesc,
      video_url: lessonUrl,
      duration: lessonDuration,
      order_index: orderIndex
    });
    setLoading(false); setCreatingLessonFor(null); setLessonTitle(""); setLessonDesc(""); setLessonUrl(""); setLessonDuration(""); fetchModulesAndLessons();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Content Manager</h1>
          <p className="text-brand-taupe mt-1 text-sm tracking-wide">Manage courses, videos, and assignments.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-taupe/20 mb-6">
        <button 
          onClick={() => setActiveTab("courses")}
          className={`pb-3 px-6 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'courses' ? 'border-brand-mauve text-brand-mauve' : 'border-transparent text-brand-taupe hover:text-brand-navy dark:hover:text-white'}`}
        >
          Courses & Lessons
        </button>
        <button 
          onClick={() => setActiveTab("assignments")}
          className={`pb-3 px-6 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'assignments' ? 'border-brand-mauve text-brand-mauve' : 'border-transparent text-brand-taupe hover:text-brand-navy dark:hover:text-white'}`}
        >
          Assignments
        </button>
      </div>

      {activeTab === "courses" && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-xl text-brand-navy dark:text-white">Modules</h2>
            <button onClick={() => setIsCreatingModule(true)} className="bg-brand-mauve hover:bg-brand-dark text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
              <Plus size={16} /> New Module
            </button>
          </div>

          {isCreatingModule && (
            <div className="bg-white dark:bg-[#0a0f1c] border border-brand-taupe/20 p-6 rounded-sm shadow-sm">
              <h2 className="font-serif font-bold text-lg mb-4 text-brand-navy dark:text-white">Create New Module</h2>
              <form onSubmit={handleCreateModule} className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Title</label>
                    <input type="text" value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} required className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve" placeholder="e.g. Module 1: Travel" />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Tag</label>
                    <input type="text" value={moduleTag} onChange={(e) => setModuleTag(e.target.value)} required className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve" placeholder="e.g. Travel" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Description</label>
                  <textarea value={moduleDesc} onChange={(e) => setModuleDesc(e.target.value)} rows={2} className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve" placeholder="Module description..."></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsCreatingModule(false)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-taupe hover:text-brand-navy dark:hover:text-white">Cancel</button>
                  <button type="submit" disabled={loading} className="bg-brand-mauve hover:bg-brand-dark text-white px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2">{loading ? "Saving..." : <><Check size={16} /> Save Module</>}</button>
                </div>
              </form>
            </div>
          )}

          {modules.map(mod => (
            <div key={mod.id} className="bg-white dark:bg-[#0a0f1c] border border-brand-taupe/20 rounded-sm shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-brand-taupe/10 bg-brand-beige/10 dark:bg-brand-navy/20 flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-brand-mauve text-white px-2 py-1 rounded-sm uppercase tracking-widest font-bold mr-3">{mod.tag}</span>
                  <span className="font-serif font-bold text-lg text-brand-navy dark:text-white">{mod.title}</span>
                </div>
                <button onClick={() => setCreatingLessonFor(mod.id)} className="text-brand-mauve hover:text-brand-dark dark:hover:text-brand-peach text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                  <Plus size={14} /> Add Lesson
                </button>
              </div>

              {creatingLessonFor === mod.id && (
                <div className="p-6 bg-brand-beige/5 dark:bg-brand-navy-dark/30 border-b border-brand-taupe/10">
                  <form onSubmit={handleCreateLesson} className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Lesson Title</label>
                        <input type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} required className="w-full px-4 py-2 bg-white dark:bg-[#0a0f1c] border border-brand-taupe/30 rounded-sm text-sm" placeholder="e.g. Navigating Airports" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Video URL (YouTube/MP4)</label>
                        <input type="url" value={lessonUrl} onChange={(e) => setLessonUrl(e.target.value)} required className="w-full px-4 py-2 bg-white dark:bg-[#0a0f1c] border border-brand-taupe/30 rounded-sm text-sm" placeholder="https://youtube.com/..." />
                      </div>
                      <div className="w-32">
                        <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Duration</label>
                        <input type="text" value={lessonDuration} onChange={(e) => setLessonDuration(e.target.value)} required className="w-full px-4 py-2 bg-white dark:bg-[#0a0f1c] border border-brand-taupe/30 rounded-sm text-sm" placeholder="14:20" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Description</label>
                      <textarea value={lessonDesc} onChange={(e) => setLessonDesc(e.target.value)} rows={2} className="w-full px-4 py-2 bg-white dark:bg-[#0a0f1c] border border-brand-taupe/30 rounded-sm text-sm" placeholder="What will they learn?"></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={() => setCreatingLessonFor(null)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-taupe">Cancel</button>
                      <button type="submit" disabled={loading} className="bg-brand-peach text-brand-navy hover:bg-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2">{loading ? "Saving..." : <><Check size={14} /> Save</>}</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="divide-y divide-brand-taupe/10">
                {!lessons[mod.id] || lessons[mod.id].length === 0 ? (
                   <p className="p-6 text-sm text-brand-taupe text-center">No lessons added to this module yet.</p>
                ) : (
                  lessons[mod.id].map(l => (
                    <div key={l.id} className="p-4 flex items-center justify-between hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <PlayCircle size={20} className="text-brand-taupe" />
                        <div>
                          <p className="font-semibold text-brand-navy dark:text-white text-sm">{l.order_index}. {l.title}</p>
                          <p className="text-xs text-brand-taupe line-clamp-1">{l.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono text-brand-taupe bg-brand-beige/20 dark:bg-brand-navy px-2 py-1 rounded-sm">{l.duration}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "assignments" && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="font-serif font-bold text-xl text-brand-navy dark:text-white">Assignments</h2>
            <button onClick={() => setIsCreatingAssignment(true)} className="bg-brand-mauve hover:bg-brand-dark text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
              <Plus size={16} /> New Assignment
            </button>
          </div>

          {isCreatingAssignment && (
            <div className="bg-white dark:bg-[#0a0f1c] border border-brand-taupe/20 p-6 rounded-sm shadow-sm">
              <h2 className="font-serif font-bold text-lg mb-4 text-brand-navy dark:text-white">Create New Assignment</h2>
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors" placeholder="e.g. Present Perfect Practice" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Instructions</label>
                  <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required rows={4} className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors" placeholder="Write the instructions here..."></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Due Date (Optional)</label>
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsCreatingAssignment(false)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-taupe hover:text-brand-navy dark:hover:text-white transition-colors">Cancel</button>
                  <button type="submit" disabled={loading} className="bg-brand-mauve hover:bg-brand-dark text-white px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50">{loading ? "Saving..." : <><Check size={16} /> Save Assignment</>}</button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white dark:bg-[#0a0f1c] border border-brand-taupe/20 rounded-sm shadow-sm overflow-hidden">
            <div className="p-4 border-b border-brand-taupe/10 flex justify-between items-center bg-brand-beige/10 dark:bg-brand-navy/20">
              <div className="relative w-full max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-taupe" />
                <input type="text" placeholder="Search assignments..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0a0f1c] border border-brand-taupe/30 rounded-sm focus:outline-none focus:border-brand-mauve transition-colors text-sm" />
              </div>
            </div>
            
            {assignments.length === 0 ? (
              <div className="p-12 text-center text-brand-taupe">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p>No assignments found.</p>
              </div>
            ) : (
              <div className="divide-y divide-brand-taupe/10">
                {assignments.map(a => (
                  <div key={a.id} className="p-5 flex justify-between items-center hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20 transition-colors">
                    <div>
                      <h3 className="font-semibold text-brand-navy dark:text-white">{a.title}</h3>
                      <p className="text-xs text-brand-taupe line-clamp-1 max-w-lg mt-1">{a.instructions}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-brand-taupe mb-1">Due</p>
                      <p className="text-sm">{a.due_date ? new Date(a.due_date).toLocaleDateString() : 'None'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
