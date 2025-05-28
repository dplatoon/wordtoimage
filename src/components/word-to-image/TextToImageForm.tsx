
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PromptInput } from './PromptInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

interface TextToImageFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function TextToImageForm({ onGenerate, isGenerating }: TextToImageFormProps) {
  const [prompt, setPrompt] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a description for your image");
      return;
    }
    
    if (prompt.trim().length < 10) {
      toast.error("Please provide a more detailed description (at least 10 characters)");
      return;
    }
    
    onGenerate(prompt.trim());
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className={cn("pt-6", isMobile ? "px-3" : "")}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <Wand2 className="text-blue-600 mr-2 h-5 w-5" />
              <h2 className="text-xl font-medium text-gray-800">Describe Your Image</h2>
            </div>
            
            <PromptInput 
              prompt={prompt}
              onPromptChange={handlePromptChange}
            />
            
            <p className={cn(
              "text-gray-500",
              isMobile ? "text-xs" : "text-sm"
            )}>
              The more detailed your description, the better your result will be
            </p>
          </div>
          
          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating || prompt.trim().length < 10}
            className={cn(
              "w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-200",
              isMobile ? "py-4 text-base h-12" : "py-6 text-lg h-14",
              (!prompt.trim() || isGenerating || prompt.trim().length < 10) && "opacity-50 cursor-not-allowed"
            )}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-3 h-5 w-5 border-b-2 border-white rounded-full" />
                Creating Your Image...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Sparkles className="mr-3 h-5 w-5" />
                Generate Image
              </span>
            )}
          </Button>
          
          {!isGenerating && (
            <div className="text-center">
              <p className={cn(
                "text-gray-500",
                isMobile ? "text-xs" : "text-sm"
              )}>
                {prompt.trim().length < 10 
                  ? "Enter at least 10 characters to generate your image"
                  : "Press Enter or click the button to generate your image"
                }
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
