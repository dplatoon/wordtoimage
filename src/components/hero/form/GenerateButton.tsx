
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
        className={`w-full flex items-center justify-center rounded-full py-6 
          ${isGenerating ? 'bg-gray-200' : 'bg-gradient-to-r from-blue-500 to-purple-600'}
          shadow-lg`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-5 w-5 border-2 border-blue-200 border-b-blue-600 rounded-full animate-spin mr-2" />
            <span className="text-gray-700">Generating...</span>
          </span>
        ) : (
          <>
            {!user && generationCount < maxFreeGenerations && (
              <div className="absolute top-0 right-4 -mt-2.5">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  {maxFreeGenerations - generationCount}/{maxFreeGenerations} free
                </span>
              </div>
            )}
            <span className="font-medium text-lg">Generate Image</span>
          </>
        )}
      </Button>
    </div>
  );
};
