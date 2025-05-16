
import React from 'react';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  suggestions?: string[];
}

export function PromptInput({
  prompt,
  onPromptChange,
  suggestions
}: PromptInputProps) {
  const MAX_LENGTH = 1000;
  const isMobile = useIsMobile();
  
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-1 rounded-xl">
        <div className="relative">
          <Textarea 
            value={prompt} 
            onChange={e => onPromptChange(e.target.value)} 
            placeholder="" 
            maxLength={MAX_LENGTH} 
            className={cn(
              "w-full resize-y border-blue-100 px-4 rounded-xl focus:border-blue-300 focus:ring-blue-200 py-3",
              isMobile ? "min-h-[100px]" : "min-h-[120px]"
            )} 
          />
          
          {prompt.length === 0 && (
            <div className={cn(
              "absolute left-4 top-8 transform -translate-y-1/2 text-gray-400 flex items-center pointer-events-none",
              isMobile ? "flex-col items-start" : ""
            )}>
              <span className="animate-pulse mr-2">✨</span>
              <span className={cn(
                "text-sm",
                isMobile ? "text-xs mt-1" : ""
              )}>
                Write a detailed description with style, composition, and lighting details...
              </span>
            </div>
          )}
        </div>
      </div>
      
      {suggestions && suggestions.length > 0 && prompt.length === 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onPromptChange(suggestion)}
              className={cn(
                "bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded-full flex items-center",
                "transition-all hover:shadow-sm"
              )}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {suggestion.length > 20 ? suggestion.substring(0, 20) + '...' : suggestion}
            </button>
          ))}
        </div>
      )}
      
      <div className={cn(
        "mt-2 flex justify-between items-center",
        isMobile ? "flex-col items-start space-y-1" : ""
      )}>
        <div className={cn(
          "text-gray-500",
          isMobile ? "text-xs w-full" : "text-xs"
        )}>
          Pro tip: Include details about style, lighting, and perspective for better results
        </div>
        <span className={cn(
          "text-blue-500 font-medium",
          isMobile ? "text-xs" : "text-sm"
        )}>
          {prompt.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
