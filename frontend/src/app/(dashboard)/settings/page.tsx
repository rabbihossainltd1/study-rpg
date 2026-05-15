"use client";

import { useState, type ReactNode } from "react";
import { useUserStore } from "@/store/useUserStore";
import { bindGuestAccountToEmail, deleteCurrentAccount, logOut } from "@/lib/firebase";
import { navigate } from "@/lib/navigate";
import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/AppIcon";
import toast from "react-hot-toast";
import {
  Settings, SunMoon, Languages, LogOut, Trash2, Mail, Lock, UserRound,
  Shield, Moon, Sun, Link as LinkIcon, Edit3,
} from "lucide-react";

export default function SettingsPage() {
  const { user, language, theme, setTheme, setLanguage, reset } = useUserStore();
  const [bindEmail, setBindEmail] = useState("");
  const [bindPassword, setBindPassword] = useState("");
  const [binding, setBinding] = useState(false);

  if (!user) return null;

  const isBn = language === "bn";

  const handleLogout = async () => {
    await logOut().catch(() => undefined);
    reset();
    navigate("/login");
  };

  const handleDelete = async () => {
    const msg = isBn
      ? "এই অ্যাকাউন্ট স্থায়ীভাবে ডিলিট হবে। নিশ্চিত?"
      : "This account will be permanently deleted. Continue?";
    if (!confirm(msg)) return;
    try {
      await deleteCurrentAccount(user.uid);
      reset();
      toast.success(isBn ? "অ্যাকাউন্ট ডিলিট হয়েছে" : "Account deleted");
      navigate("/login");
    } catch {
      toast.error(isBn ? "ডিলিট হয়নি। আবার লগইন করে চেষ্টা করো।" : "Delete failed. Re-login and try again.");
    }
  };

  const bindGuest = async () => {
    if (!bindEmail.includes("@") || bindPassword.length < 6) {
      toast.error(isBn ? "সঠিক ইমেইল ও ৬+ অক্ষরের পাসওয়ার্ড দাও" : "Enter a valid email and 6+ character password");
      return;
    }
    setBinding(true);
    try {
      await bindGuestAccountToEmail(bindEmail.trim(), bindPassword);
      toast.success(isBn ? "ইমেইল bind হয়েছে" : "Email linked");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (isBn ? "Bind failed" : "Bind failed"));
    } finally {
      setBinding(false);
    }
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto animate-card-in">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">{isBn ? "সেটিংস" : "Settings"}</h1>
          <p className="text-sm text-gray-500">{isBn ? "অ্যাকাউন্ট, থিম, ভাষা ও সিকিউরিটি" : "Account, theme, language and security"}</p>
        </div>
      </div>

      <div className="glass-card p-5 flex items-center gap-4 border border-primary/15">
        <UserAvatar photoURL={user.photoURL} avatar={user.avatar} name={user.displayName} sizeClass="w-16 h-16" iconClassName="w-8 h-8" />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-black text-white truncate">{user.displayName || user.username}</p>
          <p className="text-sm text-gray-500 truncate">@{user.username} · ID {user.studentId || "—"}</p>
          <p className="text-xs text-primary font-bold mt-1">LV.{user.level} · {user.rank}</p>
        </div>
      </div>

      <div className="glass-card p-5 space-y-4">
        <SectionTitle icon={<SunMoon className="w-4 h-4" />} title={isBn ? "থিম" : "Theme"} />
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setTheme("dark")} className={`rounded-2xl border p-4 text-left tap-bounce ${theme === "dark" ? "border-primary bg-primary/10" : "border-white/10 bg-white/5"}`}>
            <Moon className="w-5 h-5 mb-2 text-primary" />
            <p className="font-black text-white">{isBn ? "ডার্ক মোড" : "Dark mode"}</p>
            <p className="text-xs text-gray-500">{isBn ? "নিওন ব্ল্যাক UI" : "Neon black UI"}</p>
          </button>
          <button onClick={() => setTheme("light")} className={`rounded-2xl border p-4 text-left tap-bounce ${theme === "light" ? "border-primary bg-primary/10" : "border-white/10 bg-white/5"}`}>
            <Sun className="w-5 h-5 mb-2 text-gold" />
            <p className="font-black text-white">{isBn ? "লাইট মোড" : "Light mode"}</p>
            <p className="text-xs text-gray-500">{isBn ? "ক্লিন সাদা UI" : "Clean white UI"}</p>
          </button>
        </div>

        <div className="h-px bg-white/10" />
        <SectionTitle icon={<Languages className="w-4 h-4" />} title={isBn ? "ভাষা" : "Language"} />
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setLanguage("bn")} className={`rounded-2xl border p-3 font-black tap-bounce ${language === "bn" ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5 text-gray-500"}`}>বাংলা</button>
          <button onClick={() => setLanguage("en")} className={`rounded-2xl border p-3 font-black tap-bounce ${language === "en" ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5 text-gray-500"}`}>English</button>
        </div>
      </div>

      {user.isGuest && (
        <div className="glass-card p-5 space-y-3 border border-secondary/20">
          <SectionTitle icon={<LinkIcon className="w-4 h-4" />} title={isBn ? "Guest account bind" : "Bind guest account"} />
          <p className="text-sm text-gray-500">{isBn ? "একই guest progress রাখতে ইমেইল bind করো।" : "Link an email to keep this guest progress."}</p>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={bindEmail} onChange={(e) => setBindEmail(e.target.value)} placeholder="email@gmail.com" className="app-input w-full rounded-xl pl-10 pr-3 py-3 text-sm outline-none border" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={bindPassword} onChange={(e) => setBindPassword(e.target.value)} type="password" placeholder={isBn ? "নতুন পাসওয়ার্ড" : "New password"} className="app-input w-full rounded-xl pl-10 pr-3 py-3 text-sm outline-none border" />
          </div>
          <Button onClick={bindGuest} isLoading={binding} className="w-full" leftIcon={<Shield className="w-4 h-4" />}>{isBn ? "ইমেইল bind করো" : "Bind email"}</Button>
        </div>
      )}

      <div className="glass-card p-5 space-y-3">
        <SectionTitle icon={<UserRound className="w-4 h-4" />} title={isBn ? "অ্যাকাউন্ট" : "Account"} />
        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/profile")} leftIcon={<Edit3 className="w-4 h-4" />}>{isBn ? "প্রোফাইল এডিট" : "Edit profile"}</Button>
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout} leftIcon={<LogOut className="w-4 h-4" />}>{isBn ? "লগ আউট" : "Log out"}</Button>
        <button onClick={handleDelete} className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 font-black text-sm tap-bounce">
          <Trash2 className="w-4 h-4" /> {isBn ? "অ্যাকাউন্ট ডিলিট" : "Delete account"}
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return <div className="flex items-center gap-2 text-white font-black">{icon}<span>{title}</span></div>;
}
