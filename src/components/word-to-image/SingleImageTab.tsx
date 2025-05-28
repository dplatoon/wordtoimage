
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Sparkles } from 'lucide-react';
import { PromptInput } from './PromptInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SingleImageTabProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  selectedStyles: string[];
  onSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
}

export function SingleImageTab({
  prompt,
  onPromptChange,
  selectedStyles,
  onSubmit,
  isGenerating
}: SingleImageTabProps) {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "space-y-6",
      isMobile && "space-y-4"
    )}>
      <div className="flex items-center">
        <Wand2 className="text-blue-600 mr-2 h-5 w-5" />
        <h2 className={cn(
          "font-medium text-gray-800",
          isMobile ? "text-lg" : "text-xl"
        )}>
          Describe Your Image
        </h2>
      </div>
      
      <form onSubmit={onSubmit} className={cn(
        "space-y-6",
        isMobile && "space-y-4"
      )}>
        <PromptInput 
          prompt={prompt}
          onPromptChange={onPromptChange}
        />
        
        {selectedStyles.length > 0 && (
          <div className={cn(
            "p-3 bg-blue-50 rounded-lg",
            isMobile && "p-2"
          )}>
            <p className={cn(
              "text-blue-700 mb-2",
              isMobile ? "text-xs" : "text-sm"
            )}>
              Selected styles will be applied: {selectedStyles.join(', ')}
            </p>
          </div>
        )}
        
        <Button
          type="submit"
          disabled={!prompt.trim() || isGenerating || prompt.trim().length < 10}
          className={cn(
            "w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-200",
            isMobile ? "py-4 text-base h-14 mt-6" : "py-6 text-lg h-16 mt-8"
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
      </form>
    </div>
  );
}
