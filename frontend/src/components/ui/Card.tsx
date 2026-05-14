"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "green" | "cyan" | "purple" | "red" | "gold" | "none";
  hover?: boolean;
}

const glowMap = {
  green: "hover:border-primary/30 hover:shadow-neon-primary",
  cyan: "hover:border-secondary/30 hover:shadow-neon-secondary",
  purple: "hover:border-purple/30 hover:shadow-neon-purple",
  red: "hover:border-accent/30 hover:shadow-neon-red",
  gold: "hover:border-gold/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]",
  none: "",
};

export function Card({ glow = "none", hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card p-5 transition-all duration-300 animate-card-in",
        hover && "cursor-pointer",
        glow !== "none" && glowMap[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  color = "#39FF14",
  sub,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  sub?: string;
}) {
  return (
    <div
      className="glass-card p-4 flex items-center gap-4 border transition-all duration-300 hover-lift"
      style={{ borderColor: `${color}20` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black" style={{ color }}>{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
        {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
