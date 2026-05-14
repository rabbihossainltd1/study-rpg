"use client";

import { navigate } from "@/lib/navigate";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { XpBar } from "@/components/ui/XpBar";
import { Card, StatCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SUBJECTS } from "@/lib/subjects";
import { DAILY_MISSIONS } from "@/lib/missions";
import { getGreeting, formatDuration } from "@/lib/utils";
import { RANK_COLORS } from "@/types";
import { getLeaderboard, searchUsers, sendFriendRequest, acceptFriendRequest, getIncomingFriendRequests, createChallenge, sendQuickMessage, type PublicUserResult } from "@/lib/firebase";
import toast from "react-hot-toast";
import {
  Zap, Trophy, Target, BookOpen, Timer, Bot,
  Flame, Star, TrendingUp, ChevronRight, Play, Crown, Search,
  UserPlus, CheckCircle2, MessageCircle, Swords, Inbox,
} from "lucide-react";

const MOTIVATIONAL_QUOTES = [
  { en: "Every expert was once a beginner.", bn: "প্রতিটি বিশেষজ্ঞ একসময় শিক্ষানবিশ ছিল।" },
  { en: "Study hard today, shine tomorrow.", bn: "আজ কঠোর পড়াশোনা করো, আগামীকাল উজ্জ্বল হও।" },
  { en: "Your future self will thank you.", bn: "তোমার ভবিষ্যৎ নিজেই তোমাকে ধন্যবাদ দেবে।" },
  { en: "One day or day one — you decide.", bn: "একদিন নাকি প্রথম দিন — সিদ্ধান্ত তোমার।" },
  { en: "Knowledge is the best weapon.", bn: "জ্ঞানই সর্বোত্তম অস্ত্র।" },
];

type LeaderPreview = {
  rank: number;
  username: string;
  displayName?: string;
  avatar?: string;
  photoURL?: string;
  xp: number;
  level: number;
};

function getMissionHref(id: string) {
  if (id.includes("study") || id.includes("streak")) return "/focus";
  if (id.includes("quiz") || id.includes("lesson") || id.includes("subject")) return "/subjects";
  return "/missions";
}

