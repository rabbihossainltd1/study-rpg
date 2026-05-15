"use client";

import { useEffect, useMemo, useState } from "react";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { getSubjectsForUser, SUBJECTS, CHAPTERS } from "@/lib/subjects";
import { getWrittenQuestionsForChapter, writtenQuestionToLesson, type WrittenDifficulty, type WrittenQuestion } from "@/lib/writtenQuestions";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft, Lock, CheckCircle2, Clock, Zap, BookOpen, ChevronDown, ChevronUp,
  X, UploadCloud, ShieldCheck, FileText, Coins, AlertTriangle
} from "lucide-react";
import { addXp, addCoins, getSubjectProgress, markLessonRewardClaimed } from "@/lib/firebase";
import toast from "react-hot-toast";
import type { Lesson } from "@/types";
import { AppIcon } from "@/components/ui/AppIcon";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

const DIFFICULTIES: Array<{ id: WrittenDifficulty; label: string; labelBn: string; color: string }> = [
  { id: "easy", label: "Easy", labelBn: "সহজ", color: "#39FF14" },
  { id: "medium", label: "Medium", labelBn: "মাঝারি", color: "#FFD700" },
  { id: "hard", label: "Hard", labelBn: "কঠিন", color: "#FF003C" },
];

type ProofResult = { ok: boolean; reason: string; score: number };

