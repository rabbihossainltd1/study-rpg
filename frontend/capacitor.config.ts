import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.rabbi.studyrpg.app",
  appName: "Study RPG",
  webDir: "out",
  server: {
    androidScheme: "https",
    cleartext: false,
    hostname: "studyrpg.app",
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
