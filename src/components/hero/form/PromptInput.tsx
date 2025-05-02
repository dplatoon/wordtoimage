
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

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
    <div className="mb-4 py-0">
      <h3 className="font-medium text-gray-800 mb-2">Description</h3>
      <div className="relative my-0 py-0 px-0 mx-0">
        <Input 
          ref={inputRef}
          type="text" 
          placeholder="Describe your image..." 
          value={prompt} 
          onChange={handlePromptChange} 
          className="w-full border-gray-300 text-base rounded-xl mx-px my-0 px-4 py-6" 
          aria-label="Image description"
        />
      </div>
    </div>
  );
};
