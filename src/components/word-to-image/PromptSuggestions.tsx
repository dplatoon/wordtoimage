
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Wand2, Lightbulb, History, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { storageService } from '@/services/storageService';

interface PromptSuggestionsProps {
  currentPrompt: string;
  onSuggestionSelect: (suggestion: string) => void;
  onPromptImprove: (improvedPrompt: string) => void;
  className?: string;
}

export function PromptSuggestions({ 
  currentPrompt, 
  onSuggestionSelect, 
  onPromptImprove,
  className 
}: PromptSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]);

  useEffect(() => {
    // Load recent prompts from storage
    const history = storageService.getSearchHistory();
    setRecentPrompts(history.slice(0, 3));

    // Generate suggestions based on current prompt
    if (currentPrompt.length > 10) {
      generateSmartSuggestions(currentPrompt);
    } else {
      setSuggestions([]);
    }

    // Set popular keywords
    setPopularKeywords([
      'photorealistic', 'cinematic lighting', 'ultra detailed', 'masterpiece',
      'trending on artstation', 'digital art', 'fantasy art', 'concept art'
    ]);
  }, [currentPrompt]);

  const generateSmartSuggestions = (prompt: string) => {
    const improvements = [];
    
    // Style improvements
    if (!prompt.toLowerCase().includes('style')) {
      improvements.push(`${prompt}, photorealistic style`);
      improvements.push(`${prompt}, digital art style`);
    }
    
    // Lighting improvements
    if (!prompt.toLowerCase().includes('lighting')) {
      improvements.push(`${prompt}, cinematic lighting`);
      improvements.push(`${prompt}, soft natural lighting`);
    }
    
    // Quality improvements
    if (!prompt.toLowerCase().includes('detailed')) {
      improvements.push(`${prompt}, ultra detailed, 8k quality`);
    }
    
    setSuggestions(improvements.slice(0, 4));
  };

  const handleKeywordAdd = (keyword: string) => {
    const newPrompt = currentPrompt ? `${currentPrompt}, ${keyword}` : keyword;
    onPromptImprove(newPrompt);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Smart Improvements */}
      {suggestions.length > 0 && (
        <Card className="border-violet-200 bg-violet-50">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Lightbulb className="h-4 w-4 text-violet-600 mr-2" />
              <h4 className="text-sm font-medium text-violet-800">Smart Improvements</h4>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => onPromptImprove(suggestion)}
                  className="w-full text-left justify-start h-auto p-2 text-sm text-gray-700 hover:bg-white hover:text-violet-700"
                >
                  <Wand2 className="h-3 w-3 mr-2 text-violet-500" />
                  {suggestion.length > 60 ? `${suggestion.substring(0, 60)}...` : suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Prompts */}
      {recentPrompts.length > 0 && (
        <div>
          <div className="flex items-center mb-2">
            <History className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Recent Prompts</span>
          </div>
          <div className="space-y-1">
            {recentPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionSelect(prompt)}
                className="w-full text-left justify-start h-auto p-2 text-sm"
              >
                {prompt.length > 50 ? `${prompt.substring(0, 50)}...` : prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Keywords */}
      <div>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Popular Keywords</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {popularKeywords.map((keyword, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-violet-100 hover:text-violet-700 text-xs"
              onClick={() => handleKeywordAdd(keyword)}
            >
              + {keyword}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
