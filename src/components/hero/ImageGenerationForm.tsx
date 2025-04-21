
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
          Log in or sign up in seconds. It's free!
        </p>
        <Link to="/auth?tab=signup">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" autoFocus>Get Started — It's Free</Button>
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
  const [isCheckingServerKey, setIsCheckingServerKey] = useState(false);

  const [style, setStyle] = useState(DEFAULT_STYLES[0]);
  const [resolution, setResolution] = useState(RESOLUTIONS[1]);
  const [count, setCount] = useState(1);
  const [authModalOpen, setAuthModalOpen] = useState(false);

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
    // Disable API key check and API key form display for now (development mode)
    setIsCheckingServerKey(false);
    setShowApiKeyForm(false);
    toast.info("Development mode: API key check bypassed", {
      description: "Enable API key check in production"
    });
  }, []);

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

  // NON AUTH USERS GET MODAL PROMPT
  const handleProtectedGenerate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    handleFormSubmit(e as any);
  };

  // PROMPT CHANGE WITH MAX LENGTH
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.slice(0, MAX_PROMPT_LENGTH);
    setPrompt(val);
  };

  // STYLE, RESOLUTION, COUNT CHANGE HANDLERS
  const onStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStyle(e.target.value);
  const onResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => setResolution(e.target.value);
  const onCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCount(Number(e.target.value));

  const canGenerate = !!prompt.trim() && prompt.length <= MAX_PROMPT_LENGTH;

  // FORM SUBMISSION GENERATION LOGIC
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

  const dropdownClass =
    "rounded-md border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="relative bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-5">
        <InfoAlert />
        {/* Development Mode Warning */}
        <div className="mb-3 py-2 px-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          ⚠️ Development Mode: API checks disabled. Image generation simulated.
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 relative">
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
            {/* Character counter */}
            <div className="absolute right-6 bottom-14 text-xs text-gray-400 pointer-events-none select-none">
              {prompt.length}/{MAX_PROMPT_LENGTH}
            </div>
          </div>

          {/* Style & params UI */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div>
              <select
                value={style}
                onChange={onStyleChange}
                className={dropdownClass}
                aria-label="Art Style"
              >
                {DEFAULT_STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={count}
                onChange={onCountChange}
                className={dropdownClass}
                aria-label="Number of Images"
              >
                {IMAGE_COUNTS.map((n) => (
                  <option key={n} value={n}>
                    {n} image{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={resolution}
                onChange={onResolutionChange}
                className={dropdownClass}
                aria-label="Resolution"
              >
                {RESOLUTIONS.map((res) => (
                  <option key={res} value={res}>
                    {res}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate button */}
          <div className="relative">
            <Button
              type="submit"
              onClick={handleProtectedGenerate}
              disabled={state.isGenerating || !canGenerate}
              className={`w-full transition-all flex items-center justify-center rounded-full ${
                state.isGenerating ? "cursor-not-allowed" : ""
              }`}
              style={{
                height: state.isGenerating ? 48 : undefined,
                borderRadius: "9999px",
                minHeight: 48,
              }}
            >
              {state.isGenerating ? (
                <span className="flex items-center justify-center gap-2 animate-fade-in">
                  <span className="h-5 w-5 border-2 border-blue-200 border-b-blue-600 rounded-full animate-spin mr-2" />
                  Generating...
                </span>
              ) : (
                "Generate Image"
              )}
            </Button>
          </div>
        </form>

        {/* Next Steps & Implementation roadmap */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Next Steps &amp; Implementation</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
            <li>Wireframe the New Section in your design tool, sketching the input, controls, button, and gallery</li>
            <li>Update Your Lovable Spec with the above components and copy, then generate the React UI</li>
            <li>Test Edge Cases: Very long prompts, network failures, and unauthenticated clicks</li>
            <li>Gather Feedback: Roll out to a beta group or use Hotjar to watch interactions</li>
            <li>Iterate &amp; Polish: Refine styling, tweak animations, and A/B‑test messaging</li>
          </ol>
          <p className="mt-4 text-sm text-blue-600">
            By layering these proven UX patterns into your WordToImage “Image Generate” section, you’ll boost engagement, clarity, and conversion—turning casual visitors into enthusiastic creators.
          </p>
        </div>
      </div>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
