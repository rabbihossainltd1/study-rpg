"use client";

import { useEffect, useMemo, useState } from "react";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { SUBJECTS, CHAPTERS } from "@/lib/subjects";
import { getSubjectQuizQuestions, type QuizDifficulty } from "@/lib/quizData";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft, Lock, CheckCircle2, Play, Clock,
  Zap, BookOpen, HelpCircle, ChevronDown, ChevronUp, X, Check, Trophy, UploadCloud, ShieldCheck, Coins
} from "lucide-react";
import { addXp, addCoins, getSubjectProgress, markLessonRewardClaimed, markQuizRewardClaimed } from "@/lib/firebase";
import toast from "react-hot-toast";
import type { Lesson } from "@/types";
import { AppIcon } from "@/components/ui/AppIcon";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

const DIFFICULTIES: Array<{ id: QuizDifficulty; label: string; color: string }> = [
  { id: "easy", label: "Easy", color: "#39FF14" },
  { id: "medium", label: "Medium", color: "#FFD700" },
  { id: "hard", label: "Hard", color: "#FF003C" },
];

async function analyzeStudyProofImage(file: File): Promise<{ ok: boolean; reason: string }> {
  if (!file.type.startsWith("image/")) return { ok: false, reason: "Only image proof is allowed." };
  if (file.size < 35000) return { ok: false, reason: "Image is too small. Upload a clear page/book/screen proof." };

  const imageUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = imageUrl;
    });

    if (img.naturalWidth < 480 || img.naturalHeight < 360) {
      return { ok: false, reason: "Proof image resolution is too low." };
    }

    const canvas = document.createElement("canvas");
    const width = 180;
    const height = Math.max(120, Math.round((img.naturalHeight / img.naturalWidth) * width));
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return { ok: false, reason: "Could not analyze image." };
    ctx.drawImage(img, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height).data;

    const luminance = new Float32Array(width * height);
    let sum = 0;
    let brightNeutral = 0;
    let veryDark = 0;
    let saturated = 0;

    for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const sat = max === 0 ? 0 : (max - min) / max;
      luminance[p] = lum;
      sum += lum;
      if (lum > 145 && sat < 0.38) brightNeutral += 1;
      if (lum < 35) veryDark += 1;
      if (sat > 0.65) saturated += 1;
    }

    const pixels = width * height;
    const avg = sum / pixels;
    let variance = 0;
    for (let i = 0; i < luminance.length; i++) variance += (luminance[i] - avg) ** 2;
    variance /= pixels;

    let edges = 0;
    for (let y = 1; y < height; y++) {
      for (let x = 1; x < width; x++) {
        const idx = y * width + x;
        const dx = Math.abs(luminance[idx] - luminance[idx - 1]);
        const dy = Math.abs(luminance[idx] - luminance[idx - width]);
        if (dx + dy > 42) edges += 1;
      }
    }

    const edgeRatio = edges / pixels;
    const paperRatio = brightNeutral / pixels;
    const darkRatio = veryDark / pixels;
    const saturatedRatio = saturated / pixels;

    if (darkRatio > 0.78 || avg < 42) return { ok: false, reason: "Image is too dark. Upload clear study proof." };
    if (variance < 520) return { ok: false, reason: "Image looks plain/blurry. Upload notes, book, or solved work." };
    if (edgeRatio < 0.028) return { ok: false, reason: "AI could not detect enough writing/study detail." };
    if (paperRatio < 0.045 && edgeRatio < 0.055) return { ok: false, reason: "Upload a page, notebook, textbook, or study screen proof." };
    if (saturatedRatio > 0.45 && paperRatio < 0.06) return { ok: false, reason: "This looks like a random photo, not study proof." };

    return { ok: true, reason: "Proof approved." };
  } catch {
    return { ok: false, reason: "Could not read image. Try another clear proof." };
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

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
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const [proofLesson, setProofLesson] = useState<Lesson | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofChecking, setProofChecking] = useState(false);

  const subject = SUBJECTS.find((s) => s.id === id);
  const chapters = CHAPTERS[id] || [];
  const quizQuestions = useMemo(() => getSubjectQuizQuestions(id, quizDifficulty, 10, user?.examMode), [id, quizDifficulty, user?.examMode]);
  useBodyScrollLock(Boolean(proofLesson) || quizActive);
  const currentQ = quizQuestions[quizIndex];
  const difficultyBonus = quizDifficulty === "hard" ? 15 : quizDifficulty === "medium" ? 8 : 0;
  const quizRewardXp = score * 30 + (score === quizQuestions.length ? 50 : 0) + difficultyBonus;

  useEffect(() => {
    if (!user || !id || user.uid.startsWith("guest_")) return;
    getSubjectProgress(user.uid, id)
      .then((records) => {
        setCompletedLessons(new Set(records.filter((r) => r.kind === "lesson" && r.rewardClaimed).map((r) => r.itemId)));
        setCompletedQuizzes(new Set(records.filter((r) => r.kind === "quiz" && r.rewardClaimed).map((r) => String(r.difficulty || r.itemId.replace("quiz_", "")))));
      })
      .catch(() => undefined);
  }, [user?.uid, id]);

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
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLessonStart = async (lesson: Lesson) => {
    if (lesson.type === "quiz") {
      startQuiz(quizDifficulty);
      return;
    }
    if (completedLessons.has(lesson.id)) {
      toast("Reward already collected");
      return;
    }
    setProofLesson(lesson);
    setProofFile(null);
  };

  const submitProofAndCollect = async () => {
    if (!user || !proofLesson) return;
    if (completedLessons.has(proofLesson.id)) {
      toast("Reward already collected");
      setProofLesson(null);
      return;
    }
    if (!proofFile) {
      toast.error("Study proof image required");
      return;
    }
    setProofChecking(true);
    try {
      const analysis = await analyzeStudyProofImage(proofFile);
      if (!analysis.ok) {
        toast.error(analysis.reason);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 700));
      let firstClaim = true;
      if (!user.uid.startsWith("guest_")) {
        firstClaim = await markLessonRewardClaimed(user.uid, id, proofLesson.id, { name: proofFile.name, size: proofFile.size, type: proofFile.type });
      }
      if (!firstClaim) {
        setCompletedLessons((prev) => new Set([...prev, proofLesson.id]));
        toast("Already collected before");
        setProofLesson(null);
        return;
      }
      setCompletedLessons((prev) => new Set([...prev, proofLesson.id]));
      await updateLocalReward(proofLesson.xpReward, Math.max(1, Math.round(proofLesson.xpReward / 8)));
      toast.success("Proof approved. Reward collected.");
      setProofLesson(null);
      setProofFile(null);
    } catch {
      toast.error("Proof check failed");
    } finally {
      setProofChecking(false);
    }
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
    const alreadyClaimed = completedQuizzes.has(quizDifficulty);
    let firstClaim = !alreadyClaimed;
    if (!alreadyClaimed && !user.uid.startsWith("guest_")) {
      firstClaim = await markQuizRewardClaimed(user.uid, id, quizDifficulty, score).catch(() => false);
    }
    if (firstClaim) {
      const xpEarned = quizRewardXp;
      const coinsEarned = score * 5;
      await updateLocalReward(xpEarned, coinsEarned);
      setCompletedQuizzes((prev) => new Set([...prev, quizDifficulty]));
      toast.success(`Quiz done! +${xpEarned} XP`);
    } else {
      toast("Quiz already solved. Reward not repeated.");
    }
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
              <AppIcon name={subject.icon} className="w-9 h-9" color={subject.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-black text-white truncate">{language === "bn" ? subject.nameBn : subject.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{subject.totalChapters} chapters · Bangla MCQ bank</p>
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
                {language === "bn" ? (d.id === "easy" ? "সহজ" : d.id === "medium" ? "মাঝারি" : "কঠিন") : d.label}
              </button>
            ))}
            <Button onClick={() => startQuiz(quizDifficulty)} variant="secondary" size="sm" leftIcon={<HelpCircle className="w-4 h-4" />}>{language === "bn" ? "MCQ শুরু" : "Take MCQ"}</Button>
            <div className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-xs" style={{ color: subject.color }}>
              <Zap className="w-3 h-3" /> {subject.xpReward} XP/chapter
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
          <h2 className="font-bold text-white">{language === "bn" ? "অধ্যায়" : "Chapters"}</h2>
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
                    const isQuizLesson = lesson.type === "quiz";
                    const done = isQuizLesson ? completedQuizzes.has(quizDifficulty) : completedLessons.has(lesson.id);
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
                        <Button size="sm" variant={done ? "secondary" : "ghost"} leftIcon={done ? <CheckCircle2 className="w-3 h-3" /> : lesson.type === "quiz" ? <Play className="w-3 h-3" /> : <UploadCloud className="w-3 h-3" />} className="text-xs py-1 px-2" onClick={() => handleLessonStart(lesson)}>
                          {done ? (isQuizLesson ? "Solved" : "Collected") : lesson.type === "quiz" ? "Quiz" : "Collect"}
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


      {proofLesson && (
        <div className="modal-backdrop fixed inset-0 z-[260] flex items-center justify-center p-4 animate-fade-in overflow-hidden">
          <div className="glass-card w-full max-w-md p-5 border border-primary/25 animate-card-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">AI Proof Check</h3>
                  <p className="text-xs text-gray-500">Upload study proof to collect once</p>
                </div>
              </div>
              <button onClick={() => setProofLesson(null)} className="p-2 rounded-lg hover:bg-white/10 text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-center">
              <UploadCloud className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm text-white font-bold mb-1">{language === "bn" ? proofLesson.titleBn : proofLesson.title}</p>
              <p className="text-xs text-gray-500 mb-4">Notebook, textbook, solved work, or study screen upload korle AI-style check approve korbe.</p>
              <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white cursor-pointer hover:border-primary/40">
                <UploadCloud className="w-4 h-4" /> Choose Image
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setProofFile(e.target.files?.[0] || null)} />
              </label>
              {proofFile && <p className="text-xs text-primary mt-3 truncate">{proofFile.name}</p>}
            </div>
            <Button onClick={submitProofAndCollect} className="w-full mt-4" size="lg" isLoading={proofChecking}>
              <ShieldCheck className="w-4 h-4" /> Verify & Collect
            </Button>
          </div>
        </div>
      )}

      {quizActive && (
        <div className="modal-backdrop fixed inset-0 z-[250] flex items-start justify-center p-3 pt-[72px] overflow-hidden animate-fade-in">
          <div className="glass-card w-full max-w-lg p-4 sm:p-5 border border-secondary/30 animate-card-in max-h-[calc(100dvh-84px)] overflow-y-auto shadow-[0_0_46px_rgba(0,240,255,0.12)]">
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
                <h3 className="text-xl font-black text-white mb-4 leading-relaxed scroll-mt-24">{currentQ.questionBn || currentQ.question}</h3>
                <div className="space-y-3 mb-5">
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = currentQ.correctAnswer === idx;
                    const isSelected = selected === idx;
                    return (
                      <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered} className={`w-full text-left p-4 rounded-2xl border text-base transition-all font-bold tap-bounce shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] ${
                        !answered ? "border-white/15 bg-white/[0.03] hover:border-secondary/60 hover:bg-secondary/10 text-white" :
                        isCorrect ? "border-primary bg-primary/15 text-primary shadow-[0_0_20px_rgba(57,255,20,0.15)]" :
                        isSelected && !isCorrect ? "border-accent bg-accent/15 text-accent" :
                        "border-white/5 text-gray-600 bg-white/[0.02]"
                      }`}>
                        <span className="flex items-center gap-3"><span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-black flex-shrink-0 bg-black/20">{answered && isCorrect ? <Check className="w-4 h-4" /> : answered && isSelected && !isCorrect ? <X className="w-4 h-4" /> : String.fromCharCode(65 + idx)}</span><span className="leading-snug">{opt}</span></span>
                      </button>
                    );
                  })}
                </div>
                {answered && <div className={`p-3 rounded-xl text-sm mb-4 ${selected === currentQ.correctAnswer ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20"}`}>{selected === currentQ.correctAnswer ? "Correct. " : "Incorrect. "}{currentQ.explanation}</div>}
                {answered && <Button onClick={handleNextQuestion} className="w-full sticky bottom-0 shadow-neon-primary" size="lg">{quizIndex + 1 < quizQuestions.length ? "Next Question →" : "See Results"}</Button>}
              </> : <div className="text-center"><p className="text-gray-400 mb-4">No quiz found for this subject.</p><Button onClick={() => setQuizActive(false)}>Close</Button></div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4"><Trophy className="w-8 h-8 text-gold" /></div>
                <h3 className="text-2xl font-black text-white mb-1">Quiz Complete</h3>
                <p className="text-gray-400 mb-4">You scored <span className="text-primary font-bold">{score}/{quizQuestions.length}</span></p>
                <div className="glass rounded-xl p-4 mb-5 flex justify-around">
                  <div><p className="text-xl font-bold text-primary">+{quizRewardXp} XP</p><p className="text-xs text-gray-500">Earned</p></div>
                  <div className="w-px bg-white/10" />
                  <div><p className="text-xl font-bold text-gold inline-flex items-center gap-1">+{score * 5} <Coins className="w-5 h-5" /></p><p className="text-xs text-gray-500">Coins</p></div>
                  <div className="w-px bg-white/10" />
                  <div><p className="text-xl font-bold text-secondary">{Math.round((score / quizQuestions.length) * 100)}%</p><p className="text-xs text-gray-500">Accuracy</p></div>
                </div>
                <Button onClick={handleFinishQuiz} className="w-full" size="lg">Claim Rewards</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
