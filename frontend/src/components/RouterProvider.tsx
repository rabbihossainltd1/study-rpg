"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { registerRouter, normalizePathForRouter } from "@/lib/navigate";
import toast from "react-hot-toast";

export function RouterProvider() {
  const router = useRouter();
  const lastBackPress = useRef(0);

  useEffect(() => {
    registerRouter({
      push: (path: string) => router.push(path),
    });
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let remove: (() => void) | undefined;

    import("@capacitor/app")
      .then(({ App }) => {
        App.addListener("backButton", ({ canGoBack }) => {
          const path = normalizePathForRouter(window.location.pathname);
          const isHome = path === "/dashboard/" || path === "/dashboard" || path === "/";

          if (!isHome) {
            if (canGoBack || window.history.length > 1) {
              window.history.back();
            } else {
              router.push("/dashboard/");
            }
            return;
          }

          const now = Date.now();
          if (now - lastBackPress.current < 1600) {
            App.exitApp();
            return;
          }
          lastBackPress.current = now;
          toast("Press back again to exit");
        }).then((handle) => {
          remove = () => handle.remove();
        }).catch(() => undefined);
      })
      .catch(() => undefined);

    return () => remove?.();
  }, [router]);

  return null;
}
