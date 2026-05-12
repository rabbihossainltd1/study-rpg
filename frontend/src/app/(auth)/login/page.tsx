"use client";

import { navigate } from "@/lib/navigate";
import { useState, useEffect } from "react";
import { Zap, Mail, Lock, Eye, EyeOff, Chrome, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  signInWithGoogle,
  signInEmail,
  signInGuest,
  createUserProfile,
  getUserProfile,
  auth,
  isNativeApp,
} from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { setUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const log = (msg: string) => {
    console.log("[StudyRPG]", msg);
    setDebugLog(prev => [...prev.slice(-4), msg]);
  };

  useEffect(() => {
    log("App loaded. Native: " + isNativeApp());
    log("Auth domain: " + (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hardcoded"));
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    log("Trying email login...");
    try {
      const cred = await signInEmail(email, password);
      log("Auth OK: " + cred.user.uid);
      const profile = await getUserProfile(cred.user.uid);
      log("Profile: " + (profile ? "found" : "not found"));
      if (profile) {
        setUser(profile);
        toast.success("Welcome back! 🎮");
        navigate("/dashboard");
      } else {
        toast.error("Profile not found. Please sign up.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      log("ERROR: " + message);
      toast.error(message.slice(0, 80));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    log("Trying Google login...");
    try {
      const cred = await signInWithGoogle();
      if (!cred) { log("No cred returned"); return; }
      log("Google auth OK");
      let profile = await getUserProfile((cred as any).user.uid);
      if (!profile) profile = await createUserProfile((cred as any).user);
      setUser(profile);
      toast.success("Welcome! ⚡");
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      log("Google ERROR: " + message);
      toast.error(message.slice(0, 80));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    log("Trying guest login...");
    try {
      const cred = await signInGuest();
      log("Guest auth OK: " + cred.user.uid);
      const profile = await createUserProfile(cred.user, {
        username: `Guest_${Math.floor(Math.random() * 9999)}`,
      });
      log("Guest profile created");
      setUser(profile);
      toast.success("Playing as Guest 👻");
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      log("Guest ERROR: " + message);
      toast.error(message.slice(0, 80));
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
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

        {/* Debug Panel */}
        {debugLog.length > 0 && (
          <div style={{ background: "#0a0a0a", border: "1px solid #333", borderRadius: 10, padding: 10, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <AlertCircle size={12} color="#f59e0b" />
              <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>Debug Log</span>
            </div>
            {debugLog.map((msg, i) => (
              <p key={i} style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace", margin: "2px 0" }}>{msg}</p>
            ))}
          </div>
        )}

        <div className="glass-card p-7 space-y-5">
          <Button variant="ghost" className="w-full" size="lg" onClick={handleGoogleLogin} isLoading={googleLoading} leftIcon={<Chrome className="w-5 h-5 text-blue-400" />}>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

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
            👻 Continue as Guest
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
