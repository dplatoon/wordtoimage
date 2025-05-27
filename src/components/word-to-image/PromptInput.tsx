
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
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
      <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-700 mb-2">
        Image Description
      </label>
      
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-1 rounded-xl shadow-sm">
        <div className="relative">
          <Textarea 
            id="image-prompt"
            value={prompt} 
            onChange={e => onPromptChange(e.target.value)} 
            placeholder="A watercolor painting of a sunset over mountains with dramatic clouds..."
            maxLength={MAX_LENGTH} 
            className={cn(
              "w-full resize-y border-blue-100 px-4 rounded-xl focus:border-blue-300 focus:ring-blue-200 py-3 bg-white transition-all duration-200",
              isMobile ? "min-h-[100px] text-base" : "min-h-[120px]"
            )}
            aria-label="Image description"
            aria-describedby="prompt-help prompt-counter"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (prompt.trim()) {
                  // Trigger parent form submission
                  const form = e.currentTarget.closest('form');
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }
            }}
          />
          
          {prompt.length === 0 && (
            <div className={cn(
              "absolute left-4 top-4 text-gray-400 flex items-start pointer-events-none transition-opacity duration-200",
              isMobile ? "flex-col" : ""
            )} aria-hidden="true">
              <span className="animate-pulse mr-2">✨</span>
              <div className={cn(
                "leading-relaxed",
                isMobile ? "text-sm mt-1" : "text-base"
              )}>
                <div className="font-medium mb-1">Be specific and creative! Try:</div>
                <div className="text-xs text-gray-500">
                  "A cozy coffee shop with warm lighting"<br/>
                  "Modern minimalist logo design"<br/>
                  "Futuristic cityscape at night"
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className={cn(
        "mt-2 flex justify-between items-center",
        isMobile ? "flex-col items-start space-y-1" : ""
      )}>
        <div className={cn(
          "text-gray-500 flex items-center",
          isMobile ? "text-xs w-full" : "text-sm"
        )} id="prompt-help">
          <Sparkles className="h-3 w-3 mr-1 text-blue-500" aria-hidden="true" />
          <span>
            {isMobile ? "Tip: " : "Pro tip: "}
            Include style, lighting, colors, and mood for amazing results
          </span>
        </div>
        <span 
          className={cn(
            "text-blue-600 font-medium tabular-nums",
            isMobile ? "text-xs" : "text-sm",
            prompt.length > MAX_LENGTH * 0.9 && "text-amber-600",
            prompt.length === MAX_LENGTH && "text-red-600"
          )}
          id="prompt-counter"
          aria-label={`Character count: ${prompt.length} of ${MAX_LENGTH}`}
        >
          {prompt.length}/{MAX_LENGTH}
        </span>
      </div>
      
      {/* Quick suggestion shortcuts with better accessibility */}
      {prompt.length === 0 && (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Quick style suggestions">
          {[
            "watercolor style",
            "photorealistic",
            "digital art",
            "minimalist design"
          ].map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onPromptChange(suggestion + " ")}
              className={cn(
                "bg-blue-50 hover:bg-blue-100 text-blue-700 py-1 px-3 rounded-full flex items-center transition-all hover:shadow-sm border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                isMobile ? "text-xs" : "text-sm"
              )}
              aria-label={`Add ${suggestion} to your prompt`}
            >
              <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
