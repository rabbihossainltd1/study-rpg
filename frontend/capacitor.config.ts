import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rabbi.studyrpg.app',
  appName: 'Study RPG',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    allowNavigation: ['*']
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
