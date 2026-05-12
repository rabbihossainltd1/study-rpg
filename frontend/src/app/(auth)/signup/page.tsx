"use client";

import { useState } from "react";
import { navigate } from "@/lib/navigate";
import { Zap, Mail, Lock, User, Eye, EyeOff, Chrome, MapPin, GraduationCap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { signUpEmail, signInWithGoogle, createUserProfile } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

const DISTRICTS = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj"];
const EXAM_MODES = [
  { id: "SSC", label: "SSC", emoji: "📘", desc: "Secondary School Certificate" },
  { id: "HSC", label: "HSC", emoji: "📗", desc: "Higher Secondary Certificate" },
  { id: "Admission", label: "Admission", emoji: "🏫", desc: "University Admission Test" },
  { id: "University", label: "University", emoji: "🎓", desc: "University Level" },
];
const AVATARS = ["🦁", "🐯", "🦊", "🐺", "🦅", "🐉", "🦄", "⚡", "🔥", "💎"];

export default function SignupPage() {
  const { setUser } = useUserStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [examMode, setExamMode] = useState("SSC");
  const [district, setDistrict] = useState("Dhaka");
  const [avatar, setAvatar] = useState("⚡");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) return;
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setStep(2);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const cred = await signUpEmail(email, password);
      const profile = await createUserProfile(cred.user, { username, examMode, district });
      setUser(profile);
      toast.success("Welcome to Study RPG! Your journey begins! ⚡");
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Signup failed";
      toast.error(message.includes("email-already") ? "Email already in use" : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const cred = await signInWithGoogle();
      if (!cred) {
        toast.error("Google signup was cancelled");
        return;
      }
      const profile = await createUserProfile(cred.user, { examMode, district });
      setUser(profile);
      toast.success("Account created! ⚡");
      navigate("/dashboard");
    } catch {
      toast.error("Google signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { label: "Account", icon: Mail },
    { label: "Customize", icon: GraduationCap },
    { label: "Avatar", icon: User },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="font-black text-xl text-white">Study RPG</span>
          </button>
          <h1 className="text-3xl font-black text-white mb-1">Create Account</h1>
          <p className="text-gray-500 text-sm">Join 50,000+ Bangladeshi students</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                step > i + 1 ? "bg-primary border-primary text-black" :
                step === i + 1 ? "border-primary text-primary bg-primary/10" :
                "border-white/20 text-gray-600"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${step === i + 1 ? "text-primary" : "text-gray-600"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`w-8 h-px ${step > i + 1 ? "bg-primary" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <div className="glass-card p-7">
          {step === 1 && (
            <div>
              <Button
                variant="ghost" className="w-full mb-5" size="lg"
                onClick={handleGoogleSignup} isLoading={isLoading}
                leftIcon={<Chrome className="w-5 h-5 text-blue-400" />}
              >
                Sign up with Google
              </Button>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-600">OR</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                      placeholder="coolscholar123" required minLength={3} maxLength={20}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com" required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters" required minLength={6}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Next Step
                </Button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Exam Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  {EXAM_MODES.map((mode) => (
                    <button key={mode.id} type="button" onClick={() => setExamMode(mode.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        examMode === mode.id ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/3 text-gray-400 hover:border-white/20"
                      }`}>
                      <div className="text-2xl mb-1">{mode.emoji}</div>
                      <div className="font-bold text-sm">{mode.label}</div>
                      <div className="text-xs opacity-70">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <MapPin className="w-3 h-3 inline mr-1" />District
                </label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
                  {DISTRICTS.map((d) => <option key={d} value={d} className="bg-surface">{d}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)} rightIcon={<ChevronRight className="w-4 h-4" />}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Choose Your Avatar</label>
                <div className="grid grid-cols-5 gap-3">
                  {AVATARS.map((av) => (
                    <button key={av} type="button" onClick={() => setAvatar(av)}
                      className={`aspect-square rounded-xl text-2xl flex items-center justify-center border transition-all ${
                        avatar === av ? "border-primary bg-primary/10 scale-110 shadow-neon-primary" : "border-white/10 bg-white/3 hover:border-white/20"
                      }`}>
                      {av}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-3xl">
                  {avatar}
                </div>
                <div>
                  <p className="font-bold text-white">{username}</p>
                  <p className="text-sm text-primary">Level 1 · Novice · {examMode}</p>
                  <p className="text-xs text-gray-500">{district}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" onClick={handleSignup} isLoading={isLoading}>
                  <Zap className="w-4 h-4" />
                  Create Account!
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", cursor: "pointer", color: "#39FF14", fontWeight: 600, fontSize: 14, textDecoration: "underline" }}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
