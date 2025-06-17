
import { generateImageFromPrompt } from '@/services/runwareService';

export class ApiKeyService {
  static async checkServerKeyAvailability(): Promise<boolean> {
    try {
      console.log('Checking if server API key is available...');
      
      // Use a minimal test call to check server key
      const testOptions = {
        prompt: 'server key check',
        size: '1024x1024' as const,
        quality: 'standard' as const,
        numberResults: 1,
        apiKey: null,
        userId: null
      };
      
      await generateImageFromPrompt(testOptions);
      console.log('Server API key is available and working');
      return true;
    } catch (error) {
      console.log('No server key available or server key invalid');
      return false;
    }
  }
}
