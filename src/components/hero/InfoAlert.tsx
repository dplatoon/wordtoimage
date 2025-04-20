
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Construction, Sparkles } from 'lucide-react';

export const InfoAlert = () => (
  <Alert variant="default" className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
    <Sparkles className="h-4 w-4 text-blue-600" />
    <AlertTitle className="text-blue-700">Create Images with DALL-E 3</AlertTitle>
    <AlertDescription className="text-gray-700">
      Generate high-quality, photorealistic images powered by OpenAI's DALL-E 3. Get started with your OpenAI API key.{' '}
      <a 
        href="https://platform.openai.com/api-keys" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 font-medium hover:underline"
      >
        Get your key
      </a>
    </AlertDescription>
  </Alert>
);
