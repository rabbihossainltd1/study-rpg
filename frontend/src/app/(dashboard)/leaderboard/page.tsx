"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { RANK_COLORS, type Rank } from "@/types";
import { Trophy, Globe, MapPin, TrendingUp } from "lucide-react";

const generateMockUsers = (count: number, district?: string) =>
  Array.from({ length: count }, (_, i) => ({
    rank: i + 1,
    username: ["Rahima", "Ariful", "Nusrat", "Tanvir", "Fatema", "Sohel", "Mitu", "Rakib", "Lamia", "Imran"][i % 10] + " " + String.fromCharCode(65 + i),
    level: Math.max(1, 42 - i * 2 + Math.floor(Math.random() * 3)),
    xp: Math.max(100, 48750 - i * 1200 + Math.floor(Math.random() * 500)),
    streak: Math.max(0, 30 - i + Math.floor(Math.random() * 5)),
    rank_title: (["Legend", "Grandmaster", "Master", "Expert", "Scholar", "Apprentice", "Novice"][Math.floor(i / 7)] as Rank),
    district: district || ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"][Math.floor(Math.random() * 5)],
    avatar: ["🦁", "🐯", "🦊", "🐺", "🦅", "🐉", "🦄", "⚡", "🔥", "💎"][i % 10],
  }));

const TABS = [
  { id: "global", label: "Global", labelBn: "গ্লোবাল", icon: Globe },
  { id: "district", label: "District", labelBn: "জেলা", icon: MapPin },
  { id: "weekly", label: "Weekly", labelBn: "সাপ্তাহিক", icon: TrendingUp },
];

export default function LeaderboardPage() {
  const { user, language } = useUserStore();
  const [tab, setTab] = useState("global");
  const [entries, setEntries] = useState(generateMockUsers(50));

  useEffect(() => {
    if (tab === "district") setEntries(generateMockUsers(20, user?.district || "Dhaka"));
    else if (tab === "weekly") setEntries(generateMockUsers(50).sort(() => Math.random() - 0.5).map((e, i) => ({ ...e, rank: i + 1 })));
    else setEntries(generateMockUsers(50));
  }, [tab, user?.district]);

  const userRank = user ? Math.floor(Math.random() * 200) + 50 : null;

  const RankBadge = ({ rank }: { rank: number }) => {
    if (rank === 1) return <span className="text-xl">👑</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-gray-500">{rank}</span>;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">{language === "bn" ? "লিডারবোর্ড" : "Leaderboard"}</h1>
          <p className="text-sm text-gray-500">Top scholars in Bangladesh</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3">
        <div className="mt-6">
          <div className="glass-card p-3 text-center border border-gray-500/20">
            <div className="w-12 h-12 rounded-full bg-gray-400/10 border-2 border-gray-400 flex items-center justify-center text-2xl mx-auto mb-2">{entries[1]?.avatar}</div>
            <p className="font-bold text-white text-xs truncate">{entries[1]?.username}</p>
            <p className="text-xs text-gray-400">LV.{entries[1]?.level}</p>
            <p className="text-sm font-bold text-gray-300 mt-1">🥈</p>
            <p className="text-xs text-gray-500">{((entries[1]?.xp || 0) / 1000).toFixed(1)}K XP</p>
          </div>
        </div>
        <div>
          <div className="glass-card p-3 text-center border-2 border-gold/40 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
            <div className="text-lg text-center mb-1">👑</div>
            <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-3xl mx-auto mb-2 shadow-[0_0_20px_rgba(255,215,0,0.3)]">{entries[0]?.avatar}</div>
            <p className="font-bold text-white text-xs truncate">{entries[0]?.username}</p>
            <p className="text-xs text-gold">LV.{entries[0]?.level}</p>
            <p className="text-sm font-bold text-gold mt-1">#1</p>
            <p className="text-xs text-gray-400">{((entries[0]?.xp || 0) / 1000).toFixed(1)}K XP</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="glass-card p-3 text-center border border-amber-700/20">
            <div className="w-12 h-12 rounded-full bg-amber-700/10 border-2 border-amber-700 flex items-center justify-center text-2xl mx-auto mb-2">{entries[2]?.avatar}</div>
            <p className="font-bold text-white text-xs truncate">{entries[2]?.username}</p>
            <p className="text-xs text-amber-600">LV.{entries[2]?.level}</p>
            <p className="text-sm font-bold text-amber-600 mt-1">🥉</p>
            <p className="text-xs text-gray-500">{((entries[2]?.xp || 0) / 1000).toFixed(1)}K XP</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t.id ? "bg-primary text-black font-bold shadow-neon-primary" : "glass border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {language === "bn" ? t.labelBn : t.label}
            </button>
          );
        })}
      </div>

      {/* My Rank Banner */}
      {userRank && (
        <div className="glass-card p-4 border border-primary/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-lg">⚡</div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Your Rank: <span className="text-primary">#{userRank}</span></p>
            <p className="text-xs text-gray-500">Keep studying to climb higher!</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-primary">{user ? (user.xp / 1000).toFixed(1) : 0}K XP</p>
            <p className="text-xs text-gray-500">LV.{user?.level}</p>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-bold text-white">
            {tab === "global" ? "🌍 Global Ranking" : tab === "district" ? `📍 ${user?.district || "Dhaka"} District` : "📈 This Week"}
          </span>
          <span className="text-xs text-gray-500">{entries.length} players</span>
        </div>
        <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
          {entries.slice(3).map((entry) => {
            const rankColor = RANK_COLORS[entry.rank_title as Rank] || "#9CA3AF";
            const isCurrentUser = user && entry.username.includes(user.username?.substring(0, 4) || "---");
            return (
              <div
                key={entry.rank}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${isCurrentUser ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-white/3"}`}
              >
                <div className="w-8 flex-shrink-0 flex items-center justify-center">
                  <RankBadge rank={entry.rank} />
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 flex-shrink-0" style={{ borderColor: `${rankColor}50`, background: `${rankColor}10` }}>
                  {entry.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm truncate ${isCurrentUser ? "text-primary" : "text-white"}`}>{entry.username}</p>
                    {isCurrentUser && <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">YOU</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: rankColor }}>{entry.rank_title}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-600">{entry.district}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-orange-400">🔥{entry.streak}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-primary">{(entry.xp / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-600">LV.{entry.level}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
