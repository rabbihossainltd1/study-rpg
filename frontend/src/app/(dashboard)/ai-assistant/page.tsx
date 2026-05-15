"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { ChatMessage } from "@/types";
import { Bot, Send, User, RefreshCw, ImagePlus } from "lucide-react";
import { AppIcon } from "@/components/ui/AppIcon";

const QUICK_PROMPTS = [
  { label: "অধ্যায় ব্যাখ্যা", labelEn: "Explain a chapter", icon: "book" },
  { label: "কুইজ তৈরি করো", labelEn: "Generate a quiz", icon: "help" },
  { label: "সূত্র মনে করিয়ে দাও", labelEn: "Important formulas", icon: "calculator" },
  { label: "পরীক্ষার টিপস", labelEn: "Exam tips", icon: "sparkles" },
  { label: "রুটিন তৈরি করো", labelEn: "Study routine", icon: "calendar" },
  { label: "কঠিন বিষয় সহজ করো", labelEn: "Simplify a topic", icon: "sparkles" },
];

const SYSTEM_PROMPT = `You are StudyBot, an expert AI tutor for Bangladeshi students (SSC, HSC, and university level). 
You help students with subjects like Math, Physics, Chemistry, Biology, English, Bangla, ICT, and General Knowledge.
Rules:
- Always respond in the same language the student uses (Bangla or English)
- Keep responses concise and easy to understand
- Use clean bullet points and avoid emojis
- For math/science, show step-by-step solutions
- Motivate students and keep them positive
- If asked to generate a quiz, provide 3-5 MCQ questions with answers`;

function normalizeBanglaDigits(value: string) {
  const map: Record<string, string> = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };
  return value.replace(/[০-৯]/g, (d) => map[d] || d);
}

