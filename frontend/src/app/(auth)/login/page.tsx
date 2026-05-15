"use client";

import { navigate } from "@/lib/navigate";
import { useState, useEffect, type FormEvent } from "react";
import { Zap, Mail, Lock, Eye, EyeOff, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  signInEmail,
  signInGuest,
  createUserProfile,
  getUserProfile,
  createLocalGuestProfile,
} from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { user, setUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const cred = await signInEmail(email, password);
      const profile = await getUserProfile(cred.user.uid);
      if (profile) {
        setUser(profile);
        toast.success("Welcome back");
        navigate("/dashboard");
      } else {
        toast.error("Profile not found. Please sign up.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message.includes("invalid-credential") || message.includes("wrong-password")
        ? "Invalid email or password"
        : message.slice(0, 80));
    } finally {
      setIsLoading(false);
    }
  };


  const handleGuestLogin = async () => {
    setGuestLoading(true);
    try {
      navigate("/signup?guest=1");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 particle-bg">
      <div className="w-full max-w-md animate-card-in">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/login")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-2xl text-white">Study RPG</span>
          </button>
          <h1 className="text-3xl font-black text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-500">Continue your learning journey</p>
        </div>

        <div className="glass-card p-7 space-y-5 hover-lift">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              <Zap className="w-4 h-4" /> Sign In
            </Button>
          </form>

          <Button variant="ghost" className="w-full text-gray-500 hover:text-white" onClick={handleGuestLogin} isLoading={guestLoading}>
            <UserRound className="w-4 h-4" /> Continue as Guest
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button onClick={() => navigate("/signup")} style={{ background: "none", border: "none", cursor: "pointer", color: "#39FF14", fontWeight: 600, fontSize: 14, textDecoration: "underline" }}>
              Sign Up Free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
