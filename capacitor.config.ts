import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'wallet',
  webDir: 'dist/wallet',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
        keystorePath: '/home/dastreyko/android-keystore.jks',
        keystorePassword: 'Horizont630',
        keystoreAlias: 'android-wallet',
        keystoreAliasPassword: 'Horizont630',
        releaseType :'APK',
    }
  }
};

export default config;
