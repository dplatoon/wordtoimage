
import { Input } from '@/components/ui/input';
import { MAX_PROMPT_LENGTH } from '../constants';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
}

export const PromptInput = ({ prompt, onChange }: PromptInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.slice(0, MAX_PROMPT_LENGTH);
    onChange(val);
  };

  return (
    <div className="mb-2 relative">
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.01]' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 blur-sm transition-opacity duration-300 ${isFocused ? 'opacity-20' : ''}`}></div>
        <Input
          type="text"
          placeholder="A serene mountain lake at sunrise, ultra‑detailed HDR style"
          value={prompt}
          onChange={handlePromptChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pr-16 border-gray-300 focus:border-blue-500 shadow-sm py-6 text-base transition-shadow duration-300 focus:shadow-md focus:ring-2 focus:ring-blue-200 bg-white rounded-lg"
          maxLength={MAX_PROMPT_LENGTH}
          aria-label="Image prompt"
          autoFocus
        />
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white px-1 rounded flex items-center">
        <span className={`font-medium transition-colors duration-300 ${prompt.length > MAX_PROMPT_LENGTH * 0.8 ? 'text-amber-500' : ''}`}>
          {prompt.length}
        </span>
        <span>/</span>
        <span>{MAX_PROMPT_LENGTH}</span>
      </div>
      {prompt.length > 0 && prompt.length < 15 && (
        <div className="absolute left-3 -bottom-6 text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded-md flex items-center animate-fade-in">
          <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
          <span>Add more details for better results</span>
        </div>
      )}
    </div>
  );
};
