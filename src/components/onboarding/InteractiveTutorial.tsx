import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  MousePointer, 
  Type, 
  Palette,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: 'click' | 'input' | 'hover' | 'scroll';
  expectedValue?: string;
  icon: React.ReactNode;
  tip?: string;
}

interface InteractiveTutorialProps {
  isActive: boolean;
  onClose: () => void;
  onComplete: () => void;
  tutorialType: 'first_generation' | 'dashboard_tour' | 'advanced_features';
}

export const InteractiveTutorial = ({ 
  isActive, 
  onClose, 
  onComplete, 
  tutorialType 
}: InteractiveTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  const tutorials: Record<string, TutorialStep[]> = {
    first_generation: [
      {
        id: 'welcome',
        title: 'Welcome to Your First AI Image!',
        description: 'Let\'s create your first AI-generated image together.',
        target: 'body',
        position: 'center',
        icon: <Sparkles className="h-5 w-5" />,
        tip: 'Take your time - we\'ll guide you through everything!'
      },
      {
        id: 'prompt_input',
        title: 'Enter Your Creative Prompt',
        description: 'Start by describing what you want to create.',
        target: '[data-tutorial="prompt-input"]',
        position: 'bottom',
        action: 'input',
        icon: <Type className="h-5 w-5" />,
        tip: 'Try: "A sunset over a calm ocean with sailboats"'
      },
      {
        id: 'generate_button',
        title: 'Generate Your Image',
        description: 'Click the generate button to create your AI image.',
        target: '[data-tutorial="generate-button"]',
        position: 'top',
        action: 'click',
        icon: <Target className="h-5 w-5" />,
        tip: 'Your first generation is completely free!'
      }
    ],
    dashboard_tour: [
      {
        id: 'gallery_overview',
        title: 'Your Personal Gallery',
        description: 'Here you can view all your created images.',
        target: '[data-tutorial="image-gallery"]',
        position: 'bottom',
        icon: <Target className="h-5 w-5" />
      }
    ],
    advanced_features: [
      {
        id: 'batch_generation',
        title: 'Batch Generation',
        description: 'Generate multiple variations at once.',
        target: '[data-tutorial="batch-controls"]',
        position: 'bottom',
        icon: <Target className="h-5 w-5" />
      }
    ]
  };

  const currentTutorial = tutorials[tutorialType];
  const currentStepData = currentTutorial?.[currentStep];

  useEffect(() => {
    if (isActive) {
      trackEvent({
        action: 'tutorial_started',
        category: 'onboarding',
        label: tutorialType
      });
    }
  }, [isActive, tutorialType]);

  const handleNext = () => {
    if (currentStep < currentTutorial.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsStepCompleted(false);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    trackEvent({
      action: 'tutorial_skipped',
      category: 'onboarding',
      label: tutorialType
    });
    onClose();
  };

  if (!isActive || !currentStepData) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/60" />
      
      <Card 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto max-w-sm bg-white shadow-xl"
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="text-blue-600">{currentStepData.icon}</div>
              <Badge variant="outline" className="text-xs">
                {currentStep + 1} of {currentTutorial.length}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <h3 className="font-semibold text-lg mb-2">{currentStepData.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{currentStepData.description}</p>
          
          {currentStepData.tip && (
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-blue-800 text-xs font-medium">💡 Tip: {currentStepData.tip}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back
            </Button>
            
            <Button size="sm" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              {currentStep === currentTutorial.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};