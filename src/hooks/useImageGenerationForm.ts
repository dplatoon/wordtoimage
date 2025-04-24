
import { useState, useEffect } from 'react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DEFAULT_STYLES, 
  RESOLUTIONS, 
  MAX_PROMPT_LENGTH 
} from '@/components/hero/constants';
import { toast } from '@/components/ui/sonner';
import { trackEvent, events } from '@/utils/analytics';

interface UseImageGenerationFormProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string }[]) => void;
}

const MAX_FREE_GENERATIONS = 3;

export const useImageGenerationForm = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
  onNewGalleryRow
}: UseImageGenerationFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isCheckingServerKey, setIsCheckingServerKey] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [style, setStyle] = useState<string>(DEFAULT_STYLES[0]);
  const [resolution, setResolution] = useState<string>(RESOLUTIONS[1]);
  const [count, setCount] = useState(1);

  const { user, isLoading: authLoading } = useAuth();

  const { generateImageFromPrompt, isRetrying, state } = useImageGeneration({
    onImageGenerated: (url) => {
      onImageGenerated(url);
      if (onNewGalleryRow && url) {
        onNewGalleryRow([{ url, prompt, style, resolution }]);
        
        trackEvent(events.GENERATE_IMAGE, {
          prompt,
          style,
          resolution,
          authenticated: !!user
        });
        
        if (!user) {
          const newCount = generationCount + 1;
          setGenerationCount(newCount);
          localStorage.setItem('freeGenerationCount', newCount.toString());
          
          if (newCount === MAX_FREE_GENERATIONS - 1) {
            toast.info("Almost reached free limit", { 
              description: `You have 1 free generation remaining. Sign up to continue creating!`,
              duration: 8000,
              action: {
                label: "Sign Up",
                onClick: () => setAuthModalOpen(true)
              }
            });
          }
        }
      }
    },
    onGeneratingChange,
    onError,
  });

  useEffect(() => {
    if (!user) {
      const savedCount = localStorage.getItem('freeGenerationCount');
      if (savedCount) {
        setGenerationCount(parseInt(savedCount, 10));
      }
    }
  }, [user]);

  useEffect(() => {
    const checkServerKey = async () => {
      try {
        console.log('Checking if server API key is available...');
        await generateImageFromPrompt('server key check', '', true);
        console.log('Server API key is available and working');
        setShowApiKeyForm(false);
        setIsCheckingServerKey(false);
      } catch (error) {
        console.log('No server key available or server key invalid, requiring user API key');
        toast.warning("OpenAI API Key Required", {
          description: "Please enter your OpenAI API key to generate images",
          duration: 8000
        });
        setShowApiKeyForm(true);
        setIsCheckingServerKey(false);
      }
    };

    checkServerKey();
  }, []);

  const handleProtectedGenerate = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!user && generationCount >= MAX_FREE_GENERATIONS) {
      setAuthModalOpen(true);
      toast.error("Free generation limit reached", {
        description: "Sign up to continue generating images!",
        duration: 8000
      });
      return;
    }
    
    handleFormSubmit(e as any);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!canGenerate) return;
    
    // For testing, use a simple prompt without style tags when experiencing issues
    const finalPrompt = `[${style}] ${prompt}`;
    
    for (let i = 0; i < count; i++) {
      await generateImageFromPrompt(
        finalPrompt,
        tempApiKey,
        false
      );
    }
  };

  const canGenerate = !!prompt.trim() && prompt.length <= MAX_PROMPT_LENGTH;

  return {
    prompt,
    setPrompt,
    showApiKeyForm,
    tempApiKey,
    setTempApiKey,
    isCheckingServerKey,
    authModalOpen,
    setAuthModalOpen,
    generationCount,
    style,
    setStyle,
    resolution,
    setResolution,
    count,
    setCount,
    user,
    authLoading,
    state,
    canGenerate,
    handleProtectedGenerate,
  };
};
