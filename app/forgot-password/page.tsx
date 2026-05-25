"use client";

import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Call Supabase to send the reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-beige/20 dark:bg-brand-navy-dark flex items-center justify-center p-4 selection:bg-brand-peach/50 transition-colors duration-300">
      <Link href="/login" className="absolute top-6 left-6 flex items-center gap-2 text-brand-navy dark:text-brand-beige hover:text-brand-mauve dark:hover:text-brand-peach transition-colors uppercase tracking-widest text-[10px] font-bold">
        <ArrowLeft size={16} /> Back to Login
      </Link>
      
      <div className="bg-white dark:bg-[#0a0f1c] w-full max-w-md p-8 sm:p-10 rounded-sm shadow-xl border border-brand-taupe/20">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="/logo.svg" alt="Logo" className="w-full h-full dark:hidden" />
              <img src="/logo-dark.svg" alt="Logo" className="w-full h-full hidden dark:block" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight mb-2">Reset Password</h1>
          <p className="text-sm text-brand-taupe tracking-wide">Enter your email to receive a reset link.</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-sm text-sm border border-red-100 dark:border-red-900/50 mb-6 font-medium text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-navy dark:text-brand-beige mb-2">Check your email</h3>
              <p className="text-sm text-brand-taupe">We sent a password reset link to <strong className="text-brand-navy dark:text-white font-medium">{email}</strong>.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
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

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-mauve hover:bg-brand-dark text-white py-4 rounded-sm text-sm tracking-widest uppercase font-medium transition-all disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
