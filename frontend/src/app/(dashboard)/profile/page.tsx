"use client";

import { navigate } from "@/lib/navigate";
import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { useUserStore } from "@/store/useUserStore";
import { XpBar } from "@/components/ui/XpBar";
import { Button } from "@/components/ui/Button";
import { RANK_COLORS, RANK_THRESHOLDS, type Rank, type Achievement } from "@/types";
import { getRarityColor } from "@/lib/utils";
import { updateUserProfile, logOut, bindGuestAccountToEmail, getLeaderboard, deleteCurrentAccount } from "@/lib/firebase";
import {
  Edit3, Trophy, Zap, Flame, Clock, Star, Shield, LogOut, Copy, Check,
  Camera, Save, X, User, School, MapPin, Home, GraduationCap, Languages, Coins, Gem, Award, Mail, Lock, Crown, SunMoon, Trash2, Building2,
} from "lucide-react";
import { AppIcon, UserAvatar, VerifiedBadge } from "@/components/ui/AppIcon";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { CLASS_OPTIONS, SSC_COMBINED_CLASS, DIVISIONS, EDUCATION_GROUPS, deriveExamModeFromClass, getDistrictsForDivision, getThanasForZila, needsEducationGroup, normalizeClassName } from "@/lib/bdAddress";
import toast from "react-hot-toast";
import { isVerifiedUser } from "@/lib/verified";

const RANK_ORDER: Rank[] = ["Novice", "Apprentice", "Scholar", "Expert", "Master", "Grandmaster", "Legend"];

const ACHIEVEMENTS: Achievement[] = [
  { id: "first_session", title: "First Step", titleBn: "প্রথম পদক্ষেপ", description: "Complete your first study session", icon: "target", rarity: "common", xpReward: 50, isUnlocked: false },
  { id: "streak_7", title: "Week Warrior", titleBn: "সপ্তাহের যোদ্ধা", description: "Maintain a 7-day study streak", icon: "fire", rarity: "rare", xpReward: 200, isUnlocked: false },
  { id: "streak_30", title: "Monthly Master", titleBn: "মাসিক মাস্টার", description: "Maintain a 30-day study streak", icon: "zap", rarity: "epic", xpReward: 500, isUnlocked: false },
  { id: "xp_1000", title: "XP Hunter", titleBn: "এক্সপি শিকারী", description: "Earn 1,000 total XP", icon: "sparkles", rarity: "common", xpReward: 100, isUnlocked: false },
  { id: "xp_10000", title: "XP Legend", titleBn: "এক্সপি কিংবদন্তি", description: "Earn 10,000 total XP", icon: "star", rarity: "legendary", xpReward: 1000, isUnlocked: false },
  { id: "quiz_10", title: "Quiz Enthusiast", titleBn: "কুইজ উৎসাহী", description: "Complete 10 quizzes", icon: "notebook", rarity: "common", xpReward: 150, isUnlocked: false },
  { id: "perfect_quiz", title: "Perfectionist", titleBn: "নিখুঁততাবাদী", description: "Score 100% on a quiz", icon: "trophy", rarity: "rare", xpReward: 300, isUnlocked: false },
  { id: "study_hour", title: "Hour of Power", titleBn: "শক্তির ঘণ্টা", description: "Study for 1 hour in a single session", icon: "calendar", rarity: "rare", xpReward: 250, isUnlocked: false },
];

