
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Castle, Mountain, Contact, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PromptInput } from './PromptInput';
import { ExamplePrompts } from '@/components/hero/form/ExamplePrompts';
import { useIsMobile } from '@/hooks/use-mobile';

interface TextToImageFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function TextToImageForm({ onGenerate, isGenerating }: TextToImageFormProps) {
  const [prompt, setPrompt] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
    
    // Scroll to input for better mobile UX
    if (isMobile) {
      setTimeout(() => {
        const textareaElement = document.querySelector('textarea');
        if (textareaElement) {
          textareaElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <Card className="mb-6 shadow-sm border-gray-200">
      <CardContent className={cn("pt-6", isMobile ? "px-3" : "")}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">✏️</span>
              <h2 className="text-xl font-medium text-gray-800">Description</h2>
            </div>
            
            <PromptInput 
              prompt={prompt}
              onPromptChange={setPrompt}
            />
            
            <p className={cn(
              "text-gray-500",
              isMobile ? "text-xs" : "text-sm"
            )}>
              Be specific with details like style, lighting, and perspective
            </p>
          </div>
          
          <ExamplePrompts onSelect={handleExampleClick} />
          
          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className={cn(
              "w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium",
              isMobile ? "py-4 text-base" : "py-6 text-lg"
            )}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
