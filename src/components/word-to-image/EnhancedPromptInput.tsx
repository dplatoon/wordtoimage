
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Sparkles } from 'lucide-react';
import { ProfessionalPromptInput } from './ProfessionalPromptInput';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedPromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function EnhancedPromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating
}: EnhancedPromptInputProps) {
  const isMobile = useIsMobile();
  const isReady = prompt.trim().length >= 15;

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isReady && !isGenerating) onGenerate(); }} className="space-y-6">
      <ProfessionalPromptInput
        prompt={prompt}
        onPromptChange={onPromptChange}
        onGenerate={onGenerate}
        isGenerating={isGenerating}
      />
      
      {/* Professional generate button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!isReady || isGenerating}
          className={cn(
            "relative overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl",
            isMobile ? "w-full py-4 text-lg" : "px-12 py-4 text-lg",
            isReady && !isGenerating
              ? "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white scale-100 hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          {/* Background gradient animation */}
          {isReady && !isGenerating && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Button content */}
          <div className="relative flex items-center justify-center">
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                Creating Your Image...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-3" />
                Create Your Free Image Now
                <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
              </>
            )}
          </div>
        </Button>
      </div>
      
      {/* Professional tips */}
      {!isReady && prompt.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <Sparkles className="w-4 h-4 inline mr-2 text-amber-600" />
            Add more details for professional-quality results
          </p>
        </div>
      )}
    </form>
  );
}
