"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Card";
import { formatTime } from "@/lib/utils";
import { addXp, addCoins } from "@/lib/firebase";
import {
  Play, Pause, RotateCcw, Coffee, Brain,
  Zap, Timer, TrendingUp, CheckCircle2, Settings,
} from "lucide-react";
import toast from "react-hot-toast";

const MODES = [
  { id: "pomodoro", label: "Pomodoro", labelBn: "পোমোডোরো", duration: 25 * 60, color: "#39FF14", icon: Brain, xpPerMin: 3, desc: "25 min focus" },
  { id: "short", label: "Short Break", labelBn: "ছোট বিরতি", duration: 5 * 60, color: "#00F0FF", icon: Coffee, xpPerMin: 0, desc: "5 min rest" },
  { id: "long", label: "Long Break", labelBn: "দীর্ঘ বিরতি", duration: 15 * 60, color: "#BF5FFF", icon: Coffee, xpPerMin: 0, desc: "15 min rest" },
  { id: "deep", label: "Deep Focus", labelBn: "ডিপ ফোকাস", duration: 50 * 60, color: "#FF003C", icon: Zap, xpPerMin: 5, desc: "50 min power session" },
];

const AMBIENT_LABELS = ["🌧️ Rain", "☕ Cafe", "🌊 Ocean", "🌲 Forest", "🔇 Silent"];

export default function FocusPage() {
  const { user, setUser, language, addXpPopup, triggerLevelUp } = useUserStore();
  const [mode, setMode] = useState(MODES[0]);
  const [timeLeft, setTimeLeft] = useState(MODES[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [ambient, setAmbient] = useState("🔇 Silent");
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const percentage = ((mode.duration - timeLeft) / mode.duration) * 100;
  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleComplete = useCallback(async () => {
    if (!user || mode.id === "short" || mode.id === "long") {
      setSessions((s) => s + 1);
      toast.success("Break complete! Back to focus! 🚀");
      return;
    }
    const minutesStudied = Math.floor((mode.duration - timeLeft) / 60);
    const xpEarned = Math.max(10, minutesStudied * mode.xpPerMin);
    const coinsEarned = Math.floor(minutesStudied * 1.5);
    setSessions((s) => s + 1);
    setTotalMinutes((m) => m + minutesStudied);
    try {
      const result = await addXp(user.uid, xpEarned);
      await addCoins(user.uid, coinsEarned);
      setUser({ ...user, xp: user.xp + xpEarned, coins: user.coins + coinsEarned });
      addXpPopup(xpEarned, 50, 40);
      if (result.leveledUp) triggerLevelUp(result.newLevel);
      toast.success(`Session complete! +${xpEarned} XP ⚡`);
    } catch {}
  }, [user, mode, timeLeft, setUser, addXpPopup, triggerLevelUp]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedRef.current * 1000;
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        elapsedRef.current = elapsed;
        const remaining = mode.duration - elapsed;
        if (remaining <= 0) {
          setTimeLeft(0);
          setIsRunning(false);
          clearInterval(intervalRef.current!);
          elapsedRef.current = 0;
          handleComplete();
        } else {
          setTimeLeft(remaining);
        }
      }, 200);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning, mode.duration, handleComplete]);

  const handleToggle = () => setIsRunning((r) => !r);

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    elapsedRef.current = 0;
    setTimeLeft(mode.duration);
  };

  const handleModeChange = (m: typeof MODES[0]) => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    elapsedRef.current = 0;
    setMode(m);
    setTimeLeft(m.duration);
  };

  const progressColor = mode.color;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center">
            <Timer className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{language === "bn" ? "ফোকাস মোড" : "Focus Mode"}</h1>
            <p className="text-sm text-gray-500">Study without distractions · Earn bonus XP</p>
          </div>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="p-2 glass rounded-xl border border-white/10 hover:border-white/20 transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {MODES.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => handleModeChange(m)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                mode.id === m.id ? "text-black font-bold" : "glass border-white/10 text-gray-400 hover:text-white"
              }`}
              style={mode.id === m.id ? { background: m.color, borderColor: m.color, boxShadow: `0 0 20px ${m.color}40` } : {}}
            >
              <Icon className="w-4 h-4" />
              {language === "bn" ? m.labelBn : m.label}
            </button>
          );
        })}
      </div>

      {/* Timer Circle */}
      <div className="flex justify-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="120" cy="120" r="110"
              fill="none"
              stroke={progressColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ filter: `drop-shadow(0 0 8px ${progressColor})`, transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isRunning && <div className="text-2xl mb-1">🎯</div>}
            <p className="text-5xl font-black font-mono tabular-nums" style={{ color: progressColor, textShadow: `0 0 30px ${progressColor}60` }}>
              {formatTime(timeLeft)}
            </p>
            <p className="text-sm text-gray-400 mt-1">{mode.desc}</p>
            {mode.xpPerMin > 0 && <p className="text-xs text-primary mt-1">+{mode.xpPerMin} XP/min</p>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button onClick={handleReset} className="w-12 h-12 glass rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all active:scale-95">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={handleToggle}
          className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-black transition-all active:scale-95"
          style={{ background: progressColor, boxShadow: `0 0 30px ${progressColor}50` }}
        >
          {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
        </button>
        <div className="w-12 h-12 glass rounded-full border border-white/10 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-400">{sessions}</span>
        </div>
      </div>

      {/* Ambient Sound */}
      <div>
        <p className="text-xs text-gray-600 text-center mb-2">Ambient Sound</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {AMBIENT_LABELS.map((a) => (
            <button
              key={a}
              onClick={() => setAmbient(a)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all border ${
                ambient === a ? "border-secondary bg-secondary/10 text-secondary" : "glass border-white/10 text-gray-500 hover:text-white"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Sessions Today" value={sessions} icon={<CheckCircle2 className="w-4 h-4" />} color="#39FF14" />
        <StatCard label="Minutes Focused" value={totalMinutes} icon={<Timer className="w-4 h-4" />} color="#00F0FF" />
        <StatCard label="XP Earned" value={`${totalMinutes * mode.xpPerMin}`} icon={<Zap className="w-4 h-4" />} color="#FFD700" />
      </div>

      {/* Tips */}
      <div className="glass-card p-4 border border-primary/10">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">Focus Tips 💡</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Put your phone face-down to minimize distractions</li>
              <li>• Use headphones with ambient sounds for better concentration</li>
              <li>• Deep Focus (50 min) gives 5 XP/minute — maximum rewards!</li>
              <li>• Take proper breaks to maintain study efficiency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
