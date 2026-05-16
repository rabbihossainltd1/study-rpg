"use client";

import { navigate } from "@/lib/navigate";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { XpBar } from "@/components/ui/XpBar";
import { Card, StatCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getSubjectsForUser } from "@/lib/subjects";
import { DAILY_MISSIONS } from "@/lib/missions";
import { getGreeting, formatDuration } from "@/lib/utils";
import { RANK_COLORS } from "@/types";
import { normalizeClassName } from "@/lib/bdAddress";
import { getLeaderboard } from "@/lib/firebase";
import { isVerifiedUser } from "@/lib/verified";
import { AppIcon, IconBadge, UserAvatar, CrownBadge, VerifiedBadge } from "@/components/ui/AppIcon";
import {
  Zap, Trophy, Target, BookOpen, Timer, Star, ChevronRight, Coins, Flame, ListChecks,
} from "lucide-react";

type LeaderPreview = {
  rank: number;
  username: string;
  displayName?: string;
  avatar?: string;
  photoURL?: string;
  xp: number;
  level: number;
  userId?: string;
};

function getMissionHref(id: string) {
  if (id === "daily-progress-subjects") return "/subjects";
  if (id.startsWith("gk-")) return "/missions";
  if (id.includes("quiz") || id.includes("subject")) return "/subjects";
  return "/missions";
}