function solveArithmeticQuestion(text: string) {
  const cleaned = normalizeBanglaDigits(text)
    .replace(/[?？=]/g, "")
    .replace(/×|x/gi, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .trim();
  const match = cleaned.match(/[-+*/().\d\s]+/g)?.join(" ").trim() || "";
  if (!match || match.length < 3 || !/[+*/-]/.test(match)) return null;
  if (!/^[\d+\-*/().\s]+$/.test(match)) return null;
  try {
    // Safe because the expression is strictly whitelisted above.
    const value = Function(`"use strict"; return (${match})`)();
    if (typeof value === "number" && Number.isFinite(value)) return { expression: match, value };
  } catch {}
  return null;
}

function offlineTutorReply(text: string) {
  const q = text.trim();
  const lower = q.toLowerCase();
  const isBangla = /[\u0980-\u09FF]/.test(q);
  if (/^(hi|hello|hey|assalamu|আসসালামু|হাই|হ্যালো|কেমন আছো|সালাম)/i.test(q)) {
    return isBangla ? "আমি ভালো আছি। তুমি কী নিয়ে পড়তে চাও? চাইলে ছবি আপলোড করে প্রশ্নও করতে পারো।" : "I am good. What do you want to study? You can also upload an image and ask from it.";
  }
  const math = solveArithmeticQuestion(q);
  if (math) {
    const answer = Number.isInteger(math.value) ? String(math.value) : math.value.toFixed(4).replace(/\.0+$/, "").replace(/0+$/, "");
    return isBangla
      ? `উত্তর: ${answer}\n\nসমাধান:\n${math.expression} = ${answer}`
      : `Answer: ${answer}\n\nSolution:\n${math.expression} = ${answer}`;
  }

  if (lower.includes("quiz") || q.includes("কুইজ")) {
    return isBangla
      ? `ঠিক আছে, ছোট কুইজ দিচ্ছি:\n\n1) 12 × 8 = কত?\nA) 86 B) 96 C) 108 D) 112\nAnswer: B\n\n2) H2O কী?\nA) Oxygen B) Water C) Salt D) Acid\nAnswer: B\n\n3) Verb কী বোঝায়?\nA) কাজ B) নাম C) গুণ D) সংখ্যা\nAnswer: A`
      : `Here is a quick quiz:\n\n1) 12 × 8 = ?\nA) 86 B) 96 C) 108 D) 112\nAnswer: B\n\n2) H2O is known as?\nA) Oxygen B) Water C) Salt D) Acid\nAnswer: B\n\n3) A verb shows?\nA) Action B) Name C) Quality D) Number\nAnswer: A`;
  }

  if (lower.includes("routine") || q.includes("রুটিন")) {
    return isBangla
      ? `একটা সহজ রুটিন:\n\n• ২৫ মিনিট পড়া + ৫ মিনিট বিরতি\n• আগে কঠিন subject\n• প্রতিদিন ৩টা quiz\n• রাতে ১০ মিনিট revision\n\nআজ শুধু ১টা chapter শেষ করো — consistency matters`
      : `Simple routine:\n\n• 25 min study + 5 min break\n• Start with the hardest subject\n• Take 3 quizzes daily\n• Revise for 10 minutes at night\n\nFinish one chapter today — consistency wins`;
  }

  if (lower.includes("formula") || q.includes("সূত্র")) {
    return isBangla
      ? `কিছু দরকারি সূত্র:\n\n• Speed = Distance ÷ Time\n• Area of triangle = ½ × base × height\n• (a+b)² = a² + 2ab + b²\n• Force = mass × acceleration\n\nযে chapter-এর সূত্র দরকার, নাম লিখে দাও।`
      : `Useful formulas:\n\n• Speed = Distance ÷ Time\n• Area of triangle = ½ × base × height\n• (a+b)² = a² + 2ab + b²\n• Force = mass × acceleration\n\nTell me the chapter name for specific formulas.`;
  }

  return isBangla
    ? `তোমার প্রশ্ন: “${q}”

সংক্ষিপ্ত উত্তর:
এটা বুঝতে হলে মূল ধারণা, উদাহরণ, আর অনুশীলন — এই ৩ ধাপে এগোও।

দ্রুত গাইড:
1) প্রথমে topic-এর meaning বুঝো
2) ১টা সহজ example দেখো
3) তারপর ৩টা MCQ বা problem solve করো

আরো direct answer চাইলে subject/chapter সহ প্রশ্নটা লিখো, আমি step-by-step solve করবো।`
    : `Your question: “${q}”

Quick answer:
Use the core idea + example + practice method.

Steps:
1) Identify the topic
2) Learn one simple example
3) Solve 3 related questions

Send the subject/chapter with the question and I will solve it step by step.`;
}

export default function AiAssistantPage() {
  const { user, language } = useUserStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: language === "bn"
        ? "আসসালামুয়ালাইকুম! আমি StudyBot তোমার AI পড়াশোনার সহযোগী। যেকোনো বিষয়ে প্রশ্ন করো!"
        : "Hi! I'm StudyBot your personal AI study assistant. Ask me anything!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userMessage = text || input.trim();
    if (!userMessage || isLoading) return;

    const imageNote = attachedImage ? (language === "bn" ? "\n\n[ছবি যুক্ত করা হয়েছে: ছবির প্রশ্ন/লেখা বিশ্লেষণ করে উত্তর দাও]" : "\n\n[Image attached: analyze the question/text from the image]") : "";
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: userMessage + imageNote, timestamp: new Date() };
    const loadingMsg: ChatMessage = { id: `a-${Date.now()}`, role: "assistant", content: "", timestamp: new Date(), isLoading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setAttachedImage("");
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;

      if (!apiKey) {
        setMessages((prev) => prev.map((m) => m.id === loadingMsg.id ? { ...m, content: offlineTutorReply(userMessage + imageNote), isLoading: false } : m));
        return;
      }

      const conversationHistory = [
        ...messages.filter((m) => !m.isLoading).map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "user" as const, content: userMessage + imageNote },
      ];

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "deepseek-chat",
          max_tokens: 1000,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversationHistory],
        }),
      });

      if (!response.ok) throw new Error(`AI request failed ${response.status}`);
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || offlineTutorReply(userMessage + imageNote);
      setMessages((prev) => prev.map((m) => m.id === loadingMsg.id ? { ...m, content: aiText, isLoading: false } : m));
    } catch {
      setMessages((prev) => prev.map((m) => m.id === loadingMsg.id
        ? { ...m, content: offlineTutorReply(userMessage + imageNote), isLoading: false } : m));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => {
    setMessages([{ id: "welcome-new", role: "assistant", content: "Chat cleared! How can I help you?", timestamp: new Date() }]);
  };

  const formatMessage = (content: string) => content
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--app-text)">$1</strong>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 4px;border-radius:4px;color:#39FF14;font-size:12px">$1</code>')
    .replace(/\\n/g, "<br>")
    .replace(/\n/g, "<br>");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(191,95,255,0.1)", border: "1px solid rgba(191,95,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bot size={20} color="#BF5FFF" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontSize: 18, fontWeight: 900, color: "var(--app-text)", margin: 0 }}>AI Study Tutor</h1>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#39FF14" }} />
            </div>
            <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>Powered by DeepSeek · Bangla & English</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={clearChat} leftIcon={<RefreshCw size={14} />}>Clear</Button>
      </div>

      {/* Quick Prompts */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, flexShrink: 0 }}>
        {QUICK_PROMPTS.map((p) => (
          <button key={p.labelEn} onClick={() => sendMessage(language === "bn" ? p.label : p.labelEn)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
            background: "var(--app-surface-soft)", border: "1px solid var(--app-border)",
            borderRadius: 100, fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap", cursor: "pointer"
          }}>
            <AppIcon name={p.icon} className="w-4 h-4" /> {language === "bn" ? p.label : p.labelEn}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, padding: "8px 0" }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: "flex", gap: 10, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0, marginTop: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: msg.role === "assistant" ? "rgba(191,95,255,0.1)" : "rgba(57,255,20,0.1)",
              border: msg.role === "assistant" ? "1px solid rgba(191,95,255,0.3)" : "1px solid rgba(57,255,20,0.3)"
            }}>
              {msg.role === "assistant" ? <Bot size={15} color="#BF5FFF" /> : <User size={15} color="#39FF14" />}
            </div>
            <div style={{
              maxWidth: "78%", borderRadius: 16, padding: "10px 14px", fontSize: 13, lineHeight: 1.6,
              background: msg.role === "assistant" ? "var(--app-surface)" : "rgba(57,255,20,0.08)",
              border: msg.role === "assistant" ? "1px solid var(--app-border)" : "1px solid rgba(57,255,20,0.2)",
              color: "var(--app-text)",
              borderTopLeftRadius: msg.role === "assistant" ? 4 : 16,
              borderTopRightRadius: msg.role === "user" ? 4 : 16,
            }}>
              {msg.isLoading ? (
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#BF5FFF", display: "inline-block", animation: `bounce 0.8s ${i*0.2}s ease-in-out infinite` }} />)}
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
              )}
              <p style={{ fontSize: 10, marginTop: 6, opacity: 0.35, color: "var(--app-muted)" }}>
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, paddingTop: 12, borderTop: "1px solid var(--app-border)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div style={{ flex: 1, background: "var(--app-surface-soft)", border: "1px solid var(--app-border)", borderRadius: 16, overflow: "hidden" }}>
            {attachedImage && <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--app-border)", color: "#00F0FF", fontSize: 11, fontWeight: 700 }}>Image attached for AI analysis</div>}
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
              onKeyDown={handleKeyDown}
              placeholder={language === "bn" ? "যেকোনো বিষয়ে জিজ্ঞেস করো..." : "Ask anything about your studies..."}
              disabled={isLoading}
              rows={1}
              style={{ width: "100%", background: "transparent", padding: "12px 16px", fontSize: 13, color: "var(--app-text)", border: "none", outline: "none", resize: "none", maxHeight: 120, fontFamily: "inherit" }}
            />
          </div>
          <label style={{ height: 46, width: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--app-surface-soft)", border: "1px solid var(--app-border)", color: "#00F0FF", cursor: "pointer" }}><ImagePlus size={18} /><input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; setAttachedImage(file.name); setInput((prev) => prev || (language === "bn" ? "এই ছবির প্রশ্নটি সমাধান করো" : "Solve the question from this image")); }} /></label>
          <Button onClick={() => sendMessage()} disabled={(!input.trim() && !attachedImage) || isLoading} size="md"
            style={{ height: 46, paddingLeft: 16, paddingRight: 16, flexShrink: 0 }}
            leftIcon={isLoading ? undefined : <Send size={16} />} isLoading={isLoading}>
            {!isLoading && "Send"}
          </Button>
        </div>
        <p style={{ fontSize: 10, color: "#374151", textAlign: "center", marginTop: 8 }}>Enter to send · Shift+Enter for new line</p>
      </div>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}
