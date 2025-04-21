import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { InfoAlert } from './InfoAlert';
import { ApiKeyHeader } from './ApiKeyHeader';
import { toast } from '@/components/ui/sonner';
import type { MouseEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

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

/**
 * Friendly Auth Modal for unauthenticated generate click.
 */
export const AuthModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-9 max-w-sm w-full text-center flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Sign up or Log in to WordToImage</h2>
        <p className="text-gray-600">
          Log in or sign up in seconds. It’s free!
        </p>
        <Link to="/auth?tab=signup">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" autoFocus>Get Started — It’s Free</Button>
        </Link>
        <div>
          <Link to="/auth" className="text-blue-700 underline hover:text-blue-900">
            Already have an account? Log in
          </Link>
        </div>
        <button aria-label="Close Modal" onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-black text-2xl font-bold">&times;</button>
      </div>
    </div>
  );
};

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

  const [style, setStyle] = useState(DEFAULT_STYLES[0]);
  const [resolution, setResolution] = useState(RESOLUTIONS[1]);
  const [count, setCount] = useState(1);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { user, loading: authLoading } = useAuth();

  const { generateImageFromPrompt, isRetrying, state } = useImageGeneration({
    onImageGenerated: (url) => {
      onImageGenerated(url);
      // Optionally add to gallery row
      if (onNewGalleryRow && url) {
        onNewGalleryRow([{ url, prompt, style, resolution }]);
      }
    },
    onGeneratingChange,
    onError,
  });

  // Initial server key check (unchanged)
  useEffect(() => {
    const checkServerApiKey = async () => {
      try {
        setIsCheckingServerKey(true);
        const testPrompt = "server key test";
        await generateImageFromPrompt(testPrompt, "", true);
        setShowApiKeyForm(false);
        toast.success("Using server API key", {
          description: "No need to provide your own OpenAI API key"
        });
      } catch (error) {
        const savedApiKey = localStorage.getItem('temp_openai_key');
        if (savedApiKey) {
          setTempApiKey(savedApiKey);
        } else {
          setShowApiKeyForm(true);
        }
      } finally {
        setIsCheckingServerKey(false);
      }
    };
    checkServerApiKey();
  }, [generateImageFromPrompt]);

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

  // If user not logged in, show the Generate button but show modal on click
  const handleProtectedGenerate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    handleFormSubmit(e as any);
  };

  // Handle prompt input change with limit
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.slice(0, MAX_PROMPT_LENGTH);
    setPrompt(val);
  };

  // Handle param changes
  const onStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStyle(e.target.value);
  const onResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => setResolution(e.target.value);
  const onCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCount(Number(e.target.value));

  // Only allow if valid input and ready
  const canGenerate = !!prompt.trim() && prompt.length <= MAX_PROMPT_LENGTH && (tempApiKey || state.usingServerKey);

  // Form submit logic
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!canGenerate) return;
    // Forward to normal generator, but only generate one (demo)
    for (let i = 0; i < count; i++) {
      await generateImageFromPrompt(
        `[${style}] ${prompt}`,
        tempApiKey,
        false
      );
    }
  };

  // Style param UI class
  const dropdownClass = "rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="relative bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-5">
        <InfoAlert />
        {!state.usingServerKey && (
          <ApiKeyHeader tempApiKey={tempApiKey} onUpdateApiKey={() => setShowApiKeyForm(!showApiKeyForm)} />
        )}
        {showApiKeyForm && !state.usingServerKey && (
          <ApiKeyForm onSubmit={setTempApiKey} serviceName="OpenAI" keyPlaceholder="Enter your OpenAI API key" />
        )}
        {state.usingServerKey && (
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
              Using server API key - No personal key required
            </span>
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          {/* Enhanced prompt with placeholder */}
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
            {/* Char counter */}
            <div className="absolute right-6 bottom-14 text-xs text-gray-400 pointer-events-none select-none">
              {prompt.length}/{MAX_PROMPT_LENGTH}
            </div>
          </div>

          {/* Style & params */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div>
              <select value={style} onChange={onStyleChange} className={dropdownClass} aria-label="Art Style">
                {DEFAULT_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <select value={count} onChange={onCountChange} className={dropdownClass} aria-label="Number of Images">
                {IMAGE_COUNTS.map(n => <option key={n} value={n}>{n} image{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div>
              <select value={resolution} onChange={onResolutionChange} className={dropdownClass} aria-label="Resolution">
                {RESOLUTIONS.map(res => <option key={res} value={res}>{res}</option>)}
              </select>
            </div>
          </div>

          {/* Generate button */}
          <div className="relative">
            <Button
              type="submit"
              onClick={handleProtectedGenerate}
              disabled={state.isGenerating || !canGenerate}
              className={`w-full transition-all flex items-center justify-center rounded-full ${state.isGenerating ? 'cursor-not-allowed' : ''}`}
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
      </div>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
