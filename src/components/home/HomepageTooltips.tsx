import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ArrowRight, Lightbulb, MousePointer } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface TooltipStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  highlight?: boolean;
}

const homepageSteps: TooltipStep[] = [
  {
    id: 'welcome',
    target: 'body',
    title: 'Welcome to WordToImage! 👋',
    content: 'Let\'s take a quick tour to help you create amazing AI art in minutes.',
    position: 'bottom'
  },
  {
    id: 'hero-prompt',
    target: '[data-tutorial="prompt-input"]',
    title: 'Start Here! 💡',
    content: 'Describe what you want to create. Try "a magical forest with glowing mushrooms" or "portrait of a cat in space suit"',
    position: 'bottom',
    highlight: true
  },
  {
    id: 'style-selector',
    target: '[data-tutorial="style-selector"]',
    title: 'Choose Your Style 🎨',
    content: 'Click any style to instantly start creating with that artistic approach. Each style gives unique results!',
    position: 'top',
    highlight: true
  },
  {
    id: 'showcase-examples',
    target: '[data-tutorial="showcase-section"]',
    title: 'Get Inspired 🌟',
    content: 'Click any showcase image to use its prompt and style as your starting point. Perfect for beginners!',
    position: 'top',
    highlight: true
  }
];

interface HomepageTooltipsProps {
  isActive?: boolean;
  onComplete?: () => void;
}

export const HomepageTooltips = ({ isActive = false, onComplete }: HomepageTooltipsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Check if tooltips have been seen before
  useEffect(() => {
    const seen = localStorage.getItem('homepage-tooltips-seen');
    if (seen) {
      setHasBeenSeen(true);
    }
  }, []);

  // Auto-start tooltips for new users
  useEffect(() => {
    if (isActive && !hasBeenSeen) {
      setTimeout(() => {
        startTour();
      }, 2000); // Wait 2 seconds after page load
    }
  }, [isActive, hasBeenSeen]);

  const startTour = () => {
    setCurrentStep(0);
    setIsVisible(true);
    findTargetElement(homepageSteps[0].target);
    
    trackEvent({
      action: 'homepage_tour_started',
      category: 'onboarding',
      label: 'new_user_guidance'
    });
  };

  const findTargetElement = (selector: string) => {
    if (selector === 'body') {
      setTargetElement(document.body);
      return;
    }
    
    const element = document.querySelector(selector) as HTMLElement;
    setTargetElement(element);
  };

  const handleNext = () => {
    if (currentStep < homepageSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      findTargetElement(homepageSteps[nextStep].target);
      
      trackEvent({
        action: 'homepage_tour_next',
        category: 'onboarding',
        label: `step_${nextStep}`
      });
    } else {
      completeTour();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      findTargetElement(homepageSteps[prevStep].target);
    }
  };

  const completeTour = () => {
    setIsVisible(false);
    localStorage.setItem('homepage-tooltips-seen', 'true');
    setHasBeenSeen(true);
    
    trackEvent({
      action: 'homepage_tour_completed',
      category: 'onboarding',
      label: 'guided_tour_finished'
    });
    
    onComplete?.();
  };

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem('homepage-tooltips-seen', 'true');
    setHasBeenSeen(true);
    
    trackEvent({
      action: 'homepage_tour_skipped',
      category: 'onboarding',
      label: `skipped_at_step_${currentStep}`
    });
  };

  const getTooltipPosition = () => {
    if (!targetElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const rect = targetElement.getBoundingClientRect();
    const step = homepageSteps[currentStep];
    const offset = 20;
    
    switch (step.position) {
      case 'top':
        return {
          top: rect.top - offset,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: rect.bottom + offset,
          left: rect.left + rect.width / 2,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - offset,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + offset,
          transform: 'translate(0, -50%)'
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  const getHighlightPosition = () => {
    if (!targetElement) return {};

    const rect = targetElement.getBoundingClientRect();
    return {
      top: rect.top - 8,
      left: rect.left - 8,
      width: rect.width + 16,
      height: rect.height + 16,
    };
  };

  if (!isVisible || !targetElement) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {hasBeenSeen && (
          <Button
            onClick={startTour}
            variant="outline"
            size="sm"
            className="bg-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Take Tour
          </Button>
        )}
      </div>
    );
  }

  const currentStepData = homepageSteps[currentStep];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" />
      
      {/* Highlight */}
      {currentStepData.highlight && targetElement !== document.body && (
        <div 
          className="fixed z-50 border-4 border-purple-400 rounded-lg pointer-events-none animate-pulse"
          style={getHighlightPosition()}
        />
      )}

      {/* Tooltip */}
      <Card 
        ref={tooltipRef}
        className="fixed z-50 w-80 max-w-sm shadow-2xl border-purple-200"
        style={getTooltipPosition()}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-500" />
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                {currentStep + 1} of {homepageSteps.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <h3 className="font-bold text-gray-900 mb-3 text-lg">
            {currentStepData.title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {currentStepData.content}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {homepageSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-purple-500' 
                      : index < currentStep
                      ? 'bg-purple-300'
                      : 'bg-gray-300'
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
                className="text-xs bg-purple-600 hover:bg-purple-700"
              >
                {currentStep === homepageSteps.length - 1 ? 'Finish Tour' : 'Next'}
                {currentStep !== homepageSteps.length - 1 && (
                  <ArrowRight className="ml-1 h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};