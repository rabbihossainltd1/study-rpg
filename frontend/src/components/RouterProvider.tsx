"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerRouter } from "@/lib/navigate";

export function RouterProvider() {
  const router = useRouter();

  useEffect(() => {
    registerRouter((path: string) => router.push(path));
  }, [router]);

  return null;
}
