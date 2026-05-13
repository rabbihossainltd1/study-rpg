"use client";

import { navigate } from "@/lib/navigate";
import { useState } from "react";
import { Zap, Trophy, Users, Star, Play } from "lucide-react";
import { signInGuest, createUserProfile, createLocalGuestProfile } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";

const STATS = [
  { value: "50K+", label: "Active Students", labelBn: "সক্রিয় শিক্ষার্থী" },
  { value: "8", label: "Core Subjects", labelBn: "মূল বিষয়" },
  { value: "500+", label: "Quiz Questions", labelBn: "কুইজ প্রশ্ন" },
  { value: "99%", label: "Satisfaction", labelBn: "সন্তুষ্টি" },
];

const FEATURES = [
  { icon: "⚡", title: "XP & Leveling", titleBn: "এক্সপি ও লেভেলিং", desc: "Earn XP for every lesson, quiz, and challenge. Level up your scholar rank from Novice to Legend.", color: "#39FF14" },
  { icon: "🎯", title: "Daily Missions", titleBn: "দৈনিক মিশন", desc: "Complete daily and weekly missions to earn bonus XP, coins, and exclusive rewards.", color: "#00F0FF" },
  { icon: "🏆", title: "Leaderboard", titleBn: "লিডারবোর্ড", desc: "Compete globally, by district, and with friends. Rise to the top of the leaderboard.", color: "#FFD700" },
  { icon: "🤖", title: "AI Study Tutor", titleBn: "এআই টিউটর", desc: "Get instant explanations in Bangla and English. Your personal AI tutor available 24/7.", color: "#BF5FFF" },
  { icon: "📚", title: "SSC/HSC Ready", titleBn: "SSC/HSC প্রস্তুতি", desc: "Comprehensive curriculum for SSC, HSC, and university admission with previous year questions.", color: "#FF003C" },
  { icon: "⏱️", title: "Focus Mode", titleBn: "ফোকাস মোড", desc: "Pomodoro timer with XP bonuses. Block distractions and maximize your study sessions.", color: "#FF8C00" },
];

const LEADERBOARD_PREVIEW = [
  { rank: 1, name: "Rahima Sultana", district: "Dhaka", xp: 48750, level: 42 },
  { rank: 2, name: "Ariful Islam", district: "Chittagong", xp: 45200, level: 39 },
  { rank: 3, name: "Nusrat Jahan", district: "Sylhet", xp: 41800, level: 37 },
  { rank: 4, name: "Tanvir Ahmed", district: "Rajshahi", xp: 38500, level: 35 },
  { rank: 5, name: "Fatema Khanam", district: "Khulna", xp: 35100, level: 32 },
];

