
import { Button } from '@/components/ui/button';

interface FreeGenerationCounterProps {
  generationCount: number;
  maxFreeGenerations: number;
  onSignUpClick: () => void;
}

export const FreeGenerationCounter = ({ 
  generationCount, 
  maxFreeGenerations,
  onSignUpClick 
}: FreeGenerationCounterProps) => {
  const remainingGenerations = maxFreeGenerations - generationCount;
  const isLimitReached = generationCount >= maxFreeGenerations;

  return (
    <div className="mt-2 text-center">
      <p className="text-xs text-gray-500">
        {isLimitReached ? (
          <span>Free limit reached. <Button 
            onClick={onSignUpClick}
            variant="link" 
            className="text-blue-600 hover:underline p-0 h-auto font-normal"
          >
            Sign up
          </Button> for 3 free generations on your first day, then 1 per day.</span>
        ) : (
          <span>{remainingGenerations} free {remainingGenerations === 1 ? 'generation' : 'generations'} remaining. Sign up for more daily free images.</span>
        )}
      </p>
    </div>
  );
};
