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
    <div className={cn("space-y-4", className)}>
      {/* Main Input Area */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused 
              ? "0 0 0 2px hsl(var(--primary) / 0.2), 0 8px 25px -8px hsl(var(--primary) / 0.3)"
              : "0 1px 3px 0 rgb(0 0 0 / 0.1)"
          }}
          className="relative bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your vision in detail... (e.g., A majestic watercolor painting of a peaceful forest at sunset, with golden light filtering through tall pine trees, soft brushstrokes, ethereal atmosphere)"
            className="w-full min-h-[120px] max-h-[200px] resize-none border-0 bg-transparent text-base leading-relaxed placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 p-6"
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
                  <p className="text-sm text-gray-400 max-w-md">
                    Be creative and detailed for best results
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Character Counter */}
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Wand2 className="h-3 w-3" />
            <span>Pro tip: Include style, mood, lighting, and composition details</span>
          </div>
          <span className={cn(
            "text-xs font-medium tabular-nums",
            isAtLimit ? "text-red-600" : 
            isNearLimit ? "text-amber-600" : "text-gray-500"
          )}>
            {characterCount}/{maxCharacters}
          </span>
        </div>
      </div>

      {/* Generate Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating || prompt.trim().length === 0}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5 mr-2" />
              </motion.div>
              Creating your image...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Create Your Free Image Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Keyboard Shortcut Hint */}
      <p className="text-xs text-center text-gray-400">
        Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl + Enter</kbd> to generate quickly
      </p>
    </div>
  );
}