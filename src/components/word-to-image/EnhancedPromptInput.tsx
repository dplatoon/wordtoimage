
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Wand2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb,
  Palette,
  Type,
  ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PromptSuggestions } from './PromptSuggestions';
import { StylePreview } from './StylePreview';

interface EnhancedPromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  className?: string;
}

export function EnhancedPromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  className
}: EnhancedPromptInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(prompt.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, [prompt]);

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleStyleCombine = (styles: string[]) => {
    const stylePrompts = styles.map(styleId => styleId.replace('-', ' ')).join(', ');
    const newPrompt = prompt ? `${prompt}, ${stylePrompts}` : stylePrompts;
    onPromptChange(newPrompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        onGenerate();
      }
    }
  };

  const getPromptQuality = () => {
    if (wordCount < 3) return { level: 'poor', color: 'text-red-600', message: 'Too short - add more details' };
    if (wordCount < 8) return { level: 'fair', color: 'text-yellow-600', message: 'Good start - consider adding style details' };
    if (wordCount < 15) return { level: 'good', color: 'text-blue-600', message: 'Great detail level' };
    return { level: 'excellent', color: 'text-green-600', message: 'Excellent detail level' };
  };

  const quality = getPromptQuality();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Prompt Input */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Input Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="h-5 w-5 text-violet-600" />
                <h3 className="text-lg font-semibold text-gray-800">Describe Your Vision</h3>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className={cn("font-medium", quality.color)}>
                  {wordCount} words • {quality.message}
                </span>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Describe what you want to create... Be specific about style, colors, mood, and composition for best results."
                className="min-h-24 text-base resize-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                disabled={isGenerating}
              />
              
              {/* Character limit indicator */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {prompt.length}/1000
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  Suggestions
                  {showSuggestions ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStyles(!showStyles)}
                  className="flex items-center gap-2"
                >
                  <Palette className="h-4 w-4" />
                  Styles
                  {selectedStyles.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 text-xs">
                      {selectedStyles.length}
                    </Badge>
                  )}
                  {showStyles ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
              </div>

              <Button
                onClick={onGenerate}
                disabled={!prompt.trim() || isGenerating}
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>

            {/* Keyboard Shortcut Hint */}
            <div className="text-xs text-gray-500 text-center">
              Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+Enter</kbd> to generate quickly
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions Panel */}
      <Collapsible open={showSuggestions} onOpenChange={setShowSuggestions}>
        <CollapsibleContent className="space-y-0">
          <Card className="border-violet-200">
            <CardContent className="p-4">
              <PromptSuggestions
                currentPrompt={prompt}
                onSuggestionSelect={onPromptChange}
                onPromptImprove={onPromptChange}
              />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Styles Panel */}
      <Collapsible open={showStyles} onOpenChange={setShowStyles}>
        <CollapsibleContent className="space-y-0">
          <Card className="border-indigo-200">
            <CardContent className="p-4">
              <StylePreview
                selectedStyles={selectedStyles}
                onStyleToggle={handleStyleToggle}
                onStyleCombine={handleStyleCombine}
              />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