export default function LandingPage() {
  const { setUser } = useUserStore();
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    const username = `Guest_${Math.floor(Math.random() * 9999)}`;
    try {
      const cred = await signInGuest();
      const profile = await createUserProfile(cred.user, { username });
      setUser(profile);
      toast.success("Playing as Guest 👻");
      navigate("/dashboard");
    } catch (err: unknown) {
      console.warn("Guest login failed, using offline guest", err);
      const profile = createLocalGuestProfile({ username });
      setUser(profile);
      toast.success("Playing as Guest 👻");
      navigate("/dashboard");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div style={{ background: "#050505", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(5,5,5,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} color="#39FF14" />
            </div>
            <span style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>Study RPG</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 600, fontSize: 14,
                cursor: "pointer"
              }}>Sign In</button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                padding: "8px 16px", borderRadius: 10, background: "#39FF14",
                color: "#000", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer"
              }}>Get Started →</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "60px 16px 40px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
          borderRadius: 100, border: "1px solid rgba(57,255,20,0.3)", background: "rgba(57,255,20,0.05)",
          color: "#39FF14", fontSize: 13, fontWeight: 600, marginBottom: 24
        }}>
          <Star size={14} fill="#39FF14" />
          Bangladesh&apos;s #1 Gamified Study Platform
        </div>

        <h1 style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 }}>
          STUDY LIKE A{" "}
          <span style={{ background: "linear-gradient(135deg,#39FF14,#00F0FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            LEGEND
          </span>
        </h1>

        <p style={{ fontSize: 16, color: "#9CA3AF", maxWidth: 500, margin: "0 auto 8px", lineHeight: 1.6 }}>
          পড়াশোনাকে গেমের মতো মজাদার করো। XP অর্জন করো, লেভেল আপ করো, বন্ধুদের সাথে প্রতিযোগিতা করো।
        </p>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 32 }}>
          Turn studying into an addictive RPG adventure.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/signup")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", maxWidth: 280, padding: "14px 24px", borderRadius: 14,
              background: "#39FF14", color: "#000", fontWeight: 700, fontSize: 16,
              border: "none", cursor: "pointer", boxShadow: "0 0 30px rgba(57,255,20,0.3)"
            }}>
            <Zap size={20} /> Start Your Journey — Free
          </button>
          <button
            onClick={handleGuestLogin}
            disabled={guestLoading}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", maxWidth: 280, padding: "14px 24px", borderRadius: 14,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: guestLoading ? "#6B7280" : "#fff", fontWeight: 600, fontSize: 16,
              cursor: guestLoading ? "not-allowed" : "pointer"
            }}>
            <Play size={18} /> {guestLoading ? "Loading..." : "Continue as Guest"}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 400, margin: "40px auto 0" }}>
          {STATS.map((stat) => (
            <div key={stat.value} style={{
              background: "rgba(18,18,18,0.98)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "16px 12px", textAlign: "center"
            }}>
              <p style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(135deg,#39FF14,#00F0FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "40px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#39FF14", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Features</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
            Everything You Need to{" "}
            <span style={{ background: "linear-gradient(135deg,#39FF14,#00F0FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Dominate Your Exams
            </span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 700, margin: "0 auto" }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{
              background: "rgba(18,18,18,0.98)", border: `1px solid ${f.color}15`,
              borderRadius: 16, padding: 16
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <p style={{ fontWeight: 700, color: "#fff", fontSize: 13, marginBottom: 2 }}>{f.title}</p>
              <p style={{ fontSize: 11, color: f.color, marginBottom: 6 }}>{f.titleBn}</p>
              <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section style={{ padding: "40px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#00F0FF", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Leaderboard</p>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>Who&apos;s on Top?</h2>
        </div>

        <div style={{ maxWidth: 500, margin: "0 auto", background: "rgba(18,18,18,0.98)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
            <Trophy size={16} color="#FFD700" />
            <span style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>Global Leaderboard</span>
          </div>
          {LEADERBOARD_PREVIEW.map((e) => (
            <div key={e.rank} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.04)"
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 12,
                background: e.rank === 1 ? "rgba(255,215,0,0.15)" : e.rank === 2 ? "rgba(192,192,192,0.15)" : e.rank === 3 ? "rgba(205,127,50,0.15)" : "rgba(255,255,255,0.05)",
                color: e.rank === 1 ? "#FFD700" : e.rank === 2 ? "#C0C0C0" : e.rank === 3 ? "#CD7F32" : "#6B7280"
              }}>
                {e.rank === 1 ? "👑" : e.rank}
              </div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#39FF14", fontSize: 14 }}>
                {e.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>{e.name}</p>
                <p style={{ fontSize: 11, color: "#6B7280" }}>{e.district} · LV.{e.level}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#39FF14" }}>{e.xp.toLocaleString()} XP</span>
            </div>
          ))}
          <div style={{ padding: 14, textAlign: "center" }}>
            <button
              onClick={() => navigate("/signup")}
              style={{
                padding: "8px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 600, fontSize: 13,
                cursor: "pointer"
              }}>Join & Compete →</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "40px 16px 60px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Ready to Level Up?</h2>
        <p style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 32 }}>
          তোমার পড়াশোনার যাত্রা শুরু করো আজই।<br />সম্পূর্ণ বিনামূল্যে!
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/signup")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", maxWidth: 280, padding: "16px 24px", borderRadius: 14,
              background: "#39FF14", color: "#000", fontWeight: 700, fontSize: 17,
              border: "none", cursor: "pointer", boxShadow: "0 0 40px rgba(57,255,20,0.35)"
            }}>
            <Zap size={22} /> শুরু করো — এখনই!
          </button>
          <button
            onClick={handleGuestLogin}
            disabled={guestLoading}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", maxWidth: 280, padding: "16px 24px", borderRadius: 14,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: guestLoading ? "#6B7280" : "#fff", fontWeight: 600, fontSize: 17,
              cursor: guestLoading ? "not-allowed" : "pointer"
            }}>
            <Users size={18} /> {guestLoading ? "Loading..." : "Guest Mode"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 16px", textAlign: "center", background: "rgba(5,5,5,0.95)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <Zap size={18} color="#39FF14" />
          <span style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>Study RPG</span>
        </div>
        <p style={{ fontSize: 12, color: "#374151" }}>© {new Date().getFullYear()} Study RPG. Built for Bangladeshi students.</p>
      </footer>
    </div>
  );
}
