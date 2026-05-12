"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variants = {
  primary: "bg-primary text-black font-bold hover:bg-primary/90 shadow-neon-primary",
  secondary: "bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20",
  ghost: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
  danger: "bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20",
  gold: "bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.type || "button"}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
