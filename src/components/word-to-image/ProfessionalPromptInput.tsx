
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Lightbulb, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfessionalPromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function ProfessionalPromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating
}: ProfessionalPromptInputProps) {
  const MAX_LENGTH = 1000;
  const MIN_LENGTH = 15;
  const isMobile = useIsMobile();
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const wordCount = prompt.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isReady = prompt.trim().length >= MIN_LENGTH;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      onPromptChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (isReady && !isGenerating) {
        onGenerate();
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="professional-prompt" className="text-lg font-semibold text-gray-900 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          Describe Your Vision
        </label>
        
        {isReady && (
          <div className="flex items-center text-emerald-600 animate-fade-in">
            <Zap className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Ready to generate</span>
          </div>
        )}
      </div>
      
      <div className={cn(
        "relative group transition-all duration-300",
        isFocused && "transform scale-[1.01]"
      )}>
        {/* Premium glassmorphism container */}
        <div className={cn(
          "relative backdrop-blur-xl bg-gradient-to-r from-white/80 via-white/90 to-white/80 rounded-2xl shadow-xl border transition-all duration-300",
          isFocused 
            ? "border-violet-300 shadow-2xl ring-4 ring-violet-100" 
            : "border-gray-200 hover:border-violet-200 hover:shadow-lg"
        )}>
          <Textarea 
            ref={textareaRef}
            id="professional-prompt"
            value={prompt} 
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="A watercolor painting of a majestic sunset over snow-capped mountains, with golden light reflecting on a crystal-clear lake, painted in impressionist style with soft brushstrokes..."
            maxLength={MAX_LENGTH}
            className={cn(
              "w-full resize-none border-0 bg-transparent px-6 py-5 text-base leading-relaxed placeholder:text-gray-400 focus:ring-0 focus-visible:ring-0 transition-all duration-200",
              isMobile ? "min-h-[120px] text-base" : "min-h-[140px]",
              "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            )}
            style={{ 
              minHeight: isMobile ? '120px' : '140px',
              maxHeight: '300px'
            }}
          />
          
          {/* Elegant bottom section */}
          <div className="flex items-center justify-between px-6 pb-4 pt-2 border-t border-gray-100/50">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500">
                <Lightbulb className="w-4 h-4 mr-2 text-violet-500" />
                <span className={cn(
                  "font-medium",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {wordCount} words
                </span>
              </div>
              
              {!isReady && prompt.length > 0 && (
                <div className="flex items-center text-amber-600 animate-pulse">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2" />
                  <span className="text-sm">Add more details for better results</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span 
                className={cn(
                  "font-mono text-sm tabular-nums transition-colors",
                  prompt.length > MAX_LENGTH * 0.9 
                    ? "text-amber-600" 
                    : prompt.length === MAX_LENGTH 
                    ? "text-red-600" 
                    : "text-gray-500"
                )}
              >
                {prompt.length}/{MAX_LENGTH}
              </span>
              
              {prompt.length > 0 && (
                <div className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  isReady ? "bg-emerald-400" : "bg-gray-300"
                )} />
              )}
            </div>
          </div>
        </div>

        {/* Subtle glow effect when focused */}
        {isFocused && (
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-200 to-purple-200 rounded-2xl opacity-50 blur-xl -z-10 animate-pulse" />
        )}
      </div>
      
      {/* Professional quick suggestions */}
      {prompt.length === 0 && (
        <div className={cn(
          "flex flex-wrap gap-2 animate-fade-in",
          isMobile ? "gap-1.5" : "gap-2"
        )}>
          {[
            "watercolor landscape",
            "digital art portrait", 
            "oil painting still life",
            "minimalist architecture"
          ].map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onPromptChange(suggestion + ", ")}
              className={cn(
                "group bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 text-violet-700 border border-violet-200 hover:border-violet-300 rounded-full transition-all duration-200 flex items-center hover:shadow-md hover:-translate-y-0.5",
                isMobile ? "text-xs py-1.5 px-3" : "text-sm py-2 px-4"
              )}
            >
              <Sparkles className="w-3 h-3 mr-1.5 group-hover:animate-pulse" />
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Professional keyboard shortcut hint */}
      {prompt.length > 0 && isReady && (
        <div className="text-center">
          <span className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <kbd className="bg-white px-2 py-0.5 rounded text-xs font-mono mr-2">⌘ + Enter</kbd>
            to generate instantly
          </span>
        </div>
      )}
    </div>
  );
}
