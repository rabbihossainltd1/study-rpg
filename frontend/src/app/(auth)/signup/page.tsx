"use client";

import { useMemo, useState, useEffect, type FormEvent, type ReactNode } from "react";
import { navigate } from "@/lib/navigate";
import { Zap, Mail, Lock, User, Eye, EyeOff, MapPin, GraduationCap, ChevronRight, School, Home, ImagePlus, Languages, SunMoon, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AppIcon } from "@/components/ui/AppIcon";
import { signUpEmail, signInGuest, createUserProfile, isUsernameAvailable, normalizePublicUsername } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import { CLASS_OPTIONS, SSC_COMBINED_CLASS, DIVISIONS, getDistrictsForDivision, getThanasForZila, deriveExamModeFromClass, needsEducationGroup, EDUCATION_GROUPS } from "@/lib/bdAddress";
import toast from "react-hot-toast";

const AVATARS = ["zap", "book", "target", "trophy", "gem", "rocket", "brain", "notebook", "star", "bot", "graduation", "shield"];
const getRandomAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)];
const usernamePattern = /^[a-z0-9_.]{3,20}$/;
const gmailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;
const makeGuestUsername = () => normalizePublicUsername(`guest_${Date.now().toString(36).slice(-6)}_${Math.floor(100 + Math.random() * 900)}`).slice(0, 20);

type ThemeChoice = "dark" | "light";
type LangChoice = "bn" | "en";

async function compressProfileImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Image read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 260;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Image processing failed"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  });
}

