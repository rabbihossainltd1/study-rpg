"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { Zap, X, Star, Coins, Gem, Unlock } from "lucide-react";
import { RANK_COLORS } from "@/types";
import { useEffect } from "react";

// Simple confetti without external dependency
function fireConfetti() {
  const colors = ["#39FF14", "#00F0FF", "#BF5FFF", "#FFD700", "#FF003C"];

  function fire() {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden;
    `;
    document.body.appendChild(container);

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const x = Math.random() * 100;
      const duration = Math.random() * 1000 + 1000;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        left: ${x}%;
        top: -20px;
        animation: fall ${duration}ms ease-in forwards;
      `;
      container.appendChild(particle);
    }

    const style = document.createElement("style");
    style.textContent = `
      @keyframes fall {
        to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    setTimeout(() => {
      document.body.removeChild(container);
      document.head.removeChild(style);
    }, 3000);
  }

  fire();
}

export function LevelUpModal() {
  const { showLevelUpModal, newLevel, dismissLevelUp, user } = useUserStore();

  const closeModal = () => {
    dismissLevelUp();
    setTimeout(() => dismissLevelUp(), 50);
  };

  useEffect(() => {
    if (showLevelUpModal) {
      fireConfetti();
    }
  }, [showLevelUpModal]);

  const rankColor = user ? RANK_COLORS[user.rank] : "#39FF14";

  return (
    <AnimatePresence>
      {showLevelUpModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative glass-card p-8 max-w-sm w-full text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              border: `1px solid ${rankColor}40`,
              boxShadow: `0 0 60px ${rankColor}30`,
            }}
          >
            {/* BG Glow */}
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: `radial-gradient(circle at center, ${rankColor}, transparent 70%)` }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <Star className="w-5 h-5 fill-gold text-gold" />
                </motion.div>
              ))}
            </div>

            {/* Level Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative w-28 h-28 mx-auto mb-5"
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center border-4"
                style={{
                  borderColor: rankColor,
                  background: `${rankColor}15`,
                  boxShadow: `0 0 30px ${rankColor}50`,
                }}
              >
                <div className="text-center">
                  <Zap className="w-6 h-6 mx-auto mb-1" style={{ color: rankColor }} />
                  <p className="text-3xl font-black" style={{ color: rankColor }}>{newLevel}</p>
                </div>
              </div>

              {/* Orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed opacity-30"
                style={{ borderColor: rankColor }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-1">
                Level Up!
              </p>
              <h2 className="text-3xl font-black text-white mb-2">
                অভিনন্দন!
              </h2>
              <p className="text-gray-400 text-sm mb-1">
                You reached{" "}
                <span className="font-bold" style={{ color: rankColor }}>
                  Level {newLevel}
                </span>
              </p>
              {user && (
                <p className="text-xs text-gray-600">
                  Rank: <span style={{ color: rankColor }}>{user.rank}</span>
                </p>
              )}
            </motion.div>

            {/* Rewards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 p-3 rounded-xl border border-white/10 bg-white/5 flex justify-around"
            >
              <div className="text-center">
                <p className="text-lg font-bold text-gold inline-flex items-center gap-1">+{newLevel * 20} <Coins className="w-4 h-4" /></p>
                <p className="text-xs text-gray-500">Coins</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400 inline-flex items-center gap-1">+{Math.floor(newLevel / 5)} <Gem className="w-4 h-4" /></p>
                <p className="text-xs text-gray-500">Gems</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-lg font-bold text-primary inline-flex items-center gap-1"><Unlock className="w-4 h-4" /> Unlocked</p>
                <p className="text-xs text-gray-500">New content</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-5 relative z-[220]"
            >
              <button
                type="button"
                onPointerDown={(e) => { e.stopPropagation(); closeModal(); }}
                onClick={(e) => { e.stopPropagation(); closeModal(); }}
                className="w-full rounded-xl bg-primary text-black font-black py-4 shadow-neon-primary active:scale-95 transition-all"
              >
                Continue Journey
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