export default function DashboardPage() {
  const { user, language } = useUserStore();
  const [quote] = useState(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  const [weeklyStudy] = useState([45, 60, 30, 90, 75, 0, 0]);
  const [leaders, setLeaders] = useState<LeaderPreview[]>([]);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const maxStudy = Math.max(...weeklyStudy, 1);

  useEffect(() => {
    getLeaderboard("global", 3)
      .then((data) => setLeaders(data as LeaderPreview[]))
      .catch(() => setLeaders([]));
  }, []);

  if (!user) return null;

  const rankColor = RANK_COLORS[user.rank];
  const todayMissions = DAILY_MISSIONS.slice(0, 4);
  const topSubjects = SUBJECTS.slice(0, 4);
  const previewLeaders = leaders.length ? leaders : [{ rank: 1, username: user.username, displayName: user.displayName, avatar: user.avatar, photoURL: user.photoURL, xp: user.xp, level: user.level }];

  return (
    <div className="space-y-6 animate-card-in">
      <section className="glass-card p-5 border border-primary/10 relative overflow-hidden hover-lift">
        <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-primary/10 blur-3xl" />
        <div className="flex items-start justify-between gap-4 relative">
          <div className="min-w-0">
            <p className="text-sm text-gray-500 mb-1">{getGreeting()}</p>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight truncate">
              {user.displayName || user.username}
            </h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold border" style={{ color: rankColor, borderColor: `${rankColor}35`, background: `${rankColor}12` }}>{user.rank}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs text-gray-400 bg-white/5 border border-white/10">{user.examMode} Mode</span>
              <span className="px-2.5 py-1 rounded-lg text-xs text-gray-400 bg-white/5 border border-white/10">ID {user.studentId || "—"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="glass rounded-xl px-3 py-2 text-center border border-orange-500/20 min-w-[76px]">
              <p className="text-lg font-black text-orange-400">🔥 {user.streak}</p>
              <p className="text-xs text-gray-600">Streak</p>
            </div>
            <div className="glass rounded-xl px-3 py-2 text-center border border-gold/20 min-w-[76px]">
              <p className="text-lg font-black text-gold">🪙 {user.coins}</p>
              <p className="text-xs text-gray-600">Coins</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <XpBar currentXp={user.xp} totalXp={user.xp} level={user.level} rank={user.rank} />
        </div>
      </section>

      <UserSearchPanel />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Level" value={user.level} icon={<Zap className="w-5 h-5" />} color="#39FF14" />
        <StatCard label="Total XP" value={`${(user.xp / 1000).toFixed(1)}K`} icon={<Star className="w-5 h-5" />} color="#FFD700" />
        <StatCard label="Study Time" value={formatDuration(user.totalStudyTime)} icon={<Timer className="w-5 h-5" />} color="#00F0FF" />
        <StatCard label="Rank" value={user.rank} icon={<Trophy className="w-5 h-5" />} color="#BF5FFF" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
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
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">{mission.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{language === "bn" ? mission.titleBn : mission.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary/70 rounded-full transition-all duration-700" style={{ width: `${(mission.progress / mission.requirement) * 100}%` }} /></div>
                      <span className="text-xs text-gray-600 flex-shrink-0">{mission.progress}/{mission.requirement}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0"><p className="text-xs font-bold text-primary">+{mission.xpReward} XP</p><p className="text-xs text-gold">+{mission.coinReward}🪙</p></div>
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
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${subject.color}15` }}>{subject.icon}</div>
                      <div className="flex-1 min-w-0"><p className="font-bold text-white text-sm truncate">{language === "bn" ? subject.nameBn : subject.name}</p><p className="text-xs text-gray-500">{subject.totalChapters} chapters · 120 quizzes</p></div>
                      <span className="text-xs font-bold" style={{ color: subject.color }}>+{subject.xpReward}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${subject.progress}%`, background: subject.color }} /></div>
                    <p className="text-xs text-gray-600 mt-1">{subject.progress}% complete</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Card className="hover-lift">
            <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-secondary" /><h2 className="font-bold text-white">Weekly Activity</h2></div>
            <div className="flex items-end gap-2 h-24">
              {weeklyStudy.map((mins, i) => (
                <div key={`${i}-${mins}`} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-md transition-all duration-700" style={{ height: `${(mins / maxStudy) * 100}%`, minHeight: mins > 0 ? "4px" : "0", background: i === new Date().getDay() ? "linear-gradient(to top, #39FF14, rgba(57,255,20,0.6))" : "rgba(255,255,255,0.07)" }} />
                  <span className="text-xs text-gray-600">{days[i]}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2 text-right">This week: {formatDuration(weeklyStudy.reduce((a, b) => a + b, 0))} studied</p>
          </Card>
        </div>

        <div className="space-y-5">
          <Card glow="green" className="border border-primary/15 bg-primary/3 hover-lift">
            <div className="flex items-center gap-2 mb-3"><Bot className="w-4 h-4 text-primary" /><span className="text-xs font-medium text-primary uppercase tracking-wider">AI Motivation</span></div>
            <p className="text-sm font-medium text-white leading-relaxed mb-1">&ldquo;{language === "bn" ? quote.bn : quote.en}&rdquo;</p>
            <Button variant="ghost" size="sm" className="mt-3 w-full text-xs" onClick={() => navigate("/ai-assistant")}><Bot className="w-3 h-3" /> Ask AI Tutor</Button>
          </Card>

          <Card className="border border-gold/15 shadow-[0_0_24px_rgba(255,215,0,0.08)] hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-gold" /><h3 className="font-bold text-white text-sm">Leaderboard</h3></div>
              <button onClick={() => navigate("/leaderboard")} className="text-xs text-gray-500 hover:text-primary transition-colors bg-transparent border-0 cursor-pointer">Full Board →</button>
            </div>
            <div className="space-y-3">
              {previewLeaders.map((entry, index) => (
                <button key={`${entry.username}-${index}`} onClick={() => navigate("/leaderboard")} className="w-full flex items-center gap-3 text-left bg-transparent border-0 p-0 tap-bounce">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? "bg-gold/20 text-gold" : index === 1 ? "bg-gray-400/20 text-gray-300" : "bg-amber-700/20 text-amber-600"}`}>{index === 0 ? <Crown className="w-4 h-4" /> : index + 1}</div>
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden text-lg">{entry.photoURL ? <img src={entry.photoURL} alt="" className="w-full h-full object-cover" /> : entry.avatar || "⚡"}</div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-white truncate">{entry.displayName || entry.username}</p><p className="text-xs text-gray-500">LV.{entry.level}</p></div>
                  <span className="text-xs font-bold text-primary">{(entry.xp / 1000).toFixed(1)}K</span>
                </button>
              ))}
            </div>
          </Card>

          <div>
            <h3 className="font-bold text-white text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Focus Mode", icon: Timer, color: "#00F0FF", href: "/focus" },
                { label: "AI Tutor", icon: Bot, color: "#BF5FFF", href: "/ai-assistant" },
                { label: "Study Now", icon: Play, color: "#39FF14", href: "/subjects" },
                { label: "Challenge", icon: Flame, color: "#FFD700", href: "/leaderboard" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.label} onClick={() => navigate(action.href)} className="bg-transparent border-0 cursor-pointer block w-full p-0 tap-bounce">
                    <div className="glass-card p-4 text-center border hover-lift" style={{ borderColor: `${action.color}25` }}>
                      <Icon className="w-6 h-6 mx-auto mb-1" style={{ color: action.color }} />
                      <p className="text-xs font-semibold text-white">{action.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserSearchPanel() {
  const { user } = useUserStore();
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<PublicUserResult[]>([]);
  const [incoming, setIncoming] = useState<PublicUserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    getIncomingFriendRequests(user.uid).then(setIncoming).catch(() => setIncoming([]));
  }, [user]);

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    const t = setTimeout(async () => {
      const q = term.trim();
      if (q.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        setResults(await searchUsers(q, user.uid));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [term, user]);

  if (!user) return null;

  const addFriend = async (target: PublicUserResult) => {
    if (user.uid.startsWith("guest_")) return toast.error("Account login required");
    setBusyId(target.uid);
    try {
      await sendFriendRequest(user.uid, target.uid);
      setResults((items) => items.map((i) => i.uid === target.uid ? { ...i, friendStatus: "pending" } : i));
      toast.success("Friend request sent");
    } catch {
      toast.error("Request failed");
    } finally {
      setBusyId(null);
    }
  };

  const accept = async (target: PublicUserResult) => {
    if (!target.requestId) return;
    setBusyId(target.uid);
    try {
      await acceptFriendRequest(target.requestId);
      setIncoming((items) => items.filter((i) => i.uid !== target.uid));
      setResults((items) => items.map((i) => i.uid === target.uid ? { ...i, friendStatus: "accepted" } : i));
      toast.success("Friend request accepted");
    } catch {
      toast.error("Accept failed");
    } finally {
      setBusyId(null);
    }
  };

  const challenge = async (target: PublicUserResult) => {
    setBusyId(target.uid);
    try {
      await createChallenge(user.uid, target.uid);
      toast.success("Challenge sent");
      navigate("/subjects");
    } catch {
      toast.error("Challenge failed");
    } finally {
      setBusyId(null);
    }
  };

  const message = async (target: PublicUserResult) => {
    setBusyId(target.uid);
    try {
      await sendQuickMessage(user.uid, target.uid, "Hi, let us study together in Study RPG.");
      toast.success("Message sent");
    } catch {
      toast.error("Message failed");
    } finally {
      setBusyId(null);
    }
  };

  const renderUser = (target: PublicUserResult, source: "search" | "incoming") => (
    <div key={`${source}-${target.uid}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center overflow-hidden text-lg flex-shrink-0">
        {target.photoURL ? <img src={target.photoURL} alt="" className="w-full h-full object-cover" /> : target.avatar || "⚡"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{target.displayName}</p>
        <p className="text-xs text-gray-500 truncate">@{target.username} · ID {target.studentId} · {target.district || "BD"}</p>
      </div>
      {source === "incoming" || target.friendStatus === "incoming" ? (
        <Button size="sm" variant="secondary" onClick={() => accept(target)} disabled={busyId === target.uid}><CheckCircle2 className="w-3 h-3" />Accept</Button>
      ) : target.friendStatus === "accepted" ? (
        <div className="flex gap-1">
          <Button size="sm" variant="gold" onClick={() => challenge(target)} disabled={busyId === target.uid}><Swords className="w-3 h-3" /></Button>
          <Button size="sm" variant="ghost" onClick={() => message(target)} disabled={busyId === target.uid}><MessageCircle className="w-3 h-3" /></Button>
        </div>
      ) : target.friendStatus === "pending" ? (
        <span className="text-xs text-gold font-bold px-2">Pending</span>
      ) : (
        <Button size="sm" onClick={() => addFriend(target)} disabled={busyId === target.uid}><UserPlus className="w-3 h-3" />Add</Button>
      )}
    </div>
  );

  return (
    <Card className="border border-primary/15 bg-primary/3 hover-lift">
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-white">Find Students</h2>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by name, username or numeric student ID"
          className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
        />
      </div>
      {incoming.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-secondary font-bold flex items-center gap-1"><Inbox className="w-3 h-3" />Incoming requests</p>
          {incoming.map((item) => renderUser(item, "incoming"))}
        </div>
      )}
      <div className="mt-3 space-y-2">
        {loading && <p className="text-xs text-gray-500">Searching...</p>}
        {!loading && term.trim().length >= 2 && results.length === 0 && <p className="text-xs text-gray-600">No student found</p>}
        {results.map((item) => renderUser(item, "search"))}
      </div>
    </Card>
  );
}
