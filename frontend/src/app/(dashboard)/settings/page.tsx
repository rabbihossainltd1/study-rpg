
"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useUserStore } from "@/store/useUserStore";
import { bindGuestAccountToEmail, deleteCurrentAccount, logOut, updateUserProfile } from "@/lib/firebase";
import { navigate } from "@/lib/navigate";
import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/AppIcon";
import { CLASS_OPTIONS, DIVISIONS, EDUCATION_GROUPS, deriveExamModeFromClass, getDistrictsForDivision, getThanasForZila, needsEducationGroup } from "@/lib/bdAddress";
import { APP_VERSION, UPDATE_API_URL, UPDATE_PACKAGE_URL, UPDATE_RELEASE_URL } from "@/lib/appVersion";
import toast from "react-hot-toast";
import {
  Settings, SunMoon, Languages, LogOut, Trash2, Mail, Lock, UserRound,
  Shield, Moon, Sun, Link as LinkIcon, Edit3, Save, GraduationCap, MapPin, Home, Building2, School, DownloadCloud,
} from "lucide-react";

export default function SettingsPage() {
  const { user, language, theme, setTheme, setLanguage, setUser, reset } = useUserStore();
  const [bindEmail, setBindEmail] = useState("");
  const [bindPassword, setBindPassword] = useState("");
  const [binding, setBinding] = useState(false);
  const [savingStudent, setSavingStudent] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [showStudentEditor, setShowStudentEditor] = useState(false);
  const [studentForm, setStudentForm] = useState(() => ({
    className: user?.className || "Class 9",
    groupName: user?.groupName || "Science",
    school: user?.school || user?.college || "",
    division: user?.division || "Khulna",
    zila: user?.zila || user?.district || "Jhenaidah",
    thana: user?.thana || "",
  }));

  const isBn = language === "bn";
  const zilaOptions = useMemo(() => getDistrictsForDivision(studentForm.division), [studentForm.division]);
  const thanaOptions = useMemo(() => getThanasForZila(studentForm.zila), [studentForm.zila]);
  const showGroup = needsEducationGroup(studentForm.className);

  useEffect(() => {
    if (!user) return;
    setStudentForm({
      className: user.className || "Class 9",
      groupName: user.groupName || "Science",
      school: user.school || user.college || "",
      division: user.division || "Khulna",
      zila: user.zila || user.district || "Jhenaidah",
      thana: user.thana || "",
    });
  }, [user?.uid]);

  if (!user) return null;

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
      const cleanEmail = bindEmail.trim().toLowerCase();
      await bindGuestAccountToEmail(cleanEmail, bindPassword);
      setUser({ ...user, email: cleanEmail, isGuest: false });
      setBindEmail("");
      setBindPassword("");
      toast.success(isBn ? "ইমেইল bind হয়েছে" : "Email linked");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (isBn ? "Bind failed" : "Bind failed"));
    } finally {
      setBinding(false);
    }
  };

  const compareVersion = (a: string, b: string) => {
    const pa = a.replace(/^v/i, "").split(".").map((n) => Number(n) || 0);
    const pb = b.replace(/^v/i, "").split(".").map((n) => Number(n) || 0);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      if ((pa[i] || 0) > (pb[i] || 0)) return 1;
      if ((pa[i] || 0) < (pb[i] || 0)) return -1;
    }
    return 0;
  };

  const checkForUpdate = async () => {
    setCheckingUpdate(true);
    try {
      let latest = APP_VERSION;
      let url = UPDATE_RELEASE_URL;
      const release = await fetch(UPDATE_API_URL, { cache: "no-store" }).then((r) => r.ok ? r.json() : null).catch(() => null);
      if (release?.tag_name) {
        latest = String(release.tag_name).replace(/^v/i, "");
        url = release.html_url || UPDATE_RELEASE_URL;
      } else {
        const pkg = await fetch(UPDATE_PACKAGE_URL, { cache: "no-store" }).then((r) => r.ok ? r.json() : null).catch(() => null);
        if (pkg?.version) latest = String(pkg.version);
      }
      if (compareVersion(latest, APP_VERSION) > 0) {
        toast.success(isBn ? `নতুন ভার্সন ${latest} পাওয়া গেছে` : `New version ${latest} available`);
        if (confirm(isBn ? `নতুন ভার্সন ${latest} ডাউনলোড পেজ খুলবে?` : `Open download page for v${latest}?`)) window.open(url, "_blank");
      } else {
        toast.success(isBn ? `Latest version installed: v${APP_VERSION}` : `Latest version installed: v${APP_VERSION}`);
      }
    } catch {
      toast.error(isBn ? "Update check failed" : "Update check failed");
    } finally {
      setCheckingUpdate(false);
    }
  };

  const saveStudentInfo = async () => {
    if (!studentForm.school.trim()) {
      toast.error(isBn ? "প্রতিষ্ঠানের নাম দাও" : "Enter institution name");
      return;
    }
    if (!zilaOptions.includes(studentForm.zila)) {
      toast.error(isBn ? "সঠিক জেলা সিলেক্ট করো" : "Select a valid district");
      return;
    }
    if (!studentForm.thana || !thanaOptions.includes(studentForm.thana)) {
      toast.error(isBn ? "সঠিক থানা/উপজেলা সিলেক্ট করো" : "Select a valid thana/upazila");
      return;
    }
    const updates = {
      className: studentForm.className,
      groupName: showGroup ? studentForm.groupName : "General",
      examMode: deriveExamModeFromClass(studentForm.className),
      school: studentForm.school.trim(),
      college: studentForm.school.trim(),
      division: studentForm.division,
      zila: studentForm.zila,
      district: studentForm.zila,
      thana: studentForm.thana,
    };
    setSavingStudent(true);
    try {
      if (!user.isGuest || !user.uid.startsWith("guest_")) await updateUserProfile(user.uid, updates);
      setUser({ ...user, ...updates });
      toast.success(isBn ? "স্টুডেন্ট ইনফো আপডেট হয়েছে" : "Student info updated");
    } catch {
      toast.error(isBn ? "আপডেট হয়নি" : "Update failed");
    } finally {
      setSavingStudent(false);
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
          <p className="text-sm text-gray-500">{isBn ? "অ্যাকাউন্ট, পড়াশোনা, থিম ও ভাষা" : "Account, study, theme and language"}</p>
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
        <div className="flex items-center justify-between gap-3">
          <div>
            <SectionTitle icon={<GraduationCap className="w-4 h-4" />} title={isBn ? "স্টুডেন্ট আইডি ইনফো" : "Student ID info"} />
            <p className="text-xs text-gray-500 mt-1">{isBn ? "ক্লাস অনুযায়ী subject ও লিখিত প্রশ্ন বদলাবে।" : "Class changes update subjects and written questions."}</p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => setShowStudentEditor((v) => !v)} leftIcon={<Edit3 className="w-4 h-4" />}>
            {isBn ? "Edit" : "Edit"}
          </Button>
        </div>
        {!showStudentEditor && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoPill label={isBn ? "ক্লাস" : "Class"} value={`${studentForm.className}${showGroup ? ` · ${studentForm.groupName}` : ""}`} />
            <InfoPill label={isBn ? "প্রতিষ্ঠান" : "Institution"} value={studentForm.school || "Not added"} />
            <InfoPill label={isBn ? "জেলা" : "District"} value={studentForm.zila || "Not added"} />
            <InfoPill label={isBn ? "থানা" : "Thana"} value={studentForm.thana || "Not added"} />
          </div>
        )}
        {showStudentEditor && (
          <div className="space-y-4 animate-card-in">
            <SelectBox label={isBn ? "ক্লাস" : "Class"} icon={<GraduationCap className="w-4 h-4" />} value={studentForm.className} onChange={(v) => setStudentForm((p) => ({ ...p, className: v, groupName: needsEducationGroup(v) ? (p.groupName === "General" ? "Science" : p.groupName) : "General" }))} options={[...CLASS_OPTIONS]} />
            {showGroup && <SelectBox label={isBn ? "গ্রুপ" : "Group"} icon={<GraduationCap className="w-4 h-4" />} value={studentForm.groupName} onChange={(v) => setStudentForm((p) => ({ ...p, groupName: v }))} options={EDUCATION_GROUPS.filter((g) => g !== "General")} />}
            <TextInput label={isBn ? "স্কুল/কলেজ/ইউনিভার্সিটি" : "School / College / University"} icon={<School className="w-4 h-4" />} value={studentForm.school} onChange={(v) => setStudentForm((p) => ({ ...p, school: v }))} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SelectBox label={isBn ? "বিভাগ" : "Division"} icon={<MapPin className="w-4 h-4" />} value={studentForm.division} onChange={(v) => { const first = getDistrictsForDivision(v)[0] || ""; setStudentForm((p) => ({ ...p, division: v, zila: first, thana: "" })); }} options={DIVISIONS} />
              <SelectBox label={isBn ? "জেলা" : "District"} icon={<Building2 className="w-4 h-4" />} value={studentForm.zila} onChange={(v) => setStudentForm((p) => ({ ...p, zila: v, thana: "" }))} options={zilaOptions} />
              <SelectBox label={isBn ? "থানা/উপজেলা" : "Thana / Upazila"} icon={<Home className="w-4 h-4" />} value={studentForm.thana} onChange={(v) => setStudentForm((p) => ({ ...p, thana: v }))} options={["", ...thanaOptions]} />
            </div>
            <Button onClick={saveStudentInfo} isLoading={savingStudent} className="w-full" leftIcon={<Save className="w-4 h-4" />}>{isBn ? "স্টুডেন্ট ইনফো সেভ" : "Save student info"}</Button>
          </div>
        )}
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


      <div className="glass-card p-4 space-y-2 border border-primary/10">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <SectionTitle icon={<DownloadCloud className="w-4 h-4" />} title={isBn ? "অ্যাপ আপডেট" : "App update"} />
            <p className="text-xs text-gray-500 mt-1">{isBn ? `ইনস্টলড ভার্সন: v${APP_VERSION}` : `Installed version: v${APP_VERSION}`}</p>
          </div>
          <Button onClick={checkForUpdate} isLoading={checkingUpdate} size="sm" className="px-3 py-2 text-xs" leftIcon={<DownloadCloud className="w-3.5 h-3.5" />}>
            {isBn ? "চেক" : "Check"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return <div className="flex items-center gap-2 text-white font-black">{icon}<span>{title}</span></div>;
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/5 p-3 min-w-0"><p className="text-[11px] text-gray-500 mb-1">{label}</p><p className="text-sm font-black text-white truncate">{value}</p></div>;
}

function SelectBox({ label, icon, value, onChange, options }: { label: string; icon: ReactNode; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return <div><label className="block text-xs text-gray-500 mb-1 font-bold">{label}</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span><select required value={value} onChange={(e) => onChange(e.target.value)} className="app-input w-full rounded-xl pl-10 pr-3 py-3 text-sm outline-none border">{options.map((op) => <option key={op || "empty"} value={op} className="bg-surface text-white">{op || "Select"}</option>)}</select></div></div>;
}

function TextInput({ label, icon, value, onChange }: { label: string; icon: ReactNode; value: string; onChange: (value: string) => void }) {
  return <div><label className="block text-xs text-gray-500 mb-1 font-bold">{label}</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="app-input w-full rounded-xl pl-10 pr-3 py-3 text-sm outline-none border" /></div></div>;
}
