
import { toast } from "@/components/ui/sonner";

interface GenerateImageOptions {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
  numberResults?: number;
}

interface GenerateImageResponse {
  imageUrl: string;
  error?: string;
}

export const generateImage = async ({
  prompt,
  width = 1024,
  height = 1024,
  model = "runware:100@1",
  numberResults = 1
}: GenerateImageOptions): Promise<GenerateImageResponse> => {
  try {
    // Instead of using the Runware API directly, we make a request to our secure proxy endpoint
    const response = await fetch('/api/generate-runware-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        positivePrompt: prompt,
        width,
        height,
        model,
        numberResults
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

// API key form component for development/testing
interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
}

export const ApiKeyForm = ({ onSubmit }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey);
      // Store temporarily in localStorage for development only
      localStorage.setItem('temp_runware_key', apiKey);
      toast.success('Runware API Key saved temporarily');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg">
      <div className="mb-2">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
          Runware API Key (stored only for this session)
        </label>
        <div className="flex gap-2">
          <Input 
            type="password" 
            id="apiKey" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
            placeholder="Enter your Runware API key" 
            className="flex-1"
          />
          <Button type="button" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        This key will be stored temporarily in your browser's memory only.
        For production use, we recommend using a server-side proxy with Supabase.
      </p>
    </div>
  );
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