export default function SignupPage() {
  const { setUser, setTheme, setLanguage } = useUserStore();
  const [isGuestSignup, setIsGuestSignup] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [className, setClassName] = useState<string>(SSC_COMBINED_CLASS);
  const [groupName, setGroupName] = useState("Science");
  const [college, setCollege] = useState("");
  const [division, setDivision] = useState("Khulna");
  const [zila, setZila] = useState("Jhenaidah");
  const [thana, setThana] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [avatar, setAvatar] = useState(() => getRandomAvatar());
  const [photoURL, setPhotoURL] = useState("");
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>("light");
  const [languageChoice, setLanguageChoice] = useState<LangChoice>("bn");

  useEffect(() => {
    const guestMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("guest") === "1";
    setIsGuestSignup(guestMode);
    if (guestMode) {
      const guestName = makeGuestUsername();
      setStep(2);
      setUsername(guestName);
      setDisplayName((v) => v || "");
      setEmail("");
      setPassword("");
    }
  }, []);

  const zilaOptions = useMemo(() => getDistrictsForDivision(division), [division]);
  const thanaOptions = useMemo(() => getThanasForZila(zila), [zila]);
  const showGroup = needsEducationGroup(className);

  const cleanUsername = normalizePublicUsername(username.trim().toLowerCase());
  const cleanEmail = email.trim().toLowerCase();

  const handleStep1 = async (e: FormEvent) => {
    e.preventDefault();
    if (!usernamePattern.test(cleanUsername)) {
      toast.error("Username 3-20 character, only a-z, 0-9, _ or .");
      return;
    }
    if (!gmailPattern.test(cleanEmail)) {
      toast.error("Only real Gmail address allowed");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setCheckingUsername(true);
    try {
      const available = await isUsernameAvailable(cleanUsername);
      if (!available) {
        toast.error("এই username already used. অন্য username দাও।");
        return;
      }
      setUsername(cleanUsername);
      setEmail(cleanEmail);
      setStep(2);
    } catch {
      toast.error("Username check failed. Internet connection check koro.");
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleStep2 = (e: FormEvent) => {
    e.preventDefault();
    const requiredStudentFieldsMissing = !isGuestSignup && (!displayName.trim() || !college.trim());
    if (requiredStudentFieldsMissing || !className.trim() || !division.trim() || !zila.trim() || !thana.trim()) {
      toast.error(isGuestSignup ? "Class and address select করো" : "সব তথ্য পূরণ করো");
      return;
    }
    if (!DIVISIONS.includes(division)) {
      toast.error("Division list থেকে select করো");
      return;
    }
    if (!getDistrictsForDivision(division).includes(zila)) {
      toast.error("Selected division অনুযায়ী zila select করো");
      return;
    }
    if (!getThanasForZila(zila).includes(thana)) {
      toast.error("Selected zila অনুযায়ী thana select করো");
      return;
    }
    if (showGroup && !EDUCATION_GROUPS.includes(groupName as any)) {
      toast.error("Group select করো");
      return;
    }
    setStep(3);
  };

  const handlePhotoPick = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Only image file allowed");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image size 5MB er niche dao");
    try {
      setPhotoURL(await compressProfileImage(file));
      toast.success("Profile photo selected");
    } catch {
      toast.error("Image process failed");
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      setTheme(themeChoice);
      setLanguage(languageChoice);
      const examMode = deriveExamModeFromClass(className);
      const cred = isGuestSignup ? await signInGuest() : await signUpEmail(cleanEmail, password);
      const finalGuestUsername = isGuestSignup ? (cleanUsername || makeGuestUsername()) : cleanUsername;
      const finalDisplayName = displayName.trim() || (isGuestSignup ? "Guest Student" : cleanUsername);
      const institutionName = college.trim();
      const profile = await createUserProfile(cred.user, {
        username: isGuestSignup ? finalGuestUsername : cleanUsername,
        displayName: finalDisplayName,
        examMode,
        division,
        zila,
        district: zila,
        school: institutionName,
        college: institutionName,
        className,
        groupName: showGroup ? groupName : "General",
        thana,
        avatar,
        photoURL,
        language: languageChoice,
        theme: themeChoice,
      });
      setUser({ ...profile, language: languageChoice, theme: themeChoice });
      toast.success(languageChoice === "bn" ? "অ্যাকাউন্ট তৈরি হয়েছে" : "Account created successfully");
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Signup failed";
      if (message.includes("username-already-used")) toast.error("Username already used");
      else if (message.includes("email-already")) toast.error("Email already in use");
      else if (message.includes("invalid-email")) toast.error("Invalid Gmail address");
      else toast.error("Signup failed. Internet and Firebase Auth check koro.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = isGuestSignup ? [2, 3, 4] : [1, 2, 3, 4];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 particle-bg">
      <div className="w-full max-w-md animate-card-in">
        <div className="text-center mb-6">
          <button onClick={() => navigate("/login")} className="inline-flex items-center gap-2 mb-4 bg-transparent border-0 cursor-pointer tap-bounce">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center animate-float-soft"><Zap className="w-6 h-6 text-primary" /></div>
            <span className="font-black text-2xl text-white">Study RPG</span>
          </button>
          <h1 className="text-3xl font-black text-white mb-1">{isGuestSignup ? "Create Guest Profile" : "Create Account"}</h1>
          <p className="text-gray-500 text-sm">{isGuestSignup ? "class → address → avatar → interface" : "Secure account → student profile → avatar → interface"}</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-5">
          {steps.map((n, index) => (
            <div key={n} className={`w-11 h-11 rounded-full border flex items-center justify-center text-sm font-black transition-all ${step === n ? "border-primary bg-primary text-black shadow-neon-primary" : step > n ? "border-primary/50 bg-primary/10 text-primary" : "border-white/10 bg-white/5 text-gray-600"}`}>
              {step > n ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
            </div>
          ))}
        </div>

        <div className="glass-card p-5 sm:p-6 hover-lift">
          {!isGuestSignup && step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4 animate-card-in">
              <Input label="Username" icon={<User className="w-4 h-4" />} value={username} onChange={(v) => setUsername(v.toLowerCase().replace(/\s+/g, ""))} placeholder="rabbihossain" minLength={3} />
              <p className="text-[11px] text-gray-600 -mt-2">One username can be used by one student only.</p>
              <Input label="Gmail" icon={<Mail className="w-4 h-4" />} value={email} onChange={(v) => setEmail(v.toLowerCase())} placeholder="yourname@gmail.com" type="email" />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" isLoading={checkingUsername} rightIcon={<ChevronRight className="w-4 h-4" />}>Next Step</Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4 animate-card-in">
              <Input label={isGuestSignup ? "Student Name (optional)" : "Full Name"} icon={<User className="w-4 h-4" />} value={displayName} onChange={setDisplayName} placeholder={isGuestSignup ? "Guest Student" : "Your full name"} required={!isGuestSignup} />
              <SelectBox label="Class" icon={<GraduationCap className="w-4 h-4" />} value={className} onChange={(v) => { setClassName(v); if (!needsEducationGroup(v)) setGroupName("General"); else if (groupName === "General") setGroupName("Science"); }} options={[...CLASS_OPTIONS]} />
              {showGroup && <SelectBox label="Group / Subject" icon={<GraduationCap className="w-4 h-4" />} value={groupName} onChange={setGroupName} options={["Science", "Humanities", "Business Studies"]} />}
              <Input label={isGuestSignup ? "School / College / University (optional)" : "School / College / University"} icon={<School className="w-4 h-4" />} value={college} onChange={setCollege} placeholder="Institution name" required={!isGuestSignup} />
              <div className="grid grid-cols-1 gap-3">
                <SelectBox label="Division" icon={<MapPin className="w-4 h-4" />} value={division} onChange={(v) => { setDivision(v); const first = getDistrictsForDivision(v)[0] || ""; setZila(first); setThana(""); }} options={DIVISIONS} />
                <SelectBox label="Zila / District" icon={<Building2 className="w-4 h-4" />} value={zila} onChange={(v) => { setZila(v); setThana(""); }} options={zilaOptions} />
                <SelectBox label="Thana / Upazila" icon={<Home className="w-4 h-4" />} value={thana} onChange={setThana} options={["", ...thanaOptions]} />
              </div>
              <div className="flex gap-3 pt-1"><Button variant="ghost" className="flex-1" onClick={() => isGuestSignup ? navigate("/login") : setStep(1)}>Back</Button><Button type="submit" className="flex-1" rightIcon={<ChevronRight className="w-4 h-4" />}>Next</Button></div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-card-in">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="mx-auto mb-3 w-20 h-20 rounded-full border-2 border-primary/60 overflow-hidden bg-primary/10 flex items-center justify-center">{photoURL ? <img src={photoURL} alt="Profile" className="w-full h-full object-cover" /> : <AppIcon name={avatar} className="w-9 h-9 text-primary" />}</div>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-secondary/30 text-secondary text-sm font-bold cursor-pointer hover:bg-secondary/10"><ImagePlus className="w-4 h-4" /> Gallery Photo<input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoPick(e.target.files?.[0])} /></label>
                <p className="text-xs text-gray-500 mt-2">Photo optional. Icon select korleo hobe.</p>
              </div>
              <div><label className="block text-sm font-medium text-gray-400 mb-3">Or choose icon</label><div className="grid grid-cols-6 gap-2">{AVATARS.map((av) => <button key={av} type="button" onClick={() => { setAvatar(av); setPhotoURL(""); }} className={`aspect-square rounded-xl flex items-center justify-center border transition-all duration-300 tap-bounce ${!photoURL && avatar === av ? "border-primary bg-primary/10 scale-105 shadow-neon-primary" : "border-white/10 bg-white/3 hover:border-white/20"}`}><AppIcon name={av} className="w-5 h-5" /></button>)}</div></div>
              <div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setStep(2)}>Back</Button><Button className="flex-1" onClick={() => setStep(4)}>Next</Button></div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-card-in">
              <div><p className="text-sm font-bold text-white mb-2 flex items-center gap-2"><SunMoon className="w-4 h-4 text-primary" /> UI Theme</p><div className="grid grid-cols-2 gap-3"><Choice active={themeChoice === "light"} title="Light" desc="Default clean" onClick={() => setThemeChoice("light")} /><Choice active={themeChoice === "dark"} title="Dark" desc="AMOLED style" onClick={() => setThemeChoice("dark")} /></div></div>
              <div><p className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Languages className="w-4 h-4 text-secondary" /> Language</p><div className="grid grid-cols-2 gap-3"><Choice active={languageChoice === "bn"} title="বাংলা" desc="Default" onClick={() => setLanguageChoice("bn")} /><Choice active={languageChoice === "en"} title="English" desc="Full English UI" onClick={() => setLanguageChoice("en")} /></div></div>
              <div className="glass rounded-xl p-3 flex items-center gap-3 border border-primary/10"><CheckCircle2 className="w-5 h-5 text-primary" /><p className="text-xs text-gray-500">Account ready. You can change these later from Settings.</p></div>
              <div className="flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setStep(3)}>Back</Button><Button className="flex-1" onClick={handleSignup} isLoading={isLoading}><Zap className="w-4 h-4" />Create</Button></div>
            </div>
          )}
          <p className="text-center text-sm text-gray-600 mt-5">Already have an account? <button onClick={() => navigate("/login")} className="bg-transparent border-0 cursor-pointer text-primary font-semibold underline">Sign In</button></p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, value, onChange, placeholder, type = "text", minLength, required = true }: { label: string; icon: ReactNode; value: string; onChange: (value: string) => void; placeholder: string; type?: string; minLength?: number; required?: boolean; }) {
  return <div><label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} minLength={minLength} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all" /></div></div>;
}

function SelectBox({ label, icon, value, onChange, options }: { label: string; icon: ReactNode; value: string; onChange: (value: string) => void; options: string[] }) {
  return <div><label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span><select required value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-primary/50">{options.map((op) => <option key={op || "empty"} value={op} className="bg-surface text-white">{op || "Select"}</option>)}</select></div></div>;
}

function Choice({ active, title, desc, onClick }: { active: boolean; title: string; desc: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`p-4 rounded-2xl border text-left tap-bounce ${active ? "border-primary bg-primary/10" : "border-white/10 bg-white/5"}`}><p className={`font-black ${active ? "text-primary" : "text-white"}`}>{title}</p><p className="text-xs text-gray-500 mt-1">{desc}</p></button>;
}
