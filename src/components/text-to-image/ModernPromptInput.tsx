import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, ArrowRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VoiceInput } from '@/components/VoiceInput';

interface ModernPromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
}

const QUICK_PROMPTS = [
  "A dreamy sunset over mountains",
  "Futuristic cityscape at night",
  "Magical forest with glowing mushrooms",
  "Abstract art with vibrant colors",
];

export function ModernPromptInput({
  prompt,
  onChange,
  onGenerate,
  isGenerating,
  canGenerate
}: ModernPromptInputProps) {
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
  const isReady = prompt.trim().length >= 10;

  return (
    <div className="space-y-6" role="group" aria-labelledby="prompt-input-label">
      {/* Hidden label for screen readers */}
      <label id="prompt-input-label" className="sr-only">
        Describe your image prompt
      </label>
      
      {/* Input Container */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused 
              ? "0 0 30px -5px hsl(var(--primary) / 0.3)"
              : "0 0 0 0 transparent"
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative rounded-2xl border-2 transition-colors duration-200 overflow-hidden",
            isFocused 
              ? "border-primary/40 bg-background/80 backdrop-blur-xl" 
              : "border-primary/20 bg-background/60 backdrop-blur-xl hover:border-primary/30"
          )}
        >
          {/* Gradient Border Effect */}
          {isFocused && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-neon-cyan/5 pointer-events-none" aria-hidden="true" />
          )}

          <Textarea
            ref={textareaRef}
            id="prompt-input"
            aria-labelledby="prompt-input-label"
            aria-describedby="character-count"
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your vision in detail... (e.g., A majestic watercolor painting of mountains at golden hour)"
            className={cn(
              "relative w-full min-h-[140px] max-h-[200px] resize-none border-0 bg-transparent",
              "text-base md:text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/60",
              "focus-visible:ring-0 focus-visible:ring-offset-0 p-5 md:p-6"
            )}
            maxLength={maxCharacters}
          />
          
          {/* Empty State Hint */}
          <AnimatePresence>
            {prompt.length === 0 && !isFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none p-6"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 mb-3">
                    <Wand2 className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Start typing to bring your ideas to life
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-primary/10 bg-background/40">
            <div className="flex items-center gap-3">
              <VoiceInput 
                onTranscript={(text) => onChange(prompt ? `${prompt} ${text}` : text)}
                disabled={isGenerating}
              />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lightbulb className="h-4 w-4 text-primary/60" />
                <span className="text-sm hidden sm:inline">Voice or type</span>
              </div>
              {isReady && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 text-primary"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                  <span className="text-sm font-medium">Ready</span>
                </motion.div>
              )}
            </div>
            <span 
              id="character-count"
              aria-live="polite"
              aria-atomic="true"
              className={cn(
                "text-sm font-mono tabular-nums",
                isAtLimit ? "text-destructive" : 
                isNearLimit ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="sr-only">{characterCount} of {maxCharacters} characters used</span>
              <span aria-hidden="true">{characterCount}/{maxCharacters}</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Quick Prompts */}
      <AnimatePresence>
        {prompt.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            <span className="text-sm text-muted-foreground mr-2">Try:</span>
            {QUICK_PROMPTS.map((quickPrompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onChange(quickPrompt)}
                aria-label={`Use prompt: ${quickPrompt}`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm",
                  "bg-background/60 backdrop-blur-sm hover:bg-background/80 border border-primary/20 hover:border-primary/40",
                  "text-muted-foreground hover:text-foreground transition-all duration-200",
                  "hover:shadow-neon focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                {quickPrompt.length > 25 ? quickPrompt.slice(0, 25) + '...' : quickPrompt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate Button */}
      <motion.div
        whileHover={{ scale: canGenerate && !isGenerating ? 1.01 : 1 }}
        whileTap={{ scale: canGenerate && !isGenerating ? 0.99 : 1 }}
      >
        <Button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          variant="neon"
          size="lg"
          className={cn(
            "w-full h-14 md:h-16 text-base md:text-lg font-semibold rounded-2xl",
            "transition-all duration-300"
          )}
        >
          {isGenerating ? (
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <span>Creating your masterpiece...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Wand2 className="h-5 w-5" />
              <span>Generate Image</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          )}
        </Button>
      </motion.div>

      {/* Keyboard Hint */}
      <p className="text-center text-sm text-muted-foreground hidden md:block">
        Press <kbd className="px-2 py-0.5 rounded bg-muted border border-border text-xs font-mono">⌘ + Enter</kbd> to generate
      </p>
    </div>
  );
}
