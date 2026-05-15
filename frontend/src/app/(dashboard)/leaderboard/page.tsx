"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useUserStore } from "@/store/useUserStore";
import { cancelFriendRequest, getFriendRelationState, getLeaderboard, sendFriendRequest, createChallenge, type FriendStatus } from "@/lib/firebase";
import { RANK_COLORS, type Rank } from "@/types";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Trophy, Globe, MapPin, TrendingUp, Crown, X, School, UserRound, UserPlus, Flame } from "lucide-react";
import { AppIcon, UserAvatar, CrownBadge } from "@/components/ui/AppIcon";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { navigate } from "@/lib/navigate";

const TABS = [
  { id: "global", label: "Global", labelBn: "গ্লোবাল", icon: Globe },
  { id: "district", label: "District", labelBn: "জেলা", icon: MapPin },
  { id: "weekly", label: "Weekly", labelBn: "সাপ্তাহিক", icon: TrendingUp },
];

type LeaderEntry = {
  rank: number;
  userId: string;
  studentId?: string;
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
  className?: string;
};

export default function LeaderboardPage() {
  const { user, language } = useUserStore();
  const [tab, setTab] = useState("global");
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const [selected, setSelected] = useState<LeaderEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyAdd, setBusyAdd] = useState<string | null>(null);
  const [friendStates, setFriendStates] = useState<Record<string, FriendStatus>>({});

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
        studentId: user.studentId,
        school: user.school,
        college: user.college,
        className: user.className,
      }];
    }
    return list.map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [entries, tab, user]);

  const myRank = visibleEntries.find((entry) => entry.userId === user?.uid)?.rank;
  const topThree = visibleEntries.slice(0, 3);
  const rest = visibleEntries.slice(3);

  useBodyScrollLock(Boolean(selected));

  useEffect(() => {
    if (!selected || !user || selected.userId === user.uid) return;
    getFriendRelationState(user.uid, selected.userId)
      .then((state) => setFriendStates((prev) => ({ ...prev, [selected.userId]: state.status })))
      .catch(() => undefined);
  }, [selected?.userId, user?.uid]);

  const addFromLeaderboard = async (entry: LeaderEntry) => {
    if (!user || user.uid === entry.userId) return;
    setBusyAdd(entry.userId);
    try {
      await sendFriendRequest(user.uid, entry.userId);
      setFriendStates((prev) => ({ ...prev, [entry.userId]: "pending" }));
      toast.success("Friend request sent");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setBusyAdd(null);
    }
  };

  const cancelLeaderboardRequest = async (entry: LeaderEntry) => {
    if (!user || user.uid === entry.userId) return;
    setBusyAdd(entry.userId);
    try {
      await cancelFriendRequest(user.uid, entry.userId);
      setFriendStates((prev) => ({ ...prev, [entry.userId]: "none" }));
      toast.success("Request cancelled");
    } catch {
      toast.error("Cancel failed");
    } finally {
      setBusyAdd(null);
    }
  };


  const messageFromLeaderboard = async (entry: LeaderEntry) => {
    if (!user || user.uid === entry.userId) return;
    navigate(`/friends?chat=${entry.userId}`);
  };

  const challengeFromLeaderboard = async (entry: LeaderEntry) => {
    if (!user || user.uid === entry.userId) return;
    setBusyAdd(entry.userId);
    try {
      await createChallenge(user.uid, entry.userId);
      toast.success("Challenge sent");
    } catch {
      toast.error("Challenge failed");
    } finally {
      setBusyAdd(null);
    }
  };

  const RankBadge = ({ rank }: { rank: number }) => {
    if (rank <= 3) return <CrownBadge rank={rank} className="w-5 h-5" />;
    return <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-gray-500">{rank}</span>;
  };

  const Avatar = ({ entry, size = "md", showCrown = true }: { entry: LeaderEntry; size?: "sm" | "md" | "lg"; showCrown?: boolean }) => {
    const cls = size === "lg" ? "w-16 h-16 text-3xl" : size === "sm" ? "w-9 h-9 text-lg" : "w-12 h-12 text-2xl";
    const rankColor = RANK_COLORS[(entry.rank_title || entry.userRank || "Novice") as Rank] || "#9CA3AF";
    return <UserAvatar photoURL={entry.photoURL} avatar={entry.avatar} name={entry.displayName || entry.username} sizeClass={cls} iconClassName={size === "lg" ? "w-8 h-8" : "w-5 h-5"} borderColor={rankColor} rank={showCrown && entry.rank <= 3 ? entry.rank : undefined} vipFrame={entry.rank <= 3} />;
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
                <div className="mx-auto mb-2 mt-2 flex justify-center"><Avatar entry={entry} size={position === 0 ? "lg" : "md"} /></div>
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
          <UserAvatar photoURL={user.photoURL} avatar={user.avatar} name={user.displayName} sizeClass="w-10 h-10" iconClassName="w-5 h-5" rank={myRank && myRank <= 3 ? myRank : undefined} />
          <div className="flex-1"><p className="text-sm font-bold text-white">Your Rank: <span className="text-primary">#{myRank || "—"}</span></p><p className="text-xs text-gray-500">Keep studying to climb higher</p></div>
          <div className="text-right"><p className="text-sm font-bold text-primary">{(user.xp / 1000).toFixed(1)}K XP</p><p className="text-xs text-gray-500">LV.{user.level}</p></div>
        </div>
      )}

      <div className="glass-card overflow-hidden border border-gold/10 shadow-[0_0_28px_rgba(255,215,0,0.08)]">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-bold text-white">{tab === "global" ? "Global Ranking" : tab === "district" ? `${user?.district || "District"}` : "Weekly Highlight"}</span>
          <span className="text-xs text-gray-500">{loading ? "Loading" : `${visibleEntries.length} players`}</span>
        </div>
        <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
          {(rest.length ? rest : visibleEntries).map((entry, index) => {
            const rankColor = RANK_COLORS[(entry.rank_title || entry.userRank || "Novice") as Rank] || "#9CA3AF";
            const isCurrentUser = user && entry.userId === user.uid;
            return (
              <button key={`${entry.userId}-${entry.rank}`} onClick={() => setSelected(entry)} className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left bg-transparent border-0 cursor-pointer tap-bounce animate-card-in ${isCurrentUser ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-white/3"}`} style={{ animationDelay: `${index * 25}ms` }}>
                <div className="w-8 flex-shrink-0 flex items-center justify-center"><RankBadge rank={entry.rank} /></div>
                <Avatar entry={entry} size="sm" showCrown={false} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className={`font-semibold text-sm truncate ${isCurrentUser ? "text-primary" : "text-white"}`}>{entry.displayName || entry.username}</p>{isCurrentUser && <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">YOU</span>}</div>
                  <div className="flex items-center gap-2 mt-0.5"><span className="text-xs" style={{ color: rankColor }}>{entry.rank_title || entry.userRank || "Novice"}</span><span className="text-xs text-gray-600">·</span><span className="text-xs text-gray-600">{entry.district}</span><span className="text-xs text-gray-600">·</span><span className="text-xs text-orange-400 inline-flex items-center gap-1"><Flame className="w-3 h-3" />{entry.streak}</span></div>
                </div>
                <div className="text-right flex-shrink-0"><p className="text-sm font-bold text-primary">{(entry.xp / 1000).toFixed(1)}K</p><p className="text-xs text-gray-600">LV.{entry.level}</p></div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (() => {
        const state = user && selected.userId !== user.uid ? (friendStates[selected.userId] || "none") : "accepted";
        const canSeeFull = selected.userId === user?.uid || state === "accepted";
        return (
        <div className="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center p-3 animate-fade-in overflow-hidden" onClick={() => setSelected(null)}>
          <div className="glass-card modal-compact-card w-full max-w-[340px] p-4 border border-gold/30 shadow-[0_0_50px_rgba(255,215,0,0.16)] animate-card-in overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-black text-white">View Profile</h2>
              <button type="button" onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="text-center mb-4">
              <div className="flex justify-center mb-2"><Avatar entry={selected} size="md" /></div>
              <p className="text-lg font-black text-white">{selected.displayName || selected.username}</p>
              {canSeeFull ? <p className="text-xs text-gray-500">@{selected.username} · ID {selected.studentId || selected.userId.slice(0, 8)}</p> : <p className="text-xs text-gray-500">Basic public profile</p>}
            </div>
            <div className="space-y-2">
              <InfoRow icon={<UserRound className="w-4 h-4" />} label="Student Name" value={selected.displayName || selected.username} />
              <InfoRow icon={<School className="w-4 h-4" />} label="School / University" value={selected.school || selected.college || "Not added"} />
              <InfoRow icon={<MapPin className="w-4 h-4" />} label="District" value={selected.district || "Not added"} />
              {canSeeFull && <InfoRow icon={<Trophy className="w-4 h-4" />} label="Class / Level" value={`${selected.className || "Student"} · LV.${selected.level}`} />}
              {!canSeeFull && <p className="text-[11px] text-gray-500 text-center pt-1">Friend হলে full information দেখা যাবে।</p>}
            </div>
            {user && selected.userId !== user.uid && (() => {
              if (state === "accepted") return <div className="grid grid-cols-3 gap-2 mt-3"><Button variant="ghost" onClick={() => undefined} disabled={busyAdd === selected.userId}>View Profile</Button><Button variant="secondary" onClick={() => messageFromLeaderboard(selected)} disabled={busyAdd === selected.userId}>Message</Button><Button variant="gold" onClick={() => challengeFromLeaderboard(selected)} disabled={busyAdd === selected.userId}>Challenge</Button></div>;
              if (state === "pending") return <Button className="w-full mt-3" variant="gold" onClick={() => cancelLeaderboardRequest(selected)} disabled={busyAdd === selected.userId}>Cancel Request</Button>;
              if (state === "blocked_by_me" || state === "blocked_me") return <Button className="w-full mt-3" variant="danger" disabled>Unavailable</Button>;
              return <div className="grid grid-cols-2 gap-2 mt-3"><Button variant="ghost" onClick={() => undefined} disabled={busyAdd === selected.userId}>View Profile</Button><Button onClick={() => addFromLeaderboard(selected)} disabled={busyAdd === selected.userId}><UserPlus className="w-4 h-4" /> Add Friend</Button></div>;
            })()}
          </div>
        </div>);
      })()}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
      <div className="min-w-0"><p className="text-[11px] text-gray-500">{label}</p><p className="text-sm font-bold text-white truncate">{value}</p></div>
    </div>
  );
}
