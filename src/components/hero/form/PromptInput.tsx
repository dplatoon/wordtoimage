import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Highlighter } from 'lucide-react';
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
  return <div className="mb-6 py-0">
      <h3 className="font-medium text-gray-800 mb-2 flex items-center">
        <Highlighter className="w-4 h-4 mr-2 text-blue-500" />
        Description
      </h3>
      <div className="relative my-0 py-0 px-0 mx-0">
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-1 rounded-xl shadow-md">
          <Input ref={inputRef} type="text" placeholder="Describe your image..." value={prompt} onChange={handlePromptChange} aria-label="Image description" className="w-full border-blue-200 text-base rounded-xl mx-px my-0 px-4 py-6 focus:border-blue-400 focus:ring-blue-300 bg-cyan-400" />
        </div>
        
        {prompt.length === 0 && <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center text-sm pointer-events-none">
            <span className="animate-pulse">✨</span>
            <span className="ml-1">Write a detailed description</span>
          </div>}
      </div>
      
      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
        <span>Be specific with details like style, lighting, and perspective</span>
        <span className="font-medium text-blue-500">{prompt.length}/1000</span>
      </div>
    </div>;
};