"use client";

import { useMemo, useState } from "react";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { SUBJECTS, CHAPTERS } from "@/lib/subjects";
import { getSubjectQuizQuestions, type QuizDifficulty } from "@/lib/quizData";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft, Lock, CheckCircle2, Play, Clock,
  Zap, BookOpen, HelpCircle, ChevronDown, ChevronUp, X, Check, Trophy
} from "lucide-react";
import { addXp, addCoins } from "@/lib/firebase";
import toast from "react-hot-toast";
import type { Lesson } from "@/types";

const DIFFICULTIES: Array<{ id: QuizDifficulty; label: string; color: string }> = [
  { id: "easy", label: "Easy", color: "#39FF14" },
  { id: "medium", label: "Medium", color: "#FFD700" },
  { id: "hard", label: "Hard", color: "#FF003C" },
];

export default function SubjectDetailClient({ id }: { id: string }) {
  const { user, setUser, addXpPopup, triggerLevelUp, language } = useUserStore();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState<QuizDifficulty>("easy");
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const subject = SUBJECTS.find((s) => s.id === id);
  const chapters = CHAPTERS[id] || [];
  const quizQuestions = useMemo(() => getSubjectQuizQuestions(id, quizDifficulty, 10), [id, quizDifficulty]);
  const currentQ = quizQuestions[quizIndex];
  const difficultyBonus = quizDifficulty === "hard" ? 15 : quizDifficulty === "medium" ? 8 : 0;
  const quizRewardXp = score * 30 + (score === quizQuestions.length ? 50 : 0) + difficultyBonus;

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-400">Subject not found</p>
        <Button onClick={() => window.history.back()} variant="ghost">← Go Back</Button>
      </div>
    );
  }

  const updateLocalReward = async (xpEarned: number, coinsEarned: number) => {
    if (!user) return;
    let newLevel = user.level;
    let leveledUp = false;
    if (!user.uid.startsWith("guest_")) {
      try {
        const result = await addXp(user.uid, xpEarned);
        await addCoins(user.uid, coinsEarned);
        newLevel = result.newLevel;
        leveledUp = result.leveledUp;
      } catch {
        toast.error("Reward sync failed, saved locally for now");
      }
    }
    setUser({ ...user, xp: user.xp + xpEarned, coins: user.coins + coinsEarned, level: newLevel });
    addXpPopup(xpEarned, 50, 35);
    if (leveledUp) triggerLevelUp(newLevel);
  };

  const startQuiz = (difficulty: QuizDifficulty = quizDifficulty) => {
    setQuizDifficulty(difficulty);
    setQuizActive(true);
    setQuizIndex(0);
    setScore(0);
    setQuizDone(false);
    setSelected(null);
    setAnswered(false);
  };

  const handleLessonStart = async (lesson: Lesson) => {
    if (lesson.type === "quiz") {
      startQuiz(quizDifficulty);
      return;
    }
    if (completedLessons.has(lesson.id)) {
      toast("Already completed");
      return;
    }
    setCompletedLessons((prev) => new Set([...prev, lesson.id]));
    await updateLocalReward(lesson.xpReward, Math.max(1, Math.round(lesson.xpReward / 8)));
    toast.success(`${lesson.title} complete · +${lesson.xpReward} XP`);
  };

  const handleAnswer = (optionIndex: number) => {
    if (answered || !currentQ) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (currentQ.correctAnswer === optionIndex) setScore((s) => s + 1);
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setQuizDone(true);
    }
  };

  const handleFinishQuiz = async () => {
    if (!user || quizQuestions.length === 0) return;
    const xpEarned = quizRewardXp;
    const coinsEarned = score * 5;
    await updateLocalReward(xpEarned, coinsEarned);
    toast.success(`Quiz done! +${xpEarned} XP`);
    setQuizActive(false);
    setQuizDone(false);
    setQuizIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="space-y-5 animate-card-in">
      <div>
        <button onClick={() => navigate("/subjects")} className="flex items-center gap-1 text-sm text-gray-500 hover:text-white mb-4 transition-colors tap-bounce">
          <ChevronLeft className="w-4 h-4" /> Back to Subjects
        </button>
        <div className="glass-card p-5 border hover-lift" style={{ borderColor: `${subject.color}25` }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 animate-float-soft" style={{ background: `${subject.color}15` }}>
              {subject.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-black text-white truncate">{language === "bn" ? subject.nameBn : subject.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{subject.totalChapters} chapters · 120 real quizzes</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${subject.progress}%`, background: subject.color }} />
                </div>
                <span className="text-xs font-mono" style={{ color: subject.color }}>{subject.progress}%</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => (
              <button key={d.id} onClick={() => setQuizDifficulty(d.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${quizDifficulty === d.id ? "text-black" : "text-gray-400 bg-white/5 border-white/10"}`} style={quizDifficulty === d.id ? { background: d.color, borderColor: d.color } : {}}>
                {d.label}
              </button>
            ))}
            <Button onClick={() => startQuiz(quizDifficulty)} variant="secondary" size="sm" leftIcon={<HelpCircle className="w-4 h-4" />}>Take Quiz</Button>
            <div className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-xs" style={{ color: subject.color }}>
              <Zap className="w-3 h-3" /> {subject.xpReward} XP/chapter
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
          <h2 className="font-bold text-white">Chapters</h2>
        </div>
        <div className="space-y-2">
          {chapters.map((chapter, i) => (
            <div key={chapter.id} className={`glass-card border overflow-hidden transition-all hover-lift ${chapter.isLocked ? "opacity-60" : ""}`} style={{ borderColor: expandedChapter === chapter.id ? `${subject.color}30` : "rgba(255,255,255,0.05)" }}>
              <button className="w-full flex items-center gap-4 p-4 text-left tap-bounce" onClick={() => !chapter.isLocked && setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)} disabled={chapter.isLocked}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${chapter.isCompleted ? "bg-primary/20 text-primary" : chapter.isLocked ? "bg-white/5 text-gray-600" : ""}`} style={!chapter.isLocked && !chapter.isCompleted ? { borderColor: `${subject.color}30`, background: `${subject.color}10`, color: subject.color } : {}}>
                  {chapter.isLocked ? <Lock className="w-4 h-4" /> : chapter.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{language === "bn" ? chapter.titleBn : chapter.title}</p>
                  <p className="text-xs text-gray-500 truncate">{chapter.description}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-gray-600">{chapter.lessons.length} lessons</span>
                    <span className="text-xs font-bold" style={{ color: subject.color }}>+{chapter.xpReward} XP</span>
                  </div>
                </div>
                {!chapter.isLocked && (expandedChapter === chapter.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />)}
              </button>

              {expandedChapter === chapter.id && (
                <div className="border-t border-white/5 divide-y divide-white/5 animate-card-in">
                  {chapter.lessons.map((lesson) => {
                    const done = completedLessons.has(lesson.id);
                    return (
                      <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${lesson.type === "quiz" ? "bg-secondary/10 text-secondary" : lesson.type === "practice" ? "bg-gold/10 text-gold" : "bg-white/5 text-gray-400"}`}>
                          {done ? <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> : lesson.type === "quiz" ? <HelpCircle className="w-3.5 h-3.5" /> : lesson.type === "practice" ? <Zap className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{language === "bn" ? lesson.titleBn : lesson.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Clock className="w-3 h-3 text-gray-600" />
                            <span className="text-xs text-gray-600">{lesson.duration} min</span>
                            <span className="text-xs font-semibold text-primary">+{lesson.xpReward} XP</span>
                          </div>
                        </div>
                        <Button size="sm" variant={done ? "secondary" : "ghost"} leftIcon={done ? <CheckCircle2 className="w-3 h-3" /> : <Play className="w-3 h-3" />} className="text-xs py-1 px-2" onClick={() => handleLessonStart(lesson)}>
                          {done ? "Done" : lesson.type === "quiz" ? "Quiz" : "Start"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {quizActive && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-card w-full max-w-lg p-6 border border-secondary/20 animate-drawer-up">
            {!quizDone ? (
              currentQ ? <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">{subject.name} · {quizDifficulty}</p>
                    <p className="text-lg font-bold text-white">Question {quizIndex + 1}/{quizQuestions.length}</p>
                  </div>
                  <button onClick={() => setQuizActive(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full mb-5 overflow-hidden"><div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} /></div>
                <div className="mb-4"><span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-500">{currentQ.topic}</span></div>
                <h3 className="text-lg font-bold text-white mb-4 leading-relaxed">{currentQ.questionBn || currentQ.question}</h3>
                <div className="space-y-2 mb-5">
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = currentQ.correctAnswer === idx;
                    const isSelected = selected === idx;
                    return (
                      <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered} className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all font-medium tap-bounce ${
                        !answered ? "border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300" :
                        isCorrect ? "border-primary bg-primary/15 text-primary" :
                        isSelected && !isCorrect ? "border-accent bg-accent/15 text-accent" :
                        "border-white/5 text-gray-600"
                      }`}>
                        <span className="flex items-center gap-3"><span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">{answered && isCorrect ? <Check className="w-3 h-3" /> : answered && isSelected && !isCorrect ? <X className="w-3 h-3" /> : String.fromCharCode(65 + idx)}</span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {answered && <div className={`p-3 rounded-xl text-sm mb-4 ${selected === currentQ.correctAnswer ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20"}`}>{selected === currentQ.correctAnswer ? "Correct. " : "Incorrect. "}{currentQ.explanation}</div>}
                {answered && <Button onClick={handleNextQuestion} className="w-full">{quizIndex + 1 < quizQuestions.length ? "Next Question →" : "See Results"}</Button>}
              </> : <div className="text-center"><p className="text-gray-400 mb-4">No quiz found for this subject.</p><Button onClick={() => setQuizActive(false)}>Close</Button></div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4"><Trophy className="w-8 h-8 text-gold" /></div>
                <h3 className="text-2xl font-black text-white mb-1">Quiz Complete</h3>
                <p className="text-gray-400 mb-4">You scored <span className="text-primary font-bold">{score}/{quizQuestions.length}</span></p>
                <div className="glass rounded-xl p-4 mb-5 flex justify-around">
                  <div><p className="text-xl font-bold text-primary">+{quizRewardXp} XP</p><p className="text-xs text-gray-500">Earned</p></div>
                  <div className="w-px bg-white/10" />
                  <div><p className="text-xl font-bold text-gold">+{score * 5} 🪙</p><p className="text-xs text-gray-500">Coins</p></div>
                  <div className="w-px bg-white/10" />
                  <div><p className="text-xl font-bold text-secondary">{Math.round((score / quizQuestions.length) * 100)}%</p><p className="text-xs text-gray-500">Accuracy</p></div>
                </div>
                <Button onClick={handleFinishQuiz} className="w-full" size="lg">Claim Rewards ⚡</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
