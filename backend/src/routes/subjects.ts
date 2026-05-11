import { Router, Request, Response } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";
import admin from "firebase-admin";

export const subjectRoutes = Router();
const db = () => admin.firestore();

subjectRoutes.get("/", async (_req: Request, res: Response) => {
  try {
    const snap = await db().collection("subjects").get();
    if (snap.empty) {
      return res.json({ message: "No subjects in DB yet — using client-side data" });
    }
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

subjectRoutes.get("/:subjectId/chapters", async (req: Request, res: Response) => {
  try {
    const snap = await db()
      .collection("subjects")
      .doc(req.params.subjectId)
      .collection("chapters")
      .orderBy("order")
      .get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch {
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
});

subjectRoutes.post("/:subjectId/complete", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { chapterId, xpEarned } = req.body;
    const ref = db().collection("userProgress").doc(`${req.userId}_${req.params.subjectId}`);
    await ref.set({
      userId: req.userId,
      subjectId: req.params.subjectId,
      completedChapters: admin.firestore.FieldValue.arrayUnion(chapterId),
      lastStudied: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    await db().collection("users").doc(req.userId!).update({
      xp: admin.firestore.FieldValue.increment(xpEarned || 0),
      totalStudyTime: admin.firestore.FieldValue.increment(5),
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to record progress" });
  }
});