const AVATARS = ["zap", "fire", "book", "target", "trophy", "gem", "rocket", "brain", "bot", "star"];

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 240;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        const scale = Math.max(size / image.width, size / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        ctx.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = reject;
      image.src = String(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfilePage() {
  const { user, language, theme, setUser, setLanguage, setTheme, reset } = useUserStore();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bindEmail, setBindEmail] = useState("");
  const [bindPassword, setBindPassword] = useState("");
  const [binding, setBinding] = useState(false);
  const [podiumRank, setPodiumRank] = useState<number | undefined>(undefined);
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    photoURL: "",
    avatar: "zap",
    school: "",
    college: "",
    className: SSC_COMBINED_CLASS as string,
    groupName: "Science",
    division: "Khulna",
    zila: "Jhenaidah",
    district: "Jhenaidah",
    thana: "",
    examMode: "SSC" as "SSC" | "HSC" | "Admission" | "University",
  });

  useEffect(() => {
    if (!user) return;
    getLeaderboard("global", 100).then((rows: any[]) => {
      const found = rows.find((r) => r.userId === user.uid);
      setPodiumRank(found?.rank && found.rank <= 3 ? found.rank : undefined);
    }).catch(() => setPodiumRank(undefined));
    setForm({
      username: user.username || "",
      displayName: user.displayName || user.username || "",
      photoURL: user.photoURL || "",
      avatar: user.avatar || "zap",
      school: user.school || user.college || "",
      college: user.college || user.school || "",
      className: normalizeClassName(user.className),
      groupName: user.groupName || "Science",
      division: user.division || "Khulna",
      zila: user.zila || user.district || "Jhenaidah",
      district: user.district || user.zila || "Jhenaidah",
      thana: user.thana || "",
      examMode: user.examMode || deriveExamModeFromClass(user.className || SSC_COMBINED_CLASS),
    });
  }, [user]);

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((a) => user?.achievements?.includes(a.id)),
    [user?.achievements]
  );

  useBodyScrollLock(editing);

  const editZilaOptions = useMemo(() => getDistrictsForDivision(form.division), [form.division]);
  const editThanaOptions = useMemo(() => getThanasForZila(form.zila), [form.zila]);
  const editNeedsGroup = needsEducationGroup(form.className);

  if (!user) return null;

  const rankColor = RANK_COLORS[user.rank];
  const currentRankIndex = RANK_ORDER.indexOf(user.rank);
  const nextRank = RANK_ORDER[currentRankIndex + 1];
  const displayPhoto = user.photoURL || "";

  const handleLogout = async () => {
    await logOut().catch(() => {});
    reset();
    navigate("/login");
    toast.success("Logged out");
  };

  const bindGuestEmail = async () => {
    if (!bindEmail || bindPassword.length < 6) return toast.error("Valid email and 6+ digit password required");
    setBinding(true);
    try {
      const cleanEmail = bindEmail.trim().toLowerCase();
      await bindGuestAccountToEmail(cleanEmail, bindPassword);
      setUser({ ...user, email: cleanEmail, isGuest: false });
      toast.success("Guest account linked with email");
      setBindEmail("");
      setBindPassword("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message.includes("already") ? "Email already used" : "Bind failed");
    } finally {
      setBinding(false);
    }
  };

  const copyUid = () => {
    navigator.clipboard.writeText(user.studentId || user.uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Student ID copied");
  };

  const handlePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    try {
      const photoURL = await compressImage(file);
      setForm((prev) => ({ ...prev, photoURL }));
      toast.success("Profile photo ready");
    } catch {
      toast.error("Photo could not be processed");
    }
  };

  const saveProfile = async () => {
    if (!form.username.trim() || !form.displayName.trim()) {
      toast.error("Name and username required");
      return;
    }
    if (!editZilaOptions.includes(form.zila) || !form.thana || !editThanaOptions.includes(form.thana)) {
      toast.error("Select valid district and thana");
      return;
    }
    setSaving(true);
    const updates = {
      username: form.username.trim(),
      displayName: form.displayName.trim(),
      photoURL: form.photoURL,
      avatar: form.avatar,
      school: form.school.trim() || form.college.trim(),
      college: form.college.trim() || form.school.trim(),
      className: form.className,
      groupName: editNeedsGroup ? form.groupName : "General",
      division: form.division,
      zila: form.zila,
      district: form.zila,
      thana: form.thana,
      examMode: deriveExamModeFromClass(form.className),
    };
    try {
      if (!user.isGuest || !user.uid.startsWith("guest_")) {
        await updateUserProfile(user.uid, updates);
      }
      setUser({ ...user, ...updates });
      setEditing(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Profile update failed. Check Firestore rules.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm(language === "bn" ? "অ্যাকাউন্ট ডিলিট করতে চান? এই কাজ ফেরত আনা যাবে না।" : "Delete account? This cannot be undone.")) return;
    try {
      await deleteCurrentAccount(user.uid);
      reset();
      toast.success(language === "bn" ? "অ্যাকাউন্ট ডিলিট হয়েছে" : "Account deleted");
      navigate("/login");
    } catch {
      toast.error(language === "bn" ? "ডিলিট করা যায়নি। আবার লগইন করে চেষ্টা করো।" : "Delete failed. Re-login and try again.");
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "bn" ? "en" : "bn";
    setLanguage(newLang);
    toast.success(`Language: ${newLang === "bn" ? "বাংলা" : "English"}`);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto animate-card-in">
      <div className="glass-card p-6 border relative overflow-hidden hover-lift" style={{ borderColor: `${rankColor}30` }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: rankColor }} />
        <div className="flex items-start gap-4 relative">
          <div className="relative flex-shrink-0">
            <UserAvatar photoURL={displayPhoto} avatar={user.avatar} name={user.displayName} sizeClass="w-20 h-20 rounded-2xl" iconClassName="w-9 h-9" borderColor={rankColor} rank={podiumRank} vipFrame={Boolean(podiumRank)} />
            <div className="absolute -bottom-1 -right-1 text-xs font-black px-1.5 py-0.5 rounded-md" style={{ background: rankColor, color: "#000" }}>
              {user.level}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0"><h1 className="text-xl font-black text-white truncate">{user.displayName || user.username}</h1>{isVerifiedUser(user) && <VerifiedBadge className="w-5 h-5 flex-shrink-0" />}</div>
                <p className="text-sm font-semibold mt-0.5" style={{ color: rankColor }}>{user.rank}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{user.examMode} · {user.school || user.college || "Institution not set"}</p>
                <p className="text-xs text-gray-600 mt-0.5 truncate">{user.district}{user.thana ? ` · ${user.thana}` : ""}</p>
              </div>
              <button onClick={() => setEditing(true)} className="p-2 glass rounded-xl border border-white/10 hover:border-primary/30 transition-all tap-bounce" aria-label="Edit profile">
                <Edit3 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20"><Flame className="w-3 h-3" /> {user.streak} day streak</span>
              <span className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20"><Zap className="w-3 h-3" /> LV.{user.level}</span>
              {user.className && <span className="text-xs px-2 py-1 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">{user.className}</span>}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <XpBar currentXp={user.xp} totalXp={user.xp} level={user.level} rank={user.rank} />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-xs text-gray-600 font-mono truncate flex-1">ID: {user.studentId || user.uid.substring(0, 10)}</p>
          <button onClick={copyUid} className="p-1.5 glass rounded-lg border border-white/10 hover:border-white/20 transition-colors tap-bounce">
            {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3 text-gray-500" />}
          </button>
        </div>
      </div>

      <div className="glass-card p-5 hover-lift">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4" style={{ color: rankColor }} />
          <p className="font-bold text-white text-sm">Rank Journey</p>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto overflow-y-visible px-4 py-4 -mx-2">
          {RANK_ORDER.map((rank, i) => {
            const rColor = RANK_COLORS[rank];
            const isActive = rank === user.rank;
            const isPast = RANK_ORDER.indexOf(rank) < currentRankIndex;
            return (
              <div key={rank} className="flex items-center gap-2 flex-shrink-0">
                <div className="text-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${isActive ? "scale-125 shadow-lg" : ""}`}
                    style={{ borderColor: isPast || isActive ? rColor : "rgba(255,255,255,0.1)", background: isPast || isActive ? `${rColor}20` : "transparent", color: isPast || isActive ? rColor : "#4B5563", boxShadow: isActive ? `0 0 22px ${rColor}40` : undefined }}>
                    {isPast ? "✓" : isActive ? "●" : "○"}
                  </div>
                </div>
                {i < RANK_ORDER.length - 1 && <div className="w-8 h-px flex-shrink-0" style={{ background: isPast ? rColor : "rgba(255,255,255,0.1)" }} />}
              </div>
            );
          })}
        </div>
        {nextRank && (
          <p className="text-xs text-gray-500 mt-2">
            Next rank: <span style={{ color: RANK_COLORS[nextRank] }}>{nextRank}</span> · Need {(RANK_THRESHOLDS[nextRank] - user.xp).toLocaleString()} more XP
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["stats", "achievements", "settings"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all tap-bounce ${activeTab === tab ? "bg-primary text-black font-bold" : "glass border border-white/10 text-gray-400 hover:text-white"}`}>
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "stats" && (
        <div className="glass-card p-4 border border-white/10 animate-card-in">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-secondary/10 border border-secondary/20 p-4"><p className="text-2xl font-black text-secondary">{user.coins}</p><p className="text-xs text-gray-500">Coins</p></div>
            <div className="rounded-2xl bg-purple/10 border border-purple/20 p-4"><p className="text-2xl font-black text-purple">{user.gems}</p><p className="text-xs text-gray-500">Gems</p></div>
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="space-y-3 animate-card-in">
          {unlockedAchievements.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Trophy className="w-10 h-10 mx-auto mb-3 text-gold" />
              <p className="text-gray-400 font-medium">No achievements yet</p>
              <p className="text-sm text-gray-600 mt-1">Complete missions and quizzes to unlock achievements.</p>
            </div>
          ) : unlockedAchievements.map((a) => {
            const color = getRarityColor(a.rarity);
            return (
              <div key={a.id} className="glass-card p-4 border flex items-center gap-3 hover-lift" style={{ borderColor: `${color}25` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${color}15` }}><AppIcon name={a.icon} className="w-6 h-6" color={color} /></div>
                <div><p className="font-bold text-white text-sm">{language === "bn" ? a.titleBn : a.title}</p><p className="text-xs text-gray-500">{a.description}</p></div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="glass-card p-5 space-y-3 animate-card-in">
          {user.isGuest && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3 space-y-2">
              <p className="text-sm font-bold text-white">Bind guest account with Gmail</p>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" /><input value={bindEmail} onChange={(e) => setBindEmail(e.target.value)} placeholder="email@gmail.com" className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-sm text-white outline-none" /></div>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" /><input value={bindPassword} onChange={(e) => setBindPassword(e.target.value)} type="password" placeholder="New password" className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-sm text-white outline-none" /></div>
              <Button onClick={bindGuestEmail} isLoading={binding} className="w-full" size="sm">Bind Email</Button>
            </div>
          )}
          <Button variant="ghost" className="w-full justify-start" onClick={toggleLanguage} leftIcon={<Languages className="w-4 h-4" />}>{language === "bn" ? "ভাষা: বাংলা" : "Language: English"}</Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} leftIcon={<SunMoon className="w-4 h-4" />}>{language === "bn" ? `থিম: ${theme === "dark" ? "ডার্ক" : "লাইট"}` : `Theme: ${theme === "dark" ? "Dark" : "Light"}`}</Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setEditing(true)} leftIcon={<Edit3 className="w-4 h-4" />}>Edit profile info</Button>
          <Button variant="danger" className="w-full justify-start" onClick={handleLogout} leftIcon={<LogOut className="w-4 h-4" />}>{language === "bn" ? "লগ আউট" : "Log out"}</Button>
          <button onClick={handleDeleteAccount} className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-bold text-sm tap-bounce"><Trash2 className="w-4 h-4" />{language === "bn" ? "অ্যাকাউন্ট ডিলিট" : "Delete account"}</button>
        </div>
      )}

      {editing && (
        <div className="modal-backdrop fixed inset-0 z-50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in overflow-hidden">
          <div className="glass-card w-full max-w-lg p-5 border border-primary/20 animate-drawer-up">
            <div className="flex items-center justify-between mb-4">
              <div><h2 className="text-lg font-black text-white">Edit Profile</h2><p className="text-xs text-gray-500">Name, photo and student info</p></div>
              <button onClick={() => setEditing(false)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary/10 border border-primary/30 flex items-center justify-center text-4xl">
                {form.photoURL ? <img src={form.photoURL} alt="Preview" className="w-full h-full object-cover" /> : <AppIcon name={form.avatar} className="w-9 h-9 text-primary" />}
              </div>
              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white cursor-pointer hover:border-primary/30 transition-all">
                  <Camera className="w-4 h-4" /> Change photo
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {AVATARS.slice(0, 6).map((av) => <button key={av} onClick={() => setForm((p) => ({ ...p, avatar: av, photoURL: p.photoURL }))} className={`w-8 h-8 rounded-lg border flex items-center justify-center ${form.avatar === av ? "border-primary bg-primary/10" : "border-white/10 bg-white/5"}`}><AppIcon name={av} className="w-4 h-4" /></button>)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <EditInput label="Student Name" icon={<User className="w-4 h-4" />} value={form.displayName} onChange={(v) => setForm((p) => ({ ...p, displayName: v }))} />
              <EditInput label="Username" icon={<User className="w-4 h-4" />} value={form.username} onChange={(v) => setForm((p) => ({ ...p, username: v.toLowerCase().replace(/\s+/g, "") }))} />
              <ProfileSelect label="Class" icon={<GraduationCap className="w-4 h-4" />} value={form.className} onChange={(v) => setForm((p) => ({ ...p, className: v, groupName: needsEducationGroup(v) ? (p.groupName === "General" ? "Science" : p.groupName) : "General" }))} options={[...CLASS_OPTIONS]} />
              {editNeedsGroup && <ProfileSelect label="Group" icon={<GraduationCap className="w-4 h-4" />} value={form.groupName} onChange={(v) => setForm((p) => ({ ...p, groupName: v }))} options={EDUCATION_GROUPS.filter((g) => g !== "General")} />}
              <EditInput label="School / College / University" icon={<School className="w-4 h-4" />} value={form.school || form.college} onChange={(v) => setForm((p) => ({ ...p, school: v, college: v }))} />
              <ProfileSelect label="Division" icon={<MapPin className="w-4 h-4" />} value={form.division} onChange={(v) => { const first = getDistrictsForDivision(v)[0] || ""; setForm((p) => ({ ...p, division: v, zila: first, district: first, thana: "" })); }} options={DIVISIONS} />
              <ProfileSelect label="District" icon={<Building2 className="w-4 h-4" />} value={form.zila} onChange={(v) => setForm((p) => ({ ...p, zila: v, district: v, thana: "" }))} options={editZilaOptions} />
              <ProfileSelect label="Thana / Upazila" icon={<Home className="w-4 h-4" />} value={form.thana} onChange={(v) => setForm((p) => ({ ...p, thana: v }))} options={["", ...editThanaOptions]} />
            </div>

            <div className="flex gap-3 mt-5">
              <Button variant="ghost" className="flex-1" onClick={() => setEditing(false)}>Cancel</Button>
              <Button className="flex-1" onClick={saveProfile} isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileSelect({ label, icon, value, onChange, options }: { label: string; icon: ReactNode; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return <div>
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="app-input w-full rounded-xl pl-10 pr-3 py-3 text-sm outline-none border">
        {options.map((op) => <option key={op || "empty"} value={op} className="bg-surface text-white">{op || "Select"}</option>)}
      </select>
    </div>
  </div>;
}

function EditInput({ label, icon, value, onChange }: { label: string; icon: ReactNode; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span>
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
      </div>
    </div>
  );
}
