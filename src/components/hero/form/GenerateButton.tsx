
import React from 'react';
import { Wand2, Sparkles } from 'lucide-react';

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
    <div className="relative mt-6">
      <button
        type="submit"
        disabled={isGenerating || isDisabled}
        className={`group relative w-full flex items-center justify-center rounded-xl py-5 text-white font-semibold text-lg transition-all duration-300 transform ${
          isGenerating || isDisabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
        } ${!isGenerating && !isDisabled ? 'animate-pulse' : ''}`}
      >
        {/* Animated background gradient */}
        {!isGenerating && !isDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        )}
        
        {isGenerating ? (
          <div className="flex items-center justify-center">
            <div className="relative mr-3">
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <Sparkles className="absolute inset-0 h-5 w-5 text-white/60 animate-pulse" />
            </div>
            <span>Creating Your Masterpiece...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Wand2 className="mr-3 h-5 w-5 group-hover:animate-bounce" />
            <span>Generate Amazing Art</span>
            <Sparkles className="ml-3 h-4 w-4 group-hover:animate-pulse" />
          </div>
        )}

        {/* Free generation badges */}
        {!user && generationCount < maxFreeGenerations && (
          <div className="absolute -top-3 -right-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {maxFreeGenerations - generationCount} FREE
            </div>
          </div>
        )}
        
        {user && typeof dailyGenerationsLeft !== 'undefined' && dailyGenerationsLeft > 0 && (
          <div className="absolute -top-3 -right-3">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {dailyGenerationsLeft} {isFirstDay ? 'TODAY' : 'LEFT'}
            </div>
          </div>
        )}
      </button>
      
      {/* Progress indicator during generation */}
      {isGenerating && (
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" 
               style={{ width: '100%', animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      )}
    </div>
  );
};
