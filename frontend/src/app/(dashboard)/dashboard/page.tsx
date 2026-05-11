"use client";

import { navigate } from "@/lib/navigate";

import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { XpBar } from "@/components/ui/XpBar";
import { Card, StatCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SUBJECTS } from "@/lib/subjects";
import { DAILY_MISSIONS } from "@/lib/missions";
import { getGreeting, formatDuration } from "@/lib/utils";
import { RANK_COLORS } from "@/types";
import {
  Zap, Trophy, Target, BookOpen, Timer, Bot,
  Flame, Star, TrendingUp, ChevronRight, Play,
} from "lucide-react";
import { useState } from "react";

const MOTIVATIONAL_QUOTES = [
  { en: "Every expert was once a beginner.", bn: "প্রতিটি বিশেষজ্ঞ একসময় শিক্ষানবিশ ছিল।" },
  { en: "Study hard today, shine tomorrow.", bn: "আজ কঠোর পড়াশোনা করো, আগামীকাল উজ্জ্বল হও।" },
  { en: "Your future self will thank you.", bn: "তোমার ভবিষ্যত নিজেই তোমাকে ধন্যবাদ দেবে।" },
  { en: "One day or day one — you decide.", bn: "একদিন নাকি প্রথম দিন — সিদ্ধান্ত তোমার।" },
  { en: "Knowledge is the best weapon.", bn: "জ্ঞানই সর্বোত্তম অস্ত্র।" },
];

const LEADERBOARD_MOCK = [
  { rank: 1, name: "Rahima S.", xp: 48750, level: 42 },
  { rank: 2, name: "Ariful I.", xp: 45200, level: 39 },
  { rank: 3, name: "Nusrat J.", xp: 41800, level: 37 },
];

