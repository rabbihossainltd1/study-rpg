import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Study RPG | Level Up Your Learning",
  description: "Gamified learning platform for Bangladeshi SSC, HSC & university students. Earn XP, unlock achievements, and compete with friends while mastering your subjects.",
  manifest: "/manifest.json",
  keywords: ["study", "education", "Bangladesh", "SSC", "HSC", "gamified", "learning", "RPG"],
  openGraph: {
    title: "Study RPG | Level Up Your Learning",
    description: "Turn studying into an addictive RPG experience",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ background: "#050505" }}>
      <body
        className="antialiased text-white min-h-screen flex flex-col relative"
        style={{ background: "#050505", color: "#ffffff" }}
      >
        <div className="particle-bg" />
        <div className="grid-overlay opacity-40" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
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
