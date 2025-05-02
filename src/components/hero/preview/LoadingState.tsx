
import { Progress } from '@/components/ui/progress';

interface LoadingStateProps {
  progress: number;
}

export const LoadingState = ({ progress }: LoadingStateProps) => {
  return (
    <div className="text-center px-4 sm:px-8 w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative w-16 h-16 mb-4">
          {/* Simplified loading animation */}
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-blue-500 border-b-purple-500 border-l-indigo-500 border-r-indigo-300 animate-spin"></div>
        </div>
        <p className="text-gray-700 font-medium text-lg">Creating your masterpiece...</p>
        <div className="w-full max-w-[250px] mt-4">
          <div className="flex justify-between mb-1 text-xs text-gray-500">
            <span>Processing</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-xs text-gray-500 mt-3">This may take a few seconds</p>
      </div>
    </div>
  );
};
