"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { Lock } from "lucide-react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
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
      <div className="bg-white dark:bg-[#0a0f1c] w-full max-w-md p-8 sm:p-10 rounded-sm shadow-xl border border-brand-taupe/20">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="/logo.svg" alt="Logo" className="w-full h-full dark:hidden" />
              <img src="/logo-dark.svg" alt="Logo" className="w-full h-full hidden dark:block" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight mb-2">New Password</h1>
          <p className="text-sm text-brand-taupe tracking-wide">Enter your new secure password below.</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-sm text-sm border border-red-100 dark:border-red-900/50 mb-6 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest">New Password</label>
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
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={16} className="text-brand-taupe" />
              </div>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors"
                placeholder="••••••••"
                minLength={6}
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
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
