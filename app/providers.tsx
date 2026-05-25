"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";

type Theme = "light" | "dark";
type Language = "en" | "pt";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  userProfile: any;
  refreshProfile: () => Promise<void>;
}

const translations = {
  en: {
    heroTitle: "Master English with",
    heroSubtitle: "Confidence",
    heroDesc: "Unlock your career potential with practical, engaging lessons tailored for real-world fluency. Learn from Profª Neves today.",
    methodology: "Methodology",
    courses: "Courses",
    contact: "Contact",
    portal: "Student Portal",
    start: "Start Learning",
    freeMaterial: "Free Material",
    methodologyTitle: "Elevated methodology for modern professionals.",
    methodologyDesc: "We focus on active speaking, real-world context, and continuous feedback. You won't just learn grammar; you will learn how to communicate your ideas effectively with confidence and elegance.",
    methodologyPoint1: "Live 1-on-1 speaking practice",
    methodologyPoint2: "Access to exclusive interactive platform",
    methodologyPoint3: "Personalized feedback on pronunciation",
    methodologyPoint4: "Real-world business vocabulary",
    pricingTitle: "Simple, transparent pricing.",
    pricingDesc: "Choose the plan that fits your ambition. No hidden fees or long-term lock-ins.",
    selfPacedTitle: "Self-Paced",
    selfPacedDesc: "For independent learners.",
    selfPacedFeature1: "All Video Modules",
    selfPacedFeature2: "Exercises & Quizzes",
    selfPacedFeature3: "Community Access",
    startSelfPaced: "Start Self-Paced",
    mentorshipTitle: "Premium Mentorship",
    mentorshipDesc: "For fast-track fluency.",
    mentorshipFeature1: "Everything in Self-Paced",
    mentorshipFeature2: "4 Live 1-on-1 Sessions/mo",
    mentorshipFeature3: "WhatsApp Support",
    mentorshipFeature4: "Correction of written essays",
    joinMentorship: "Join Mentorship",
    mostPopular: "Most Popular",
    contactTitle: "Get in Touch",
    contactDesc: "Ready to elevate your English? Send us a message and we'll get back to you shortly.",
    contactName: "Your Name",
    contactEmail: "Email Address",
    contactMessage: "Your Message",
    contactSend: "Send Message",
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
    heroSubtitle: "Elegância e Confiança",
    heroDesc: "Alcance todo o seu potencial profissional através de aulas práticas e dinâmicas, focadas na fluência para o mundo real. Transforme sua comunicação com a Profª Neves.",
    methodology: "Metodologia",
    courses: "Cursos",
    contact: "Contato",
    portal: "Portal do Aluno",
    start: "Começar Agora",
    freeMaterial: "Material Gratuito",
    methodologyTitle: "Metodologia de excelência para profissionais modernos.",
    methodologyDesc: "Nosso foco é na fala ativa, contextos do mundo real e feedback contínuo. Você não aprenderá apenas gramática; aprenderá como comunicar suas ideias com eficácia e confiança.",
    methodologyPoint1: "Prática de fala ao vivo (1 a 1)",
    methodologyPoint2: "Acesso a plataforma interativa exclusiva",
    methodologyPoint3: "Feedback personalizado de pronúncia",
    methodologyPoint4: "Vocabulário corporativo do mundo real",
    pricingTitle: "Preços simples e transparentes.",
    pricingDesc: "Escolha o plano que melhor se adapta à sua ambição. Sem taxas ocultas.",
    selfPacedTitle: "Independente",
    selfPacedDesc: "Para alunos autônomos.",
    selfPacedFeature1: "Todos os Módulos em Vídeo",
    selfPacedFeature2: "Exercícios e Quizzes",
    selfPacedFeature3: "Acesso à Comunidade",
    startSelfPaced: "Começar Agora",
    mentorshipTitle: "Mentoria Premium",
    mentorshipDesc: "Para fluência acelerada.",
    mentorshipFeature1: "Tudo do plano Independente",
    mentorshipFeature2: "4 Sessões Individuais/mês",
    mentorshipFeature3: "Suporte via WhatsApp",
    mentorshipFeature4: "Correção de redações",
    joinMentorship: "Garantir Vaga Premium",
    mostPopular: "Mais Popular",
    contactTitle: "Entre em Contato",
    contactDesc: "Pronto para elevar o seu inglês? Envie-nos uma mensagem e retornaremos em breve.",
    contactName: "Seu Nome",
    contactEmail: "Seu E-mail",
    contactMessage: "Sua Mensagem",
    contactSend: "Enviar Mensagem",
    announcements: "Novidades",
    wordOfDay: "Expressão do Dia",
    upcomingLive: "Próximas Sessões",
    schedule: "Sua Agenda",
    courseModules: "Módulos do Curso",
    progress: "Meu Progresso",
    resume: "Continuar Aula",
    zoom: "Acessar Sala Zoom",
    profile: "Meu Perfil",
    accountSettings: "Configurações da Conta",
    personalInfo: "Informações Pessoais",
    subscription: "Minha Assinatura",
    certificates: "Meus Certificados",
    saveChanges: "Salvar Alterações",
    logout: "Sair do Portal",
    planPremium: "Plano Mentoria Premium",
    memberSince: "Membro Desde",
    totalHours: "Horas Estudadas",
    vocabLearned: "Vocabulário Adquirido",
    activeStreak: "Dias Seguidos",
    editProfile: "Editar Perfil"
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [userProfile, setUserProfile] = useState<any>(null);
  const supabase = createClient();

  const applyTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const loadUserPrefs = async () => {
    const { data: authData } = await supabase.auth.getUser();
    if (authData.user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();
        
      if (profileData) {
        setUserProfile(profileData);
        if (profileData.theme_preference) {
          applyTheme(profileData.theme_preference as Theme);
          return;
        }
      }
    }

    // Fallback to local storage
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    }
  };

  useEffect(() => {
    // Initial local storage sync for fast render
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) applyTheme(savedTheme);
    
    loadUserPrefs();

    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) setLanguage(savedLang);
  }, [supabase]);

  const toggleTheme = async () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    
    // Save to database if user is logged in
    const { data: authData } = await supabase.auth.getUser();
    if (authData.user) {
      await supabase.from("profiles").update({ theme_preference: next }).eq("id", authData.user.id);
    }
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
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t, userProfile, refreshProfile: loadUserPrefs }}>
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
