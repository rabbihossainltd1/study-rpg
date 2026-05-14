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
    <html lang="en" className="dark" style={{ background: "#050505" }}>
      <body style={{ background: "#050505", color: "#ffffff", margin: 0, padding: 0, minHeight: "100vh", fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
        <RouterProvider />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#fff",
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
