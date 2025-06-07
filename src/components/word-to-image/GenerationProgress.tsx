
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Zap, Clock } from 'lucide-react';

interface GenerationProgressProps {
  isGenerating: boolean;
  progress?: number;
  estimatedTime?: number;
  currentStep?: string;
  queuePosition?: number;
}

export function GenerationProgress({ 
  isGenerating, 
  progress = 0, 
  estimatedTime = 10, 
  currentStep = "Initializing...", 
  queuePosition 
}: GenerationProgressProps) {
  if (!isGenerating) return null;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
              <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Creating Your Image
            </h3>
            <p className="text-gray-600 text-sm">
              {currentStep}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Time and Queue Info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>~{estimatedTime}s remaining</span>
            </div>
            
            {queuePosition && queuePosition > 1 && (
              <div className="flex items-center">
                <span>Queue position: {queuePosition}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-1 text-yellow-500" />
              <span>AI Processing</span>
            </div>
          </div>

          {/* Steps indicator */}
          <div className="mt-6 flex justify-center space-x-2">
            {['Processing', 'Generating', 'Finalizing'].map((step, index) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  progress > (index * 33) ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
