"use client";

import { useState } from "react";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { DAILY_MISSIONS, WEEKLY_MISSIONS, ACHIEVEMENTS } from "@/lib/missions";
import { AppIcon } from "@/components/ui/AppIcon";
import { Button } from "@/components/ui/Button";
import { Target, Zap, Trophy, CheckCircle2, Lock } from "lucide-react";
import { addXp, addCoins } from "@/lib/firebase";
import { getRarityColor } from "@/lib/utils";
import toast from "react-hot-toast";
import { calculateLevel, type Mission } from "@/types";

const TABS = ["Daily", "Weekly", "Achievements"];
function missionHref(id: string) {
  if (id.includes("study") || id.includes("streak")) return "/focus";
  if (id.includes("quiz") || id.includes("lesson") || id.includes("subject")) return "/subjects";
  return "/missions";
}


export default function MissionsPage() {
  const { user, setUser, language, addXpPopup, triggerLevelUp } = useUserStore();
  const [tab, setTab] = useState("Daily");
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set());

  const handleClaim = async (mission: Mission) => {
    if (!user || completedMissions.has(mission.id)) return;
    const nextXp = user.xp + mission.xpReward;
    const nextLevel = calculateLevel(nextXp);
    try {
      if (!user.uid.startsWith("guest_")) {
        const result = await addXp(user.uid, mission.xpReward);
        await addCoins(user.uid, mission.coinReward);
        if (result.leveledUp) triggerLevelUp(result.newLevel);
      } else if (nextLevel > user.level) {
        triggerLevelUp(nextLevel);
      }
      setUser({ ...user, xp: nextXp, coins: user.coins + mission.coinReward, level: Math.max(user.level, nextLevel) });
      setCompletedMissions((prev) => new Set([...prev, mission.id]));
      addXpPopup(mission.xpReward, 50, 40);
      toast.success(`+${mission.xpReward} XP & ${mission.coinReward} coins claimed!`);
    } catch {
      toast.error("Failed to claim reward");
    }
  };

  const MissionCard = ({ mission, index }: { mission: Mission; index: number }) => {
    const isCompleted = completedMissions.has(mission.id);
    const progress = Math.min(100, (mission.progress / mission.requirement) * 100);
    const canClaim = mission.progress >= mission.requirement && !isCompleted;

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(missionHref(mission.id))}
        onKeyDown={(e) => { if (e.key === "Enter") navigate(missionHref(mission.id)); }}
        className={`w-full text-left glass-card p-4 border transition-all hover-lift animate-card-in cursor-pointer tap-bounce ${
          isCompleted ? "border-primary/20 bg-primary/3" :
          canClaim ? "border-gold/30 bg-gold/3 shadow-[0_0_20px_rgba(255,215,0,0.1)]" :
          "border-white/5"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
            isCompleted ? "bg-primary/10" : canClaim ? "bg-gold/10" : "bg-white/5"
          }`}>
            {isCompleted ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <AppIcon name={mission.icon} className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={`font-bold text-sm ${isCompleted ? "text-gray-500 line-through" : "text-white"}`}>
                  {language === "bn" ? mission.titleBn : mission.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{mission.description}</p>
              </div>
              {canClaim && !isCompleted && (
                <Button size="sm" variant="gold" onClick={(e) => { e.stopPropagation(); handleClaim(mission); }} className="flex-shrink-0 text-xs py-1 px-2">
                  Claim!
                </Button>
              )}
              {isCompleted && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${isCompleted ? "bg-primary/40" : canClaim ? "bg-gold" : "bg-white/20"}`}
                  style={{ width: `${isCompleted ? 100 : progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 flex-shrink-0">
                {isCompleted ? mission.requirement : mission.progress}/{mission.requirement}
              </span>
            </div>
            <div className="flex gap-3 mt-2">
              <span className="text-xs font-bold text-primary">+{mission.xpReward} XP</span>
              <span className="text-xs font-bold text-gold">+{mission.coinReward}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AchievementCard = ({ achievement, index }: { index: number; achievement: typeof ACHIEVEMENTS[0] }) => {
    const rarityColor = getRarityColor(achievement.rarity);
    return (
      <div
        className={`glass-card p-4 border transition-all ${achievement.isUnlocked ? "border-opacity-30" : "border-white/5 opacity-60"}`}
        style={achievement.isUnlocked ? { borderColor: `${rarityColor}30` } : {}}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${!achievement.isUnlocked ? "grayscale" : ""}`}
            style={achievement.isUnlocked ? { background: `${rarityColor}15`, boxShadow: `0 0 15px ${rarityColor}30` } : { background: "rgba(255,255,255,0.05)" }}
          >
            {achievement.isUnlocked ? achievement.icon : <Lock className="w-5 h-5 text-gray-600" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`font-bold text-sm ${achievement.isUnlocked ? "text-white" : "text-gray-600"}`}>
                {language === "bn" ? achievement.titleBn : achievement.title}
              </p>
              <span className="text-xs px-1.5 py-0.5 rounded font-medium capitalize" style={{ background: `${rarityColor}20`, color: rarityColor }}>
                {achievement.rarity}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{achievement.description}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold text-primary">+{achievement.xpReward} XP</span>
              {achievement.isUnlocked && achievement.unlockedAt && (
                <span className="text-xs text-gray-600 ml-auto">{achievement.unlockedAt.toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalDaily = DAILY_MISSIONS.length;
  const completedDaily = DAILY_MISSIONS.filter((m) => completedMissions.has(m.id)).length;
  const totalXp = [...DAILY_MISSIONS, ...WEEKLY_MISSIONS].reduce((sum, m) => sum + m.xpReward, 0);

  return (
    <div className="space-y-5 animate-card-in">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{language === "bn" ? "মিশন" : "Missions"}</h1>
            <p className="text-sm text-gray-500">Complete missions to earn XP and coins</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 border border-secondary/15 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
          <Trophy className="w-6 h-6 text-secondary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold text-white">Daily Progress</p>
            <p className="text-sm font-bold text-secondary">{completedDaily}/{totalDaily}</p>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${(completedDaily / totalDaily) * 100}%` }} />
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-bold text-gold">{totalXp} XP</p>
          <p className="text-xs text-gray-500">Total available</p>
        </div>
      </div>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t ? "bg-primary text-black font-bold shadow-neon-primary" : "glass border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {tab === "Daily" && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600 uppercase tracking-wider font-mono">Resets in 23h 14m</p>
              <div className="flex items-center gap-1 text-xs text-orange-400">
                <span>Day {user?.streak || 0} Streak</span>
              </div>
            </div>
            {DAILY_MISSIONS.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
          </>
        )}
        {tab === "Weekly" && (
          <>
            <p className="text-xs text-gray-600 uppercase tracking-wider font-mono">Resets in 5 days</p>
            {WEEKLY_MISSIONS.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
          </>
        )}
        {tab === "Achievements" && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">{user?.achievements?.length || 0}/{ACHIEVEMENTS.length} unlocked</p>
              <div className="flex gap-1">
                {["common", "rare", "epic", "legendary"].map((r) => (
                  <span key={r} className="text-xs px-2 py-0.5 rounded capitalize" style={{ background: `${getRarityColor(r)}20`, color: getRarityColor(r) }}>{r}</span>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((a, i) => <AchievementCard key={a.id} achievement={a} index={i} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
