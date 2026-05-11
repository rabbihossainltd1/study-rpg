"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  signInWithGoogle,
  signInEmail,
  signInGuest,
  createUserProfile,
  getUserProfile,
} from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const cred = await signInEmail(email, password);
      const profile = await getUserProfile(cred.user.uid);
      if (profile) {
        setUser(profile);
        toast.success("Welcome back! 🎮");
        router.push("/dashboard");
      } else {
        toast.error("Profile not found. Please sign up.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message.includes("wrong-password") ? "Wrong password" : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const cred = await signInWithGoogle();
      let profile = await getUserProfile(cred.user.uid);
      if (!profile) {
        profile = await createUserProfile(cred.user);
      }
      setUser(profile);
      toast.success("Welcome to Study RPG! ⚡");
      router.push("/dashboard");
    } catch {
      toast.error("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    try {
      const cred = await signInGuest();
      const profile = await createUserProfile(cred.user, { username: `Guest_${Math.floor(Math.random() * 9999)}` });
      setUser(profile);
      toast.success("Playing as Guest 👻");
      router.push("/dashboard");
    } catch {
      toast.error("Guest login failed");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-neon-primary">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-2xl text-white">Study RPG</span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-500">Continue your learning journey</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-7 space-y-5"
        >
          {/* Google */}
          <Button
            variant="ghost"
            className="w-full"
            size="lg"
            onClick={handleGoogleLogin}
            isLoading={googleLoading}
            leftIcon={<Chrome className="w-5 h-5 text-blue-400" />}
          >
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email Form */}
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
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              <Zap className="w-4 h-4" />
              Sign In
            </Button>
          </form>

          {/* Guest */}
          <Button
            variant="ghost"
            className="w-full text-gray-500 hover:text-white"
            onClick={handleGuestLogin}
            isLoading={guestLoading}
          >
            👻 Continue as Guest
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign Up Free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
