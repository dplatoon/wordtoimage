
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { InfoAlert } from './InfoAlert';
import { ApiKeyHeader } from './ApiKeyHeader';
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

  const { generateImageFromPrompt, isRetrying } = useImageGeneration({
    onImageGenerated,
    onGeneratingChange,
    onError,
  });

  useEffect(() => {
    const savedApiKey = localStorage.getItem('temp_openai_key');
    if (savedApiKey) {
      setTempApiKey(savedApiKey);
    } else {
      setShowApiKeyForm(true);
    }
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    setTempApiKey(apiKey);
    setShowApiKeyForm(false);
    localStorage.setItem('temp_openai_key', apiKey);
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

  return (
    <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-5">
        <InfoAlert />
        
        <ApiKeyHeader 
          tempApiKey={tempApiKey}
          onUpdateApiKey={() => setShowApiKeyForm(!showApiKeyForm)}
        />
        
        {showApiKeyForm && (
          <ApiKeyForm 
            onSubmit={handleApiKeySubmit} 
            serviceName="OpenAI"
            keyPlaceholder="Enter your OpenAI API key"
          />
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
            disabled={isRetrying || !tempApiKey}
          >
            {isRetrying ? 'Retrying...' : 'Generate Image'}
          </Button>
        </form>
      </div>
    </div>
  );
};
