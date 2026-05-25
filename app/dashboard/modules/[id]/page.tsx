"use client";

import { PlayCircle, CheckCircle, ArrowLeft, Download, MessageSquare } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import { useAppContext } from "../../../providers";
import { createClient } from "../../../../utils/supabase/client";
import { Database } from "../../../../types/supabase";
import { CustomVideoPlayer } from "../../../../components/CustomVideoPlayer";

type Module = Database["public"]["Tables"]["modules"]["Row"];
// Temporary manual type until supabase gen is run
type Lesson = {
  id: string;
  module_id: string;
  title: string;
  description: string;
  video_url: string;
  duration: string;
  order_index: number;
};
type LessonCompletion = {
  lesson_id: string;
};

export default function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const moduleId = unwrappedParams.id;

  const { t, userProfile } = useAppContext();
  const supabase = createClient();

  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completions, setCompletions] = useState<string[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Fetch Module
      const { data: modData } = await supabase
        .from("modules")
        .select("*")
        .eq("id", moduleId)
        .single();
      
      if (modData) setModule(modData);

      // Fetch Lessons
      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*")
        .eq("module_id", moduleId)
        .order("order_index", { ascending: true });
        
      if (lessonsData && lessonsData.length > 0) {
        setLessons(lessonsData as Lesson[]);
        setActiveLesson(lessonsData[0] as Lesson);
      }

      // Fetch Completions
      if (userProfile) {
        const { data: compData } = await supabase
          .from("lesson_completions")
          .select("lesson_id")
          .eq("student_id", userProfile.id);
        
        if (compData) {
          setCompletions(compData.map(c => c.lesson_id));
        }
      }

      setLoading(false);
    }
    loadData();
  }, [moduleId, userProfile, supabase]);

  const handleMarkComplete = async () => {
    if (!activeLesson || !userProfile) return;
    const isCompleted = completions.includes(activeLesson.id);
    
    if (isCompleted) {
      // Optional: allow un-completing
      await supabase.from("lesson_completions").delete().eq("lesson_id", activeLesson.id).eq("student_id", userProfile.id);
      setCompletions(prev => prev.filter(id => id !== activeLesson.id));
    } else {
      await supabase.from("lesson_completions").insert({ lesson_id: activeLesson.id, student_id: userProfile.id });
      setCompletions(prev => [...prev, activeLesson.id]);
    }
  };

  const handleQuestionSubmit = async (timeString: string, question: string) => {
    if (!activeLesson || !userProfile || !module) return;

    // Get a teacher's ID to send the message to
    const { data: teacherData } = await supabase.from('profiles').select('id').eq('role', 'teacher').limit(1).single();
    if (teacherData) {
      const messageText = `**Question regarding:** ${activeLesson.title} at [${timeString}]\n\n${question}\n\n[Go to Lesson](/dashboard/modules/${module.id})`;
      await supabase.from('chat_messages').insert({
        sender_id: userProfile.id,
        receiver_id: teacherData.id,
        content: messageText
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-taupe/30 border-t-brand-mauve rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!module) {
    return <div className="text-center py-20 text-brand-taupe font-serif text-xl">Module not found.</div>;
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-brand-taupe hover:text-brand-mauve transition-colors uppercase tracking-widest text-[10px] font-bold mb-4">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
          {module.title}
        </h1>
        {activeLesson && (
          <p className="text-brand-mauve mt-2 tracking-widest text-[10px] uppercase font-bold">
            Lesson {activeLesson.order_index} • {activeLesson.title}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Video Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeLesson ? (
            <CustomVideoPlayer 
              url={activeLesson.video_url} 
              title={activeLesson.title} 
              onQuestionSubmit={handleQuestionSubmit}
            />
          ) : (
            <div className="bg-brand-navy-dark aspect-video rounded-sm flex items-center justify-center border border-brand-taupe/30 text-brand-taupe">
              No lessons available.
            </div>
          )}

          {activeLesson && (
            <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 p-8 transition-colors duration-300">
              <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white mb-4">Lesson Overview</h2>
              <p className="text-brand-navy/70 dark:text-brand-taupe leading-relaxed text-sm mb-6">
                {activeLesson.description}
              </p>
              
              <div className="flex gap-4 border-t border-brand-taupe/10 pt-6">
                <button className="flex-1 bg-brand-beige/50 dark:bg-brand-navy/50 hover:bg-brand-beige dark:hover:bg-brand-navy text-brand-navy dark:text-brand-beige py-3 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2 border border-brand-taupe/20">
                  <Download size={14} /> Download PDF Notes
                </button>
                <button 
                  onClick={handleMarkComplete}
                  className={`flex-1 py-3 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2 border ${
                    completions.includes(activeLesson.id) 
                      ? 'bg-brand-mauve text-white border-brand-mauve' 
                      : 'bg-brand-peach hover:bg-white text-brand-navy border-brand-peach'
                  }`}
                >
                  <CheckCircle size={14} /> {completions.includes(activeLesson.id) ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Playlist */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 overflow-hidden transition-colors duration-300">
            <div className="p-5 border-b border-brand-taupe/10 bg-brand-beige/20 dark:bg-brand-navy/30">
              <h3 className="font-serif font-bold text-brand-navy dark:text-brand-beige">Course Content</h3>
            </div>
            <div className="divide-y divide-brand-taupe/10 max-h-[600px] overflow-y-auto">
              {lessons.map((lesson) => {
                const isActive = activeLesson?.id === lesson.id;
                const isCompleted = completions.includes(lesson.id);
                return (
                  <div 
                    key={lesson.id} 
                    onClick={() => setActiveLesson(lesson)}
                    className={`p-4 transition-colors cursor-pointer flex gap-4 ${isActive ? 'bg-brand-beige/50 dark:bg-brand-navy-dark/50' : 'hover:bg-brand-beige/10 dark:hover:bg-brand-navy/20'}`}
                  >
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle size={16} className="text-brand-mauve" />
                      ) : isActive ? (
                        <PlayCircle size={16} className="text-brand-peach animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-brand-taupe/30"></div>
                      )}
                    </div>
                    <div>
                      <p className={`text-sm ${isActive ? 'font-bold text-brand-navy dark:text-white' : 'font-medium text-brand-navy/80 dark:text-brand-taupe'}`}>
                        {lesson.order_index}. {lesson.title}
                      </p>
                      <p className="text-[10px] text-brand-taupe font-mono mt-1">{lesson.duration}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-brand-navy dark:bg-brand-navy-dark p-6 rounded-sm border border-brand-taupe/20 text-center transition-colors duration-300">
             <MessageSquare size={24} className="mx-auto text-brand-peach mb-3" />
             <h3 className="font-serif font-bold text-white mb-2">Have questions?</h3>
             <p className="text-brand-beige/70 text-xs mb-4">Click "I'm Confused" below the video to automatically send a timestamped question to your teacher!</p>
             <Link href="/dashboard/chat" className="w-full bg-brand-mauve hover:bg-brand-dark text-white py-2 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors inline-block text-center mt-2">
                Open Chat
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

