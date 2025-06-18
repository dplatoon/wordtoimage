
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Star, Users, Crown, ArrowRight, Gift } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  badge?: string;
}

interface SmartOnboardingFlowProps {
  trigger: 'first_generation' | 'quiz_complete' | 'multiple_generations' | 'feature_discovery';
  onComplete: (action: 'signup' | 'skip' | 'later') => void;
  userData?: {
    generationCount?: number;
    hasCompletedQuiz?: boolean;
    timeSpent?: number;
  };
}

export const SmartOnboardingFlow = ({ 
  trigger, 
  onComplete, 
  userData = {} 
}: SmartOnboardingFlowProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();

  // Don't show onboarding if user is already logged in
  if (user) {
    return null;
  }

  const getOnboardingSteps = (): OnboardingStep[] => {
    switch (trigger) {
      case 'first_generation':
        return [
          {
            id: 'save_creation',
            title: 'Save Your Amazing Creation!',
            description: 'Your AI-generated image is incredible! Create a free account to save it forever and access your personal gallery.',
            icon: <Sparkles className="h-6 w-6 text-purple-600" />,
            action: 'Save & Continue Creating',
            badge: 'Free Forever'
          },
          {
            id: 'unlock_features',
            title: 'Unlock More Creative Power',
            description: 'Get unlimited HD generations, advanced styles, and priority processing speed.',
            icon: <Crown className="h-6 w-6 text-gold-600" />,
            action: 'Start Free Trial'
          }
        ];
      
      case 'quiz_complete':
        return [
          {
            id: 'personalized_report',
            title: 'Get Your Personal Style DNA Report',
            description: 'Receive a detailed analysis of your design preferences and custom style recommendations.',
            icon: <Star className="h-6 w-6 text-blue-600" />,
            action: 'Get My Style Report',
            badge: 'Personalized'
          },
          {
            id: 'style_gallery',
            title: 'Access Premium Style Library',
            description: 'Unlock 500+ professional design styles curated just for your taste.',
            icon: <Gift className="h-6 w-6 text-purple-600" />,
            action: 'Unlock Premium Styles'
          }
        ];
      
      case 'multiple_generations':
        return [
          {
            id: 'join_community',
            title: 'Join 100k+ Creators',
            description: 'You\'re creating amazing art! Join our community of creators and never lose your work.',
            icon: <Users className="h-6 w-6 text-green-600" />,
            action: 'Join the Community',
            badge: 'Popular'
          }
        ];
      
      default:
        return [];
    }
  };

  const steps = getOnboardingSteps();

  useEffect(() => {
    // Track onboarding impression
    trackEvent({
      action: 'onboarding_shown',
      category: 'conversion',
      label: trigger,
      custom_parameters: { 
        step_count: steps.length,
        user_data: userData
      }
    });
  }, [trigger, steps.length, userData]);

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100);
  }, [currentStep, steps.length]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      trackEvent({
        action: 'onboarding_next',
        category: 'conversion',
        label: steps[currentStep].id
      });
    }
  };

  const handleAction = (action: string) => {
    trackEvent({
      action: 'onboarding_action',
      category: 'conversion',
      label: action,
      custom_parameters: { trigger, step: steps[currentStep].id }
    });
    
    setIsOpen(false);
    onComplete('signup');
  };

  const handleSkip = () => {
    trackEvent({
      action: 'onboarding_skipped',
      category: 'conversion',
      label: trigger,
      custom_parameters: { step: currentStep, total_steps: steps.length }
    });
    
    setIsOpen(false);
    onComplete('skip');
  };

  const handleLater = () => {
    trackEvent({
      action: 'onboarding_later',
      category: 'conversion',
      label: trigger
    });
    
    setIsOpen(false);
    onComplete('later');
  };

  if (steps.length === 0) return null;

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-bold">
              {currentStepData.title}
            </DialogTitle>
            {currentStepData.badge && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {currentStepData.badge}
              </Badge>
            )}
          </div>
          <Progress value={progress} className="w-full h-2" />
        </DialogHeader>

        <Card className="border-none shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full w-fit">
              {currentStepData.icon}
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Social proof for certain triggers */}
            {trigger === 'multiple_generations' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-sm text-blue-800">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">2,847 creators joined this week</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {currentStepData.action && (
                <Button 
                  onClick={() => handleAction(currentStepData.action!)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  {currentStepData.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              <div className="flex gap-2">
                {currentStep < steps.length - 1 ? (
                  <>
                    <Button variant="outline" onClick={handleNext} className="flex-1">
                      Next
                    </Button>
                    <Button variant="ghost" onClick={handleLater} className="flex-1">
                      Maybe Later
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" onClick={handleSkip} className="w-full">
                    Skip for Now
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
