import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';
import { generateImage } from '@/services/runwareService';
import { Shield, AlertTriangle, Construction } from 'lucide-react';
import { getErrorMessage, getErrorDisplayDetails } from '@/utils/imageGenerationErrors';
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
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('temp_runware_key');
    if (savedApiKey) {
      setTempApiKey(savedApiKey);
    } else {
      setShowApiKeyForm(true);
    }
  }, []);

  const handleGenerateImage = async (retry: boolean = false) => {
    if (!tempApiKey) {
      toast.error('API Key Required', {
        description: 'Please enter your Runware API key to generate images.',
        action: {
          label: 'Add API Key',
          onClick: () => setShowApiKeyForm(true)
        }
      });
      return;
    }

    if (!prompt.trim()) {
      const error = getErrorMessage(new Error('Empty prompt'));
      const errorDetails = getErrorDisplayDetails(error);
      
      toast.error(errorDetails.title, {
        description: errorDetails.description,
        duration: 5000,
        action: {
          label: 'Dismiss',
          onClick: () => {}
        }
      });
      return;
    }
    
    if (isRetrying && !retry) return;
    setIsRetrying(retry);
    onGeneratingChange(true);
    onError(null);
    
    try {
      const options = { 
        prompt: prompt.trim(),
        width: 1024,
        height: 1024,
        model: "runware:100@1"
      };
      
      const result = await generateImage(options);
      
      if (result.error) {
        const error = getErrorMessage(result.error);
        const errorDetails = getErrorDisplayDetails(error);
        throw new Error(errorDetails.description);
      }
      
      if (result.imageUrl) {
        onImageGenerated(result.imageUrl);
        toast.success("Image Generated!", {
          description: "Your custom graphic is ready to download.",
          duration: 5000,
          action: {
            label: 'Generate Another',
            onClick: () => handleGenerateImage(false)
          }
        });
      } else {
        throw new Error("No image URL received");
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      
      const processedError = getErrorMessage(error);
      const errorDetails = getErrorDisplayDetails(processedError);
      
      onError(errorDetails.description);
      
      toast.error(errorDetails.title, {
        description: errorDetails.description,
        duration: 8000,
        action: errorDetails.action ? {
          label: errorDetails.action,
          onClick: () => {
            if (errorDetails.action === 'Retry') {
              handleGenerateImage(true);
            } else if (errorDetails.action === 'Update API Key') {
              setShowApiKeyForm(true);
            }
          }
        } : undefined
      });
    } finally {
      onGeneratingChange(false);
      setIsRetrying(false);
    }
  };

  const handleApiKeySubmit = (apiKey: string) => {
    setTempApiKey(apiKey);
    setShowApiKeyForm(false);
    localStorage.setItem('temp_runware_key', apiKey);
    if (prompt.trim()) {
      handleGenerateImage(true);
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleGenerateImage(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleGenerateImage(false);
  };

  return (
    <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-5">
        <Alert variant="default" className="mb-4">
          <Construction className="h-4 w-4" />
          <AlertTitle>Create Images with DALL-E 3</AlertTitle>
          <AlertDescription>
            Generate high-quality, photorealistic images powered by OpenAI's DALL-E 3. Get started with your OpenAI API key.{' '}
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              Get your key
            </a>
          </AlertDescription>
        </Alert>

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="h-4 w-4 mr-1 text-green-500" />
            <span>Powered by OpenAI DALL-E 3</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowApiKeyForm(!showApiKeyForm)}
            className="text-xs"
          >
            {tempApiKey ? 'Update API Key' : 'Add API Key'}
          </Button>
        </div>
        
        {showApiKeyForm && (
          <ApiKeyForm 
            onSubmit={handleApiKeySubmit} 
            serviceName="Runware"
            keyPlaceholder="Enter your Runware API key"
          />
        )}
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleGenerateImage(false);
        }}>
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
