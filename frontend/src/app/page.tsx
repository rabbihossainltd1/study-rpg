"use client";

import { useEffect } from "react";
import { navigate } from "@/lib/navigate";
import { Loader2, Zap } from "lucide-react";

export default function HomePage() {
  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="text-center animate-card-in">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 animate-float-soft">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <Loader2 className="w-5 h-5 text-primary animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Opening login...</p>
      </div>
    </div>
  );
}
