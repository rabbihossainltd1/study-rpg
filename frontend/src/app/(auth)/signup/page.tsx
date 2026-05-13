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

      if (!cred?.user) {
        throw new Error("No user returned");
      }

      const profile = await createUserProfile(cred.user, {
        username: cred.user.displayName || "Student",
        examMode,
        district,
      });

      setUser(profile);

      toast.success("Google signup success! ⚡");

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Google signup error:", err);

      toast.error(
        err?.message ||
        err?.toString() ||
        "Google signup failed"
      );
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
      </div>
    </div>
  );
}
