
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

// API key form component has been moved to /src/components/ApiKeyForm.tsx
// Import it from there when needed
