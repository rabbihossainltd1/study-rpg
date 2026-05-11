import { Router, Request, Response } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";

export const aiRoutes = Router();

const SYSTEM_PROMPT = `You are StudyBot, an expert AI tutor for Bangladeshi students (SSC, HSC, and university level).
Help with Math, Physics, Chemistry, Biology, English, Bangla, ICT, and General Knowledge.
Rules:
- Respond in same language as student (Bangla or English)
- Keep responses concise and student-friendly
- Use emojis to make responses engaging
- For math/science, show step-by-step solutions
- If asked for a quiz, provide 3-5 MCQ questions with answers
- Be encouraging and positive`;

aiRoutes.post("/chat", authenticate, async (req: AuthRequest, res: Response) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "AI service not configured" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10), // last 10 messages for context
      }),
    });

    const data = await response.json() as { content?: Array<{ text: string }> };
    const text = data.content?.[0]?.text || "Sorry, I couldn't process that.";
    res.json({ response: text });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "AI service error" });
  }
});
