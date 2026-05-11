"use client";

import { navigate } from "@/lib/navigate";

import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { SUBJECTS } from "@/lib/subjects";
import { BookOpen, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";

const FILTERS = ["All", "SSC", "HSC", "Admission", "University"];

export default function SubjectsPage() {
  const { language, user } = useUserStore();
  const [filter, setFilter] = useState("All");
  const examMode = user?.examMode || "SSC";

  const filtered = SUBJECTS.filter(
    (s) => filter === "All" || s.examTypes.includes(filter)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">
              {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
            </h1>
            <p className="text-sm text-gray-500">Choose a subject to start learning</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f
                ? "bg-primary text-black font-bold shadow-neon-primary"
                : "glass border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Subjects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Link href={`/subjects/${subject.id}`}>
              <div
                className="glass-card p-5 border cursor-pointer transition-all duration-300 hover:shadow-lg group"
                style={{ borderColor: `${subject.color}25` }}
              >
                {/* Icon + Difficulty */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                    style={{ background: `${subject.color}15`, boxShadow: `0 0 20px ${subject.color}20` }}
                  >
                    {subject.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${subject.color}20`, color: subject.color }}
                    >
                      {subject.difficulty}
                    </span>
                    <span className="text-xs text-gray-600">{subject.xpReward} XP/ch</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-black text-white text-base mb-0.5">
                  {language === "bn" ? subject.nameBn : subject.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {subject.completedChapters}/{subject.totalChapters} chapters completed
                </p>

                {/* Progress */}
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: subject.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.06 + 0.3 }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{subject.progress}%</span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: subject.color }}>
                    Start Learning <ChevronRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Exam badges */}
                <div className="flex gap-1 mt-3 flex-wrap">
                  {subject.examTypes.map((exam) => (
                    <span
                      key={exam}
                      className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        exam === examMode ? "bg-primary/20 text-primary" : "bg-white/5 text-gray-600"
                      }`}
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recommended banner */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 border border-gold/20 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-2xl flex-shrink-0">
          ⭐
        </div>
        <div className="flex-1">
          <p className="font-bold text-white text-sm">Recommended for {examMode}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Focus on {examMode === "SSC" ? "Math, Physics & Chemistry" : examMode === "HSC" ? "Physics, Chemistry & Biology" : "All subjects"} for maximum score.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Zap className="w-6 h-6 text-gold" />
        </div>
      </motion.div>
    </div>
  );
}
