import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import { RouterProvider } from "@/components/RouterProvider";

export const metadata: Metadata = {
  title: "Study RPG | Level Up Your Learning",
  description: "Gamified learning platform for Bangladeshi SSC, HSC & university students.",
  manifest: "/manifest.json",
  keywords: ["study", "education", "Bangladesh", "SSC", "HSC", "gamified", "learning", "RPG"],
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ background: "var(--app-bg)" }}>
      <body className="app-shell" style={{ background: "var(--app-bg)", color: "var(--app-text)", margin: 0, padding: 0, minHeight: "100vh", fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
        <RouterProvider />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--app-surface-strong)",
              color: "var(--app-text)",
              border: "1px solid rgba(57,255,20,0.2)",
              borderRadius: "12px",
            },
            success: {
              iconTheme: { primary: "#39FF14", secondary: "#000" },
            },
          }}
        />
      </body>
    </html>
  );
}
