
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

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
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 mr-2">Generating image...</span>
            <span className="text-sm font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <Button 
        onClick={onGenerate} 
        disabled={disabled || loading} 
        className="w-full md:w-auto"
      >
        {loading ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Generating...
          </span>
        ) : 'Generate Image'}
      </Button>
    </div>
  );
};
