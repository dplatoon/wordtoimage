
import { toast } from "@/components/ui/sonner";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GenerateImageOptions {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  n?: number;
}

interface GenerateImageResponse {
  imageUrl: string;
  error?: string;
}

export const generateImage = async ({
  prompt,
  size = '1024x1024',
  quality = 'standard',
  n = 1
}: GenerateImageOptions): Promise<GenerateImageResponse> => {
  try {
    // Instead of using the OpenAI API directly with an API key in the frontend,
    // we're making a request to our secure proxy endpoint
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        n,
        size,
        quality
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate image');
    }

    const data = await response.json();
    return {
      imageUrl: data.imageUrl
    };
  } catch (error: any) {
    console.error('Error generating image:', error);
    toast.error('Failed to generate image', {
      description: error.message || 'Please try again later'
    });
    return {
      imageUrl: '',
      error: error.message
    };
  }
};

// Optional: Add API key input component for development/testing
interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
}

// Moving the React component to a separate file
// This is commented out since it needs to be in a .tsx file
/*
export const ApiKeyForm = ({ onSubmit }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey);
      toast.success('API Key saved temporarily');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border border-gray-200 rounded-lg">
      <div className="mb-2">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
          OpenAI API Key (stored only for this session)
        </label>
        <div className="flex gap-2">
          <Input 
            type="password" 
            id="apiKey" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
            placeholder="sk-..." 
            className="flex-1"
          />
          <Button type="submit">Save</Button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        This key will be stored temporarily in your browser's memory only.
        For production use, we recommend using a server-side proxy.
      </p>
    </form>
  );
};
*/
