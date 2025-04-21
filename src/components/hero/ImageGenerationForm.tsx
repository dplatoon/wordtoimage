
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { InfoAlert } from './InfoAlert';
import { ApiKeyHeader } from './ApiKeyHeader';
import { toast } from '@/components/ui/sonner';
import type { MouseEvent } from 'react';
// Add import for AuthContext
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface ImageGenerationFormProps {
  onImageGenerated: (url: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onError: (error: string | null) => void;
}

export const ImageGenerationForm = ({
  onImageGenerated,
  onGeneratingChange,
  onError,
}: ImageGenerationFormProps) => {
  const [prompt, setPrompt] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isCheckingServerKey, setIsCheckingServerKey] = useState(true);

  const { user, loading: authLoading } = useAuth();

  const { generateImageFromPrompt, isRetrying, state } = useImageGeneration({
    onImageGenerated,
    onGeneratingChange,
    onError,
  });

  // If still loading auth, show spinner
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Checking authentication...</span>
      </div>
    );
  }

  // If user not logged in, show message and login/signup buttons
  if (!user) {
    return (
      <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
        <div className="bg-white rounded-xl p-5 flex flex-col items-center space-y-4">
          <InfoAlert />
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Sign In to Generate Images</h3>
            <p className="text-gray-600 mb-4">
              Please log in or create an account to use AI image generation. This helps us prevent abuse and keeps your creations just for you!
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-100 hover:text-blue-800">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if we can use server API key first (as before)
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
        console.log("Server API key not available, will use user-provided key");
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
    // eslint-disable-next-line
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    setTempApiKey(apiKey);
    setShowApiKeyForm(false);
    localStorage.setItem('temp_openai_key', apiKey);
    toast.success('API Key saved', {
      description: 'Your OpenAI API key has been saved for this session.'
    });
    if (prompt.trim()) {
      generateImageFromPrompt(prompt, apiKey, true);
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    generateImageFromPrompt(prompt, tempApiKey, false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generateImageFromPrompt(prompt, tempApiKey, false);
  };

  if (isCheckingServerKey) {
    return (
      <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
        <div className="bg-white rounded-xl p-5">
          <InfoAlert />
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Checking server API key...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-5">
        <InfoAlert />
        
        {!state.usingServerKey && (
          <ApiKeyHeader 
            tempApiKey={tempApiKey}
            onUpdateApiKey={() => setShowApiKeyForm(!showApiKeyForm)}
          />
        )}
        
        {showApiKeyForm && !state.usingServerKey && (
          <ApiKeyForm 
            onSubmit={handleApiKeySubmit} 
            serviceName="OpenAI"
            keyPlaceholder="Enter your OpenAI API key"
          />
        )}
        
        {state.usingServerKey && (
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                Using server API key - No personal key required
              </span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Describe the image you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            type="submit"
            className="bg-blue-600 w-full hover:bg-blue-700 transition-colors"
            disabled={state.isGenerating || (!tempApiKey && !state.usingServerKey)}
          >
            {state.isGenerating ? 'Generating...' : isRetrying ? 'Retrying...' : 'Generate Image'}
          </Button>
        </form>
      </div>
    </div>
  );
};
