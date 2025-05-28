
import { ServiceError } from '@/types/errors';

export interface ImageGenerationOptions {
  prompt: string;
  size: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality: 'standard' | 'hd';
  numberResults?: number;
  apiKey?: string | null;
  userId?: string | null;
  sourceImage?: string;    // Base64 encoded image data for image-to-image
}

export interface ImageGenerationResponse {
  imageUrl: string;
  error?: ServiceError;
  usingServerKey?: boolean;
  metadata?: {
    model: string;
    promptId: string;
    size: string;
    createdAt: string;
    userId?: string;
    isImageToImage?: boolean;  // Flag to indicate if this was image-to-image generation
  };
}

export interface ImageGenerationHookProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string }[]) => void;
}

export interface ImageGenerationState {
  isGenerating: boolean;
  isRetrying: boolean;
  error: string | null;
  lastPrompt: string | null;
  usingServerKey?: boolean;
  isImageToImage?: boolean;  // Track if current generation is image-to-image
}

export interface ImageGenerationHookReturn {
  generateImageFromPrompt: (prompt: string, tempApiKey: string, retry?: boolean, sourceImage?: string) => Promise<void>;
  isRetrying: boolean;
  state: ImageGenerationState;
}
