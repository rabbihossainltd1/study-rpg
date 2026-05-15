"use client";

import { useEffect, useState } from "react";
import { DownloadCloud, X, Sparkles } from "lucide-react";
import { APP_VERSION, compareVersion, fetchLatestUpdate, type LatestUpdate } from "@/lib/appVersion";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function UpdatePopup() {
  const { language } = useUserStore();
  const [update, setUpdate] = useState<LatestUpdate | null>(null);
  const isBn = language === "bn";
  useBodyScrollLock(Boolean(update));

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    fetchLatestUpdate()
      .then((latest) => {
        if (cancelled || !latest) return;
        if (compareVersion(latest.version, APP_VERSION) <= 0) return;
        const key = `study-rpg-update-dismissed-${APP_VERSION}-to-${latest.version}`;
        if (localStorage.getItem(key)) return;
        setUpdate(latest);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  if (!update) return null;

  const close = () => {
    localStorage.setItem(`study-rpg-update-dismissed-${APP_VERSION}-to-${update.version}`, "1");
    setUpdate(null);
  };

  const openUpdate = () => {
    window.open(update.apkUrl || update.url, "_blank");
  };

  return (
    <div className="modal-backdrop fixed inset-0 z-[400] flex items-center justify-center p-4 animate-fade-in overflow-hidden">
      <div className="glass-card modal-compact-card w-full max-w-md p-5 border border-primary/25 shadow-[0_0_60px_rgba(57,255,20,0.16)] animate-card-in overflow-y-auto">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{isBn ? `নতুন v${update.version} আপডেট` : `New v${update.version} update`}</h2>
              <p className="text-xs text-gray-500">{isBn ? `তোমার ভার্সন: v${APP_VERSION}` : `Installed: v${APP_VERSION}`}</p>
            </div>
          </div>
          <button onClick={close} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-500"><X className="w-5 h-5" /></button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 mb-4">
          <p className="text-sm font-black text-white mb-3">{isBn ? "এই update-এ যা আছে" : "What's included"}</p>
          <div className="space-y-2">
            {update.notes.slice(0, 8).map((note, index) => (
              <div key={`${note}-${index}`} className="flex gap-2 text-sm text-gray-300 leading-relaxed">
                <span className="text-primary font-black">{index + 1}.</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="ghost" onClick={close}>{isBn ? "পরে" : "Later"}</Button>
          <Button onClick={openUpdate} leftIcon={<DownloadCloud className="w-4 h-4" />}>{isBn ? "Update" : "Update"}</Button>
        </div>
      </div>
    </div>
  );
}
