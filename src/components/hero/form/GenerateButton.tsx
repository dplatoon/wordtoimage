
import React from 'react';

interface GenerateButtonProps {
  isGenerating: boolean;
  isDisabled: boolean;
  generationCount: number;
  maxFreeGenerations: number;
  user: any;
  dailyGenerationsLeft?: number;
  isFirstDay?: boolean;
}

export const GenerateButton = ({
  isGenerating,
  isDisabled,
  generationCount,
  maxFreeGenerations,
  user,
  dailyGenerationsLeft,
  isFirstDay
}: GenerateButtonProps) => {
  return (
    <div className="relative mt-4">
      <button
        type="submit"
        disabled={isGenerating || isDisabled}
        className={`w-full flex items-center justify-center rounded-lg py-4 md:py-6 text-white font-medium text-lg transition-all duration-300
          ${isGenerating || isDisabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
          }`}
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
            {user && typeof dailyGenerationsLeft !== 'undefined' && dailyGenerationsLeft > 0 && (
              <div className="absolute top-0 right-4 -mt-2.5">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800 border border-violet-200">
                  {dailyGenerationsLeft} free {isFirstDay ? `(first day)` : ''}
                </span>
              </div>
            )}
            <span>Start Creating</span>
          </>
        )}
      </button>
    </div>
  );
};
