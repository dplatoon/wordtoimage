
import { Input } from '@/components/ui/input';
import { MAX_PROMPT_LENGTH } from '../constants';

interface PromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
}

export const PromptInput = ({ prompt, onChange }: PromptInputProps) => {
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.slice(0, MAX_PROMPT_LENGTH);
    onChange(val);
  };

  return (
    <div className="mb-2 relative">
      <Input
        type="text"
        placeholder="A serene mountain lake at sunrise, ultra‑detailed HDR style"
        value={prompt}
        onChange={handlePromptChange}
        className="w-full pr-16 border-gray-300 focus:border-blue-500 shadow-sm py-6 text-base"
        maxLength={MAX_PROMPT_LENGTH}
        aria-label="Image prompt"
        autoFocus
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white px-1 rounded">
        {prompt.length}/{MAX_PROMPT_LENGTH}
      </div>
    </div>
  );
};
