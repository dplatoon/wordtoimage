
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Construction } from 'lucide-react';

export const InfoAlert = () => (
  <Alert variant="default" className="mb-4">
    <Construction className="h-4 w-4" />
    <AlertTitle>Create Images with DALL-E 3</AlertTitle>
    <AlertDescription>
      Generate high-quality, photorealistic images powered by OpenAI's DALL-E 3. Get started with your OpenAI API key.{' '}
      <a 
        href="https://platform.openai.com/api-keys" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:underline"
      >
        Get your key
      </a>
    </AlertDescription>
  </Alert>
);
