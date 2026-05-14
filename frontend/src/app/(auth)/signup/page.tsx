"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { navigate } from "@/lib/navigate";
import { Zap, Mail, Lock, User, Eye, EyeOff, MapPin, GraduationCap, ChevronRight, School, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AppIcon } from "@/components/ui/AppIcon";
import { signUpEmail, createUserProfile } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

const DISTRICTS = [
  "Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Rangpur", "Mymensingh",
  "Cumilla", "Gazipur", "Jessore", "Jhenaidah", "Pirojpur", "Narayanganj", "Bogura", "Faridpur"
];
const EXAM_MODES = [
  { id: "SSC", label: "SSC", desc: "School level" },
  { id: "HSC", label: "HSC", desc: "College level" },
  { id: "Admission", label: "Admission", desc: "University admission" },
  { id: "University", label: "University", desc: "Honours / Degree" },
];
const AVATARS = ["zap", "fire", "book", "target", "trophy", "gem", "rocket", "brain", "notebook", "star", "bot", "graduation", "sparkles", "shield"];
const getRandomAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)];

export default function SignupPage() {
  const { setUser } = useUserStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [className, setClassName] = useState("");
  const [college, setCollege] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [thana, setThana] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [examMode, setExamMode] = useState("SSC");
  const [avatar, setAvatar] = useState(() => getRandomAvatar());

  const handleStep1 = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) return;
    if (username.trim().length < 3) { toast.error("Username minimum 3 characters"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setStep(2);
  };

  const handleStep2 = (e: FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !className.trim() || !college.trim() || !district.trim() || !thana.trim()) {
      toast.error("সব তথ্য পূরণ করো");
      return;
    }
    setStep(3);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const cred = await signUpEmail(email, password);
      const profile = await createUserProfile(cred.user, {
        username: username.trim(),
        displayName: displayName.trim(),
        examMode,
        district: district.trim(),
        school: college.trim(),
        college: college.trim(),
        className: className.trim(),
        thana: thana.trim(),
        avatar,
      });
      setUser(profile);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Signup failed";
      toast.error(message.includes("email-already") ? "Email already in use" : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = ["Account", "Student Info", "Avatar"];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 particle-bg">
      <div className="w-full max-w-md animate-card-in">
        <div className="text-center mb-7">
          <button onClick={() => navigate("/login")} className="inline-flex items-center gap-2 mb-4 bg-transparent border-0 cursor-pointer tap-bounce">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center animate-float-soft">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-2xl text-white">Study RPG</span>
          </button>
          <h1 className="text-3xl font-black text-white mb-1">Create Account</h1>
          <p className="text-gray-500 text-sm">প্রথমে অ্যাকাউন্ট, তারপর স্টুডেন্ট প্রোফাইল</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
                step > i + 1 ? "bg-primary border-primary text-black" :
                step === i + 1 ? "border-primary text-primary bg-primary/10 scale-110" :
                "border-white/20 text-gray-600"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-10 h-px ${step > i + 1 ? "bg-primary" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <div className="glass-card p-7 hover-lift">
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4 animate-card-in">
              <Input label="Username" icon={<User className="w-4 h-4" />} value={username} onChange={setUsername} placeholder="rabbihossainltd" minLength={3} />
              <Input label="Email" icon={<Mail className="w-4 h-4" />} value={email} onChange={setEmail} placeholder="your@email.com" type="email" />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" rightIcon={<ChevronRight className="w-4 h-4" />}>Next Step</Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4 animate-card-in">
              <Input label="Student Name" icon={<User className="w-4 h-4" />} value={displayName} onChange={setDisplayName} placeholder="Your full name" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Class" icon={<GraduationCap className="w-4 h-4" />} value={className} onChange={setClassName} placeholder="SSC / HSC / Honours" />
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Mode</label>
                  <select value={examMode} onChange={(e) => setExamMode(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-primary/50">
                    {EXAM_MODES.map((m) => <option key={m.id} value={m.id} className="bg-surface">{m.label}</option>)}
                  </select>
                </div>
              </div>
              <Input label="School / College / University" icon={<School className="w-4 h-4" />} value={college} onChange={setCollege} placeholder="Institution name" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5"><MapPin className="w-3 h-3 inline mr-1" />District</label>
                  <input list="districts" value={district} onChange={(e) => setDistrict(e.target.value)} required placeholder="District"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50" />
                  <datalist id="districts">{DISTRICTS.map((d) => <option key={d} value={d} />)}</datalist>
                </div>
                <Input label="Thana" icon={<Home className="w-4 h-4" />} value={thana} onChange={setThana} placeholder="Thana" />
              </div>
              <div className="flex gap-3 pt-1">
                <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" className="flex-1" rightIcon={<ChevronRight className="w-4 h-4" />}>Next</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-card-in">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Choose Avatar</label>
                <div className="grid grid-cols-5 gap-3">
                  {AVATARS.map((av) => (
                    <button key={av} type="button" onClick={() => setAvatar(av)} className={`aspect-square rounded-xl text-2xl flex items-center justify-center border transition-all duration-300 tap-bounce ${
                      avatar === av ? "border-primary bg-primary/10 scale-110 shadow-neon-primary" : "border-white/10 bg-white/3 hover:border-white/20"
                    }`}>
                      <AppIcon name={av} className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-4 flex items-center gap-4 border border-primary/10">
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"><AppIcon name={avatar} className="w-7 h-7 text-primary" /></div>
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">{displayName || username}</p>
                  <p className="text-sm text-primary">Level 1 · Novice · {examMode}</p>
                  <p className="text-xs text-gray-500 truncate">{college} · {district}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" onClick={handleSignup} isLoading={isLoading}><Zap className="w-4 h-4" />Create</Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="bg-transparent border-0 cursor-pointer text-primary font-semibold underline">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, value, onChange, placeholder, type = "text", minLength }: {
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  minLength?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required minLength={minLength}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all" />
      </div>
    </div>
  );
}
