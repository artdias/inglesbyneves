"use client";

import { useState, useEffect, useRef } from "react";
import { Save, Lock, Bell, CreditCard, Upload, User as UserIcon } from "lucide-react";
import { useAppContext } from "../../providers";
import { createClient } from "../../../utils/supabase/client";
import { Database } from "../../../types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function SettingsPage() {
  const { t, refreshProfile } = useAppContext();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    async function loadData() {
      const { data: authData } = await supabase.auth.getUser();
      if (authData.user) {
        setUser(authData.user);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single();
          
        if (profileData) {
          setFirstName(profileData.first_name || "");
          setLastName(profileData.last_name || "");
          setPhoneNumber((profileData as any).phone_number || "");
          setAvatarUrl((profileData as any).avatar_url || "");
        }
      }
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Math.random()}.${fileExt}`; // random string to invalidate cache

    setSaving(true);
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id);
      setAvatarUrl(publicUrl);
      refreshProfile(); // Update navbar instantly
    } else {
      console.error(uploadError);
      alert("Error uploading avatar");
    }
    setSaving(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    }).eq("id", user.id);
    
    if (error) {
      console.error(error);
      alert("Error saving profile");
    } else {
      refreshProfile(); // Update navbar instantly
      alert("Profile updated successfully!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-taupe/30 border-t-brand-mauve rounded-full animate-spin"></div>
      </div>
    );
  }

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
        <button 
          onClick={handleSave}
          disabled={saving}
          className="hidden sm:flex items-center gap-2 bg-brand-mauve hover:bg-brand-dark text-white px-5 py-2.5 rounded-sm font-medium transition-all text-sm tracking-widest uppercase disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
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
            <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white mb-6 border-b border-brand-taupe/10 pb-4">Profile Information</h2>
            
            <div className="space-y-8 max-w-2xl">
              
              {/* Avatar Upload Section */}
              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-4">Profile Picture</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-brand-mauve p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#0a0f1c] flex items-center justify-center overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={32} className="text-brand-taupe" />
                      )}
                    </div>
                  </div>
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleAvatarUpload}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={saving}
                      className="flex items-center gap-2 bg-brand-beige/50 dark:bg-brand-navy border border-brand-taupe/30 hover:bg-brand-beige dark:hover:bg-brand-navy-dark text-brand-navy dark:text-brand-beige px-4 py-2 rounded-sm transition-colors text-sm font-medium"
                    >
                      <Upload size={16} />
                      {saving ? "Uploading..." : "Upload New Picture"}
                    </button>
                    <p className="text-xs text-brand-taupe mt-3">Recommended size 256x256px. Max 2MB.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 bg-brand-beige/5 dark:bg-brand-navy/10 border border-brand-taupe/20 rounded-sm text-brand-navy/60 dark:text-brand-beige/60 cursor-not-allowed" 
                />
                <p className="text-xs text-brand-taupe mt-2">Email cannot be changed right now.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-taupe uppercase tracking-widest mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-brand-beige/10 dark:bg-brand-navy/20 border border-brand-taupe/30 rounded-sm text-brand-navy dark:text-brand-beige focus:outline-none focus:border-brand-mauve transition-colors" 
                />
              </div>

              <div className="pt-4 sm:hidden">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex justify-center items-center gap-2 bg-brand-mauve hover:bg-brand-dark text-white px-5 py-3 rounded-sm font-medium transition-all text-sm tracking-widest uppercase disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
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
