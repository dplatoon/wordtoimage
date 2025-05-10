
import { useState, useEffect } from 'react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { 
  RESOLUTIONS, 
  MAX_PROMPT_LENGTH 
} from '@/components/hero/constants';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';
import { supabase } from '@/integrations/supabase/client'; // Fixed import for the supabase client

interface UseImageGenerationFormProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string, timestamp?: number }[]) => void;
}

// Anonymous users can generate 1 image without signup
const MAX_FREE_ANONYMOUS_GENERATIONS = 1;

// First day limits for authenticated users (handled server-side)
const FIRST_DAY_MAX_FREE_GENERATIONS = 3;

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
  const [prompt, setPrompt] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isCheckingServerKey, setIsCheckingServerKey] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [style, setStyle] = useState<string>('auto');
  const [resolution, setResolution] = useState<string>(RESOLUTIONS[1]);
  const [count, setCount] = useState(1);
  const [sourceImage, setSourceImage] = useState<string>('');
  const [isFirstDay, setIsFirstDay] = useState(true);
  const [dailyGenerationsLeft, setDailyGenerationsLeft] = useState(FIRST_DAY_MAX_FREE_GENERATIONS);

  const { user, isLoading: authLoading } = useAuth();

  const { generateImageFromPrompt, isRetrying, state } = useImageGeneration({
    onImageGenerated: (url) => {
      onImageGenerated(url);
      if (onNewGalleryRow && url) {
        // Add unique timestamp and ID to prevent caching/duplicates
        const timestamp = new Date().getTime();
        const uniqueId = Math.random().toString(36).substring(2, 10);
        const uniqueUrl = `${url}?id=${uniqueId}`;
        
        onNewGalleryRow([{ 
          url: uniqueUrl, 
          prompt, 
          style, 
          resolution,
          timestamp
        }]);
        
        // Track successful image generation
        trackEvent('image_generated', { 
          style, 
          resolution,
          promptLength: prompt.length 
        });
        
        if (!user) {
          const newCount = generationCount + 1;
          setGenerationCount(newCount);
          localStorage.setItem('freeGenerationCount', newCount.toString());
          
          if (newCount === MAX_FREE_ANONYMOUS_GENERATIONS) {
            toast.info("Free limit reached", { 
              description: `You've used your free generation. Sign up to continue creating!`,
              duration: 8000,
              action: {
                label: "Sign Up",
                onClick: () => setAuthModalOpen(true)
              }
            });
          }
        } else {
          // For authenticated users, we fetch the latest count after generation
          fetchUserGenerationCount();
        }
      }
    },
    onGeneratingChange,
    onError,
  });

  // Fetch user's first generation date to determine if they're on their first day
  // Also fetch how many generations they've used today
  const fetchUserGenerationCount = async () => {
    if (!user) return;
    
    try {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
      
      // Get user's first generation to check if today is their first day
      const { data: firstGenData, error: firstGenError } = await supabase
        .from('image_generations')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1);
        
      if (firstGenError) {
        console.error("Error fetching first generation date:", firstGenError);
        return;
      }
      
      // Check if today is the first day of generation
      const isFirstDayUser = firstGenData.length === 0 || 
                            (new Date(firstGenData[0].created_at).toDateString() === today.toDateString());
      
      setIsFirstDay(isFirstDayUser);
      
      // Get count of today's generations
      const { data: todayData, error: todayError, count } = await supabase
        .from('image_generations')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', startOfToday)
        .lt('created_at', endOfToday);
      
      if (todayError) {
        console.error("Error fetching today's generation count:", todayError);
        return;
      }
      
      const maxAllowed = isFirstDayUser ? FIRST_DAY_MAX_FREE_GENERATIONS : 1;
      const usedToday = count || 0;
      const remaining = Math.max(0, maxAllowed - usedToday);
      
      setDailyGenerationsLeft(remaining);
      
      if (remaining === 0) {
        toast.info(isFirstDayUser 
          ? `You've used all ${FIRST_DAY_MAX_FREE_GENERATIONS} generations for your first day` 
          : "You've used your daily free generation", { 
          description: "Upgrade to generate more images or wait until tomorrow.",
          duration: 8000
        });
      } else if (remaining === 1) {
        toast.info(`You have 1 free generation left ${isFirstDayUser ? "today" : "for today"}`, {
          duration: 4000
        });
      }
      
    } catch (error) {
      console.error("Error checking generation limits:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      const savedCount = localStorage.getItem('freeGenerationCount');
      if (savedCount) {
        setGenerationCount(parseInt(savedCount, 10));
      }
    } else {
      fetchUserGenerationCount();
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
        trackEvent('api_key_required');
      }
    };

    checkServerKey();
  }, []);

  const handleProtectedGenerate = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!user && generationCount >= MAX_FREE_ANONYMOUS_GENERATIONS) {
      setAuthModalOpen(true);
      toast.error("Free generation limit reached", {
        description: "Sign up to continue generating images!",
        duration: 8000
      });
      trackEvent('free_limit_reached');
      return;
    }

    if (user && dailyGenerationsLeft <= 0) {
      toast.error(isFirstDay 
        ? `You've used all ${FIRST_DAY_MAX_FREE_GENERATIONS} generations for your first day` 
        : "Daily free generation limit reached", {
        description: "Upgrade to generate more images or wait until tomorrow.",
        duration: 8000
      });
      trackEvent('daily_limit_reached');
      return;
    }
    
    handleFormSubmit(e as any);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!canGenerate) return;
    
    trackEvent('generate_button_clicked', {
      style,
      resolution,
      sourceImage: !!sourceImage,
      count,
      authenticated: !!user
    });
    
    // Use the style mapping to enhance the prompt
    const stylePrefix = style !== 'auto' ? STYLE_TO_PROMPT_MAP[style] || '' : '';
    const finalPrompt = stylePrefix ? `${prompt}, ${stylePrefix}` : prompt;
    
    for (let i = 0; i < count; i++) {
      await generateImageFromPrompt(
        finalPrompt,
        tempApiKey,
        false,
        sourceImage
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
    sourceImage,
    setSourceImage,
    user,
    authLoading,
    state,
    canGenerate,
    handleProtectedGenerate,
    isFirstDay,
    dailyGenerationsLeft,
  };
};
