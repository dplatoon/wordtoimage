
import { Progress } from '@/components/ui/progress';

interface LoadingStateProps {
  progress: number;
}

export const LoadingState = ({ progress }: LoadingStateProps) => {
  return (
    <div className="text-center px-4 w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
        </div>
        <p className="text-gray-700 font-medium text-base">Creating image...</p>
        <div className="w-full max-w-[250px] mt-3">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-xs text-gray-500 mt-2">Please wait</p>
      </div>
    </div>
  );
};
