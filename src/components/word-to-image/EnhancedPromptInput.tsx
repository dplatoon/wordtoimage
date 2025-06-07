
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2, Lightbulb, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';

interface EnhancedPromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const promptEnhancers = [
  { label: 'Artistic Style', suggestions: ['watercolor', 'oil painting', 'digital art', 'photorealistic', 'minimalist'] },
  { label: 'Lighting', suggestions: ['golden hour', 'dramatic lighting', 'soft light', 'neon glow', 'natural daylight'] },
  { label: 'Mood', suggestions: ['serene', 'dramatic', 'mysterious', 'vibrant', 'peaceful'] },
  { label: 'Perspective', suggestions: ['close-up', 'wide angle', 'bird\'s eye view', 'low angle', 'macro'] }
];

const examplePrompts = [
  "A majestic mountain landscape at sunrise with mist rolling through the valleys",
  "A cozy reading nook with warm lighting, books, and a steaming cup of coffee",
  "A futuristic cityscape with flying cars and neon lights reflecting on wet streets",
  "A magical forest with glowing mushrooms and ethereal light filtering through trees"
];

export function EnhancedPromptInput({ prompt, onPromptChange, onGenerate, isGenerating }: EnhancedPromptInputProps) {
  const [showEnhancers, setShowEnhancers] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();
  const MAX_LENGTH = 1000;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const addToPrompt = (text: string) => {
    const separator = prompt.trim() ? ', ' : '';
    onPromptChange(prompt + separator + text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const copyExample = (example: string) => {
    onPromptChange(example);
    setShowExamples(false);
    toast.success('Example loaded!');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        onGenerate();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Prompt Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="enhanced-prompt" className="text-lg font-semibold text-gray-900 flex items-center">
            <Wand2 className="h-5 w-5 text-violet-600 mr-2" />
            Describe Your Vision
          </label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEnhancers(!showEnhancers)}
              className="text-xs"
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              {showEnhancers ? 'Hide' : 'Enhance'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExamples(!showExamples)}
              className="text-xs"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Examples
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-r from-violet-50 via-blue-50 to-violet-50 p-1 rounded-xl border border-violet-200">
            <Textarea
              ref={textareaRef}
              id="enhanced-prompt"
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="A watercolor painting of a sunset over mountains with dramatic clouds and golden light reflecting on a crystal-clear lake..."
              className={cn(
                "border-0 bg-white rounded-lg resize-none transition-all duration-200 focus:ring-2 focus:ring-violet-400 shadow-sm",
                isMobile ? "min-h-[120px] text-base px-4 py-3" : "min-h-[140px] px-4 py-3"
              )}
              maxLength={MAX_LENGTH}
            />
          </div>
          
          {/* Character Counter */}
          <div className="flex justify-between items-center mt-2 text-sm">
            <div className="text-gray-500 flex items-center">
              <Sparkles className="h-3 w-3 mr-1 text-violet-500" />
              {isMobile ? "Tip: " : "Pro tip: "}Be specific about style, colors, lighting, and mood
            </div>
            <span className={cn(
              "font-medium tabular-nums",
              prompt.length > MAX_LENGTH * 0.9 ? "text-amber-600" : "text-violet-600"
            )}>
              {prompt.length}/{MAX_LENGTH}
            </span>
          </div>
        </div>
      </div>

      {/* Prompt Enhancers */}
      {showEnhancers && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 animate-fade-in">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Enhancements</h3>
          <div className="space-y-3">
            {promptEnhancers.map((category) => (
              <div key={category.label}>
                <h4 className="text-xs text-gray-600 mb-1">{category.label}</h4>
                <div className="flex flex-wrap gap-1">
                  {category.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => addToPrompt(suggestion)}
                      className="text-xs h-7 px-2 hover:bg-violet-50 hover:border-violet-300"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example Prompts */}
      {showExamples && (
        <div className="bg-violet-50 rounded-xl p-4 border border-violet-200 animate-fade-in">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-violet-600" />
            Example Prompts
          </h3>
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <div 
                key={index}
                className="bg-white p-3 rounded-lg border border-violet-200 hover:border-violet-300 transition-colors cursor-pointer group"
                onClick={() => copyExample(example)}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">{example}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        disabled={!prompt.trim() || isGenerating || prompt.trim().length < 10}
        className={cn(
          "w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all duration-300",
          isMobile ? "py-4 text-base h-14" : "py-6 text-lg h-16"
        )}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin mr-3 h-5 w-5 border-b-2 border-white rounded-full" />
            Creating Your Vision...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Sparkles className="mr-3 h-5 w-5" />
            Generate Amazing Art
            <Wand2 className="ml-3 h-5 w-5" />
          </div>
        )}
      </Button>

      {/* Quick Tips */}
      {!prompt && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start">
            <Lightbulb className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">Writing Great Prompts</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start with the main subject or scene</li>
                <li>• Add artistic style (watercolor, photorealistic, etc.)</li>
                <li>• Include lighting details (golden hour, dramatic, soft)</li>
                <li>• Describe colors, mood, and composition</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
