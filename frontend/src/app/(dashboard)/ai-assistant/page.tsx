"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { ChatMessage } from "@/types";
import { Bot, Send, User, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

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
- Keep responses concise and easy to understand for students
- Use emojis to make responses engaging
- For math/science, show step-by-step solutions
- Motivate students and keep them positive
- If asked to generate a quiz, provide 3-5 MCQ questions with answers
- Format responses cleanly with bullet points or numbered lists when appropriate
- Be encouraging and friendly like a helpful senior student or tutor`;

export default function AiAssistantPage() {
  const { user, language } = useUserStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: language === "bn"
        ? "আসসালামুয়ালাইকুম! আমি StudyBot 🤖 তোমার AI পড়াশোনার সহযোগী। আমাকে যেকোনো বিষয়ে প্রশ্ন করো — গণিত, পদার্থ, রসায়ন, জীববিজ্ঞান, ইংরেজি বা যেকোনো কিছু। আমি সাহায্য করতে রেডি! ⚡"
        : "Hi! I'm StudyBot 🤖 your personal AI study assistant. Ask me anything — Math, Physics, Chemistry, Biology, English, or any subject. I'm here to help! ⚡",
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

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    const loadingMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const conversationHistory = [
        ...messages.filter((m) => !m.isLoading).map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        { role: "user" as const, content: userMessage },
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: conversationHistory,
        }),
      });

      const data = await response.json();
      const aiText = data.content?.[0]?.text || data.error || "Sorry, I couldn't process that. Please try again.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id ? { ...m, content: aiText, isLoading: false } : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? { ...m, content: "⚠️ Connection error. Please check your internet and try again.", isLoading: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome-new",
      role: "assistant",
      content: "Chat cleared! How can I help you? 🤖",
      timestamp: new Date(),
    }]);
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-primary font-mono text-xs">$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-40px)]">
      {/* Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple/10 border border-purple/30 flex items-center justify-center shadow-neon-purple">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              AI Study Tutor
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </h1>
            <p className="text-xs text-gray-500">Powered by Claude · Responds in Bangla & English</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={clearChat} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Clear
        </Button>
      </motion.div>

      {/* Quick Prompts */}
      <motion.div
        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-3 flex-shrink-0 scrollbar-none"
      >
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p.labelEn}
            onClick={() => sendMessage(language === "bn" ? p.label : p.labelEn)}
            className="flex items-center gap-1.5 px-3 py-1.5 glass border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:border-purple/30 hover:bg-purple/5 transition-all whitespace-nowrap"
          >
            {p.emoji} {language === "bn" ? p.label : p.labelEn}
          </button>
        ))}
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1",
                msg.role === "assistant"
                  ? "bg-purple/10 border border-purple/30 text-purple-400"
                  : "bg-primary/10 border border-primary/30 text-primary"
              )}>
                {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "assistant"
                  ? "glass border border-white/8 text-gray-200 rounded-tl-sm"
                  : "bg-primary/10 border border-primary/20 text-white rounded-tr-sm"
              )}>
                {msg.isLoading ? (
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-purple-400 inline-block"
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="prose-sm"
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                )}
                <p className="text-xs mt-1.5 opacity-40">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="flex-shrink-0 pt-3 border-t border-white/5"
      >
        <div className="flex gap-2 items-end">
          <div className="flex-1 glass border border-white/10 rounded-2xl overflow-hidden focus-within:border-purple/30 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder={language === "bn" ? "যেকোনো বিষয়ে জিজ্ঞেস করো..." : "Ask anything about your studies..."}
              disabled={isLoading}
              rows={1}
              className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none resize-none max-h-[120px]"
            />
          </div>
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            size="md"
            className="h-[46px] px-4"
            leftIcon={isLoading ? undefined : <Send className="w-4 h-4" />}
            isLoading={isLoading}
          >
            {!isLoading && "Send"}
          </Button>
        </div>
        <p className="text-xs text-gray-700 text-center mt-2">
          Press Enter to send · Shift+Enter for new line · Powered by Anthropic Claude
        </p>
      </motion.div>
    </div>
  );
}
