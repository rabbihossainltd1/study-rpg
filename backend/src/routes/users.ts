import { Router, Response } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";
import admin from "firebase-admin";

export const userRoutes = Router();
const db = () => admin.firestore();

userRoutes.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const doc = await db().collection("users").doc(req.userId!).get();
    if (!doc.exists) return res.status(404).json({ error: "User not found" });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

userRoutes.put("/me", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const allowed = ["username", "district", "examMode", "language", "avatar"];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    await db().collection("users").doc(req.userId!).update(updates);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

userRoutes.post("/xp", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { amount, source } = req.body;
    if (!amount || amount <= 0 || amount > 500) return res.status(400).json({ error: "Invalid XP amount" });

    const ref = db().collection("users").doc(req.userId!);
    await ref.update({
      xp: admin.firestore.FieldValue.increment(amount),
      totalStudyTime: source === "focus" ? admin.firestore.FieldValue.increment(1) : admin.firestore.FieldValue.increment(0),
    });
    res.json({ success: true, xpAdded: amount });
  } catch {
    res.status(500).json({ error: "Failed to add XP" });
  }
});

userRoutes.get("/search", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== "string") return res.status(400).json({ error: "Query required" });

    const snap = await db().collection("users")
      .where("username", ">=", q)
      .where("username", "<=", q + "\uf8ff")
      .limit(10)
      .get();

    const users = snap.docs.map((d) => ({
      uid: d.id,
      username: d.data().username,
      level: d.data().level,
      rank: d.data().rank,
    }));
    res.json(users);
  } catch {
    res.status(500).json({ error: "Search failed" });
  }
});
