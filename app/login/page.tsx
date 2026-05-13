"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { useAppContext } from "../providers";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { t } = useAppContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige/20 dark:bg-brand-navy-dark flex items-center justify-center p-4 selection:bg-brand-peach/50 transition-colors duration-300">
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-brand-navy dark:text-brand-beige hover:text-brand-mauve dark:hover:text-brand-peach transition-colors uppercase tracking-widest text-[10px] font-bold">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <div className="bg-white dark:bg-[#0a0f1c] w-full max-w-md p-8 sm:p-10 rounded-sm shadow-xl border border-brand-taupe/20">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="/logo.svg" alt="Logo" className="w-full h-full dark:hidden" />
              <img src="/logo-dark.svg" alt="Logo" className="w-full h-full hidden dark:block" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm text-brand-taupe tracking-wide">Enter your details to access your portal.</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-sm text-sm border border-red-100 dark:border-red-900/50 mb-6 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={16} className="text-brand-taupe" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest">Password</label>
              <a href="#" className="text-[10px] font-bold text-brand-mauve uppercase tracking-widest hover:text-brand-dark transition-colors">Forgot?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={16} className="text-brand-taupe" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-mauve hover:bg-brand-dark text-white py-4 rounded-sm text-sm tracking-widest uppercase font-medium transition-all disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-brand-taupe/10 pt-6">
          <p className="text-xs text-brand-taupe">
            Don't have an account? <a href="#" className="font-bold text-brand-mauve hover:text-brand-dark uppercase tracking-widest ml-1 transition-colors">Apply Now</a>
          </p>
        </div>
      </div>
    </div>
  );
}
