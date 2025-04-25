
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  suggestions?: string[]; // Make suggestions optional
}

export function PromptInput({ prompt, onPromptChange, suggestions = [] }: PromptInputProps) {
  return (
    <div className="mb-6">
      <Input
        placeholder="e.g. A futuristic cityscape at dusk, watercolor style"
        value={prompt}
        onChange={e => onPromptChange(e.target.value)}
        className="w-full mb-2"
      />
      {suggestions.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 mb-2">
            {suggestions.map((s, i) => (
              <Button 
                key={i} 
                variant="outline" 
                size="sm" 
                onClick={() => onPromptChange(s)}
              >
                {s}
              </Button>
            ))}
          </div>
          <Select onValueChange={onPromptChange}>
            <SelectTrigger className="w-full mb-2">Choose a template</SelectTrigger>
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
