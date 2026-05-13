"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
type Language = "en" | "pt";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    heroTitle: "Master English with",
    heroSubtitle: "Confidence",
    heroDesc: "Unlock your career potential with practical, engaging lessons tailored for real-world fluency. Learn from Profª Neves today.",
    methodology: "Methodology",
    courses: "Courses",
    pricing: "Pricing",
    portal: "Student Portal",
    start: "Start Learning",
    freeMaterial: "Free Material",
    joinMentorship: "Join Mentorship",
    announcements: "Announcements",
    wordOfDay: "Word of the Day",
    upcomingLive: "Upcoming Live",
    schedule: "Your Schedule",
    courseModules: "Course Modules",
    progress: "My Progress",
    resume: "Resume Lesson",
    zoom: "Join Zoom Room",
    profile: "My Profile",
    accountSettings: "Account Settings",
    personalInfo: "Personal Information",
    subscription: "Subscription",
    certificates: "Certificates",
    saveChanges: "Save Changes",
    logout: "Logout",
    planPremium: "Premium Plan",
    memberSince: "Member Since",
    totalHours: "Total Hours",
    vocabLearned: "Vocab Learned",
    activeStreak: "Active Streak",
    editProfile: "Edit Profile"
  },
  pt: {
    heroTitle: "Domine o Inglês com",
    heroSubtitle: "Confiança",
    heroDesc: "Desbloqueie o seu potencial de carreira com aulas práticas e envolventes feitas para fluência no mundo real. Aprenda com a Profª Neves hoje.",
    methodology: "Metodologia",
    courses: "Cursos",
    pricing: "Preços",
    portal: "Portal do Aluno",
    start: "Comece a Aprender",
    freeMaterial: "Material Grátis",
    joinMentorship: "Entrar na Mentoria",
    announcements: "Avisos",
    wordOfDay: "Palavra do Dia",
    upcomingLive: "Próximas Aulas",
    schedule: "Sua Agenda",
    courseModules: "Módulos do Curso",
    progress: "Meu Progresso",
    resume: "Continuar Aula",
    zoom: "Entrar no Zoom",
    profile: "Meu Perfil",
    accountSettings: "Configurações da Conta",
    personalInfo: "Informações Pessoais",
    subscription: "Assinatura",
    certificates: "Certificados",
    saveChanges: "Salvar Alterações",
    logout: "Sair",
    planPremium: "Plano Premium",
    memberSince: "Membro Desde",
    totalHours: "Horas Totais",
    vocabLearned: "Vocabulário",
    activeStreak: "Ofensiva",
    editProfile: "Editar Perfil"
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === "en" ? "pt" : "en";
      localStorage.setItem("language", next);
      return next;
    });
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
