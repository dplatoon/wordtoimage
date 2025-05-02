
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
          </Button> for unlimited generations.</span>
        ) : (
          <span>{remainingGenerations} free {remainingGenerations === 1 ? 'generation' : 'generations'} remaining</span>
        )}
      </p>
    </div>
  );
};
