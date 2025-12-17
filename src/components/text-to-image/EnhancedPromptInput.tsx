import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedPromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
  className?: string;
}

export function EnhancedPromptInput({
  prompt,
  onChange,
  onGenerate,
  isGenerating,
  canGenerate,
  className
}: EnhancedPromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (canGenerate && !isGenerating) {
        onGenerate();
      }
    }
  };

  const characterCount = prompt.length;
  const maxCharacters = 1000;
  const isNearLimit = characterCount > 800;
  const isAtLimit = characterCount >= maxCharacters;

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {/* Main Input Area - Mobile Optimized */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused 
              ? "0 0 0 2px hsl(var(--primary) / 0.2), 0 4px 20px -4px hsl(var(--primary) / 0.25)"
              : "0 1px 3px 0 rgb(0 0 0 / 0.1)"
          }}
          className="relative bg-card/30 backdrop-blur-xl rounded-lg sm:rounded-xl border border-primary/20 overflow-hidden"
        >
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your vision in detail... (e.g., A majestic watercolor painting of a peaceful forest at sunset)"
            className="w-full min-h-[100px] sm:min-h-[120px] max-h-[200px] resize-none border-0 bg-transparent text-sm sm:text-base leading-relaxed placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 p-4 sm:p-6"
            maxLength={maxCharacters}
          />
          
          {/* Floating Enhancements */}
          <AnimatePresence>
            {prompt.length === 0 && !isFocused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-6 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-primary/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground/70 max-w-md">
                    Be creative and detailed for best results
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Character Counter - Mobile Optimized */}
        <div className="flex items-center justify-between mt-2 px-1 sm:px-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground">
            <Wand2 className="h-3 w-3 flex-shrink-0" />
            <span className="hidden sm:inline">Pro tip: Include style, mood, lighting, and composition details</span>
            <span className="sm:hidden text-[10px]">Include style & details</span>
          </div>
          <span className={cn(
            "text-xs font-medium tabular-nums flex-shrink-0",
            isAtLimit ? "text-red-500" : 
            isNearLimit ? "text-amber-500" : "text-muted-foreground"
          )}>
            {characterCount}/{maxCharacters}
          </span>
        </div>
      </div>

      {/* Generate Button - Mobile Optimized */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating || prompt.trim().length === 0}
          size="lg"
          className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 touch-target"
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              </motion.div>
              <span className="text-sm sm:text-base">Creating your image...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">Create Your Free Image Now</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Keyboard Shortcut Hint - Hide on very small screens */}
      <p className="text-xs text-center text-muted-foreground hidden sm:block">
        Press <kbd className="px-1.5 py-0.5 bg-card/50 rounded text-xs border border-primary/20">Ctrl + Enter</kbd> to generate quickly
      </p>
    </div>
  );
}
