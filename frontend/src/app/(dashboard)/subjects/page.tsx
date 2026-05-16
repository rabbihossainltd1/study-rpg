"use client";

import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { getSubjectsForUser } from "@/lib/subjects";
import { normalizeClassName } from "@/lib/bdAddress";
import { BookOpen, ChevronRight, Star } from "lucide-react";
import { AppIcon } from "@/components/ui/AppIcon";

export default function SubjectsPage() {
  const { language, user } = useUserStore();
  const filtered = getSubjectsForUser(user);
  const classLabel = `${normalizeClassName(user?.className)}${user?.groupName && user.groupName !== "General" ? " · " + user.groupName : ""}`;

  return (
    <div className="space-y-6 animate-card-in">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">{language === "bn" ? "বিষয়সমূহ" : "Subjects"}</h1>
          <p className="text-sm text-gray-500">{language === "bn" ? "তোমার ক্লাস অনুযায়ী MCQ ও লিখিত প্রশ্ন" : "Class-wise MCQ and written questions"}</p>
        </div>
      </div>

      <div className="glass-card p-3 text-sm text-gray-500 border border-primary/10">
        {language === "bn" ? `${classLabel} অনুযায়ী বিষয় দেখানো হচ্ছে` : `Showing subjects for ${classLabel}`}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((subject) => (
          <button key={subject.id} onClick={() => navigate(`/subjects/${subject.id}`)} className="block w-full text-left bg-transparent border-0 p-0 tap-bounce">
            <div className="glass-card p-5 border transition-all duration-300 hover:shadow-lg hover-lift overflow-hidden min-h-[210px]" style={{ borderColor: `${subject.color}25` }}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${subject.color}15`, boxShadow: `0 0 20px ${subject.color}20`, color: subject.color }}>
                  <AppIcon name={subject.icon} className="w-7 h-7" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${subject.color}20`, color: subject.color }}>{subject.difficulty}</span>
                  <span className="text-xs text-gray-600">{subject.xpReward} XP/ch</span>
                </div>
              </div>
              <h3 className="font-black text-white text-xl leading-tight mb-1 break-words whitespace-normal">{language === "bn" ? subject.nameBn : subject.name}</h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{subject.totalChapters} {language === "bn" ? "অধ্যায়" : "chapters"} · {language === "bn" ? "MCQ ও লিখিত প্রশ্ন" : "MCQ and written questions"}</p>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2"><div className="h-full rounded-full transition-all duration-700" style={{ background: subject.color, width: `${subject.progress}%` }} /></div>
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500">{subject.progress}%</span><div className="flex items-center gap-1 text-xs" style={{ color: subject.color }}>{language === "bn" ? "শুরু করো" : "Start"} <ChevronRight className="w-3 h-3" /></div></div>
            </div>
          </button>
        ))}
      </div>

      <div className="glass-card p-5 border border-gold/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0"><Star className="w-6 h-6 text-gold" /></div>
        <div className="flex-1">
          <p className="font-bold text-white text-sm">{language === "bn" ? "ক্লাস-ভিত্তিক MCQ ও লিখিত প্রশ্ন" : "Class-wise MCQ and written questions"}</p>
          <p className="text-xs text-gray-500 mt-0.5">{language === "bn" ? "তোমার প্রোফাইলে সেট করা ক্লাস/গ্রুপ অনুযায়ী বিষয়, MCQ ও লিখিত প্রশ্ন দেখানো হচ্ছে।" : "Subjects, MCQ and written questions are filtered by your class and group."}</p>
        </div>
      </div>
    </div>
  );
}
