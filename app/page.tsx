"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, BookOpen, ArrowRight, Sun, Moon, Globe } from "lucide-react";
import { useAppContext } from "./providers";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-200 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-purple-100 dark:ring-purple-900">
                N
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                English<span className="text-purple-600 dark:text-purple-400">ByNeves</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#methodology" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">{t("methodology")}</a>
              <a href="#courses" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">{t("courses")}</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">{t("pricing")}</a>

              {/* Toggles */}
              <div className="flex items-center gap-2 ml-2">
                 <button onClick={toggleLanguage} className="p-2 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold" title="Switch Language">
                   <Globe size={18}/> {language.toUpperCase()}
                 </button>
                 <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Toggle Dark Mode">
                   {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
                 </button>
              </div>

              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
              
              <Link href="/dashboard" className="text-sm font-semibold text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                {t("portal")}
              </Link>
              <Link href="/dashboard" className="bg-slate-900 dark:bg-purple-600 hover:bg-slate-800 dark:hover:bg-purple-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md active:scale-95">
                {t("start")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-purple-50/50 dark:from-purple-900/10 to-transparent pointer-events-none"></div>
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 -mr-40 w-96 h-96 rounded-full bg-pink-300/30 dark:bg-pink-600/20 blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-purple-300/30 dark:bg-purple-600/20 blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-6 border border-purple-200 dark:border-purple-800">
              🚀 Join 1,000+ Fluent Students
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
              {t("heroTitle")} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">{t("heroSubtitle")}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              {t("heroDesc")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#pricing" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                {t("start")} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/material" className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-full text-lg font-semibold border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-purple-200 dark:hover:border-purple-500 flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500 dark:text-purple-400" /> {t("freeMaterial")}
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">10k+</p>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Lessons Given</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">4.9/5</p>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Student Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">100%</p>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Presentation Section */}
      <section id="methodology" className="py-24 bg-white dark:bg-[#08080c] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">See our methodology in action</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We focus on active speaking, real-world context, and continuous feedback. You won't just learn grammar; you will learn how to communicate your ideas effectively.
              </p>
              <ul className="space-y-4">
                {[
                  "Live 1-on-1 speaking practice",
                  "Access to exclusive interactive platform",
                  "Personalized feedback on pronunciation",
                  "Real-world business vocabulary"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-purple-100 dark:bg-purple-900/50 p-1 rounded-full text-purple-600 dark:text-purple-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10 aspect-video bg-slate-900 flex items-center justify-center">
               <iframe
                title="Methodology Video"
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/L_LUpnjgPso"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">Choose the plan that fits your ambition. No hidden fees or long-term lock-ins.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 text-left flex flex-col transition-all hover:shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Self-Paced</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">For independent learners.</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">R$ 97</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-500 dark:text-purple-400" /> <span className="text-slate-700 dark:text-slate-300">All Video Modules</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-500 dark:text-purple-400" /> <span className="text-slate-700 dark:text-slate-300">Exercises & Quizzes</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-500 dark:text-purple-400" /> <span className="text-slate-700 dark:text-slate-300">Community Access</span></li>
              </ul>
              <Link href="/dashboard" className="w-full block text-center bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-slate-600 py-3 rounded-xl font-semibold transition-colors">
                Start Self-Paced
              </Link>
            </div>
            
            {/* Plan 2 */}
            <div className="bg-slate-900 dark:bg-[#1a102e] rounded-3xl p-8 shadow-2xl text-left flex flex-col relative transform md:-translate-y-4 border border-purple-500/30">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Premium Mentorship</h3>
              <p className="text-slate-400 mb-6">For fast-track fluency.</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">R$ 297</span>
                <span className="text-slate-400 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-pink-400" /> <span className="text-slate-300">Everything in Self-Paced</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-pink-400" /> <span className="text-white font-medium">4 Live 1-on-1 Sessions/mo</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-pink-400" /> <span className="text-slate-300">WhatsApp Support</span></li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-pink-400" /> <span className="text-slate-300">Correction of written essays</span></li>
              </ul>
              <Link href="/dashboard" className="w-full block text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all shadow-lg active:scale-95">
                {t("joinMentorship")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#030305] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 dark:text-slate-500 text-sm">© 2026 EnglishByNeves. All rights reserved.</p>
             <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-pink-500">Instagram</a>
              <a href="#" className="text-slate-400 hover:text-purple-500">TikTok</a>
              <a href="#" className="text-slate-400 hover:text-slate-700 dark:hover:text-white">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}