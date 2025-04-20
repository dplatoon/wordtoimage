
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { InfoAlert } from './InfoAlert';
import { ApiKeyHeader } from './ApiKeyHeader';
import { toast } from '@/components/ui/sonner';
import type { MouseEvent } from 'react';

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

  const { generateImageFromPrompt, isRetrying, state } = useImageGeneration({
    onImageGenerated,
    onGeneratingChange,
    onError,
  });

  // Check if we can use server API key first
  useEffect(() => {
    const checkServerApiKey = async () => {
      try {
        setIsCheckingServerKey(true);
        // Try to generate a test image with empty API key to see if server has one
        const testPrompt = "server key test";
        await generateImageFromPrompt(testPrompt, "", true);
        // If we get here without error, server key is available
        setShowApiKeyForm(false);
        toast.success("Using server API key", {
          description: "No need to provide your own OpenAI API key"
        });
      } catch (error) {
        console.log("Server API key not available, will use user-provided key");
        // Get saved key from localStorage if available
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
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    setTempApiKey(apiKey);
    setShowApiKeyForm(false);
    
    // Store API key in localStorage
    localStorage.setItem('temp_openai_key', apiKey);
    
    toast.success('API Key saved', {
      description: 'Your OpenAI API key has been saved for this session.'
    });
    
    // If there's a prompt already, generate the image
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
