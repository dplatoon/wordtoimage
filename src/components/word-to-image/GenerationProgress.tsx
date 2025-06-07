
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Wand2, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerationProgressProps {
  isGenerating: boolean;
  progress?: number;
  currentPrompt?: string;
  estimatedTime?: number;
}

const generationSteps = [
  { label: 'Processing prompt', icon: Wand2 },
  { label: 'AI analysis', icon: Sparkles },
  { label: 'Creating image', icon: Clock },
  { label: 'Finalizing', icon: CheckCircle }
];

export function GenerationProgress({ 
  isGenerating, 
  progress = 0, 
  currentPrompt = '',
  estimatedTime = 5 
}: GenerationProgressProps) {
  if (!isGenerating) return null;

  const currentStep = Math.floor((progress / 100) * generationSteps.length);
  
  return (
    <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-blue-50">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Creating Your Masterpiece
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              "{currentPrompt}"
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={progress} 
              className="h-3 bg-white shadow-inner"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Processing...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {generationSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={step.label}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-lg transition-all duration-300",
                    isActive ? "bg-violet-100 border border-violet-300" : 
                    isCompleted ? "bg-green-50 border border-green-200" : 
                    "bg-white border border-gray-200"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 mb-1",
                    isActive ? "text-violet-600 animate-pulse" :
                    isCompleted ? "text-green-600" :
                    "text-gray-400"
                  )} />
                  <span className={cn(
                    "text-xs font-medium text-center",
                    isActive ? "text-violet-800" :
                    isCompleted ? "text-green-800" :
                    "text-gray-500"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Estimated Time */}
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 bg-white rounded-full border border-violet-200">
              <Clock className="h-3 w-3 mr-1 text-violet-600" />
              <span className="text-xs text-gray-600">
                Usually takes {estimatedTime} seconds
              </span>
            </div>
          </div>

          {/* Animation Elements */}
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
