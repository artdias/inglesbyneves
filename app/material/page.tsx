"use client";

import Link from "next/link";
import { ArrowLeft, Download, PlayCircle, Headphones, Mail, ArrowRight } from "lucide-react";
import { useAppContext } from "../providers";

export default function MaterialPage() {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen bg-brand-beige/30 dark:bg-brand-navy-dark text-brand-navy dark:text-brand-beige font-sans selection:bg-brand-peach/50 transition-colors duration-300">
      
      {/* Simple Nav */}
      <nav className="absolute top-0 w-full z-50 p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-brand-navy dark:text-brand-beige hover:text-brand-mauve dark:hover:text-brand-peach transition-colors uppercase tracking-widest text-[10px] font-bold">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-brand-taupe/20">
        <span className="inline-block py-1.5 px-4 rounded-sm bg-brand-beige/50 border border-brand-taupe/30 dark:bg-brand-navy/50 dark:border-brand-taupe/20 text-brand-mauve text-xs tracking-widest uppercase mb-6 font-bold">
          Complimentary Resources
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-navy dark:text-white mb-6">
          Elevate Your <span className="italic text-brand-mauve">Fluency</span>
        </h1>
        <p className="text-brand-navy/70 dark:text-brand-taupe max-w-2xl mx-auto text-lg leading-relaxed font-light mb-12">
          Explore our curated collection of free materials designed for ambitious professionals. Download guides, listen to podcasts, and sample our video lessons.
        </p>

        {/* Lead Capture */}
        <div className="max-w-xl mx-auto bg-white dark:bg-[#0a0f1c] p-2 rounded-sm border border-brand-taupe/30 shadow-sm flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={16} className="text-brand-taupe" />
            </div>
            <input 
              type="email" 
              placeholder="Enter your email for exclusive weekly tips"
              className="w-full pl-11 pr-4 py-3 sm:py-4 bg-transparent border-none text-brand-navy dark:text-brand-beige focus:outline-none focus:ring-0 text-sm placeholder-brand-taupe"
            />
          </div>
          <button className="bg-brand-mauve hover:bg-brand-dark text-white px-6 py-3 sm:py-4 rounded-sm text-xs tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2 flex-shrink-0">
            Subscribe <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* PDF Guides */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8 border-b border-brand-taupe/20 pb-4">
               <div className="w-10 h-10 rounded-sm bg-brand-peach/30 text-brand-dark flex items-center justify-center">
                 <Download size={18} strokeWidth={2}/>
               </div>
               <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">PDF Guides</h2>
            </div>
            
            {[
              { title: "Business Phrasal Verbs Cheat Sheet", desc: "50 essential verbs for corporate environments." },
              { title: "Email Etiquette Template", desc: "Write professional emails with confidence." },
              { title: "Presentation Starters", desc: "How to open and close meetings effectively." }
            ].map((item, i) => (
              <div key={i} className="group bg-white dark:bg-[#0a0f1c] p-6 border border-brand-taupe/20 rounded-sm hover:border-brand-mauve transition-all cursor-pointer">
                <h3 className="font-bold text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve transition-colors">{item.title}</h3>
                <p className="text-sm text-brand-taupe mt-2 mb-4">{item.desc}</p>
                <button className="text-[10px] uppercase tracking-widest font-bold text-brand-mauve flex items-center gap-1 group-hover:gap-2 transition-all">
                  Download PDF <ArrowRight size={12}/>
                </button>
              </div>
            ))}
          </div>

          {/* Podcasts */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8 border-b border-brand-taupe/20 pb-4">
               <div className="w-10 h-10 rounded-sm bg-brand-beige dark:bg-brand-navy border border-brand-taupe/30 text-brand-mauve flex items-center justify-center">
                 <Headphones size={18} strokeWidth={2}/>
               </div>
               <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">Podcasts</h2>
            </div>

            {[
              { title: "Ep. 01: The Confidence Myth", duration: "15 min" },
              { title: "Ep. 02: Thinking in English", duration: "22 min" },
              { title: "Ep. 03: Small Talk Mastery", duration: "18 min" }
            ].map((item, i) => (
              <div key={i} className="group bg-white dark:bg-[#0a0f1c] p-6 border border-brand-taupe/20 rounded-sm hover:border-brand-mauve transition-all cursor-pointer">
                <h3 className="font-bold text-brand-navy dark:text-brand-beige group-hover:text-brand-mauve transition-colors">{item.title}</h3>
                <p className="text-xs text-brand-taupe mt-2 mb-4 font-mono">{item.duration} audio</p>
                <button className="text-[10px] uppercase tracking-widest font-bold text-brand-mauve flex items-center gap-1 group-hover:gap-2 transition-all">
                  Listen Now <PlayCircle size={12}/>
                </button>
              </div>
            ))}
          </div>

          {/* Video Lessons */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8 border-b border-brand-taupe/20 pb-4">
               <div className="w-10 h-10 rounded-sm bg-brand-navy dark:bg-brand-navy-dark border border-brand-taupe/30 text-brand-beige flex items-center justify-center">
                 <PlayCircle size={18} strokeWidth={2}/>
               </div>
               <h2 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">Mini-Lessons</h2>
            </div>

            {[
              { title: "Pronunciation: Th sound", desc: "Master the most difficult sound in English." },
              { title: "Common Mistakes", desc: "Stop translating directly from Portuguese." }
            ].map((item, i) => (
              <div key={i} className="group bg-brand-navy dark:bg-brand-navy-dark border border-brand-taupe/20 p-6 rounded-sm hover:border-brand-mauve transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                  <PlayCircle size={80}/>
                </div>
                <h3 className="font-bold text-white relative z-10">{item.title}</h3>
                <p className="text-sm text-brand-beige/70 mt-2 mb-4 relative z-10">{item.desc}</p>
                <button className="text-[10px] uppercase tracking-widest font-bold text-brand-peach flex items-center gap-1 group-hover:gap-2 transition-all relative z-10">
                  Watch Video <ArrowRight size={12}/>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}