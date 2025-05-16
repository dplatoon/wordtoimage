
import React from 'react';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

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
  
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-1 rounded-xl">
        <div className="relative">
          <Textarea 
            value={prompt} 
            onChange={e => onPromptChange(e.target.value)} 
            placeholder="" 
            maxLength={MAX_LENGTH} 
            className="w-full min-h-[120px] resize-y border-blue-100 px-4 rounded-xl focus:border-blue-300 focus:ring-blue-200 py-3" 
          />
          
          {prompt.length === 0 && (
            <div className="absolute left-4 top-8 transform -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
              <span className="animate-pulse mr-2">✨</span>
              <span className="text-sm">Write a detailed description with style, composition, and lighting details...</span>
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
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <div className="mt-2 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Pro tip: Include details about style, lighting, and perspective for better results
        </div>
        <span className="text-sm text-blue-500 font-medium">
          {prompt.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
