"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { BookOpen, CheckCircle, Clock, FileText } from "lucide-react";
import Link from "next/link";

type Assignment = {
  id: string;
  title: string;
  instructions: string;
  due_date: string;
  module_id: string;
};

type Submission = {
  id: string;
  assignment_id: string;
  status: "pending" | "graded";
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, Submission>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadAssignments() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data: assignmentsData, error: aError } = await supabase
        .from("assignments")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: submissionsData, error: sError } = await supabase
        .from("submissions")
        .select("*")
        .eq("student_id", userData.user.id);

      if (assignmentsData) setAssignments(assignmentsData);
      
      if (submissionsData) {
        const subMap: Record<string, Submission> = {};
        submissionsData.forEach(sub => {
          subMap[sub.assignment_id] = sub;
        });
        setSubmissions(subMap);
      }
      setLoading(false);
    }
    
    loadAssignments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 shadow-sm border border-brand-taupe/20">
        <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-brand-beige mb-2">My Assignments</h2>
        <p className="text-sm text-brand-taupe mb-8 tracking-wide">Complete your exercises to practice what you've learned.</p>

        {loading ? (
          <div className="flex justify-center p-12">
             <div className="w-8 h-8 border-2 border-brand-taupe/30 border-t-brand-mauve rounded-full animate-spin"></div>
          </div>
        ) : assignments.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-brand-taupe/30 rounded-sm">
            <BookOpen size={32} className="mx-auto text-brand-taupe mb-4 opacity-50" />
            <p className="text-brand-navy dark:text-brand-beige font-medium">No assignments yet</p>
            <p className="text-sm text-brand-taupe mt-1">Check back later for new exercises.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map(assignment => {
               const sub = submissions[assignment.id];
               const isGraded = sub?.status === "graded";
               const isPending = sub?.status === "pending";

               return (
                 <div key={assignment.id} className="p-5 border border-brand-taupe/20 rounded-sm bg-brand-beige/5 dark:bg-brand-navy-dark/30 hover:border-brand-mauve/50 transition-colors group flex flex-col h-full">
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-2 bg-brand-beige dark:bg-brand-navy rounded-sm text-brand-mauve dark:text-brand-peach border border-brand-taupe/20">
                       <FileText size={18} />
                     </div>
                     {isGraded ? (
                       <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-sm">
                         <CheckCircle size={12} /> Graded
                       </span>
                     ) : isPending ? (
                       <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-sm">
                         <Clock size={12} /> Pending Review
                       </span>
                     ) : (
                       <span className="text-[10px] uppercase font-bold tracking-widest text-brand-taupe bg-brand-beige dark:bg-brand-navy px-2 py-1 rounded-sm">
                         To Do
                       </span>
                     )}
                   </div>
                   
                   <h3 className="font-semibold text-brand-navy dark:text-brand-beige mb-2 group-hover:text-brand-mauve transition-colors">{assignment.title}</h3>
                   <p className="text-xs text-brand-taupe line-clamp-2 mb-4 flex-grow">{assignment.instructions}</p>
                   
                   <div className="mt-auto pt-4 border-t border-brand-taupe/10 flex justify-between items-center">
                     <span className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold flex items-center gap-1">
                       <Clock size={12} /> {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : 'No due date'}
                     </span>
                     {!sub && (
                       <button className="text-xs font-bold uppercase tracking-widest text-brand-mauve hover:text-brand-dark transition-colors">
                         Start
                       </button>
                     )}
                   </div>
                 </div>
               );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
