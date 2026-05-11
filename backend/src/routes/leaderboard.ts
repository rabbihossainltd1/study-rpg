import { Router, Request, Response } from "express";
import admin from "firebase-admin";

// Leaderboard
export const leaderboardRoutes = Router();
const db = () => admin.firestore();

leaderboardRoutes.get("/global", async (_req: Request, res: Response) => {
  try {
    const snap = await db().collection("users").orderBy("xp", "desc").limit(100).get();
    const entries = snap.docs.map((d, i) => ({
      rank: i + 1,
      userId: d.id,
      username: d.data().username,
      level: d.data().level,
      xp: d.data().xp,
      rank_title: d.data().rank,
      streak: d.data().streak,
      district: d.data().district,
    }));
    res.json(entries);
  } catch {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

leaderboardRoutes.get("/district/:district", async (req: Request, res: Response) => {
  try {
    const snap = await db().collection("users")
      .where("district", "==", req.params.district)
      .orderBy("xp", "desc")
      .limit(50)
      .get();
    const entries = snap.docs.map((d, i) => ({ rank: i + 1, userId: d.id, ...d.data() }));
    res.json(entries);
  } catch {
    res.status(500).json({ error: "Failed to fetch district leaderboard" });
  }
});
