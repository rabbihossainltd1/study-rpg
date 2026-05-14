"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useUserStore } from "@/store/useUserStore";
import { getLeaderboard } from "@/lib/firebase";
import { RANK_COLORS, type Rank } from "@/types";
import { Trophy, Globe, MapPin, TrendingUp, Crown, X, School, UserRound } from "lucide-react";

const TABS = [
  { id: "global", label: "Global", labelBn: "গ্লোবাল", icon: Globe },
  { id: "district", label: "District", labelBn: "জেলা", icon: MapPin },
  { id: "weekly", label: "Weekly", labelBn: "সাপ্তাহিক", icon: TrendingUp },
];

type LeaderEntry = {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  photoURL?: string;
  avatar?: string;
  level: number;
  xp: number;
  streak: number;
  rank_title?: Rank;
  userRank?: Rank;
  district: string;
  school?: string;
  college?: string;
};

export default function LeaderboardPage() {
  const { user, language } = useUserStore();
  const [tab, setTab] = useState("global");
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const [selected, setSelected] = useState<LeaderEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLeaderboard("global", 100)
      .then((data) => setEntries(data as LeaderEntry[]))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const visibleEntries = useMemo(() => {
    let list = entries;
    if (tab === "district" && user?.district) list = list.filter((entry) => entry.district === user.district);
    if (tab === "weekly") list = [...list].sort((a, b) => (b.streak * 1000 + b.xp) - (a.streak * 1000 + a.xp));
    if (!list.length && user) {
      list = [{
        rank: 1,
        userId: user.uid,
        username: user.username,
        displayName: user.displayName || user.username,
        photoURL: user.photoURL,
        avatar: user.avatar,
        level: user.level,
        xp: user.xp,
        streak: user.streak,
        rank_title: user.rank,
        userRank: user.rank,
        district: user.district,
        school: user.school,
        college: user.college,
      }];
    }
    return list.map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [entries, tab, user]);

  const myRank = visibleEntries.find((entry) => entry.userId === user?.uid)?.rank;
  const topThree = visibleEntries.slice(0, 3);
  const rest = visibleEntries.slice(3);

  const RankBadge = ({ rank }: { rank: number }) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-gold" />;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-gray-500">{rank}</span>;
  };

  const Avatar = ({ entry, size = "md" }: { entry: LeaderEntry; size?: "sm" | "md" | "lg" }) => {
    const cls = size === "lg" ? "w-16 h-16 text-3xl" : size === "sm" ? "w-9 h-9 text-lg" : "w-12 h-12 text-2xl";
    const rankColor = RANK_COLORS[(entry.rank_title || entry.userRank || "Novice") as Rank] || "#9CA3AF";
    return (
      <div className={`${cls} rounded-full flex items-center justify-center overflow-hidden border-2 flex-shrink-0`} style={{ borderColor: `${rankColor}70`, background: `${rankColor}12` }}>
        {entry.photoURL ? <img src={entry.photoURL} alt="" className="w-full h-full object-cover" /> : entry.avatar || "⚡"}
      </div>
    );
  };

  return (
    <div className="space-y-5 animate-card-in">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center animate-float-soft">
          <Trophy className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">{language === "bn" ? "লিডারবোর্ড" : "Leaderboard"}</h1>
          <p className="text-sm text-gray-500">Real users ranked by XP</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[1, 0, 2].map((position, visualIndex) => {
          const entry = topThree[position];
          if (!entry) return <div key={position} />;
          const rankColor = position === 0 ? "#FFD700" : position === 1 ? "#C0C0C0" : "#CD7F32";
          return (
            <button key={entry.userId || entry.rank} onClick={() => setSelected(entry)} className={`bg-transparent border-0 p-0 cursor-pointer tap-bounce ${visualIndex === 0 ? "mt-7" : visualIndex === 2 ? "mt-9" : ""}`}>
              <div className={`glass-card p-3 text-center border hover-lift ${position === 0 ? "shadow-[0_0_34px_rgba(255,215,0,0.16)]" : ""}`} style={{ borderColor: `${rankColor}50` }}>
                {position === 0 && <div className="text-lg text-center mb-1">👑</div>}
                <div className="mx-auto mb-2 flex justify-center"><Avatar entry={entry} size={position === 0 ? "lg" : "md"} /></div>
                <p className="font-bold text-white text-xs truncate">{entry.displayName || entry.username}</p>
                <p className="text-xs" style={{ color: rankColor }}>LV.{entry.level}</p>
                <p className="text-sm font-bold mt-1" style={{ color: rankColor }}>#{entry.rank}</p>
                <p className="text-xs text-gray-500">{(entry.xp / 1000).toFixed(1)}K XP</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all tap-bounce ${tab === t.id ? "bg-primary text-black font-bold shadow-neon-primary" : "glass border border-white/10 text-gray-400 hover:text-white"}`}>
              <Icon className="w-4 h-4" />{language === "bn" ? t.labelBn : t.label}
            </button>
          );
        })}
      </div>

      {user && (
        <div className="glass-card p-4 border border-primary/20 flex items-center gap-4 hover-lift">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-lg">{user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" /> : user.avatar || "⚡"}</div>
          <div className="flex-1"><p className="text-sm font-bold text-white">Your Rank: <span className="text-primary">#{myRank || "—"}</span></p><p className="text-xs text-gray-500">Keep studying to climb higher</p></div>
          <div className="text-right"><p className="text-sm font-bold text-primary">{(user.xp / 1000).toFixed(1)}K XP</p><p className="text-xs text-gray-500">LV.{user.level}</p></div>
        </div>
      )}

      <div className="glass-card overflow-hidden border border-gold/10 shadow-[0_0_28px_rgba(255,215,0,0.08)]">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-bold text-white">{tab === "global" ? "🌍 Global Ranking" : tab === "district" ? `📍 ${user?.district || "District"}` : "📈 Weekly Highlight"}</span>
          <span className="text-xs text-gray-500">{loading ? "Loading" : `${visibleEntries.length} players`}</span>
        </div>
        <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
          {(rest.length ? rest : visibleEntries).map((entry, index) => {
            const rankColor = RANK_COLORS[(entry.rank_title || entry.userRank || "Novice") as Rank] || "#9CA3AF";
            const isCurrentUser = user && entry.userId === user.uid;
            return (
              <button key={`${entry.userId}-${entry.rank}`} onClick={() => setSelected(entry)} className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left bg-transparent border-0 cursor-pointer tap-bounce animate-card-in ${isCurrentUser ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-white/3"}`} style={{ animationDelay: `${index * 25}ms` }}>
                <div className="w-8 flex-shrink-0 flex items-center justify-center"><RankBadge rank={entry.rank} /></div>
                <Avatar entry={entry} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className={`font-semibold text-sm truncate ${isCurrentUser ? "text-primary" : "text-white"}`}>{entry.displayName || entry.username}</p>{isCurrentUser && <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">YOU</span>}</div>
                  <div className="flex items-center gap-2 mt-0.5"><span className="text-xs" style={{ color: rankColor }}>{entry.rank_title || entry.userRank || "Novice"}</span><span className="text-xs text-gray-600">·</span><span className="text-xs text-gray-600">{entry.district}</span><span className="text-xs text-gray-600">·</span><span className="text-xs text-orange-400">🔥{entry.streak}</span></div>
                </div>
                <div className="text-right flex-shrink-0"><p className="text-sm font-bold text-primary">{(entry.xp / 1000).toFixed(1)}K</p><p className="text-xs text-gray-600">LV.{entry.level}</p></div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="glass-card w-full max-w-sm p-5 border border-gold/20 animate-drawer-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-white">Student Profile</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="text-center mb-5"><div className="flex justify-center mb-3"><Avatar entry={selected} size="lg" /></div><p className="text-xl font-black text-white">{selected.displayName || selected.username}</p><p className="text-xs text-gray-500">Public leaderboard profile</p></div>
            <div className="space-y-3">
              <InfoRow icon={<UserRound className="w-4 h-4" />} label="Student Name" value={selected.displayName || selected.username} />
              <InfoRow icon={<School className="w-4 h-4" />} label="School / University" value={selected.school || selected.college || "Not added"} />
              <InfoRow icon={<MapPin className="w-4 h-4" />} label="District" value={selected.district || "Not added"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
      <div><p className="text-xs text-gray-500">{label}</p><p className="text-sm font-bold text-white">{value}</p></div>
    </div>
  );
}
