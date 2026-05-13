import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.rabbi.studyrpg.app",
  appName: "Study RPG",
  webDir: "out",
  server: {
    // Load directly from Vercel - bypasses all local asset issues
    url: "https://project-wzy1z.vercel.app",
    cleartext: false,
  },
  android: {
    buildOptions: {
      releaseType: "APK",
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#050505",
      showSpinner: false,
    },
  },
};

export default config;
