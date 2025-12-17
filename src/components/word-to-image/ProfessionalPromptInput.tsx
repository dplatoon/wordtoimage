
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
        <label htmlFor="professional-prompt" className="text-lg font-semibold text-foreground flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          Describe Your Vision
        </label>
        
        {isReady && (
          <div className="flex items-center text-green-500 animate-fade-in">
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
          "relative backdrop-blur-xl bg-card/30 rounded-2xl shadow-xl border transition-all duration-300",
          isFocused 
            ? "border-primary/50 shadow-2xl ring-4 ring-primary/20" 
            : "border-primary/20 hover:border-primary/30 hover:shadow-lg"
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
              "w-full resize-none border-0 bg-transparent px-6 py-5 text-base leading-relaxed placeholder:text-muted-foreground/70 focus:ring-0 focus-visible:ring-0 transition-all duration-200",
              isMobile ? "min-h-[120px] text-base" : "min-h-[140px]",
              "scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
            )}
            style={{ 
              minHeight: isMobile ? '120px' : '140px',
              maxHeight: '300px'
            }}
          />
          
          {/* Elegant bottom section */}
          <div className="flex items-center justify-between px-6 pb-4 pt-2 border-t border-primary/10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-muted-foreground">
                <Lightbulb className="w-4 h-4 mr-2 text-primary" />
                <span className={cn(
                  "font-medium",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {wordCount} words
                </span>
              </div>
              
              {!isReady && prompt.length > 0 && (
                <div className="flex items-center text-amber-500 animate-pulse">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                  <span className="text-sm">Add more details for better results</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span 
                className={cn(
                  "font-mono text-sm tabular-nums transition-colors",
                  prompt.length > MAX_LENGTH * 0.9 
                    ? "text-amber-500" 
                    : prompt.length === MAX_LENGTH 
                    ? "text-red-500" 
                    : "text-muted-foreground"
                )}
              >
                {prompt.length}/{MAX_LENGTH}
              </span>
              
              {prompt.length > 0 && (
                <div className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  isReady ? "bg-green-500" : "bg-muted-foreground/30"
                )} />
              )}
            </div>
          </div>
        </div>

        {/* Subtle glow effect when focused */}
        {isFocused && (
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-50 blur-xl -z-10 animate-pulse" />
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
                "group bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 rounded-full transition-all duration-200 flex items-center hover:shadow-md hover:-translate-y-0.5",
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
          <span className="inline-flex items-center text-xs text-muted-foreground bg-card/50 px-3 py-1 rounded-full border border-primary/20">
            <kbd className="bg-background px-2 py-0.5 rounded text-xs font-mono mr-2 border border-primary/20">⌘ + Enter</kbd>
            to generate instantly
          </span>
        </div>
      )}
    </div>
  );
}
