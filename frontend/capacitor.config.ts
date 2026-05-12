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
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: "APK",
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#050505",
      showSpinner: false,
    },
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId:
        "494377620744-f12bb0qqre8nhik1hfd7ufjjftnbm7qr.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
