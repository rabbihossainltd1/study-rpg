"use client";

import { useEffect, useState } from "react";
import { DownloadCloud, Sparkles } from "lucide-react";
import { APP_VERSION, compareVersion, fetchLatestUpdate, type LatestUpdate } from "@/lib/appVersion";
import { showDeviceNotification } from "@/lib/notifications";
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
        setUpdate(latest);
        const notifyKey = `studyRpgUpdateNotified_${latest.version}`;
        if (typeof window !== "undefined" && localStorage.getItem(notifyKey) !== "1") {
          localStorage.setItem(notifyKey, "1");
          showDeviceNotification({
            id: `update-${latest.version}`,
            type: "update",
            from: "system",
            to: "current",
            title: `Study RPG v${latest.version} update`,
            body: "New version is ready. Download update now.",
            link: latest.apkUrl || latest.url,
          }).catch(() => undefined);
        }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  if (!update) return null;

  const openUpdate = () => {
    const url = update.apkUrl || update.url;
    const androidExternal = typeof window !== "undefined" ? (window as any).AndroidExternal : null;
    if (androidExternal?.openExternalUrl) {
      androidExternal.openExternalUrl(url);
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.setAttribute("download", "");
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
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
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-black text-red-300">Required</div>
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

        <Button onClick={openUpdate} leftIcon={<DownloadCloud className="w-4 h-4" />} className="w-full" size="lg">{isBn ? "Download Update" : "Download Update"}</Button>
        <p className="mt-3 text-center text-xs text-gray-500">{isBn ? "নতুন version install করা বাধ্যতামূলক।" : "Installing the latest version is required."}</p>
      </div>
    </div>
  );
}