async function analyzeWrittenAnswerImage(file: File, question: WrittenQuestion): Promise<ProofResult> {
  if (!file.type.startsWith("image/")) return { ok: false, reason: "Only image proof is allowed.", score: 0 };
  if (file.size < 45000) return { ok: false, reason: "Image is too small. Upload a clear notebook answer photo.", score: 0 };

  const imageUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = imageUrl;
    });

    if (img.naturalWidth < 640 || img.naturalHeight < 480) {
      return { ok: false, reason: "Answer photo resolution is too low.", score: 0 };
    }

    const canvas = document.createElement("canvas");
    const width = 220;
    const height = Math.max(150, Math.round((img.naturalHeight / img.naturalWidth) * width));
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return { ok: false, reason: "Could not analyze image.", score: 0 };
    ctx.drawImage(img, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height).data;

    const luminance = new Float32Array(width * height);
    let sum = 0;
    let brightNeutral = 0;
    let veryDark = 0;
    let saturated = 0;
    let inkLike = 0;

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
      if (lum > 150 && sat < 0.32) brightNeutral += 1;
      if (lum < 35) veryDark += 1;
      if (sat > 0.64) saturated += 1;
      if (lum < 115 && sat < 0.55) inkLike += 1;
    }

    const pixels = width * height;
    const avg = sum / pixels;
    let variance = 0;
    for (let i = 0; i < luminance.length; i++) variance += (luminance[i] - avg) ** 2;
    variance /= pixels;

    let edges = 0;
    let horizontalRuns = 0;
    for (let y = 1; y < height; y++) {
      let rowEdges = 0;
      for (let x = 1; x < width; x++) {
        const idx = y * width + x;
        const dx = Math.abs(luminance[idx] - luminance[idx - 1]);
        const dy = Math.abs(luminance[idx] - luminance[idx - width]);
        if (dx + dy > 40) {
          edges += 1;
          rowEdges += 1;
        }
      }
      if (rowEdges > 12) horizontalRuns += 1;
    }

    const edgeRatio = edges / pixels;
    const paperRatio = brightNeutral / pixels;
    const darkRatio = veryDark / pixels;
    const saturatedRatio = saturated / pixels;
    const inkRatio = inkLike / pixels;
    const lineRatio = horizontalRuns / height;

    let score = 0;
    if (paperRatio > 0.06) score += 25;
    if (edgeRatio > 0.04) score += 25;
    if (inkRatio > 0.08) score += 20;
    if (lineRatio > 0.16) score += 15;
    if (variance > 720) score += 15;
    if (question.keywords.length >= 4) score += 0;

    if (darkRatio > 0.74 || avg < 42) return { ok: false, reason: "Image is too dark. Upload a clear notebook answer.", score };
    if (saturatedRatio > 0.46 && paperRatio < 0.07) return { ok: false, reason: "This looks like a random photo, not a written answer page.", score };
    if (paperRatio < 0.045) return { ok: false, reason: "AI could not detect a notebook/page background.", score };
    if (edgeRatio < 0.032 || inkRatio < 0.055 || lineRatio < 0.1) return { ok: false, reason: "AI could not detect enough handwriting/answer lines.", score };
    if (variance < 560) return { ok: false, reason: "Image looks blurry/plain. Upload the solved answer clearly.", score };

    return { ok: score >= 60, reason: score >= 60 ? "Answer proof approved." : "Answer photo needs clearer writing.", score };
  } catch {
    return { ok: false, reason: "Could not read image. Try another clear proof.", score: 0 };
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export default function SubjectDetailClient({ id }: { id: string }) {
  const { user, setUser, addXpPopup, triggerLevelUp, language } = useUserStore();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<WrittenDifficulty>("easy");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [proofLesson, setProofLesson] = useState<Lesson | null>(null);
  const [proofQuestion, setProofQuestion] = useState<WrittenQuestion | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofChecking, setProofChecking] = useState(false);

  const subject = SUBJECTS.find((s) => s.id === id);
  const allowedSubjects = useMemo(() => getSubjectsForUser(user), [user?.className, user?.groupName, user?.examMode]);
  const isAllowed = !user || allowedSubjects.some((s) => s.id === id);
  const chapters = CHAPTERS[id] || [];
  const isBn = language === "bn";
  useBodyScrollLock(Boolean(proofLesson));

  useEffect(() => {
    if (!user || !id || user.uid.startsWith("guest_")) return;
    getSubjectProgress(user.uid, id)
      .then((records) => {
        setCompletedLessons(new Set(records.filter((r) => r.kind === "lesson" && r.rewardClaimed).map((r) => r.itemId)));
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

  if (!isAllowed) {
    return (
      <div className="space-y-4 max-w-lg mx-auto text-center animate-card-in">
        <div className="glass-card p-6 border border-gold/25">
          <AlertTriangle className="w-10 h-10 text-gold mx-auto mb-3" />
          <h2 className="text-xl font-black text-white mb-2">{isBn ? "এই বিষয়টি তোমার ক্লাসে নেই" : "Subject not available for your class"}</h2>
          <p className="text-sm text-gray-500 mb-4">{isBn ? "Settings থেকে class/group ঠিক করলে বিষয় তালিকা বদলাবে।" : "Update class/group from Settings to change subject list."}</p>
          <Button onClick={() => navigate("/subjects")} className="w-full"><ChevronLeft className="w-4 h-4" /> {isBn ? "বিষয়সমূহে ফিরে যাও" : "Back to subjects"}</Button>
        </div>
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

  const openProof = (question: WrittenQuestion) => {
    const lesson = writtenQuestionToLesson(question);
    if (completedLessons.has(lesson.id)) {
      toast("Reward already collected");
      return;
    }
    setProofQuestion(question);
    setProofLesson(lesson);
    setProofFile(null);
  };

  const submitProofAndCollect = async () => {
    if (!user || !proofLesson || !proofQuestion) return;
    if (completedLessons.has(proofLesson.id)) {
      toast("Reward already collected");
      setProofLesson(null);
      setProofQuestion(null);
      return;
    }
    if (!proofFile) {
      toast.error(isBn ? "উত্তরসহ ছবি upload করো" : "Upload answer photo first");
      return;
    }
    setProofChecking(true);
    try {
      const analysis = await analyzeWrittenAnswerImage(proofFile, proofQuestion);
      if (!analysis.ok) {
        toast.error(analysis.reason);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 550));
      let firstClaim = true;
      if (!user.uid.startsWith("guest_")) {
        firstClaim = await markLessonRewardClaimed(user.uid, id, proofLesson.id, {
          name: proofFile.name,
          size: proofFile.size,
          type: proofFile.type,
          questionId: proofQuestion.id,
          difficulty: proofQuestion.difficulty,
          topic: proofQuestion.topic,
          score: analysis.score,
        });
      }
      if (!firstClaim) {
        setCompletedLessons((prev) => new Set([...prev, proofLesson.id]));
        toast("Already collected before");
        setProofLesson(null);
        setProofQuestion(null);
        return;
      }
      setCompletedLessons((prev) => new Set([...prev, proofLesson.id]));
      await updateLocalReward(proofLesson.xpReward, Math.max(1, Math.round(proofLesson.xpReward / 8)));
      toast.success(isBn ? "উত্তর proof approved. XP collect হয়েছে।" : "Answer proof approved. Reward collected.");
      setProofLesson(null);
      setProofQuestion(null);
      setProofFile(null);
    } catch {
      toast.error(isBn ? "Proof check failed" : "Proof check failed");
    } finally {
      setProofChecking(false);
    }
  };

  const totalQuestions = chapters.length * 3;

  return (
    <div className="space-y-5 animate-card-in">
      <button onClick={() => navigate("/subjects")} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer tap-bounce">
        <ChevronLeft className="w-5 h-5" /> {isBn ? "বিষয়সমূহে ফিরে যাও" : "Back to Subjects"}
      </button>

      <div className="glass-card p-5 border relative overflow-hidden hover-lift" style={{ borderColor: `${subject.color}30` }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl" style={{ background: subject.color }} />
        <div className="relative flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${subject.color}15`, color: subject.color, boxShadow: `0 0 30px ${subject.color}20` }}>
            <AppIcon name={subject.icon} className="w-10 h-10" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-black text-white mb-1">{isBn ? subject.nameBn : subject.name}</h1>
            <p className="text-gray-500 mb-3">{chapters.length} {isBn ? "অধ্যায়" : "chapters"} · {isBn ? "লিখিত পরীক্ষার প্রশ্ন" : "written exam question bank"}</p>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2"><div className="h-full rounded-full" style={{ width: `${subject.progress}%`, background: subject.color }} /></div>
            <div className="flex justify-between text-xs"><span className="text-gray-600">{subject.progress}%</span><span style={{ color: subject.color }}>{totalQuestions} {difficulty} questions</span></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {DIFFICULTIES.map((item) => (
            <button
              key={item.id}
              onClick={() => setDifficulty(item.id)}
              className={`px-3 py-3 rounded-xl border text-sm font-black transition-all tap-bounce ${difficulty === item.id ? "text-black shadow-neon-primary" : "text-gray-400 bg-white/5 border-white/10"}`}
              style={difficulty === item.id ? { background: item.color, borderColor: item.color } : {}}
            >
              {isBn ? item.labelBn : item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
          <h2 className="font-bold text-white">{isBn ? "অধ্যায়ভিত্তিক লিখিত প্রশ্ন" : "Chapter-wise written questions"}</h2>
        </div>
        <div className="space-y-2">
          {chapters.map((chapter, i) => {
            const writtenQuestions = getWrittenQuestionsForChapter(id, chapter.order || i + 1, difficulty, 3);
            return (
              <div key={chapter.id} className={`glass-card border overflow-hidden transition-all hover-lift ${chapter.isLocked ? "opacity-60" : ""}`} style={{ borderColor: expandedChapter === chapter.id ? `${subject.color}30` : "rgba(255,255,255,0.05)" }}>
                <button className="w-full flex items-center gap-4 p-4 text-left tap-bounce" onClick={() => !chapter.isLocked && setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)} disabled={chapter.isLocked}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0" style={!chapter.isLocked ? { borderColor: `${subject.color}30`, background: `${subject.color}10`, color: subject.color } : {}}>
                    {chapter.isLocked ? <Lock className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{isBn ? chapter.titleBn : chapter.title}</p>
                    <p className="text-xs text-gray-500 truncate">{isBn ? "বোর্ড/পরীক্ষা ধাঁচের লিখিত প্রশ্ন" : "Board-style written practice"}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-gray-600">{writtenQuestions.length} questions</span>
                      <span className="text-xs font-bold" style={{ color: subject.color }}>+{writtenQuestions.reduce((sum, q) => sum + q.xpReward, 0)} XP</span>
                    </div>
                  </div>
                  {!chapter.isLocked && (expandedChapter === chapter.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />)}
                </button>

                {expandedChapter === chapter.id && (
                  <div className="border-t border-white/5 divide-y divide-white/5 animate-card-in">
                    {writtenQuestions.map((question) => {
                      const lesson = writtenQuestionToLesson(question);
                      const done = completedLessons.has(lesson.id);
                      return (
                        <div key={question.id} className="px-4 py-4 hover:bg-white/3 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary">
                              {done ? <CheckCircle2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-[11px] px-2 py-0.5 rounded-lg bg-white/5 text-gray-500 uppercase font-mono">{difficulty}</span>
                                <span className="text-[11px] text-gray-600">{question.topic}</span>
                              </div>
                              <p className="text-sm text-white font-bold leading-relaxed whitespace-pre-line">{isBn ? question.questionBn : question.question}</p>
                              <p className="text-xs text-gray-500 mt-2">{isBn ? "গাইড" : "Guide"}: {question.expectedAnswer}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="w-3 h-3 text-gray-600" />
                                <span className="text-xs text-gray-600">{question.duration} min</span>
                                <span className="text-xs font-semibold text-primary">+{question.xpReward} XP</span>
                              </div>
                            </div>
                            <Button size="sm" variant={done ? "secondary" : "ghost"} leftIcon={done ? <CheckCircle2 className="w-3 h-3" /> : <UploadCloud className="w-3 h-3" />} className="text-xs py-1 px-2 flex-shrink-0" onClick={() => openProof(question)}>
                              {done ? "Collected" : isBn ? "Upload" : "Upload"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {proofLesson && proofQuestion && (
        <div className="modal-backdrop fixed inset-0 z-[260] flex items-center justify-center p-4 animate-fade-in overflow-hidden">
          <div className="glass-card modal-compact-card w-full max-w-md p-5 border border-primary/25 animate-card-in overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{isBn ? "AI Answer Proof" : "AI Answer Proof"}</h3>
                  <p className="text-xs text-gray-500">{isBn ? "খাতায় উত্তর লিখে ছবি upload করো" : "Write in notebook and upload photo"}</p>
                </div>
              </div>
              <button onClick={() => { setProofLesson(null); setProofQuestion(null); }} className="p-2 rounded-lg hover:bg-white/10 text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-center">
              <UploadCloud className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-left rounded-xl border border-primary/20 bg-primary/5 p-3 mb-3">
                <p className="text-xs text-gray-500 mb-1">{isBn ? "প্রশ্ন" : "Question"}</p>
                <p className="text-sm font-bold text-white leading-relaxed">{isBn ? proofQuestion.questionBn : proofQuestion.question}</p>
                <p className="text-xs text-gray-500 mt-3">{isBn ? "সঠিক উত্তরের গাইড" : "Answer guide"}: {proofQuestion.expectedAnswer}</p>
              </div>
              <p className="text-xs text-gray-500 mb-4">{isBn ? "প্রশ্নের উত্তর খাতায় লিখে পরিষ্কার ছবি upload করো। Random image approve হবে না।" : "Upload a clear notebook photo with this answer. Random images will not be approved."}</p>
              <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white cursor-pointer hover:border-primary/40">
                <UploadCloud className="w-4 h-4" /> Choose Image
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setProofFile(e.target.files?.[0] || null)} />
              </label>
              {proofFile && <p className="text-xs text-primary mt-3 truncate">{proofFile.name}</p>}
            </div>
            <Button onClick={submitProofAndCollect} className="w-full mt-4" size="lg" isLoading={proofChecking}>
              <ShieldCheck className="w-4 h-4" /> {isBn ? "Verify & Collect" : "Verify & Collect"}
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-3">
              <Zap className="w-3 h-3 text-primary" /> +{proofLesson.xpReward} XP
              <Coins className="w-3 h-3 text-gold ml-2" /> +{Math.max(1, Math.round(proofLesson.xpReward / 8))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
