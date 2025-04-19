
import { ServiceError } from '@/types/errors';

export interface ImageGenerationOptions {
  prompt: string;
  size: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality: 'standard' | 'hd';
  numberResults?: number;
}

export interface ImageGenerationResponse {
  imageUrl: string;
  error?: ServiceError;
  metadata?: {
    model: string;
    promptId: string;
    size: string;
    createdAt: string;
  };
}

export interface ImageGenerationHookProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
}

export interface ImageGenerationState {
  isGenerating: boolean;
  isRetrying: boolean;
  error: string | null;
  lastPrompt: string | null;
}

export interface ImageGenerationHookReturn {
  generateImageFromPrompt: (prompt: string, tempApiKey: string, retry?: boolean) => Promise<void>;
  isRetrying: boolean;
  state: ImageGenerationState;
}

