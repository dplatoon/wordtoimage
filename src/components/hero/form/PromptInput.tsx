
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Highlighter, Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
}

export const PromptInput = ({
  prompt,
  onChange
}: PromptInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Prevent layout shifts by setting dimensions early
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          // Make sure the height doesn't change unexpectedly
          const inputElement = entry.target as HTMLElement;
          if (inputElement.style.minHeight === '') {
            inputElement.style.minHeight = `${entry.contentRect.height}px`;
          }
        }
      }
    });
    if (inputRef.current) {
      resizeObserver.observe(inputRef.current);
    }
    return () => {
      if (inputRef.current) {
        resizeObserver.unobserve(inputRef.current);
      }
    };
  }, []);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-lg">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
          <Highlighter className="w-4 h-4 text-white" />
        </div>
        Describe Your Vision
      </h3>
      
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-1 rounded-xl shadow-sm border border-blue-100">
          <Input 
            ref={inputRef}
            type="text" 
            placeholder="A majestic sunset over snow-capped mountains, with golden light reflecting on a crystal-clear lake..."
            value={prompt} 
            onChange={handlePromptChange}
            aria-label="Image description"
            className="w-full border-0 text-base rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all duration-200 placeholder:text-gray-400"
          />
        </div>
        
        {prompt.length === 0 && (
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center text-sm pointer-events-none">
            <Sparkles className="animate-pulse h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Be creative and detailed</span>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="text-gray-600 flex items-center">
          <Sparkles className="h-3 w-3 mr-1 text-blue-500" />
          <span className="hidden sm:inline">Pro tip: Include style, mood, lighting, and composition details</span>
          <span className="sm:hidden">Add style, mood & lighting details</span>
        </div>
        <span className={`font-medium tabular-nums ${
          prompt.length > 800 ? 'text-amber-600' : 
          prompt.length > 950 ? 'text-red-600' : 'text-blue-600'
        }`}>
          {prompt.length}/1000
        </span>
      </div>
    </div>
  );
};