export default function DashboardPage() {
  const { user, language } = useUserStore();
  const [quote] = useState(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  const [weeklyStudy] = useState([45, 60, 30, 90, 75, 0, 0]);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const maxStudy = Math.max(...weeklyStudy, 1);

  if (!user) return null;

  const rankColor = RANK_COLORS[user.rank];
  const todayMissions = DAILY_MISSIONS.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{getGreeting()} 👋</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {user.username} <span className="text-primary">⚡</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: rankColor }}>
            {user.rank} · {user.examMode} Mode
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="glass rounded-xl px-3 py-2 text-center border border-orange-500/20">
            <p className="text-lg font-black text-orange-400">🔥 {user.streak}</p>
            <p className="text-xs text-gray-600">Streak</p>
          </div>
          <div className="glass rounded-xl px-3 py-2 text-center border border-gold/20">
            <p className="text-lg font-black text-gold">🪙 {user.coins}</p>
            <p className="text-xs text-gray-600">Coins</p>
          </div>
        </div>
      </motion.div>

      {/* XP Bar */}
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <XpBar currentXp={user.xp} totalXp={user.xp} level={user.level} rank={user.rank} />
      </motion.div>

      {/* Quick Stats */}
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Level" value={user.level} icon={<Zap className="w-5 h-5" />} color="#39FF14" />
        <StatCard label="Total XP" value={`${(user.xp / 1000).toFixed(1)}K`} icon={<Star className="w-5 h-5" />} color="#FFD700" />
        <StatCard label="Study Time" value={formatDuration(user.totalStudyTime)} icon={<Timer className="w-5 h-5" />} color="#00F0FF" />
        <StatCard label="Rank" value={`#—`} icon={<Trophy className="w-5 h-5" />} color="#BF5FFF" />
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left: Missions + Subjects */}
        <div className="lg:col-span-2 space-y-5">
          {/* Daily Missions */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between p-5 pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  <h2 className="font-bold text-white">{language === "bn" ? "দৈনিক মিশন" : "Daily Missions"}</h2>
                </div>
                <button onClick={() => navigate("/missions")} style={{background:"none",border:"none",cursor:"pointer"}} className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {todayMissions.map((mission, i) => (
                  <motion.div
                    key={mission.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
                      {mission.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {language === "bn" ? mission.titleBn : mission.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/60 rounded-full"
                            style={{ width: `${(mission.progress / mission.requirement) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 flex-shrink-0">{mission.progress}/{mission.requirement}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-primary">+{mission.xpReward} XP</p>
                      <p className="text-xs text-gold">+{mission.coinReward}🪙</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Subjects */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-white">{language === "bn" ? "বিষয়সমূহ" : "Subjects"}</h2>
              </div>
              <button onClick={() => navigate("/subjects")} style={{background:"none",border:"none",cursor:"pointer"}} className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
                All Subjects <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {SUBJECTS.slice(0, 4).map((subject, i) => (
                <motion.div
                  key={subject.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <button onClick={() => navigate(`/subjects/${subject.id}`)} style={{background:"none",border:"none",cursor:"pointer",display:"block",width:"100%",textAlign:"left",padding:0}}>
                    <div
                      className="glass-card p-4 border cursor-pointer hover:shadow-lg transition-all duration-300"
                      style={{ borderColor: `${subject.color}20` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                          style={{ background: `${subject.color}15` }}
                        >
                          {subject.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm truncate">
                            {language === "bn" ? subject.nameBn : subject.name}
                          </p>
                          <p className="text-xs text-gray-500">{subject.completedChapters}/{subject.totalChapters} chapters</p>
                        </div>
                        <span className="text-xs font-bold" style={{ color: subject.color }}>+{subject.xpReward}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${subject.progress}%`, background: subject.color }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{subject.progress}% complete</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Study Graph */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h2 className="font-bold text-white">Weekly Activity</h2>
              </div>
              <div className="flex items-end gap-2 h-20">
                {weeklyStudy.map((mins, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md transition-all duration-500"
                      style={{
                        height: `${(mins / maxStudy) * 100}%`,
                        minHeight: mins > 0 ? "4px" : "0",
                        background: i === new Date().getDay()
                          ? "linear-gradient(to top, #39FF14, rgba(57,255,20,0.6))"
                          : "rgba(255,255,255,0.07)",
                      }}
                    />
                    <span className="text-xs text-gray-600">{days[i]}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2 text-right">
                This week: {formatDuration(weeklyStudy.reduce((a, b) => a + b, 0))} studied
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Right: Quote + Leaderboard + Quick Actions */}
        <div className="space-y-5">
          {/* AI Quote */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
            <Card glow="green" className="border border-primary/15 bg-primary/3">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">AI Motivation</span>
              </div>
              <p className="text-sm font-medium text-white leading-relaxed mb-1">
                &ldquo;{language === "bn" ? quote.bn : quote.en}&rdquo;
              </p>
              <button onClick={() => navigate("/ai-assistant")} style={{background:"none",border:"none",cursor:"pointer"}} className="">
                <Button variant="ghost" size="sm" className="mt-3 w-full text-xs">
                  <Bot className="w-3 h-3" /> Ask AI Tutor
                </Button>
              </button>
            </Card>
          </motion.div>

          {/* Leaderboard Preview */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gold" />
                  <h3 className="font-bold text-white text-sm">Top Players</h3>
                </div>
                <button onClick={() => navigate("/leaderboard")} style={{background:"none",border:"none",cursor:"pointer"}} className="text-xs text-gray-500 hover:text-primary transition-colors">
                  Full Board →
                </button>
              </div>
              <div className="space-y-3">
                {LEADERBOARD_MOCK.map((entry) => (
                  <div key={entry.rank} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank === 1 ? "bg-gold/20 text-gold" :
                      entry.rank === 2 ? "bg-gray-400/20 text-gray-300" :
                      "bg-amber-700/20 text-amber-600"
                    }`}>
                      {entry.rank === 1 ? "👑" : entry.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{entry.name}</p>
                      <p className="text-xs text-gray-500">LV.{entry.level}</p>
                    </div>
                    <span className="text-xs font-bold text-primary">{(entry.xp / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>

              {/* Current user rank */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                  —
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">You</p>
                  <p className="text-xs text-gray-500">LV.{user.level}</p>
                </div>
                <span className="text-xs font-bold text-primary">{(user.xp / 1000).toFixed(1)}K</span>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
            <h3 className="font-bold text-white text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => navigate("/focus")} style={{background:"none",border:"none",cursor:"pointer"}} className="">
                <div className="glass-card p-4 text-center border border-secondary/15 hover:border-secondary/30 hover:bg-secondary/5 transition-all cursor-pointer group">
                  <Timer className="w-6 h-6 text-secondary mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-white">Focus Mode</p>
                </div>
              </button>
              <button onClick={() => navigate("/ai-assistant")} style={{background:"none",border:"none",cursor:"pointer"}} className="">
                <div className="glass-card p-4 text-center border border-purple/15 hover:border-purple/30 hover:bg-purple/5 transition-all cursor-pointer group">
                  <Bot className="w-6 h-6 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-white">AI Tutor</p>
                </div>
              </button>
              <button onClick={() => navigate("/subjects")} style={{background:"none",border:"none",cursor:"pointer"}} className="">
                <div className="glass-card p-4 text-center border border-primary/15 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group">
                  <Play className="w-6 h-6 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-white">Study Now</p>
                </div>
              </button>
              <button onClick={() => navigate("/leaderboard")} style={{background:"none",border:"none",cursor:"pointer"}} className="">
                <div className="glass-card p-4 text-center border border-gold/15 hover:border-gold/30 hover:bg-gold/5 transition-all cursor-pointer group">
                  <Flame className="w-6 h-6 text-gold mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-white">Challenge</p>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
