"use client";

import { Save, Lock, Bell, CreditCard } from "lucide-react";
import { useAppContext } from "../../providers";

export default function SettingsPage() {
  const { t } = useAppContext();

  return (
    <div className="space-y-6 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy dark:text-brand-beige tracking-tight">
            Settings
          </h1>
          <p className="text-brand-taupe mt-2 tracking-wide text-sm">Manage your account preferences.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 bg-brand-mauve hover:bg-brand-dark text-white px-5 py-2.5 rounded-sm font-medium transition-all text-sm tracking-widest uppercase">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {["General", "Security", "Notifications", "Billing"].map((tab, i) => (
            <button key={i} className={`w-full text-left px-4 py-3 rounded-sm font-medium text-sm transition-colors ${i === 0 ? 'bg-brand-beige/50 dark:bg-brand-navy border border-brand-taupe/30 text-brand-navy dark:text-white' : 'text-brand-navy/70 dark:text-brand-taupe hover:bg-brand-beige/20 dark:hover:bg-brand-navy/30'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-6">
          
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm shadow-sm border border-brand-taupe/20 p-8">
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white mb-6 border-b border-brand-taupe/10 pb-4">General Information</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Display Name</label>
                <input type="text" defaultValue="Student User" className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" defaultValue="student@example.com" className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Language Preference</label>
                <select className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors appearance-none">
                  <option>English</option>
                  <option>Portuguese</option>
                </select>
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
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
