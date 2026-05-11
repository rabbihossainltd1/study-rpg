import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0F0F0F",
        surfaceLight: "#1A1A1A",
        surfaceMid: "#141414",
        border: "rgba(255,255,255,0.07)",
        primary: {
          DEFAULT: "#39FF14",
          glow: "rgba(57, 255, 20, 0.5)",
          dim: "rgba(57, 255, 20, 0.15)",
          dark: "#2abf0f",
        },
        secondary: {
          DEFAULT: "#00F0FF",
          glow: "rgba(0, 240, 255, 0.5)",
          dim: "rgba(0, 240, 255, 0.15)",
        },
        accent: {
          DEFAULT: "#FF003C",
          glow: "rgba(255, 0, 60, 0.5)",
          dim: "rgba(255, 0, 60, 0.15)",
        },
        purple: {
          DEFAULT: "#BF5FFF",
          glow: "rgba(191, 95, 255, 0.5)",
          dim: "rgba(191, 95, 255, 0.15)",
        },
        gold: "#FFD700",
        xp: "#FFD700",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
        "neon-gradient": "linear-gradient(135deg, #39FF14 0%, #00F0FF 100%)",
        "hero-gradient":
          "radial-gradient(ellipse at top, rgba(57,255,20,0.12) 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(57,255,20,0.05) 0%, rgba(0,240,255,0.03) 100%)",
      },
      boxShadow: {
        "neon-primary": "0 0 10px #39FF14, 0 0 30px rgba(57,255,20,0.2)",
        "neon-secondary": "0 0 10px #00F0FF, 0 0 30px rgba(0,240,255,0.2)",
        "neon-purple": "0 0 10px #BF5FFF, 0 0 30px rgba(191,95,255,0.2)",
        "neon-red": "0 0 10px #FF003C, 0 0 30px rgba(255,0,60,0.2)",
        glass: "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "xp-pop": "xp-pop 0.5s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px #39FF14)" },
          "50%": { opacity: "0.6", filter: "drop-shadow(0 0 2px #39FF14)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "xp-pop": {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.5)" },
          "60%": { opacity: "1", transform: "translateY(-40px) scale(1.2)" },
          "100%": { opacity: "0", transform: "translateY(-80px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
