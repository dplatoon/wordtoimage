import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.721910eef4374eac82233967b0776ac5',
  appName: 'wordtoimage-ai',
  webDir: 'dist',
  server: {
    // Use Lovable domain for now - custom domain can be configured in Lovable settings
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