"use client";

import { useEffect } from "react";

let activeLocks = 0;
let previousBodyOverflow = "";
let previousHtmlOverflow = "";
let previousOverscroll = "";

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    const body = document.body;
    const html = document.documentElement;

    if (activeLocks === 0) {
      previousBodyOverflow = body.style.overflow;
      previousHtmlOverflow = html.style.overflow;
      previousOverscroll = body.style.overscrollBehavior;
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      body.style.overscrollBehavior = "contain";
      body.classList.add("modal-scroll-lock");
      html.classList.add("modal-scroll-lock");
    }

    activeLocks += 1;

    return () => {
      activeLocks = Math.max(0, activeLocks - 1);
      if (activeLocks === 0) {
        body.style.overflow = previousBodyOverflow;
        html.style.overflow = previousHtmlOverflow;
        body.style.overscrollBehavior = previousOverscroll;
        body.classList.remove("modal-scroll-lock");
        html.classList.remove("modal-scroll-lock");
      }
    };
  }, [active]);
}
