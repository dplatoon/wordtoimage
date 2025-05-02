
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface GenerateSectionProps {
  loading: boolean;
  progress: number;
  onGenerate: () => void;
  disabled: boolean;
}

export const GenerateSection = ({ loading, progress, onGenerate, disabled }: GenerateSectionProps) => {
  const [animateButton, setAnimateButton] = useState(false);
  const [showSuccessIndicator, setShowSuccessIndicator] = useState(false);
  
  // Handle button animation on hover
  const handleButtonHover = () => {
    if (!disabled && !loading) {
      setAnimateButton(true);
    }
  };
  
  const handleButtonLeave = () => {
    setAnimateButton(false);
  };
  
  // Show success indicator when generation completes
  useEffect(() => {
    if (progress >= 100 && loading === false) {
      setShowSuccessIndicator(true);
      const timer = setTimeout(() => {
        setShowSuccessIndicator(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress, loading]);

  return (
    <div className="mb-6">
      {loading && (
        <div className="mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100 shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="h-4 w-4 border-2 border-blue-200 border-b-blue-600 rounded-full animate-spin mr-2"></div>
              <span className="text-sm font-medium text-blue-800">AI is generating your image...</span>
            </div>
            <span className="text-sm font-bold bg-white px-2 py-0.5 rounded-full text-blue-700 shadow-sm">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-blue-200" 
            style={{
              "--progress-background": "linear-gradient(to right, #2563eb, #9333ea)",
            } as React.CSSProperties}
          />
          
          <div className="mt-2 text-xs text-blue-600 opacity-75 animate-pulse">
            {progress < 30 && "Analyzing your prompt..."}
            {progress >= 30 && progress < 60 && "Creating initial composition..."}
            {progress >= 60 && progress < 90 && "Adding details and refinements..."}
            {progress >= 90 && "Finalizing your image..."}
          </div>
        </div>
      )}
      
      <div className="relative">
        {showSuccessIndicator && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-md animate-fade-in flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Image generated successfully!
          </div>
        )}
        
        <Button 
          onClick={onGenerate} 
          disabled={disabled || loading} 
          className={cn(
            "w-full md:w-auto transition-all duration-500",
            disabled ? 'bg-gray-400' : 
              'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700',
            'px-6 py-6 h-auto rounded-xl shadow-md hover:shadow-lg',
            animateButton && !disabled && !loading ? 'scale-[1.03] shadow-blue-400/30' : '',
            "relative overflow-hidden"
          )}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          {/* Enhanced button background effects */}
          {!disabled && !loading && (
            <>
              <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className={`absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-purple-500/10 ${animateButton ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}></span>
            </>
          )}
          
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
              <span>Generating...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center font-medium text-lg">
              <Sparkles className={`mr-2 h-5 w-5 ${animateButton ? 'animate-pulse text-yellow-300' : ''}`} />
              Generate Image
            </span>
          )}
        </Button>
      </div>
      
      {!loading && !disabled && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Our AI will create your image in seconds
        </div>
      )}
    </div>
  );
};
