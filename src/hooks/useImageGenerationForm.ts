
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { RESOLUTIONS } from '@/components/hero/constants';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';
import { GalleryService } from '@/services/galleryService';
import { useGenerationLimits } from '@/hooks/image-generation/useGenerationLimits';
import { useApiKeyManagement } from '@/hooks/image-generation/useApiKeyManagement';
import { useFormValidation } from '@/hooks/image-generation/useFormValidation';
import { useImageGenerationState } from '@/hooks/image-generation/useImageGenerationState';
import { useGenerationNotifications } from '@/hooks/image-generation/useGenerationNotifications';

interface UseImageGenerationFormProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string, timestamp?: number }[]) => void;
}

// Map of style IDs to their display names for the prompt
const STYLE_TO_PROMPT_MAP: Record<string, string> = {
  'auto': 'Auto',
  '3d_anime': '3D Anime style',
  '3d_model': 'realistic 3D Model',
  'japanese_anime': 'Japanese Anime style',
  'movie': 'Photorealistic movie scene',
  'comic': 'Comic book style'
};

export const useImageGenerationForm = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
  onNewGalleryRow
}: UseImageGenerationFormProps) => {
  const { user, isLoading: authLoading } = useAuth();
  
  // Extracted hooks
  const { prompt, setPrompt, canGenerate } = useFormValidation();
  const { showApiKeyForm, tempApiKey, setTempApiKey, isCheckingServerKey } = useApiKeyManagement();
  const { 
    generationCount, 
    isFirstDay, 
    dailyGenerationsLeft, 
    canGenerateAnonymous, 
    canGenerateAuthenticated,
    incrementAnonymousCount,
    fetchUserGenerationCount 
  } = useGenerationLimits();
  const { 
    state, 
    setStyle, 
    setResolution, 
    setCount, 
    setSourceImage, 
    setAuthModalOpen 
  } = useImageGenerationState();
  const { showFreeGenerationLimit, showDailyLimit } = useGenerationNotifications();

  const { generateImageFromPrompt, isRetrying, state: generationState } = useImageGeneration({
    onImageGenerated: (url) => {
      onImageGenerated(url);
      if (onNewGalleryRow && url) {
        const galleryEntry = GalleryService.createGalleryEntry(url, prompt, state.style, state.resolution);
        onNewGalleryRow([galleryEntry]);
        
        // Track successful image generation
        trackEvent('image_generated', { 
          style: state.style, 
          resolution: state.resolution,
          promptLength: prompt.length 
        });
        
        if (!user) {
          incrementAnonymousCount();
        } else {
          fetchUserGenerationCount();
        }
      }
    },
    onGeneratingChange,
    onError,
  });

  const handleProtectedGenerate = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!user && !canGenerateAnonymous) {
      setAuthModalOpen(true);
      showFreeGenerationLimit();
      return;
    }

    if (user && !canGenerateAuthenticated) {
      showDailyLimit(isFirstDay);
      return;
    }
    
    handleFormSubmit(e as any);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!canGenerate) return;
    
    trackEvent('generate_button_clicked', {
      style: state.style,
      resolution: state.resolution,
      sourceImage: !!state.sourceImage,
      count: state.count,
      authenticated: !!user
    });
    
    // Use the style mapping to enhance the prompt
    const stylePrefix = state.style !== 'auto' ? STYLE_TO_PROMPT_MAP[state.style] || '' : '';
    const finalPrompt = stylePrefix ? `${prompt}, ${stylePrefix}` : prompt;
    
    for (let i = 0; i < state.count; i++) {
      await generateImageFromPrompt(
        finalPrompt,
        tempApiKey,
        false,
        state.sourceImage
      );
    }
  };

  return {
    // Form state
    prompt,
    setPrompt,
    canGenerate,
    
    // API key management
    showApiKeyForm,
    tempApiKey,
    setTempApiKey,
    isCheckingServerKey,
    
    // Generation state
    style: state.style,
    setStyle,
    resolution: state.resolution,
    setResolution,
    count: state.count,
    setCount, // This now directly accepts numbers
    sourceImage: state.sourceImage,
    setSourceImage,
    
    // Auth and modals
    authModalOpen: state.authModalOpen,
    setAuthModalOpen,
    user,
    authLoading,
    
    // Generation limits
    generationCount,
    isFirstDay,
    dailyGenerationsLeft,
    
    // Generation control
    state: generationState,
    handleProtectedGenerate,
  };
};
