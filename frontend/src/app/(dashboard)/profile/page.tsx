"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { XpBar } from "@/components/ui/XpBar";
import { StatCard } from "@/components/ui/Card";
import { RANK_COLORS, RANK_THRESHOLDS, type Rank, type User as UserType, type Achievement } from "@/types";
import { getRarityColor, formatDuration } from "@/lib/utils";
import {
  User, Edit3, Trophy, Zap, Flame, Clock, Star,
  Shield, Globe, LogOut, Settings, ChevronRight, Copy, Check,
} from "lucide-react";
import { logOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RANK_ORDER: Rank[] = ["Novice", "Apprentice", "Scholar", "Expert", "Master", "Grandmaster", "Legend"];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_session",
    title: "First Step",
    titleBn: "প্রথম পদক্ষেপ",
    description: "Complete your first study session",
    icon: "🎯",
    rarity: "common",
    xpReward: 50,
    isUnlocked: false,
  },
  {
    id: "streak_7",
    title: "Week Warrior",
    titleBn: "সপ্তাহের যোদ্ধা",
    description: "Maintain a 7-day study streak",
    icon: "🔥",
    rarity: "rare",
    xpReward: 200,
    isUnlocked: false,
  },
  {
    id: "streak_30",
    title: "Monthly Master",
    titleBn: "মাসিক মাস্টার",
    description: "Maintain a 30-day study streak",
    icon: "⚡",
    rarity: "epic",
    xpReward: 500,
    isUnlocked: false,
  },
  {
    id: "xp_1000",
    title: "XP Hunter",
    titleBn: "এক্সপি শিকারী",
    description: "Earn 1,000 total XP",
    icon: "💫",
    rarity: "common",
    xpReward: 100,
    isUnlocked: false,
  },
  {
    id: "xp_10000",
    title: "XP Legend",
    titleBn: "এক্সপি কিংবদন্তি",
    description: "Earn 10,000 total XP",
    icon: "🌟",
    rarity: "legendary",
    xpReward: 1000,
    isUnlocked: false,
  },
  {
    id: "quiz_10",
    title: "Quiz Enthusiast",
    titleBn: "কুইজ উৎসাহী",
    description: "Complete 10 quizzes",
    icon: "📝",
    rarity: "common",
    xpReward: 150,
    isUnlocked: false,
  },
  {
    id: "perfect_quiz",
    title: "Perfectionist",
    titleBn: "নিখুঁততাবাদী",
    description: "Score 100% on a quiz",
    icon: "🏆",
    rarity: "rare",
    xpReward: 300,
    isUnlocked: false,
  },
  {
    id: "study_hour",
    title: "Hour of Power",
    titleBn: "শক্তির ঘণ্টা",
    description: "Study for 1 hour in a single session",
    icon: "⏱️",
    rarity: "rare",
    xpReward: 250,
    isUnlocked: false,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, language, setUser } = useUserStore();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");

  if (!user) return null;

  const rankColor = RANK_COLORS[user.rank];
  const currentRankIndex = RANK_ORDER.indexOf(user.rank);
  const nextRank = RANK_ORDER[currentRankIndex + 1];
  const nextRankXp = nextRank ? RANK_THRESHOLDS[nextRank] : null;
  const rankProgress = nextRankXp ? Math.min(100, (user.xp / nextRankXp) * 100) : 100;

  const handleLogout = async () => {
    await logOut();
    router.push("/");
    toast.success("Logged out successfully");
  };

  const copyUid = () => {
    navigator.clipboard.writeText(user.uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Player ID copied!");
  };

  const unlockedAchievements = ACHIEVEMENTS.filter((a) => user.achievements?.includes(a.id));

  const TABS = [
    { id: "stats", label: "Stats" },
    { id: "achievements", label: "Achievements" },
    { id: "settings", label: "Settings" },
  ];

  const toggleLanguage = () => {
    const newLang = language === "bn" ? "en" : "bn";
    useUserStore.getState().setLanguage(newLang);
    toast.success(`Language: ${newLang === "bn" ? "বাংলা" : "English"}`);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Profile Card */}
      <motion.div
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 border relative overflow-hidden"
        style={{ borderColor: `${rankColor}30` }}
      >
        {/* BG glow */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: rankColor }} />

        <div className="flex items-start gap-4 relative">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-2 flex-shrink-0"
              style={{ borderColor: rankColor, background: `${rankColor}15`, boxShadow: `0 0 30px ${rankColor}30` }}
            >
              ⚡
            </div>
            <div
              className="absolute -bottom-1 -right-1 text-xs font-black px-1.5 py-0.5 rounded-md"
              style={{ background: rankColor, color: "#000" }}
            >
              {user.level}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h1 className="text-xl font-black text-white">{user.username}</h1>
                <p className="text-sm font-semibold mt-0.5" style={{ color: rankColor }}>{user.rank}</p>
                <p className="text-xs text-gray-500 mt-0.5">{user.examMode} · {user.district}</p>
              </div>
              <button className="p-2 glass rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                <Edit3 className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                🔥 {user.streak} day streak
              </span>
              <span className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                ⚡ LV.{user.level}
              </span>
              {user.isGuest && (
                <span className="text-xs px-2 py-1 rounded-lg bg-gray-500/10 text-gray-400 border border-gray-500/20">
                  👻 Guest
                </span>
              )}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-5">
          <XpBar currentXp={user.xp} totalXp={user.xp} level={user.level} rank={user.rank} />
        </div>

        {/* Player ID */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-xs text-gray-600 font-mono truncate flex-1">ID: {user.uid.substring(0, 16)}...</p>
          <button onClick={copyUid} className="p-1.5 glass rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3 text-gray-500" />}
          </button>
        </div>
      </motion.div>

      {/* Rank Progress */}
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4" style={{ color: rankColor }} />
          <p className="font-bold text-white text-sm">Rank Journey</p>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {RANK_ORDER.map((rank, i) => {
            const rColor = RANK_COLORS[rank];
            const isActive = rank === user.rank;
            const isPast = RANK_ORDER.indexOf(rank) < currentRankIndex;
            return (
              <div key={rank} className="flex items-center gap-1 flex-shrink-0">
                <div className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      isActive ? "scale-125" : ""
                    }`}
                    style={{
                      borderColor: isPast || isActive ? rColor : "rgba(255,255,255,0.1)",
                      background: isPast || isActive ? `${rColor}20` : "transparent",
                      color: isPast || isActive ? rColor : "#4B5563",
                    }}
                  >
                    {isPast ? "✓" : isActive ? "●" : "○"}
                  </div>
                  <p className="text-xs mt-1 hidden sm:block" style={{ color: isPast || isActive ? rColor : "#4B5563", fontSize: "9px" }}>
                    {rank}
                  </p>
                </div>
                {i < RANK_ORDER.length - 1 && (
                  <div className={`w-4 h-px flex-shrink-0 ${isPast ? "" : "bg-white/10"}`}
                    style={isPast ? { background: rColor } : {}} />
                )}
              </div>
            );
          })}
        </div>
        {nextRank && (
          <p className="text-xs text-gray-500 mt-2">
            Next rank: <span style={{ color: RANK_COLORS[nextRank] }}>{nextRank}</span> · Need {(RANK_THRESHOLDS[nextRank] - user.xp).toLocaleString()} more XP
          </p>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? "bg-primary text-black font-bold" : "glass border border-white/10 text-gray-400 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "stats" && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
          <StatCard label="Total XP" value={user.xp.toLocaleString()} icon={<Zap className="w-4 h-4" />} color="#39FF14" />
          <StatCard label="Level" value={user.level} icon={<Star className="w-4 h-4" />} color="#FFD700" />
          <StatCard label="Study Time" value={formatDuration(user.totalStudyTime)} icon={<Clock className="w-4 h-4" />} color="#00F0FF" />
          <StatCard label="Max Streak" value={`${user.maxStreak || 0}d`} icon={<Flame className="w-4 h-4" />} color="#FF8C00" />
          <StatCard label="Coins" value={user.coins} icon={<span>🪙</span>} color="#FFD700" />
          <StatCard label="Gems" value={user.gems} icon={<span>💎</span>} color="#BF5FFF" />
        </motion.div>
      )}

      {activeTab === "achievements" && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          {unlockedAchievements.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-4xl mb-3">🏆</p>
              <p className="text-gray-400 font-medium">No achievements yet!</p>
              <p className="text-sm text-gray-600 mt-1">Complete missions and study to unlock achievements.</p>
            </div>
          ) : (
            unlockedAchievements.map((a) => {
              const color = getRarityColor(a.rarity);
              return (
                <div key={a.id} className="glass-card p-4 border flex items-center gap-3" style={{ borderColor: `${color}25` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${color}15` }}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{a.title}</p>
                    <p className="text-xs text-gray-500">{a.description}</p>
                    <span className="text-xs font-bold" style={{ color }}>+{a.xpReward} XP · {a.rarity}</span>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      )}

      {activeTab === "settings" && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="glass-card divide-y divide-white/5">
          <button onClick={toggleLanguage} className="w-full flex items-center gap-3 p-4 hover:bg-white/3 transition-colors text-left">
            <Globe className="w-5 h-5 text-secondary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Language / ভাষা</p>
              <p className="text-xs text-gray-500">Currently: {language === "bn" ? "বাংলা" : "English"}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-center gap-3 p-4">
            <Settings className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Exam Mode</p>
              <p className="text-xs text-gray-500">{user.examMode}</p>
            </div>
            <select
              value={user.examMode}
              onChange={(e) => setUser({ ...user, examMode: e.target.value as UserType["examMode"] })}
              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
            >
              {["SSC", "HSC", "Admission", "University"].map((m) => (
                <option key={m} value={m} className="bg-surface">{m}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 p-4">
            <Trophy className="w-5 h-5 text-gold" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">District</p>
              <p className="text-xs text-gray-500">{user.district}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>

          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-4 hover:bg-accent/5 transition-colors text-left">
            <LogOut className="w-5 h-5 text-accent" />
            <p className="text-sm font-medium text-accent">Log Out</p>
          </button>
        </motion.div>
      )}
    </div>
  );
}
