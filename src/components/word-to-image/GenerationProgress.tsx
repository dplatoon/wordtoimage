
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GenerationStep {
  id: string;
  label: string;
  duration: number;
  completed: boolean;
}

interface GenerationProgressProps {
  isGenerating: boolean;
  currentPrompt: string;
  totalImages: number;
  completedImages: number;
  estimatedTime?: number;
}

const GENERATION_STEPS: GenerationStep[] = [
  { id: 'parsing', label: 'Parsing prompt', duration: 500, completed: false },
  { id: 'preparing', label: 'Preparing AI model', duration: 1000, completed: false },
  { id: 'generating', label: 'Generating image', duration: 3000, completed: false },
  { id: 'enhancing', label: 'Enhancing quality', duration: 1000, completed: false },
  { id: 'finalizing', label: 'Finalizing result', duration: 500, completed: false }
];

export function GenerationProgress({ 
  isGenerating, 
  currentPrompt, 
  totalImages, 
  completedImages,
  estimatedTime = 6
}: GenerationProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      setProgress(0);
      setElapsedTime(0);
      return;
    }

    const startTime = Date.now();
    let stepIndex = 0;
    let stepProgress = 0;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setElapsedTime(elapsed);

      // Calculate overall progress
      const totalDuration = GENERATION_STEPS.reduce((sum, step) => sum + step.duration, 0);
      let cumulativeDuration = 0;

      for (let i = 0; i <= stepIndex; i++) {
        if (i < stepIndex) {
          cumulativeDuration += GENERATION_STEPS[i].duration;
        } else {
          cumulativeDuration += stepProgress;
        }
      }

      const overallProgress = Math.min((cumulativeDuration / totalDuration) * 100, 95);
      setProgress(overallProgress);

      // Update step progress
      if (stepIndex < GENERATION_STEPS.length) {
        stepProgress += 50; // Increment step progress
        
        if (stepProgress >= GENERATION_STEPS[stepIndex].duration) {
          stepIndex++;
          stepProgress = 0;
          setCurrentStep(stepIndex);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating && completedImages === 0) return null;

  return (
    <AnimatePresence>
      {(isGenerating || completedImages > 0) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full"
        >
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isGenerating ? (
                      <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <h3 className="font-semibold text-gray-800">
                      {isGenerating ? 'Generating Your Images' : 'Generation Complete!'}
                    </h3>
                  </div>
                  
                  {totalImages > 1 && (
                    <Badge variant="secondary" className="text-sm">
                      {completedImages}/{totalImages} images
                    </Badge>
                  )}
                </div>

                {/* Current Prompt */}
                {currentPrompt && (
                  <div className="p-3 bg-white/60 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      <strong>Current:</strong> "{currentPrompt}"
                    </p>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-blue-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Generation Steps */}
                {isGenerating && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {GENERATION_STEPS.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all ${
                          index < currentStep
                            ? 'bg-green-100 text-green-800'
                            : index === currentStep
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : index === currentStep ? (
                          <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        ) : (
                          <div className="h-3 w-3 rounded-full border-2 border-current" />
                        )}
                        <span className="truncate">{step.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Time and Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {isGenerating
                        ? `${elapsedTime.toFixed(1)}s elapsed`
                        : `Completed in ${elapsedTime.toFixed(1)}s`
                      }
                    </span>
                  </div>
                  
                  {isGenerating && estimatedTime && (
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      <span>~{estimatedTime}s remaining</span>
                    </div>
                  )}
                </div>

                {/* Success message */}
                {!isGenerating && completedImages > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-sm text-green-800 font-medium">
                      🎉 Successfully generated {completedImages} image{completedImages !== 1 ? 's' : ''}!
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
