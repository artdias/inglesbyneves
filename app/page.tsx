"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, BookOpen, ArrowRight, Sun, Moon, Globe } from "lucide-react";
import { useAppContext } from "./providers";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();

  return (
    <div className="min-h-screen bg-brand-beige/30 dark:bg-brand-navy-dark text-brand-navy dark:text-brand-beige font-sans selection:bg-brand-peach/50 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-brand-navy-dark/90 backdrop-blur-md border-b border-brand-taupe/20 dark:border-brand-taupe/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0">
                <img src="/logo.svg" alt="Logo" className="w-full h-full dark:hidden" />
                <img src="/logo-dark.svg" alt="Logo" className="w-full h-full hidden dark:block" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-widest text-brand-navy dark:text-brand-beige uppercase">
                  Ester Neves
                </span>
                <span className="text-[10px] tracking-[0.3em] text-brand-mauve dark:text-brand-taupe uppercase mt-0.5">
                  Teacher
                </span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#methodology" className="text-sm tracking-wide text-brand-navy/70 dark:text-brand-beige/70 hover:text-brand-mauve dark:hover:text-brand-peach transition-colors">{t("methodology")}</a>
              <a href="#courses" className="text-sm tracking-wide text-brand-navy/70 dark:text-brand-beige/70 hover:text-brand-mauve dark:hover:text-brand-peach transition-colors">{t("courses")}</a>
              <a href="#pricing" className="text-sm tracking-wide text-brand-navy/70 dark:text-brand-beige/70 hover:text-brand-mauve dark:hover:text-brand-peach transition-colors">{t("pricing")}</a>

              {/* Toggles */}
              <div className="flex items-center gap-3 ml-4">
                 <button onClick={toggleLanguage} className="p-2 text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige rounded-full hover:bg-brand-beige dark:hover:bg-brand-navy transition-colors flex items-center gap-1 text-xs font-medium" title="Switch Language">
                   <Globe size={18}/> {language.toUpperCase()}
                 </button>
                 <button onClick={toggleTheme} className="p-2 text-brand-taupe hover:text-brand-navy dark:hover:text-brand-beige rounded-full hover:bg-brand-beige dark:hover:bg-brand-navy transition-colors" title="Toggle Dark Mode">
                   {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
                 </button>
              </div>

              <div className="w-px h-8 bg-brand-taupe/30"></div>
              
              <Link href="/dashboard" className="text-sm tracking-wide font-medium text-brand-mauve dark:text-brand-peach hover:text-brand-dark dark:hover:text-white transition-colors">
                {t("portal")}
              </Link>
              <Link href="/dashboard" className="bg-brand-navy dark:bg-brand-beige text-white dark:text-brand-navy px-6 py-2.5 rounded-sm text-sm tracking-wide font-medium transition-all hover:bg-brand-navy/90 dark:hover:bg-white">
                {t("start")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-brand-beige/40 to-transparent dark:from-brand-navy/20 dark:to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-sm bg-brand-beige border border-brand-taupe/30 dark:bg-brand-navy dark:border-brand-taupe/20 text-brand-dark dark:text-brand-peach text-xs tracking-widest uppercase mb-8">
              Premium English Instruction
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-brand-navy dark:text-white mb-8 leading-[1.1]">
              {t("heroTitle")} <br/>
              <span className="italic text-brand-mauve dark:text-brand-peach">{t("heroSubtitle")}</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-navy/70 dark:text-brand-beige/80 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              {t("heroDesc")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="#pricing" className="bg-brand-mauve hover:bg-brand-dark text-white px-8 py-4 rounded-sm text-sm tracking-wider uppercase font-medium transition-all flex items-center justify-center gap-3">
                {t("start")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/material" className="bg-transparent hover:bg-brand-beige/50 dark:hover:bg-brand-navy text-brand-navy dark:text-brand-beige px-8 py-4 rounded-sm text-sm tracking-wider uppercase font-medium border border-brand-taupe dark:border-brand-taupe/40 transition-all flex items-center justify-center gap-3">
                <BookOpen className="w-4 h-4 text-brand-mauve dark:text-brand-peach" /> {t("freeMaterial")}
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-24 pt-12 border-t border-brand-taupe/20 flex flex-wrap justify-center gap-12 md:gap-24">
              <div className="text-center">
                <p className="text-4xl font-serif text-brand-navy dark:text-white">10k+</p>
                <p className="text-xs tracking-widest uppercase text-brand-taupe mt-3">Lessons Given</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-brand-navy dark:text-white">4.9/5</p>
                <p className="text-xs tracking-widest uppercase text-brand-taupe mt-3">Student Rating</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-brand-navy dark:text-white">100%</p>
                <p className="text-xs tracking-widest uppercase text-brand-taupe mt-3">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Presentation Section */}
      <section id="methodology" className="py-32 bg-white dark:bg-[#0a0f1c] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            <div className="mb-16 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-navy dark:text-white mb-8 leading-tight">Elevated methodology for modern professionals.</h2>
              <p className="text-lg text-brand-navy/70 dark:text-brand-beige/70 mb-10 leading-relaxed font-light">
                We focus on active speaking, real-world context, and continuous feedback. You won't just learn grammar; you will learn how to communicate your ideas effectively with confidence and elegance.
              </p>
              <ul className="space-y-6">
                {[
                  "Live 1-on-1 speaking practice",
                  "Access to exclusive interactive platform",
                  "Personalized feedback on pronunciation",
                  "Real-world business vocabulary"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-brand-mauve dark:text-brand-peach" />
                    </div>
                    <span className="text-brand-navy/80 dark:text-brand-beige/90 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-sm overflow-hidden border border-brand-taupe/30 aspect-[4/3] bg-brand-navy-dark flex items-center justify-center shadow-2xl">
               <iframe
                title="Methodology Video"
                className="absolute inset-0 w-full h-full opacity-90"
                src="https://www.youtube.com/embed/L_LUpnjgPso"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-brand-beige/20 dark:bg-brand-navy-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-navy dark:text-white mb-6">Simple, transparent pricing.</h2>
          <p className="text-lg text-brand-navy/60 dark:text-brand-beige/60 mb-20 max-w-2xl mx-auto font-light">Choose the plan that fits your ambition. No hidden fees or long-term lock-ins.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-white dark:bg-[#0a0f1c] p-12 border border-brand-taupe/30 text-left flex flex-col transition-all hover:border-brand-taupe">
              <h3 className="text-2xl font-serif text-brand-navy dark:text-white mb-2">Self-Paced</h3>
              <p className="text-brand-taupe mb-8 text-sm tracking-wide">For independent learners.</p>
              <div className="mb-10">
                <span className="text-5xl font-serif text-brand-navy dark:text-white">R$ 97</span>
                <span className="text-brand-taupe text-sm uppercase tracking-widest ml-2">/mo</span>
              </div>
              <ul className="space-y-5 mb-12 flex-1">
                <li className="flex items-center gap-4"><Check className="w-5 h-5 text-brand-mauve" /> <span className="text-brand-navy/80 dark:text-brand-beige/80">All Video Modules</span></li>
                <li className="flex items-center gap-4"><Check className="w-5 h-5 text-brand-mauve" /> <span className="text-brand-navy/80 dark:text-brand-beige/80">Exercises & Quizzes</span></li>
                <li className="flex items-center gap-4"><Check className="w-5 h-5 text-brand-mauve" /> <span className="text-brand-navy/80 dark:text-brand-beige/80">Community Access</span></li>
              </ul>
              <Link href="/dashboard" className="w-full block text-center bg-transparent border border-brand-navy dark:border-brand-beige text-brand-navy dark:text-brand-beige hover:bg-brand-navy hover:text-white dark:hover:bg-brand-beige dark:hover:text-brand-navy py-4 text-sm tracking-widest uppercase font-medium transition-colors">
                Start Self-Paced
              </Link>
            </div>
            
            {/* Plan 2 */}
            <div className="bg-brand-navy dark:bg-brand-beige p-12 text-left flex flex-col relative transform md:-translate-y-6 shadow-xl">
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-brand-mauve text-white px-4 py-1.5 text-xs tracking-widest uppercase font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-serif text-white dark:text-brand-navy mb-2">Premium Mentorship</h3>
              <p className="text-white/60 dark:text-brand-navy/60 mb-8 text-sm tracking-wide">For fast-track fluency.</p>
              <div className="mb-10">
                <span className="text-5xl font-serif text-white dark:text-brand-navy">R$ 297</span>
                <span className="text-white/60 dark:text-brand-navy/60 text-sm uppercase tracking-widest ml-2">/mo</span>
              </div>
              <ul className="space-y-5 mb-12 flex-1">
                <li className="flex items-center gap-4"><Check className="w-5 h-5 text-brand-peach dark:text-brand-mauve" /> <span className="text-white/90 dark:text-brand-navy/90">Everything in Self-Paced</span></li>
                <li className="flex items-center gap-4"><Check className="w-5 h-5 text-brand-peach dark:text-brand-mauve" /> <span className="text-white dark:text-brand-navy font-semibold">4 Live 1-on-1 Sessions/mo</span></li>
                <li className="flex items-center gap-4"><Check className="w-5 h-5 text-brand-peach dark:text-brand-mauve" /> <span className="text-white/90 dark:text-brand-navy/90">WhatsApp Support</span></li>
                <li className="flex items-center gap-4"><Check className="w-5 h-5 text-brand-peach dark:text-brand-mauve" /> <span className="text-white/90 dark:text-brand-navy/90">Correction of written essays</span></li>
              </ul>
              <Link href="/dashboard" className="w-full block text-center bg-brand-peach hover:bg-white text-brand-navy py-4 text-sm tracking-widest uppercase font-medium transition-colors">
                {t("joinMentorship")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0a0f1c] border-t border-brand-taupe/20 pt-20 pb-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 flex-shrink-0">
                  <img src="/logo.svg" alt="Logo" className="w-full h-full dark:hidden" />
                  <img src="/logo-dark.svg" alt="Logo" className="w-full h-full hidden dark:block" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl tracking-widest text-brand-navy dark:text-brand-beige uppercase mb-1">
                    Ester Neves
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-brand-mauve uppercase">
                    Teacher
                  </span>
                </div>
              </div>
            </div>
            
             <div className="flex gap-8">
              <a href="#" className="text-sm tracking-wide text-brand-navy/60 dark:text-brand-beige/60 hover:text-brand-mauve transition-colors uppercase">Instagram</a>
              <a href="#" className="text-sm tracking-wide text-brand-navy/60 dark:text-brand-beige/60 hover:text-brand-mauve transition-colors uppercase">TikTok</a>
              <a href="#" className="text-sm tracking-wide text-brand-navy/60 dark:text-brand-beige/60 hover:text-brand-mauve transition-colors uppercase">Contato</a>
            </div>
          </div>
          <div className="border-t border-brand-taupe/20 mt-12 pt-8 text-center">
            <p className="text-brand-taupe text-xs tracking-wider uppercase">© 2026 Ester Neves. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}