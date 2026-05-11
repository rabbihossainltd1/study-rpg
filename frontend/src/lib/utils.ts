import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXp(xp: number): string {
  if (xp >= 1_000_000) return `${(xp / 1_000_000).toFixed(1)}M`;
  if (xp >= 1_000) return `${(xp / 1_000).toFixed(1)}K`;
  return xp.toString();
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function getDayOfWeek(date: Date): string {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function getStreakColor(streak: number): string {
  if (streak >= 30) return "#FF003C";
  if (streak >= 14) return "#BF5FFF";
  if (streak >= 7) return "#FFD700";
  return "#FF8C00";
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "legendary": return "#FFD700";
    case "epic": return "#BF5FFF";
    case "rare": return "#00F0FF";
    default: return "#9CA3AF";
  }
}

export function truncate(str: string, n: number): string {
  return str.length > n ? `${str.substring(0, n - 1)}...` : str;
}
