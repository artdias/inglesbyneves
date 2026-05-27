"use client";

import { useState, useEffect } from "react";
import { Save, Lock, Check } from "lucide-react";
import { createClient } from "../../../utils/supabase/client";

export default function TeacherSettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        const { data: profile } = await supabase.from("profiles").select("first_name, last_name").eq("id", user.id).single();
        if (profile) {
          const fName = profile.first_name || "";
          const lName = profile.last_name || "";
          setDisplayName(`${fName} ${lName}`.trim());
        }
      }
    }
    loadProfile();
  }, []);

  async function handleSave() {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // Update Display Name
      const parts = displayName.trim().split(" ");
      const first = parts[0] || "";
      const last = parts.slice(1).join(" ") || "";
      await supabase.from("profiles").update({ first_name: first, last_name: last }).eq("id", user.id);

      // Update Password if provided
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          setErrorMsg("Passwords do not match");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
      }

      setSuccessMsg("Settings saved successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
            Settings
          </h1>
          <p className="text-brand-taupe mt-2 tracking-wide text-sm">Manage your teacher account preferences.</p>
        </div>
        <button onClick={handleSave} disabled={loading} className="hidden sm:flex items-center gap-2 bg-brand-mauve hover:bg-brand-dark text-white px-5 py-2.5 rounded-sm font-medium transition-all text-sm tracking-widest uppercase disabled:opacity-50">
          {loading ? "Saving..." : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center gap-2">
          <Check size={16} />
          <span className="block sm:inline">{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <button className={`w-full text-left px-4 py-3 rounded-sm font-medium text-sm transition-colors bg-brand-beige/50 dark:bg-brand-navy border border-brand-taupe/30 text-brand-navy dark:text-white`}>
            General & Security
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-6">
          
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 p-8">
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white mb-6 border-b border-brand-taupe/10 pb-4">General Information</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Display Name</label>
                <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" value={email} disabled className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-taupe focus:outline-none transition-colors opacity-50 cursor-not-allowed" />
                <p className="text-[10px] text-brand-taupe mt-1">Email cannot be changed directly.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-brand-taupe/10 pb-4">
              <Lock size={20} className="text-brand-mauve" />
              <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Security</h2>
            </div>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">New Password (Optional)</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
