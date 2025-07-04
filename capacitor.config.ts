import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.721910eef4374eac82233967b0776ac5',
  appName: 'wordtoimage-ai',
  webDir: 'dist',
  server: {
    url: 'https://721910ee-f437-4eac-8223-3967b0776ac5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    StatusBar: {
      style: 'light'
    }
  }
};

export default config;