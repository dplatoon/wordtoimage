
import { useState, useRef, useEffect } from 'react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { type MouseEvent } from 'react';

// Import our new atomic components
import { PromptInput } from './ImageGenerationForm/molecules/PromptInput';
import { ParameterControls } from './ImageGenerationForm/molecules/ParameterControls';
import { GenerateButton } from './ImageGenerationForm/atoms/GenerateButton';
import { AuthModal } from './ImageGenerationForm/molecules/AuthModal';
import { NextStepsPanel } from './ImageGenerationForm/molecules/NextStepsPanel';
import { useProgressiveSignup } from './ImageGenerationForm/hooks/useProgressiveSignup';

const MAX_PROMPT_LENGTH = 200;
const DEFAULT_STYLES = [
  'Photorealistic',
  'Watercolor',
  'Low-poly',
  'Digital Art',
  'Anime',
  'Pixel Art',
  'Pencil Sketch'
];
const RESOLUTIONS = ['512x512', '1024x1024'];
const IMAGE_COUNTS = [1, 2, 3, 4];

interface ImageGenerationFormProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
  onNewGalleryRow?: (images: { url: string; prompt: string, style?: string, resolution?: string }[]) => void;
}

export const ImageGenerationForm = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
  onNewGalleryRow
}: ImageGenerationFormProps) => {
  // Form state
  const [prompt, setPrompt] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isCheckingServerKey, setIsCheckingServerKey] = useState(false);
  const [style, setStyle] = useState(DEFAULT_STYLES[0]);
  const [resolution, setResolution] = useState(RESOLUTIONS[1]);
  const [count, setCount] = useState(1);
  
  // Progressive signup hook
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    incrementGenCount, 
    shouldShowAuthModal 
  } = useProgressiveSignup(2);

  const promptInputRef = useRef<HTMLInputElement>(null);
  const { user, loading: authLoading } = useAuth();

  const { generateImageFromPrompt, isRetrying, state } = useImageGeneration({
    onImageGenerated: (url) => {
      onImageGenerated(url);
      if (onNewGalleryRow && url) {
        onNewGalleryRow([{ url, prompt, style, resolution }]);
      }
    },
    onGeneratingChange,
    onError,
  });

  useEffect(() => {
    // API key checks disabled during development
    setIsCheckingServerKey(false);
    setShowApiKeyForm(false);
    toast.info("Development mode: API key check bypassed", {
      description: "Enable API key check in production"
    });
  }, []);

  // PROMPT CHANGE WITH MAX LENGTH
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.slice(0, MAX_PROMPT_LENGTH);
    setPrompt(val);
  };

  // STYLE, RES, COUNT CHANGE HANDLERS
  const onStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStyle(e.target.value);
  const onResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => setResolution(e.target.value);
  const onCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCount(Number(e.target.value));

  const canGenerate = !!prompt.trim() && prompt.length <= MAX_PROMPT_LENGTH && !shouldShowAuthModal;

  // NON AUTH USERS GET MODAL after two image generations
  const handleProtectedGenerate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (shouldShowAuthModal) {
      setAuthModalOpen(true);
      return;
    }
    handleFormSubmit(e as any);
  };

  // FORM SUBMISSION GENERATION LOGIC
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!canGenerate) return;
    
    // Track unauthenticated generation for the "progressive signup gate"
    if (!user) {
      const newCount = incrementGenCount();
      if (newCount > 2) {
        setAuthModalOpen(true);
        return;
      }
    }
    
    for (let i = 0; i < count; i++) {
      await generateImageFromPrompt(
        `[${style}] ${prompt}`,
        tempApiKey,
        false
      );
    }
  };

  // AUTH LOADING STATE
  if (authLoading || isCheckingServerKey) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
        <div className="bg-white rounded-xl p-5 w-full">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Checking authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  // CARD UX + ENHANCED PROMPT FIELD + PARAM CONTROLS + COUNTER
  return (
    <div className="relative flex items-center justify-center min-h-[520px]">
      <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1 w-full max-w-lg mx-auto">
        <div className="bg-white rounded-xl p-7">
          <div className="mb-5 text-center">
            <h2 className="font-bold text-2xl text-gray-900 mb-1">Describe the image you want…</h2>
            <p className="text-gray-500 mb-1 text-sm">Be specific for better results</p>
          </div>
          <form onSubmit={handleFormSubmit}>
            {/* Input with char counter */}
            <PromptInput
              value={prompt}
              onChange={handlePromptChange}
              maxLength={MAX_PROMPT_LENGTH}
              ref={promptInputRef}
            />
            
            {/* Style/Param controls - labeled + bg */}
            <ParameterControls
              style={style}
              resolution={resolution}
              count={count}
              onStyleChange={onStyleChange}
              onResolutionChange={onResolutionChange}
              onCountChange={onCountChange}
              styleOptions={DEFAULT_STYLES}
              resolutionOptions={RESOLUTIONS}
              countOptions={IMAGE_COUNTS}
            />
            
            {/* Generate button - morphs to spinner, disables as needed */}
            <div className="mb-2">
              <GenerateButton
                isGenerating={state.isGenerating}
                isDisabled={!canGenerate}
                onClick={handleProtectedGenerate}
              />
            </div>
          </form>
          
          {/* Next Steps Panel */}
          <NextStepsPanel />
        </div>
      </div>
      
      {/* Auth modal appears after 2 unauth generations */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
