"use client";

import { navigate } from "@/lib/navigate";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { SUBJECTS, CHAPTERS, SAMPLE_QUIZ_QUESTIONS } from "@/lib/subjects";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft, Lock, CheckCircle2, Play, Clock,
  Zap, BookOpen, HelpCircle, ChevronDown, ChevronUp, X, Check
} from "lucide-react";
import { addXp, addCoins } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function SubjectDetailClient({ id }: { id: string }) {
  const { user, setUser, addXpPopup, triggerLevelUp, language } = useUserStore();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const subject = SUBJECTS.find((s) => s.id === id);
  const chapters = CHAPTERS[id] || [];

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-400">Subject not found</p>
        <Button onClick={() => window.history.back()} variant="ghost">← Go Back</Button>
      </div>
    );
  }

  const handleAnswer = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    const correct = SAMPLE_QUIZ_QUESTIONS[quizIndex].correctAnswer === optionIndex;
    if (correct) setScore((s) => s + 1);
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 < SAMPLE_QUIZ_QUESTIONS.length) {
      setQuizIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setQuizDone(true);
    }
  };

  const handleFinishQuiz = async () => {
    if (!user) return;
    const xpEarned = score * 30 + (score === SAMPLE_QUIZ_QUESTIONS.length ? 50 : 0);
    const coinsEarned = score * 5;
    try {
      const result = await addXp(user.uid, xpEarned);
      await addCoins(user.uid, coinsEarned);
      setUser({ ...user, xp: user.xp + xpEarned, coins: user.coins + coinsEarned });
      addXpPopup(xpEarned, 50, 30);
      if (result.leveledUp) triggerLevelUp(result.newLevel);
      toast.success(`Quiz done! +${xpEarned} XP 🎉`);
    } catch {}
    setQuizActive(false);
    setQuizDone(false);
    setQuizIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
  };

  const currentQ = SAMPLE_QUIZ_QUESTIONS[quizIndex];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <button onClick={() => window.history.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-white mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Subjects
        </button>
        <div className="glass-card p-5 border" style={{ borderColor: `${subject.color}25` }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0" style={{ background: `${subject.color}15` }}>
              {subject.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-white">{language === "bn" ? subject.nameBn : subject.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{subject.totalChapters} chapters · {subject.difficulty} difficulty</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${subject.progress}%`, background: subject.color }} />
                </div>
                <span className="text-xs font-mono" style={{ color: subject.color }}>{subject.progress}%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => { setQuizActive(true); setQuizIndex(0); setScore(0); setQuizDone(false); }}
              variant="secondary" size="sm" leftIcon={<HelpCircle className="w-4 h-4" />}
            >
              Take Quiz
            </Button>
            <div className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-xs" style={{ color: subject.color }}>
              <Zap className="w-3 h-3" /> {subject.xpReward} XP per chapter
            </div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
          <h2 className="font-bold text-white">Chapters</h2>
        </div>
        <div className="space-y-2">
          {chapters.map((chapter, i) => (
            <div key={chapter.id} className={`glass-card border overflow-hidden transition-all ${chapter.isLocked ? "opacity-60" : ""}`} style={{ borderColor: expandedChapter === chapter.id ? `${subject.color}30` : "transparent" }}>
              <button
                className="w-full flex items-center gap-4 p-4 text-left"
                onClick={() => !chapter.isLocked && setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                disabled={chapter.isLocked}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  chapter.isCompleted ? "bg-primary/20 text-primary" :
                  chapter.isLocked ? "bg-white/5 text-gray-600" : ""
                }`} style={!chapter.isLocked && !chapter.isCompleted ? { borderColor: `${subject.color}30`, background: `${subject.color}10`, color: subject.color } : {}}>
                  {chapter.isLocked ? <Lock className="w-4 h-4" /> : chapter.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{language === "bn" ? chapter.titleBn : chapter.title}</p>
                  <p className="text-xs text-gray-500">{chapter.description}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-gray-600">{chapter.lessons.length} lessons</span>
                    <span className="text-xs font-bold" style={{ color: subject.color }}>+{chapter.xpReward} XP</span>
                  </div>
                </div>
                {!chapter.isLocked && (
                  expandedChapter === chapter.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {expandedChapter === chapter.id && (
                <div className="border-t border-white/5 divide-y divide-white/5">
                  {chapter.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        lesson.type === "quiz" ? "bg-secondary/10 text-secondary" :
                        lesson.type === "practice" ? "bg-gold/10 text-gold" :
                        "bg-white/5 text-gray-400"
                      }`}>
                        {lesson.type === "quiz" ? <HelpCircle className="w-3.5 h-3.5" /> :
                         lesson.type === "practice" ? <Zap className="w-3.5 h-3.5" /> :
                         <BookOpen className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{language === "bn" ? lesson.titleBn : lesson.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3 text-gray-600" />
                          <span className="text-xs text-gray-600">{lesson.duration} min</span>
                          <span className="text-xs font-semibold text-primary">+{lesson.xpReward} XP</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" leftIcon={<Play className="w-3 h-3" />} className="text-xs py-1 px-2">
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {chapters.length === 0 && (
            <div className="glass-card p-10 text-center">
              <p className="text-4xl mb-3">🚧</p>
              <p className="text-gray-400 font-medium">Chapters coming soon!</p>
              <p className="text-sm text-gray-600 mt-1">Content for this subject is being prepared.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {quizActive && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg p-6 border border-secondary/20">
            {!quizDone ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">Quiz · {subject.name}</p>
                    <p className="text-lg font-bold text-white">Question {quizIndex + 1}/{SAMPLE_QUIZ_QUESTIONS.length}</p>
                  </div>
                  <button onClick={() => setQuizActive(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full mb-5 overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${(quizIndex / SAMPLE_QUIZ_QUESTIONS.length) * 100}%` }} />
                </div>
                <p className="text-base font-semibold text-white mb-5 leading-relaxed">{currentQ.question}</p>
                {language === "bn" && currentQ.questionBn && (
                  <p className="text-sm text-gray-400 mb-4">{currentQ.questionBn}</p>
                )}
                <div className="space-y-2 mb-5">
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = currentQ.correctAnswer === idx;
                    const isSelected = selected === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={answered}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all font-medium ${
                          !answered ? "border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300" :
                          isCorrect ? "border-primary bg-primary/15 text-primary" :
                          isSelected && !isCorrect ? "border-accent bg-accent/15 text-accent" :
                          "border-white/5 text-gray-600"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {answered && isCorrect ? <Check className="w-3 h-3" /> : answered && isSelected && !isCorrect ? <X className="w-3 h-3" /> : String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <div className="mb-4">
                    <div className={`p-3 rounded-xl text-sm ${selected === currentQ.correctAnswer ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20"}`}>
                      {selected === currentQ.correctAnswer ? "✅ Correct! " : "❌ Incorrect. "}
                      {currentQ.explanation}
                    </div>
                  </div>
                )}
                {answered && (
                  <Button onClick={handleNextQuestion} className="w-full">
                    {quizIndex + 1 < SAMPLE_QUIZ_QUESTIONS.length ? "Next Question →" : "See Results"}
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-4">{score >= SAMPLE_QUIZ_QUESTIONS.length * 0.8 ? "🏆" : score >= SAMPLE_QUIZ_QUESTIONS.length * 0.5 ? "⭐" : "📚"}</div>
                <h3 className="text-2xl font-black text-white mb-1">Quiz Complete!</h3>
                <p className="text-gray-400 mb-4">
                  You scored <span className="text-primary font-bold">{score}/{SAMPLE_QUIZ_QUESTIONS.length}</span>
                </p>
                <div className="glass rounded-xl p-4 mb-5 flex justify-around">
                  <div><p className="text-xl font-bold text-primary">+{score * 30 + (score === SAMPLE_QUIZ_QUESTIONS.length ? 50 : 0)} XP</p><p className="text-xs text-gray-500">Earned</p></div>
                  <div className="w-px bg-white/10" />
                  <div><p className="text-xl font-bold text-gold">+{score * 5} 🪙</p><p className="text-xs text-gray-500">Coins</p></div>
                  <div className="w-px bg-white/10" />
                  <div><p className="text-xl font-bold text-secondary">{Math.round((score / SAMPLE_QUIZ_QUESTIONS.length) * 100)}%</p><p className="text-xs text-gray-500">Accuracy</p></div>
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
