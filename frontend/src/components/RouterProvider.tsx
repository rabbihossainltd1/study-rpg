"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { App as CapacitorApp } from "@capacitor/app";
import { registerRouter, normalizePathForRouter } from "@/lib/navigate";
import toast from "react-hot-toast";

const HOME_PATHS = new Set(["/", "/dashboard", "/dashboard/"]);
const STACK_KEY = "study_rpg_route_stack";

function getCurrentPath() {
  if (typeof window === "undefined") return "/";
  return normalizePathForRouter(window.location.pathname || "/");
}

function readStack() {
  if (typeof window === "undefined") return [] as string[];
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STACK_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [] as string[];
  }
}

function saveStack(stack: string[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack.slice(-40)));
  } catch {}
}

export function RouterProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const lastBackPress = useRef(0);
  const pathStack = useRef<string[]>([]);
  const internalBack = useRef(false);

  useEffect(() => {
    registerRouter({
      push: (path: string) => router.push(path),
    });
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readStack();
    const current = normalizePathForRouter(pathname || window.location.pathname || "/");
    const baseStack = stored.length ? stored : [current];

    if (!internalBack.current && baseStack[baseStack.length - 1] !== current) {
      pathStack.current = [...baseStack, current].slice(-40);
    } else {
      pathStack.current = baseStack[baseStack.length - 1] === current ? baseStack : [...baseStack, current].slice(-40);
    }

    internalBack.current = false;
    saveStack(pathStack.current);

    try {
      if (!window.history.state?.studyRpgGuard) {
        window.history.replaceState({ ...(window.history.state || {}), studyRpgGuard: true }, "", window.location.href);
      }
    } catch {}
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let nativeBackHandle: { remove: () => void } | undefined;

    const routeBackInsideApp = () => {
      const current = getCurrentPath();
      const isHome = HOME_PATHS.has(current);

      if (!isHome) {
        const stack = pathStack.current.length ? pathStack.current : readStack();
        const previous = stack.length > 1 ? stack[stack.length - 2] : "/dashboard/";
        const nextPath = previous && previous !== current ? previous : "/dashboard/";

        pathStack.current = stack.filter(Boolean).slice(0, Math.max(1, stack.length - 1));
        if (pathStack.current[pathStack.current.length - 1] !== nextPath) {
          pathStack.current.push(nextPath);
        }
        saveStack(pathStack.current);
        internalBack.current = true;
        router.replace(nextPath);
        return;
      }

      const now = Date.now();
      if (now - lastBackPress.current < 1800) {
        try {
          void CapacitorApp.exitApp();
        } catch {}
        return;
      }
      lastBackPress.current = now;
      toast("Back আবার চাপলে app close হবে");
    };

    const onPopState = () => {
      routeBackInsideApp();
      try {
        window.history.pushState({ ...(window.history.state || {}), studyRpgGuard: true }, "", window.location.href);
      } catch {}
    };

    window.addEventListener("popstate", onPopState);
    CapacitorApp.addListener("backButton", () => {
      routeBackInsideApp();
    })
      .then((handle) => {
        nativeBackHandle = handle;
      })
      .catch(() => undefined);

    try {
      window.history.pushState({ ...(window.history.state || {}), studyRpgGuard: true }, "", window.location.href);
    } catch {}

    return () => {
      window.removeEventListener("popstate", onPopState);
      nativeBackHandle?.remove();
    };
  }, [router]);

  return null;
}
