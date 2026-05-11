"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Trophy, Bot, Timer,
  Target, User, LogOut, Zap, Menu, X, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { logOut } from "@/lib/firebase";
import { useState } from "react";
import { XpBar } from "@/components/ui/XpBar";
import { RANK_COLORS } from "@/types";

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
  const pathname = usePathname();
  const { user, language } = useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const rankColor = user ? RANK_COLORS[user.rank] : "#39FF14";

  const handleLogout = async () => {
    await logOut();
    window.location.href = "/";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-neon-primary">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-black text-white text-lg leading-none">Study RPG</p>
            <p className="text-xs text-gray-500">Level Up Learning</p>
          </div>
        </Link>
      </div>

      {/* User Card */}
      {user && (
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 font-bold"
              style={{ borderColor: rankColor, background: `${rankColor}20`, color: rankColor }}
            >
              {user.displayName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm truncate">{user.username}</p>
              <p className="text-xs truncate" style={{ color: rankColor }}>{user.rank}</p>
            </div>
          </div>
          <XpBar
            currentXp={user.xp}
            totalXp={user.xp}
            level={user.level}
            rank={user.rank}
            compact
          />
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-neon-primary"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon
                className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary" : "text-gray-500 group-hover:text-white")}
              />
              <span className="flex-1">{language === "bn" ? item.labelBn : item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
            </Link>
          );
        })}
      </nav>

      {/* User Stats Bar */}
      {user && (
        <div className="p-3 border-t border-white/5">
          <div className="glass rounded-xl p-3 flex justify-around text-center mb-3">
            <div>
              <p className="text-sm font-bold text-gold">🪙 {user.coins}</p>
              <p className="text-xs text-gray-600">{language === "bn" ? "কয়েন" : "Coins"}</p>
            </div>
            <div className="w-px bg-white/5" />
            <div>
              <p className="text-sm font-bold text-purple">💎 {user.gems}</p>
              <p className="text-xs text-gray-600">{language === "bn" ? "জেম" : "Gems"}</p>
            </div>
            <div className="w-px bg-white/5" />
            <div>
              <p className="text-sm font-bold text-orange-400">🔥 {user.streak}</p>
              <p className="text-xs text-gray-600">{language === "bn" ? "স্ট্রিক" : "Streak"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-accent hover:bg-accent/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            {language === "bn" ? "লগ আউট" : "Log Out"}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass border-r border-white/5 fixed left-0 top-0 h-screen z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="font-black text-white">Study RPG</span>
          </Link>
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-primary">LV.{user.level}</span>
                <span className="text-sm text-gold">🪙{user.coins}</span>
                <span className="text-sm text-orange-400">🔥{user.streak}</span>
              </div>
            )}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-screen w-72 z-50 glass border-r border-white/5 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
