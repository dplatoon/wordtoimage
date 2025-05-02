
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerateSectionProps {
  loading: boolean;
  progress: number;
  onGenerate: () => void;
  disabled: boolean;
}

export const GenerateSection = ({ loading, progress, onGenerate, disabled }: GenerateSectionProps) => {
  return (
    <div className="mb-6">
      {loading && (
        <div className="mb-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="h-4 w-4 border-2 border-blue-200 border-b-blue-600 rounded-full animate-spin mr-2"></div>
              <span className="text-sm font-medium text-blue-800">AI is generating your image...</span>
            </div>
            <span className="text-sm font-bold bg-white px-2 py-0.5 rounded-full text-blue-700">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-blue-200" 
            // Instead of using indicatorClassName, we can style the indicator using CSS variables
            style={{
              "--progress-background": "linear-gradient(to right, #2563eb, #9333ea)",
            } as React.CSSProperties}
          />
        </div>
      )}
      
      <Button 
        onClick={onGenerate} 
        disabled={disabled || loading} 
        className={`w-full md:w-auto transition-all ${disabled ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} px-6 py-6 h-auto rounded-xl shadow-md hover:shadow-lg`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
            Generating...
          </span>
        ) : (
          <span className="flex items-center justify-center font-medium text-lg">
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Image
          </span>
        )}
      </Button>
      
      {!loading && !disabled && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Our AI will create your image in seconds
        </div>
      )}
    </div>
  );
};
