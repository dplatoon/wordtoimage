
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ExamplePromptsSectionProps {
  onPromptSelect: (prompt: string) => void;
  isGenerating: boolean;
  generatedImagesCount: number;
}

export function ExamplePromptsSection({ onPromptSelect, isGenerating, generatedImagesCount }: ExamplePromptsSectionProps) {
  const isMobile = useIsMobile();

  const examplePrompts = [
    "A watercolor painting of a sunset over mountains with dramatic clouds",
    "Modern minimalist logo design for a tech startup, clean and professional",
    "Cozy coffee shop interior with warm lighting and wooden furniture",
    "Futuristic cityscape at night with neon lights and flying cars"
  ];

  if (isGenerating || generatedImagesCount > 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
        Need inspiration? Try these examples:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {examplePrompts.map((example, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect(example)}
            className="text-left p-3 text-xs text-gray-600 hover:bg-white hover:text-blue-600 rounded border border-transparent hover:border-blue-200 transition-all hover:shadow-sm"
            aria-label={`Use example prompt: ${example}`}
          >
            "{example}"
          </button>
        ))}
      </div>
    </div>
  );
}
