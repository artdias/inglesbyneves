"use client";

import { Award, Download, Share2 } from "lucide-react";
import { useAppContext } from "../../providers";

export default function CertificatesPage() {
  const { t } = useAppContext();

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
          My Certificates
        </h1>
        <p className="text-brand-taupe mt-2 tracking-wide text-sm">Download and share your achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {[
          { title: "Business English Foundations", date: "August 15, 2026", level: "Intermediate" },
          { title: "Advanced Corporate Communication", date: "October 2, 2026", level: "Advanced" }
        ].map((cert, i) => (
          <div key={i} className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 overflow-hidden group cursor-pointer hover:border-brand-mauve transition-all">
            
            {/* Certificate Preview (Visual) */}
            <div className="aspect-[4/3] bg-brand-beige/20 dark:bg-brand-navy/30 border-b border-brand-taupe/10 relative p-6 flex flex-col items-center justify-center text-center overflow-hidden">
               {/* Decorative elements */}
               <div className="absolute top-0 left-0 w-full h-2 bg-brand-navy dark:bg-brand-beige"></div>
               <div className="absolute top-0 right-0 w-16 h-16 bg-brand-mauve opacity-10 rounded-bl-full"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-peach opacity-10 rounded-tr-full"></div>
               
               <Award size={48} className="text-brand-mauve mb-4" strokeWidth={1} />
               <h3 className="font-serif text-2xl font-bold text-brand-navy dark:text-white mb-2 leading-tight px-4">{cert.title}</h3>
               <p className="text-[10px] text-brand-taupe uppercase tracking-widest font-bold">Successfully Completed</p>
               
               <div className="mt-8 flex items-center justify-between w-full px-8 text-[10px] font-mono text-brand-navy/60 dark:text-brand-taupe">
                 <span>Ester Neves | Teacher</span>
                 <span>{cert.date}</span>
               </div>
            </div>

            {/* Info and Actions */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold text-brand-navy dark:text-white group-hover:text-brand-mauve transition-colors">{cert.title}</h4>
                  <p className="text-xs text-brand-taupe mt-1">Issued: {cert.date}</p>
                </div>
                <span className="px-2 py-1 bg-brand-taupe/20 rounded-sm text-[10px] uppercase tracking-widest font-bold text-brand-taupe">{cert.level}</span>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-brand-navy dark:bg-brand-beige hover:bg-brand-mauve dark:hover:bg-brand-navy-dark text-white dark:text-brand-navy dark:hover:text-white py-2.5 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2">
                  <Download size={14} /> Download PDF
                </button>
                <button className="bg-transparent border border-brand-taupe hover:border-brand-mauve text-brand-navy dark:text-brand-beige hover:text-brand-mauve p-2.5 rounded-sm transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}

        {/* Empty State / Locked Certificate */}
        <div className="bg-brand-beige/10 dark:bg-brand-navy/10 rounded-sm border border-brand-taupe/20 border-dashed p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-beige/50 dark:bg-brand-navy/50 flex items-center justify-center text-brand-taupe mb-4">
            <Award size={24} />
          </div>
          <h4 className="font-bold text-brand-navy dark:text-white mb-2">Keep Learning</h4>
          <p className="text-sm text-brand-taupe max-w-sm mb-6">Complete the "Travel & Business" module to unlock your next certificate.</p>
          <button className="bg-brand-beige dark:bg-brand-navy text-brand-navy dark:text-white px-6 py-2.5 rounded-sm text-[10px] tracking-widest uppercase font-bold transition-colors shadow-sm">
            Resume Course
          </button>
        </div>

      </div>
    </div>
  );
}
