
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
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      onPromptChange(value);
    }
  };
  
  return (
    <div className="space-y-4">
      <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-700">
        Image Description
      </label>
      
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-1 rounded-xl shadow-sm">
        <Textarea 
          id="image-prompt"
          value={prompt} 
          onChange={handleChange}
          placeholder="A watercolor painting of a sunset over mountains with dramatic clouds..."
          maxLength={MAX_LENGTH} 
          className={cn(
            "w-full resize-y border-blue-100 px-4 rounded-xl focus:border-blue-300 focus:ring-blue-200 py-4 bg-white transition-all duration-200",
            isMobile ? "min-h-[120px] text-base" : "min-h-[140px]"
          )}
          aria-label="Image description"
          aria-describedby="prompt-help prompt-counter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              if (prompt.trim()) {
                const form = e.currentTarget.closest('form');
                if (form) {
                  form.requestSubmit();
                }
              }
            }
          }}
        />
      </div>
      
      {/* Help text and character counter with proper spacing */}
      <div className={cn(
        "flex justify-between items-start gap-4",
        isMobile ? "flex-col space-y-2" : "items-center"
      )}>
        <div className={cn(
          "text-gray-500 flex items-start flex-1",
          isMobile ? "text-xs" : "text-sm"
        )} id="prompt-help">
          <Sparkles className="h-3 w-3 mr-2 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
          <span className="leading-relaxed">
            {isMobile ? "Tip: " : "Pro tip: "}
            Include style, lighting, colors, and mood for amazing results
          </span>
        </div>
        
        <span 
          className={cn(
            "text-blue-600 font-medium tabular-nums flex-shrink-0",
            isMobile ? "text-xs self-end" : "text-sm",
            prompt.length > MAX_LENGTH * 0.9 && "text-amber-600",
            prompt.length === MAX_LENGTH && "text-red-600"
          )}
          id="prompt-counter"
          aria-label={`Character count: ${prompt.length} of ${MAX_LENGTH}`}
        >
          {prompt.length}/{MAX_LENGTH}
        </span>
      </div>
      
      {/* Style suggestions - only show when prompt is empty */}
      {prompt.length === 0 && (
        <div className={cn(
          "flex flex-wrap gap-2",
          isMobile ? "gap-1.5 mt-3" : "mt-4"
        )} role="group" aria-label="Quick style suggestions">
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
                "bg-blue-50 hover:bg-blue-100 text-blue-700 py-1.5 px-3 rounded-full flex items-center transition-all hover:shadow-sm border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                isMobile ? "text-xs py-1 px-2" : "text-sm"
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
