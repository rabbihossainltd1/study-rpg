"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";

export function XpFloatingPopups() {
  const { xpPopups } = useUserStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {xpPopups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -80, scale: 1 }}
            exit={{ opacity: 0, y: -140, scale: 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute font-black text-primary text-xl pointer-events-none"
            style={{ left: `${popup.x}%`, top: `${popup.y}%`, textShadow: "0 0 20px #39FF14" }}
          >
            +{popup.amount} XP ⚡
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
