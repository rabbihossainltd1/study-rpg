"use client";

import { useMemo, useState } from "react";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { DAILY_MISSIONS, GENERAL_KNOWLEDGE_QUIZZES } from "@/lib/missions";
import { AppIcon } from "@/components/ui/AppIcon";
import { Button } from "@/components/ui/Button";
import { Target, Zap, Trophy, CheckCircle2, X, Check, HelpCircle, BookOpen, Coins } from "lucide-react";
import { addXp, addCoins } from "@/lib/firebase";
import toast from "react-hot-toast";
import { calculateLevel, type Mission } from "@/types";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export default function MissionsPage() {
  const { user, setUser, language, addXpPopup, triggerLevelUp } = useUserStore();
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set());
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const isBn = language === "bn";
  const quizQuestions = useMemo(() => GENERAL_KNOWLEDGE_QUIZZES.slice(0, 3), []);
  const currentQ = quizQuestions[questionIndex];
  const totalDaily = DAILY_MISSIONS.length;
  const completedDaily = DAILY_MISSIONS.filter((m) => completedMissions.has(m.id)).length;
  const totalXp = DAILY_MISSIONS.reduce((sum, m) => sum + m.xpReward, 0);
  useBodyScrollLock(Boolean(activeMission));

  const handleClaim = async (mission: Mission, earnedScore = score) => {
    if (!user || completedMissions.has(mission.id)) return;
    if (mission.id.startsWith("gk-") && earnedScore < 2) {
      toast.error(isBn ? "Reward নিতে অন্তত ২টি সঠিক উত্তর লাগবে" : "At least 2 correct answers are required");
      return;
    }
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
      setActiveMission(null);
    } catch {
      toast.error("Failed to claim reward");
    }
  };

  const openMission = (mission: Mission) => {
    if (mission.id === "daily-progress-subjects") {
      navigate("/subjects");
      return;
    }
    if (mission.id.startsWith("gk-")) {
      setActiveMission(mission);
      setQuestionIndex(0);
      setSelected(null);
      setAnswered(false);
      setScore(0);
      setQuizDone(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (answered || !currentQ) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (currentQ.answer === optionIndex) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (questionIndex + 1 < quizQuestions.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setQuizDone(true);
    }
  };

  const MissionCard = ({ mission, index }: { mission: Mission; index: number }) => {
    const isCompleted = completedMissions.has(mission.id);
    const isProgress = mission.id === "daily-progress-subjects";
    const canClaim = mission.progress >= mission.requirement && !isCompleted && !mission.id.startsWith("gk-");
    const progress = isCompleted ? 100 : isProgress ? 0 : Math.min(100, (mission.progress / mission.requirement) * 100);

    return (
      <button
        type="button"
        onClick={() => openMission(mission)}
        className={`w-full text-left glass-card p-4 border transition-all hover-lift animate-card-in cursor-pointer tap-bounce ${
          isCompleted ? "border-primary/20 bg-primary/3" :
          canClaim ? "border-gold/30 bg-gold/3 shadow-[0_0_20px_rgba(255,215,0,0.1)]" :
          "border-white/5"
        }`}
        style={{ animationDelay: `${index * 45}ms` }}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isCompleted ? "bg-primary/10" : isProgress ? "bg-secondary/10" : "bg-white/5"}`}>
            {isCompleted ? <CheckCircle2 className="w-5 h-5 text-primary" /> : isProgress ? <BookOpen className="w-5 h-5 text-secondary" /> : <AppIcon name={mission.icon} className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={`font-bold text-sm ${isCompleted ? "text-gray-500 line-through" : "text-white"}`}>{isBn ? mission.titleBn : mission.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{mission.description}</p>
              </div>
              {isProgress && <span className="text-xs text-secondary font-black">Open</span>}
              {mission.id.startsWith("gk-") && !isCompleted && <span className="text-xs text-gold font-black">Quiz</span>}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full bg-primary/60 transition-all duration-700" style={{ width: `${progress}%` }} /></div>
              <span className="text-xs text-gray-600 flex-shrink-0">{isCompleted ? mission.requirement : mission.progress}/{mission.requirement}</span>
            </div>
            <div className="flex gap-3 mt-2">
              <span className="text-xs font-bold text-primary">+{mission.xpReward} XP</span>
              <span className="text-xs font-bold text-gold">+{mission.coinReward}</span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-5 animate-card-in">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{isBn ? "মিশন" : "Missions"}</h1>
            <p className="text-sm text-gray-500">{isBn ? "দৈনিক প্রগ্রেস ও সাধারণ জ্ঞান কুইজ" : "Daily progress and general knowledge quizzes"}</p>
          </div>
        </div>
      </div>

      <button onClick={() => navigate("/subjects")} className="w-full glass-card p-4 border border-secondary/15 flex items-center gap-4 text-left tap-bounce hover-lift">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
          <Trophy className="w-6 h-6 text-secondary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold text-white">Daily Progress</p>
            <p className="text-sm font-bold text-secondary">{completedDaily}/{totalDaily}</p>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${(completedDaily / Math.max(totalDaily, 1)) * 100}%` }} /></div>
          <p className="text-xs text-gray-500 mt-1">{isBn ? "Click করলে বিষয়সমূহ open হবে" : "Tap to open Subjects"}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-bold text-gold">{totalXp} XP</p>
          <p className="text-xs text-gray-500">Available</p>
        </div>
      </button>

      <div className="space-y-3">
        <div className="flex items-center justify-between"><p className="text-xs text-gray-600 uppercase tracking-wider font-mono">Daily missions</p><span className="text-xs text-primary font-bold">GK + Subjects</span></div>
        {DAILY_MISSIONS.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
      </div>

      {activeMission && (
        <div className="modal-backdrop fixed inset-0 z-[260] flex items-center justify-center p-4 animate-fade-in overflow-hidden">
          <div className="glass-card modal-compact-card w-full max-w-md p-5 border border-gold/25 animate-card-in overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-gold" /></div>
                <div><h3 className="text-lg font-black text-white">{isBn ? activeMission.titleBn : activeMission.title}</h3><p className="text-xs text-gray-500">{score}/{quizQuestions.length} correct</p></div>
              </div>
              <button onClick={() => setActiveMission(null)} className="p-2 rounded-lg hover:bg-white/10 text-gray-500"><X className="w-5 h-5" /></button>
            </div>

            {!quizDone && currentQ ? (
              <>
                <div className="h-1.5 bg-white/5 rounded-full mb-5 overflow-hidden"><div className="h-full bg-gold rounded-full transition-all" style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }} /></div>
                <p className="text-xs text-gray-500 uppercase font-mono mb-2">Question {questionIndex + 1}/{quizQuestions.length}</p>
                <h3 className="text-xl font-black text-white mb-4 leading-relaxed">{isBn ? currentQ.questionBn : currentQ.question}</h3>
                <div className="space-y-3 mb-5">
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = currentQ.answer === idx;
                    const isSelected = selected === idx;
                    return (
                      <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered} className={`quiz-option-btn w-full text-left p-4 rounded-2xl border text-base transition-all font-bold tap-bounce ${
                        !answered ? "border-white/15 bg-white/[0.03] hover:border-gold/60 hover:bg-gold/10 text-white" :
                        isCorrect ? "border-primary bg-primary/15 text-primary" :
                        isSelected && !isCorrect ? "border-accent bg-accent/15 text-accent" :
                        "border-white/5 text-gray-600 bg-white/[0.02]"
                      }`}>
                        <span className="flex items-center gap-3"><span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-black flex-shrink-0 bg-black/20">{answered && isCorrect ? <Check className="w-4 h-4" /> : answered && isSelected && !isCorrect ? <X className="w-4 h-4" /> : String.fromCharCode(65 + idx)}</span><span>{opt}</span></span>
                      </button>
                    );
                  })}
                </div>
                {answered && <div className={`p-3 rounded-xl text-sm mb-4 ${selected === currentQ.answer ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20"}`}>{selected === currentQ.answer ? "Correct. " : "Incorrect. "}{currentQ.explanation}</div>}
                {answered && <Button onClick={nextQuestion} className="w-full" size="lg">{questionIndex + 1 < quizQuestions.length ? "Next Question →" : "See Results"}</Button>}
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4"><Trophy className="w-8 h-8 text-gold" /></div>
                <h3 className="text-2xl font-black text-white mb-1">Quiz Complete</h3>
                <p className="text-gray-400 mb-4">You scored <span className="text-primary font-bold">{score}/{quizQuestions.length}</span></p>
                <div className="glass rounded-xl p-4 mb-5 flex justify-around">
                  <div><p className="text-xl font-bold text-primary">+{activeMission.xpReward} XP</p><p className="text-xs text-gray-500">Earned</p></div>
                  <div className="w-px bg-white/10" />
                  <div><p className="text-xl font-bold text-gold inline-flex items-center gap-1">+{activeMission.coinReward} <Coins className="w-5 h-5" /></p><p className="text-xs text-gray-500">Coins</p></div>
                </div>
                <Button onClick={() => handleClaim(activeMission, score)} className="w-full" size="lg" disabled={score < 2}>Claim Rewards</Button>
                {score < 2 && <p className="text-xs text-accent mt-3">At least 2 correct answers needed.</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
