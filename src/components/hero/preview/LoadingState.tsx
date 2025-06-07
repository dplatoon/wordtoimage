
import { Progress } from '@/components/ui/progress';
import { Sparkles, Wand2 } from 'lucide-react';

interface LoadingStateProps {
  progress: number;
}

export const LoadingState = ({ progress }: LoadingStateProps) => {
  return (
    <div className="text-center px-4 w-full h-full flex flex-col items-center justify-center">
      <div className="relative mb-6">
        {/* Animated magic circle */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin" 
               style={{ borderTopColor: '#3B82F6', animationDuration: '2s' }} />
          <div className="absolute inset-2 rounded-full border-4 border-purple-200 animate-spin" 
               style={{ borderTopColor: '#8B5CF6', animationDuration: '1.5s', animationDirection: 'reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Wand2 className="h-8 w-8 text-indigo-600 animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 w-full max-w-xs">
        <h3 className="text-xl font-semibold text-gray-800">Creating Your Vision</h3>
        <p className="text-gray-600 text-sm">Our AI is crafting something extraordinary...</p>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-2 bg-gray-200" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Processing...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-1 text-xs text-gray-400 mt-4">
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Usually takes 3-5 seconds</span>
          <Sparkles className="h-3 w-3 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
