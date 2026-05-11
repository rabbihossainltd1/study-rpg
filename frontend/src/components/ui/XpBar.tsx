"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RANK_COLORS, type Rank } from "@/types";

interface XpBarProps {
  currentXp: number;
  totalXp: number;
  level: number;
  rank: Rank;
  compact?: boolean;
  className?: string;
}

const LEVEL_TITLES: Record<number, string> = {
  1: "নবীন শিক্ষার্থী",
  5: "জ্ঞান অন্বেষী",
  10: "দক্ষ পাঠক",
  20: "বিদ্যার্থী",
  30: "জ্ঞান বীর",
  50: "পণ্ডিত",
  75: "মহাপণ্ডিত",
  100: "কিংবদন্তি",
};

function getLevelTitle(level: number): string {
  const thresholds = Object.keys(LEVEL_TITLES)
    .map(Number)
    .sort((a, b) => b - a);
  for (const t of thresholds) {
    if (level >= t) return LEVEL_TITLES[t];
  }
  return "নবীন শিক্ষার্থী";
}

function getXpForLevel(level: number): number {
  return (level - 1) ** 2 * 100;
}

export function XpBar({ currentXp, totalXp, level, rank, compact = false, className }: XpBarProps) {
  const currentLevelXp = getXpForLevel(level);
  const nextLevelXp = getXpForLevel(level + 1);
  const progressXp = totalXp - currentLevelXp;
  const neededXp = nextLevelXp - currentLevelXp;
  const percentage = Math.min(100, Math.max(0, (progressXp / neededXp) * 100));
  const rankColor = RANK_COLORS[rank] || "#9CA3AF";

  if (compact) {
    return (
      <div className={cn("w-full", className)}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono text-primary">LV.{level}</span>
          <span className="text-xs text-gray-500">{progressXp}/{neededXp} XP</span>
        </div>
        <div className="xp-bar-track h-2">
          <motion.div
            className="xp-bar-fill h-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-black font-mono border"
            style={{
              color: rankColor,
              borderColor: `${rankColor}40`,
              background: `${rankColor}15`,
              boxShadow: `0 0 10px ${rankColor}30`,
            }}
          >
            LVL {level}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{getLevelTitle(level)}</p>
            <p className="text-xs" style={{ color: rankColor }}>{rank}</p>
          </div>
        </div>
        <span className="text-xs font-mono text-gray-400">
          {progressXp.toLocaleString()} / {neededXp.toLocaleString()} XP
        </span>
      </div>

      <div className="xp-bar-track h-4 relative">
        <motion.div
          className="xp-bar-fill h-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-80" />
        </motion.div>

        {/* Milestone markers */}
        {[25, 50, 75].map((mark) => (
          <div
            key={mark}
            className="absolute top-0 h-full w-px bg-white/10"
            style={{ left: `${mark}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-600">Total XP: {totalXp.toLocaleString()}</span>
        <span className="text-xs text-gray-600">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
