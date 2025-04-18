
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';
import { generateImage } from '@/services/runwareService';
import { getErrorDisplayMessage } from '@/utils/errorUtils';

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

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Invalid Input', {
        description: 'Please enter a prompt for the image'
      });
      return;
    }
    
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
        throw new Error(getErrorDisplayMessage(result.error));
      }
      
      if (result.imageUrl) {
        onImageGenerated(result.imageUrl);
        toast.success("Success!", {
          description: "Your custom graphic is ready to download.",
        });
      } else {
        throw new Error("No image URL received");
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      onError(errorMessage);
      
      toast.error("Generation Failed", {
        description: errorMessage
      });
    } finally {
      onGeneratingChange(false);
    }
  };

  const handleApiKeySubmit = (apiKey: string) => {
    setTempApiKey(apiKey);
    setShowApiKeyForm(false);
  };

  return (
    <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-5">
        {!tempApiKey && (
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Shield className="h-4 w-4 mr-1 text-green-500" />
              <span>Using Runware AI for image generation</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowApiKeyForm(!showApiKeyForm)}
              className="text-xs"
            >
              {showApiKeyForm ? 'Hide' : 'API Options'}
            </Button>
          </div>
        )}
        
        {showApiKeyForm && (
          <ApiKeyForm 
            onSubmit={handleApiKeySubmit} 
            serviceName="Runware"
            keyPlaceholder="Enter your Runware API key"
          />
        )}
        
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
          className="bg-blue-600 w-full"
          onClick={handleGenerateImage}
        >
          Generate Image
        </Button>
      </div>
    </div>
  );
};
