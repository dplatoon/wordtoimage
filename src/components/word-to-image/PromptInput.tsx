
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HelpCircle, Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  suggestions?: string[]; // Make suggestions optional
}

export function PromptInput({ prompt, onPromptChange, suggestions = [] }: PromptInputProps) {
  const [showHint, setShowHint] = useState(false);
  
  const promptPlaceholder = "e.g. A futuristic cityscape at dusk, watercolor style";
  
  // High-quality prompt examples for better results
  const promptTips = [
    "Add style descriptors like 'digital art', 'oil painting', or 'photorealistic'",
    "Include lighting details like 'soft golden light' or 'dramatic shadows'",
    "Specify camera perspective like 'aerial view' or 'close-up'"
  ];

  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <h3 className="font-medium text-gray-900 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
            Describe your image
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 ml-2" 
                  onClick={() => setShowHint(!showHint)}
                >
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                  <span className="sr-only">Prompt writing tips</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm p-3">
                <div>
                  <h4 className="font-medium mb-2">Tips for better results:</h4>
                  <ul className="space-y-1">
                    {promptTips.map((tip, i) => (
                      <li key={i} className="text-sm flex items-start">
                        <span className="text-blue-500 mr-2">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <span className="text-xs text-gray-500">{prompt.length}/1000</span>
        </div>
      </div>
      
      <div className="relative">
        <Input
          placeholder={promptPlaceholder}
          value={prompt}
          onChange={e => onPromptChange(e.target.value)}
          className="w-full pr-4 py-6 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm transition-all"
        />
        {prompt.length === 0 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center text-sm pointer-events-none">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </div>
        )}
      </div>
      
      {showHint && (
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-800 animate-fade-in">
          <strong>Pro tip:</strong> Be specific with details like style, lighting, and perspective to get better results.
        </div>
      )}
      
      {suggestions.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 mb-2">
            {suggestions.map((s, i) => (
              <Button 
                key={i} 
                variant="outline" 
                size="sm" 
                onClick={() => onPromptChange(s)}
                className="bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                {s}
              </Button>
            ))}
          </div>
          <Select onValueChange={onPromptChange}>
            <SelectTrigger className="w-full mb-2 border-gray-200">
              <SelectValue placeholder="Choose a template prompt" />
            </SelectTrigger>
            <SelectContent>
              {suggestions.map((s, i) => (
                <SelectItem key={i} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
}
