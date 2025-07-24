import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, Lightbulb } from 'lucide-react';
import { useOnboarding } from './OnboardingManager';

interface TooltipStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: () => void;
}

const HOMEPAGE_STEPS: TooltipStep[] = [
  {
    id: 'hero-prompt',
    target: '[data-onboarding="hero-prompt"]',
    title: 'Start Here! 💡',
    content: 'Describe what you want to create. Try "a magical forest with glowing mushrooms"',
    position: 'bottom'
  },
  {
    id: 'style-gallery',
    target: '[data-onboarding="style-gallery"]',
    title: 'Choose Your Style 🎨',
    content: 'Click any style to instantly start creating with that artistic approach',
    position: 'top'
  },
  {
    id: 'showcase-clickable',
    target: '[data-onboarding="showcase-section"]',
    title: 'Get Inspired 🌟',
    content: 'Click any showcase image to use its prompt and style as your starting point',
    position: 'top'
  }
];

interface OnboardingTooltipsProps {
  pageType: 'homepage' | 'text-to-image' | 'gallery';
}

export const OnboardingTooltips = ({ pageType }: OnboardingTooltipsProps) => {
  const { hasCompletedWelcome, hasCompletedFirstGeneration } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const steps = pageType === 'homepage' ? HOMEPAGE_STEPS : [];

  useEffect(() => {
    // Show tooltips for new users who haven't completed first generation
    if (hasCompletedWelcome && !hasCompletedFirstGeneration && steps.length > 0) {
      // Delay to allow page to render
      setTimeout(() => {
        setIsVisible(true);
        findTargetElement(steps[0].target);
      }, 1500);
    }
  }, [hasCompletedWelcome, hasCompletedFirstGeneration, steps]);

  const findTargetElement = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    setTargetElement(element);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      findTargetElement(steps[nextStep].target);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      findTargetElement(steps[prevStep].target);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Mark tooltips as seen
    localStorage.setItem('onboarding-tooltips-seen', 'true');
  };

  const getTooltipPosition = () => {
    if (!targetElement) return {};

    const rect = targetElement.getBoundingClientRect();
    const step = steps[currentStep];
    
    switch (step.position) {
      case 'top':
        return {
          top: rect.top - 10,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: rect.bottom + 10,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - 10,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + 10,
          transform: 'translate(0, -50%)'
        };
      default:
        return {};
    }
  };

  if (!isVisible || !targetElement || steps.length === 0) return null;

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" />
      
      {/* Highlight */}
      <div 
        className="fixed z-50 border-4 border-violet-400 rounded-lg pointer-events-none animate-pulse"
        style={{
          top: targetElement.getBoundingClientRect().top - 4,
          left: targetElement.getBoundingClientRect().left - 4,
          width: targetElement.getBoundingClientRect().width + 8,
          height: targetElement.getBoundingClientRect().height + 8,
        }}
      />

      {/* Tooltip */}
      <div 
        className="fixed z-50 w-80 max-w-sm"
        style={getTooltipPosition()}
      >
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-6 animate-scale-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-violet-500" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                {currentStepData.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {currentStepData.content}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-violet-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  className="text-xs"
                >
                  Previous
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNext}
                className="text-xs bg-violet-600 hover:bg-violet-700"
              >
                {currentStep === steps.length - 1 ? 'Got it!' : 'Next'}
                {currentStep !== steps.length - 1 && (
                  <ArrowRight className="ml-1 h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};