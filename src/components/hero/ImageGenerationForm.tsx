
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { InfoAlert } from './InfoAlert';
import { AuthModalDialog } from './AuthModalDialog';
import { GenerationControls } from './GenerationControls';
import { NextStepsSection } from './NextStepsSection';
import { useAuth } from '@/contexts/AuthContext';
import { MAX_PROMPT_LENGTH, DEFAULT_STYLES, RESOLUTIONS } from './constants';
import type { MouseEvent } from 'react';

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
  const [prompt, setPrompt] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isCheckingServerKey, setIsCheckingServerKey] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [style, setStyle] = useState(DEFAULT_STYLES[0]);
  const [resolution, setResolution] = useState(RESOLUTIONS[1]);
  const [count, setCount] = useState(1);

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

  // Check for server key on component mount
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

  // AUTH LOADING
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

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.slice(0, MAX_PROMPT_LENGTH);
    setPrompt(val);
  };

  const handleProtectedGenerate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    handleFormSubmit(e as any);
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
                'Generate Image'
              )}
            </Button>
          </div>
        </form>
        
        <NextStepsSection />
      </div>
      <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
