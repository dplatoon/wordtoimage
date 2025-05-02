import React from 'react';
import { Input } from '@/components/ui/input';
interface PromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
}
export const PromptInput = ({
  prompt,
  onChange
}: PromptInputProps) => {
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return <div className="mb-6 py-0">
      <h3 className="font-medium text-gray-800 mb-3">Creation Description</h3>
      <Input type="text" placeholder="Describe the picture in your dream, such as 'quiet riverside sunset'..." value={prompt} onChange={handlePromptChange} className="w-full border-gray-200 text-base mx-0 my-0 py-[47px] px-[71px] rounded-full" />
    </div>;
};