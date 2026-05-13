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
    SocialLogin: {
      google: {
        webClientId: '494377620744-f12bb0qqre8nhik1hfd7ufjjftnbm7qr.apps.googleusercontent.com'
      }
    }
  }
};

export default config;
