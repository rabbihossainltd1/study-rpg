"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { logOut } from "@/lib/firebase";
import { navigate } from "@/lib/navigate";
import { XpBar } from "@/components/ui/XpBar";
import { RANK_COLORS } from "@/types";
import {
  LayoutDashboard, BookOpen, Trophy, Bot, Timer,
  Target, User, LogOut, Zap, Menu, X, ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", labelBn: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { href: "/subjects", label: "Subjects", labelBn: "বিষয়সমূহ", icon: BookOpen },
  { href: "/missions", label: "Missions", labelBn: "মিশন", icon: Target },
  { href: "/leaderboard", label: "Leaderboard", labelBn: "লিডারবোর্ড", icon: Trophy },
  { href: "/ai-assistant", label: "AI Tutor", labelBn: "এআই টিউটর", icon: Bot },
  { href: "/focus", label: "Focus Mode", labelBn: "ফোকাস মোড", icon: Timer },
  { href: "/profile", label: "Profile", labelBn: "প্রোফাইল", icon: User },
];

export function Sidebar() {
  const { user, language, reset } = useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const rankColor = user ? RANK_COLORS[user.rank] : "#39FF14";
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  const handleLogout = async () => {
    await logOut().catch(() => {});
    reset();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={() => { navigate("/dashboard"); setMobileOpen(false); }}
          style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", width: "100%" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={20} color="#39FF14" />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: 900, color: "#fff", fontSize: 17, margin: 0, lineHeight: 1 }}>Study RPG</p>
            <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>Level Up Learning</p>
          </div>
        </button>
      </div>

      {/* User Card */}
      {user && (
        <div style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, border: `2px solid ${rankColor}`, background: `${rankColor}20`, color: rankColor, overflow: "hidden" }}>
              {user.photoURL ? <img src={user.photoURL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.avatar || user.displayName?.charAt(0).toUpperCase() || "⚡"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: "#fff", fontSize: 13, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.username}</p>
              <p style={{ fontSize: 11, color: rankColor, margin: 0 }}>{user.rank}</p>
            </div>
          </div>
          <XpBar currentXp={user.xp} totalXp={user.xp} level={user.level} rank={user.rank} compact />
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");
          return (
            <button key={item.href} onClick={() => { navigate(item.href); setMobileOpen(false); }}
              className="tap-bounce"
              style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%",
                padding: "10px 12px", borderRadius: 12, marginBottom: 4,
                background: isActive ? "rgba(57,255,20,0.08)" : "transparent",
                border: isActive ? "1px solid rgba(57,255,20,0.2)" : "1px solid transparent",
                color: isActive ? "#39FF14" : "#9CA3AF",
                fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left"
              }}>
              <Icon size={18} color={isActive ? "#39FF14" : "#6B7280"} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{language === "bn" ? item.labelBn : item.label}</span>
              {isActive && <ChevronRight size={14} color="#39FF14" />}
            </button>
          );
        })}
      </nav>

      {/* Stats + Logout */}
      {user && (
        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px", display: "flex", justifyContent: "space-around", marginBottom: 8 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#FFD700", margin: 0 }}>🪙 {user.coins}</p>
              <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Coins</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#BF5FFF", margin: 0 }}>💎 {user.gems}</p>
              <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Gems</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#FB923C", margin: 0 }}>🔥 {user.streak}</p>
              <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Streak</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
            borderRadius: 10, background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer"
          }}>
            <LogOut size={15} />
            {language === "bn" ? "লগ আউট" : "Log Out"}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside style={{
        display: "none", width: 256, background: "rgba(10,10,10,0.98)", borderRight: "1px solid rgba(255,255,255,0.06)",
        position: "fixed", left: 0, top: 0, height: "100vh", zIndex: 40, flexDirection: "column"
      }} className="lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: "rgba(5,5,5,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)"
      }} className="lg:hidden">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setMobileOpen(true)} className="tap-bounce" style={{ padding: 8, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
              <Menu size={21} color="#fff" />
            </button>
            <button onClick={() => navigate("/dashboard")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
              <Zap size={22} color="#39FF14" />
              <span style={{ fontWeight: 900, color: "#fff", fontSize: 16 }}>Study RPG</span>
            </button>
          </div>
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#39FF14" }}>LV.{user.level}</span>
              <span style={{ fontSize: 12, color: "#FFD700" }}>🪙{user.coins}</span>
              <span style={{ fontSize: 12, color: "#FB923C" }}>🔥{user.streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} className="animate-fade-in" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 50 }} />
          <aside className="animate-drawer-in" style={{
            position: "fixed", left: 0, top: 0, height: "100vh", width: 280, zIndex: 51,
            background: "rgba(10,10,10,0.99)", borderRight: "1px solid rgba(255,255,255,0.07)", boxShadow: "20px 0 60px rgba(0,0,0,0.45)"
          }}>
            <button onClick={() => setMobileOpen(false)} className="tap-bounce" style={{ position: "absolute", top: 16, right: 16, padding: 6, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer" }}>
              <X size={18} color="#fff" />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
