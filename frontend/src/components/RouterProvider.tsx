"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerRouter, normalizePathForRouter } from "@/lib/navigate";
import toast from "react-hot-toast";

const HOME_PATHS = new Set(["/", "/dashboard", "/dashboard/"]);

function currentPath() {
  if (typeof window === "undefined") return "/";
  return normalizePathForRouter(window.location.pathname);
}

export function RouterProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const lastBackPress = useRef(0);
  const pathStack = useRef<string[]>([]);

  useEffect(() => {
    registerRouter({
      push: (path: string) => router.push(path),
    });
  }, [router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const normalized = normalizePathForRouter(pathname || window.location.pathname);
    const stack = pathStack.current;
    if (stack[stack.length - 1] !== normalized) {
      pathStack.current = [...stack.filter((p) => p !== normalized), normalized].slice(-25);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let remove: (() => void) | undefined;

    const goBackSafely = () => {
      const path = currentPath();
      const isHome = HOME_PATHS.has(path);

      if (!isHome) {
        const stack = pathStack.current;
        const previous = stack.length > 1 ? stack[stack.length - 2] : "/dashboard/";
        pathStack.current = stack.slice(0, -1);

        if (previous && previous !== path) {
          router.push(previous);
        } else {
          router.push("/dashboard/");
        }
        return;
      }

      const now = Date.now();
      if (now - lastBackPress.current < 1800) {
        import("@capacitor/app").then(({ App }) => App.exitApp()).catch(() => undefined);
        return;
      }
      lastBackPress.current = now;
      toast("Back আবার চাপলে app close হবে");
    };

    import("@capacitor/app")
      .then(({ App }) => {
        App.addListener("backButton", () => {
          goBackSafely();
        }).then((handle) => {
          remove = () => handle.remove();
        }).catch(() => undefined);
      })
      .catch(() => undefined);

    // Extra WebView guard: keep at least one history entry so Android back can be intercepted.
    try {
      if (!window.history.state?.studyRpgGuard) {
        window.history.replaceState({ ...(window.history.state || {}), studyRpgGuard: true }, "", window.location.href);
      }
    } catch {}

    return () => remove?.();
  }, [router]);

  return null;
}
