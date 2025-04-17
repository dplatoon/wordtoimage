
import { toast } from "@/components/ui/sonner";

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
    // In a real implementation, this API key would be stored securely
    // and not exposed in the frontend code
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key or use env variables
    
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt,
        n,
        size,
        quality,
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate image');
    }

    const data = await response.json();
    return {
      imageUrl: data.data[0].url
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
