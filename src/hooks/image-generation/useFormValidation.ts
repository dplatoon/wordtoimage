
import { useState } from 'react';
import { MAX_PROMPT_LENGTH } from '@/components/hero/constants';

export const useFormValidation = () => {
  const [prompt, setPrompt] = useState('');

  const canGenerate = !!prompt.trim() && prompt.length <= MAX_PROMPT_LENGTH;

  return {
    prompt,
    setPrompt,
    canGenerate
  };
};
