
import React from 'react';
import { Button } from '@/components/ui/button';

interface GenerateButtonProps {
  isGenerating: boolean;
  isDisabled: boolean;
  generationCount: number;
  maxFreeGenerations: number;
  user: any;
}

export const GenerateButton = ({
  isGenerating,
  isDisabled,
  generationCount,
  maxFreeGenerations,
  user
}: GenerateButtonProps) => {
  return (
    <div className="relative mt-4">
      <Button
        type="submit"
        disabled={isGenerating || isDisabled}
        className={`w-full flex items-center justify-center rounded-lg py-6 
          ${isGenerating ? 'bg-gray-200' : 'bg-violet-600 hover:bg-violet-700'}
          text-white font-medium text-lg`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-5 w-5 border-2 border-white/20 border-b-white/80 rounded-full animate-spin mr-2" />
            <span>Generating...</span>
          </span>
        ) : (
          <>
            {!user && generationCount < maxFreeGenerations && (
              <div className="absolute top-0 right-4 -mt-2.5">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800 border border-violet-200">
                  {maxFreeGenerations - generationCount}/{maxFreeGenerations} free
                </span>
              </div>
            )}
            <span>Create now</span>
          </>
        )}
      </Button>
    </div>
  );
};
