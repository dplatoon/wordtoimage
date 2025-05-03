
import React from 'react';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
}

export function PromptInput({ prompt, onPromptChange }: PromptInputProps) {
  const MAX_LENGTH = 1000;
  
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-1 rounded-xl">
        <Input 
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Describe your image..."
          maxLength={MAX_LENGTH}
          className="w-full border-blue-100 py-6 px-4 rounded-xl focus:border-blue-300 focus:ring-blue-200"
        />
      </div>
      
      {prompt.length === 0 && (
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
          <span className="animate-pulse">✨</span>
          <span className="ml-1 text-sm">Write a detailed description</span>
        </div>
      )}
      
      <div className="mt-2 flex justify-end">
        <span className="text-sm text-blue-500 font-medium">
          {prompt.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
