
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
}

export interface ImageGenerationHookProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
}
