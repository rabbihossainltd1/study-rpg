import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import "./lib/firebase-admin"; // Initialize Firebase Admin SDK first
import { userRoutes } from "./routes/users";
import { subjectRoutes } from "./routes/subjects";
import { leaderboardRoutes } from "./routes/leaderboard";
import { aiRoutes } from "./routes/ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));

// Rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: "AI rate limit reached. Please wait before sending more messages." },
});

app.use(globalLimiter);

// Health
app.get("/health", (_req, res) => {
  res.json({ status: "OK", service: "Study RPG Engine", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/ai", aiLimiter, aiRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Study RPG Engine running on port ${PORT}`);
  console.log(`📡 Health: http://localhost:${PORT}/health`);
});

export default app;
