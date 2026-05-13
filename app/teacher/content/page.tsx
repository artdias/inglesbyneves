"use client";

import { Upload, FileVideo, Plus, MoreVertical } from "lucide-react";

export default function TeacherContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-white tracking-tight">Content Manager</h1>
          <p className="text-brand-taupe mt-1 text-sm tracking-wide">Upload and organize your course materials.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-mauve hover:bg-brand-dark text-white px-4 py-2 rounded-sm text-xs tracking-widest uppercase font-bold transition-colors">
          <Plus size={14} /> New Module
        </button>
      </div>

      <div className="bg-white dark:bg-[#0a0f1c] p-10 rounded-sm border border-brand-taupe/20 border-dashed text-center">
        <div className="w-16 h-16 bg-brand-beige dark:bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-4 text-brand-mauve">
          <Upload size={24} />
        </div>
        <h3 className="font-serif font-bold text-brand-navy dark:text-white mb-2">Upload new content</h3>
        <p className="text-brand-taupe text-sm max-w-sm mx-auto mb-6">Drag and drop video files or PDFs here, or click to browse your computer.</p>
        <button className="bg-brand-navy dark:bg-brand-beige text-white dark:text-brand-navy px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-bold transition-colors">
          Select Files
        </button>
      </div>

      <div className="bg-white dark:bg-[#0a0f1c] rounded-sm border border-brand-taupe/20 shadow-sm mt-8">
         <div className="p-5 border-b border-brand-taupe/10 flex justify-between items-center">
            <h2 className="font-serif font-bold text-brand-navy dark:text-white">Existing Modules</h2>
            <div className="flex gap-2">
              <select className="bg-brand-beige/20 dark:bg-brand-navy/30 border border-brand-taupe/30 text-brand-navy dark:text-brand-beige text-xs px-3 py-1.5 rounded-sm outline-none">
                <option>All Modules</option>
                <option>Published</option>
                <option>Drafts</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-brand-taupe/10">
            {[
              { title: "Module 1: Foundations", lessons: 8, status: "Published" },
              { title: "Module 2: Business Emailing", lessons: 5, status: "Published" },
              { title: "Module 3: Travel & Business", lessons: 4, status: "Draft" },
            ].map((mod, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-brand-beige/5 dark:hover:bg-brand-navy/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-beige dark:bg-brand-navy-dark rounded-sm flex items-center justify-center text-brand-mauve">
                    <FileVideo size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy dark:text-white text-sm">{mod.title}</h3>
                    <p className="text-xs text-brand-taupe">{mod.lessons} Lessons</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm ${mod.status === 'Published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-brand-beige/50 text-brand-taupe dark:bg-brand-navy dark:text-brand-beige/50'}`}>
                    {mod.status}
                  </span>
                  <button className="text-brand-taupe hover:text-brand-navy dark:hover:text-white">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
