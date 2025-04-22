
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { InfoAlert } from './InfoAlert';
import { AuthModalDialog } from './AuthModalDialog';
import { GenerationControls } from './GenerationControls';
import { useAuth } from '@/contexts/AuthContext';
import { MAX_PROMPT_LENGTH, DEFAULT_STYLES, RESOLUTIONS } from './constants';
import { trackEvent, events } from '@/utils/analytics';
import { toast } from '@/components/ui/sonner';
import type { MouseEvent } from 'react';

interface ImageGenerationFormProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string }[]) => void;
}

const MAX_FREE_GENERATIONS = 3;

export const ImageGenerationForm = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
  onNewGalleryRow
}: ImageGenerationFormProps) => {
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
        
        // Increment generation count for free tier limiting
        if (!user) {
          const newCount = generationCount + 1;
          setGenerationCount(newCount);
          localStorage.setItem('freeGenerationCount', newCount.toString());
          
          // Show sign up prompt when approaching limit
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

  // Load free tier usage on component mount
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
        const serverKeyTest = await generateImageFromPrompt('[Test] server key check', '', true);
        setShowApiKeyForm(false);
        setIsCheckingServerKey(false);
      } catch (error) {
        console.log('No server key available, requiring user API key');
        setShowApiKeyForm(true);
        setIsCheckingServerKey(false);
      }
    };

    checkServerKey();
  }, []);

  if (authLoading || isCheckingServerKey) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
        <div className="bg-white rounded-xl p-5 w-full">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading generator...</span>
          </div>
        </div>
      </div>
    );
  }

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.slice(0, MAX_PROMPT_LENGTH);
    setPrompt(val);
  };

  const handleProtectedGenerate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Check if free user has reached generation limit
    if (!user && generationCount >= MAX_FREE_GENERATIONS) {
      setAuthModalOpen(true);
      toast.error("Free generation limit reached", {
        description: "Sign up to continue generating images!",
        duration: 8000
      });
      return;
    }
    
    if (!user) {
      // Already checked limit above, so allow generation but show sign up modal at proper time
      handleFormSubmit(e as any);
    } else {
      // Authenticated user - no limits
      handleFormSubmit(e as any);
    }
  };

  const canGenerate = !!prompt.trim() && prompt.length <= MAX_PROMPT_LENGTH;

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!canGenerate) return;
    
    for (let i = 0; i < count; i++) {
      await generateImageFromPrompt(
        `[${style}] ${prompt}`,
        tempApiKey,
        false
      );
    }
  };

  return (
    <div className="relative bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-5">
        <InfoAlert usingServerKey={!showApiKeyForm} />
        
        {showApiKeyForm && (
          <ApiKeyForm 
            onSubmit={setTempApiKey} 
            serviceName="OpenAI" 
            keyPlaceholder="Enter your OpenAI API key" 
          />
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="A serene mountain lake at sunrise, ultra‑detailed HDR style"
              value={prompt}
              onChange={handlePromptChange}
              className="w-full pr-16"
              maxLength={MAX_PROMPT_LENGTH}
              aria-label="Image prompt"
              autoFocus
            />
            <div className="absolute right-6 bottom-14 text-xs text-gray-400 pointer-events-none select-none">
              {prompt.length}/{MAX_PROMPT_LENGTH}
            </div>
          </div>

          <GenerationControls
            style={style}
            resolution={resolution}
            count={count}
            onStyleChange={setStyle}
            onResolutionChange={setResolution}
            onCountChange={(value) => setCount(Number(value))}
          />

          <div className="relative">
            <Button
              type="submit"
              onClick={handleProtectedGenerate}
              disabled={state.isGenerating || !canGenerate}
              className="w-full transition-all flex items-center justify-center rounded-full"
              style={{
                height: state.isGenerating ? 48 : undefined,
                borderRadius: "9999px",
                minHeight: 48
              }}
            >
              {state.isGenerating ? (
                <span className="flex items-center justify-center gap-2 animate-fade-in">
                  <span className="h-5 w-5 border-2 border-blue-200 border-b-blue-600 rounded-full animate-spin mr-2" />
                  Generating...
                </span>
              ) : (
                <>
                {!user && (
                  <span className="absolute top-0 right-3 -mt-2 bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {MAX_FREE_GENERATIONS - generationCount}/{MAX_FREE_GENERATIONS} free
                  </span>
                )}
                'Generate Image'
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
      <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