export default function DashboardPage() {
  const { user, language } = useUserStore();
  const [leaders, setLeaders] = useState<LeaderPreview[]>([]);

  useEffect(() => {
    getLeaderboard("global", 3)
      .then((data) => setLeaders(data as LeaderPreview[]))
      .catch(() => setLeaders([]));
  }, []);

  if (!user) return null;

  const rankColor = RANK_COLORS[user.rank];
  const todayMissions = DAILY_MISSIONS.slice(0, 3);
  const topSubjects = getSubjectsForUser(user).slice(0, 4);
  const previewLeaders = leaders.length ? leaders : [{ rank: 1, username: user.username, displayName: user.displayName, avatar: user.avatar, photoURL: user.photoURL, xp: user.xp, level: user.level, userId: user.uid }];

  return (
    <div className="space-y-5 animate-card-in">
      <section className="glass-card p-5 border border-primary/10 relative overflow-hidden hover-lift">
        <div className="absolute -right-14 -top-14 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <UserAvatar photoURL={user.photoURL} avatar={user.avatar} name={user.displayName} sizeClass="w-20 h-20 rounded-2xl" iconClassName="w-9 h-9" borderColor={rankColor} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500 mb-1">{getGreeting()}</p>
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight truncate">{user.displayName || user.username}</h1>
              {isVerifiedUser(user) && <VerifiedBadge className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />}
              <span className="px-2 py-1 rounded-lg text-xs font-black bg-primary/15 text-primary border border-primary/30 flex-shrink-0">LV.{user.level}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">@{user.username} · Student ID {user.studentId || "—"}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold border" style={{ color: rankColor, borderColor: `${rankColor}35`, background: `${rankColor}12` }}>{user.rank}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs text-gray-400 bg-white/5 border border-white/10">{normalizeClassName(user.className || user.examMode)}{user.groupName && user.groupName !== "General" ? ` · ${user.groupName}` : ""}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs text-gold bg-gold/5 border border-gold/10 inline-flex items-center gap-1"><Coins className="w-3.5 h-3.5" />{user.coins}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs text-orange-400 bg-orange-500/5 border border-orange-500/10 inline-flex items-center gap-1"><Flame className="w-3.5 h-3.5" />{user.streak}</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <XpBar currentXp={user.xp} totalXp={user.xp} level={user.level} rank={user.rank} />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigate("/subjects")} className="glass-card p-4 text-left border border-primary/10 hover-lift tap-bounce">
          <BookOpen className="w-5 h-5 text-primary mb-2" />
          <p className="text-white font-black">{language === "bn" ? "লিখিত প্রশ্ন" : "Written Practice"}</p>
          <p className="text-xs text-gray-500">{language === "bn" ? "ক্লাস অনুযায়ী লিখিত প্রশ্ন" : "Class-based questions"}</p>
        </button>
        <button onClick={() => navigate("/subjects")} className="glass-card p-4 text-left border border-secondary/10 hover-lift tap-bounce">
          <ListChecks className="w-5 h-5 text-secondary mb-2" />
          <p className="text-white font-black">{language === "bn" ? "MCQ" : "MCQ"}</p>
          <p className="text-xs text-gray-500">{language === "bn" ? "ক্লাস অনুযায়ী MCQ" : "Class-based MCQ"}</p>
        </button>
      </div>

      <Card className="p-0 overflow-hidden hover-lift">
        <div className="flex items-center justify-between p-5 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-secondary" />
            <h2 className="font-bold text-white">{language === "bn" ? "দৈনিক মিশন" : "Daily Missions"}</h2>
          </div>
          <button onClick={() => navigate("/missions")} className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-1 bg-transparent border-0 cursor-pointer tap-bounce">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {todayMissions.map((mission, index) => (
            <button key={mission.id} onClick={() => navigate(getMissionHref(mission.id))} className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors animate-card-in text-left bg-transparent border-0 cursor-pointer tap-bounce" style={{ animationDelay: `${index * 45}ms` }}>
              <IconBadge name={mission.icon} color="#00F0FF" className="w-11 h-11 rounded-xl" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{language === "bn" ? mission.titleBn : mission.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary/70 rounded-full transition-all duration-700" style={{ width: `${(mission.progress / mission.requirement) * 100}%` }} /></div>
                  <span className="text-xs text-gray-600 flex-shrink-0">{mission.progress}/{mission.requirement}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0"><p className="text-xs font-bold text-primary">+{mission.xpReward} XP</p><p className="text-xs text-gold inline-flex items-center gap-1">+{mission.coinReward}<Coins className="w-3 h-3" /></p></div>
            </button>
          ))}
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /><h2 className="font-bold text-white">{language === "bn" ? "বিষয়সমূহ" : "Subjects"}</h2></div>
          <button onClick={() => navigate("/subjects")} className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-1 bg-transparent border-0 cursor-pointer tap-bounce">All Subjects <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {topSubjects.map((subject, index) => (
            <button key={subject.id} onClick={() => navigate(`/subjects/${subject.id}`)} className="bg-transparent border-0 cursor-pointer block w-full text-left p-0 tap-bounce">
              <div className="glass-card p-4 border hover-lift animate-card-in" style={{ borderColor: `${subject.color}20`, animationDelay: `${index * 55}ms` }}>
                <div className="flex items-center gap-3">
                  <IconBadge name={subject.icon} color={subject.color} className="w-11 h-11 rounded-xl" />
                  <div className="flex-1 min-w-0"><p className="font-bold text-white text-sm truncate">{language === "bn" ? subject.nameBn : subject.name}</p><p className="text-xs text-gray-500">{subject.totalChapters} chapters · Written bank</p></div>
                  <span className="text-xs font-bold" style={{ color: subject.color }}>+{subject.xpReward}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Card className="border border-gold/15 shadow-[0_0_24px_rgba(255,215,0,0.08)] hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-gold" /><h3 className="font-bold text-white text-sm">Leaderboard</h3></div>
          <button onClick={() => navigate("/leaderboard")} className="text-xs text-gray-500 hover:text-primary transition-colors bg-transparent border-0 cursor-pointer">Full Board →</button>
        </div>
        <div className="space-y-3">
          {previewLeaders.map((entry, index) => (
            <button key={`${entry.username}-${index}`} onClick={() => navigate("/leaderboard")} className="w-full flex items-center gap-3 text-left bg-transparent border-0 p-0 tap-bounce">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? "bg-gold/20" : index === 1 ? "bg-gray-400/20" : "bg-amber-700/20"}`}><CrownBadge rank={index + 1} className="w-4 h-4" /></div>
              <UserAvatar photoURL={entry.photoURL} avatar={entry.avatar} name={entry.displayName || entry.username} sizeClass="w-9 h-9" iconClassName="w-4 h-4" rank={index + 1} borderColor={index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32"} />
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-white truncate">{entry.displayName || entry.username}</p><p className="text-xs text-gray-500">LV.{entry.level}</p></div>
              <span className="text-xs font-bold text-primary">{(entry.xp / 1000).toFixed(1)}K</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
