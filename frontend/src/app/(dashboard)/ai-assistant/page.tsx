"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { ChatMessage } from "@/types";
import { Bot, Send, User, RefreshCw } from "lucide-react";

const QUICK_PROMPTS = [
  { label: "অধ্যায় ব্যাখ্যা", labelEn: "Explain a chapter", emoji: "📖" },
  { label: "কুইজ তৈরি করো", labelEn: "Generate a quiz", emoji: "❓" },
  { label: "সূত্র মনে করিয়ে দাও", labelEn: "Important formulas", emoji: "📐" },
  { label: "পরীক্ষার টিপস", labelEn: "Exam tips", emoji: "💡" },
  { label: "রুটিন তৈরি করো", labelEn: "Study routine", emoji: "📅" },
  { label: "কঠিন বিষয় সহজ করো", labelEn: "Simplify a topic", emoji: "✨" },
];

const SYSTEM_PROMPT = `You are StudyBot, an expert AI tutor for Bangladeshi students (SSC, HSC, and university level). 
You help students with subjects like Math, Physics, Chemistry, Biology, English, Bangla, ICT, and General Knowledge.
Rules:
- Always respond in the same language the student uses (Bangla or English)
- Keep responses concise and easy to understand
- Use emojis to make responses engaging
- For math/science, show step-by-step solutions
- Motivate students and keep them positive
- If asked to generate a quiz, provide 3-5 MCQ questions with answers`;

export default function AiAssistantPage() {
  const { user, language } = useUserStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: language === "bn"
        ? "আসসালামুয়ালাইকুম! আমি StudyBot 🤖 তোমার AI পড়াশোনার সহযোগী। যেকোনো বিষয়ে প্রশ্ন করো! ⚡"
        : "Hi! I'm StudyBot 🤖 your personal AI study assistant. Ask me anything! ⚡",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userMessage = text || input.trim();
    if (!userMessage || isLoading) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: userMessage, timestamp: new Date() };
    const loadingMsg: ChatMessage = { id: `a-${Date.now()}`, role: "assistant", content: "", timestamp: new Date(), isLoading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
      if (!apiKey) throw new Error("API key not configured");

      const conversationHistory = [
        ...messages.filter((m) => !m.isLoading).map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "user" as const, content: userMessage },
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

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";
      setMessages((prev) => prev.map((m) => m.id === loadingMsg.id ? { ...m, content: aiText, isLoading: false } : m));
    } catch {
      setMessages((prev) => prev.map((m) => m.id === loadingMsg.id
        ? { ...m, content: "⚠️ Connection error. Please check your internet and try again.", isLoading: false } : m));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => {
    setMessages([{ id: "welcome-new", role: "assistant", content: "Chat cleared! How can I help you? 🤖", timestamp: new Date() }]);
  };

  const formatMessage = (content: string) => content
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff">$1</strong>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 4px;border-radius:4px;color:#39FF14;font-size:12px">$1</code>')
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
              <h1 style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: 0 }}>AI Study Tutor</h1>
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
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 100, fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap", cursor: "pointer"
          }}>
            {p.emoji} {language === "bn" ? p.label : p.labelEn}
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
              background: msg.role === "assistant" ? "rgba(18,18,18,0.98)" : "rgba(57,255,20,0.08)",
              border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(57,255,20,0.2)",
              color: "#E5E7EB",
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
              <p style={{ fontSize: 10, marginTop: 6, opacity: 0.35, color: "#fff" }}>
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
              onKeyDown={handleKeyDown}
              placeholder={language === "bn" ? "যেকোনো বিষয়ে জিজ্ঞেস করো..." : "Ask anything about your studies..."}
              disabled={isLoading}
              rows={1}
              style={{ width: "100%", background: "transparent", padding: "12px 16px", fontSize: 13, color: "#fff", border: "none", outline: "none", resize: "none", maxHeight: 120, fontFamily: "inherit" }}
            />
          </div>
          <Button onClick={() => sendMessage()} disabled={!input.trim() || isLoading} size="md"
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
