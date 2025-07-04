import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Circle, 
  Star, 
  Palette, 
  Target, 
  Trophy,
  Gift,
  ArrowRight
} from 'lucide-react';
import { useOnboarding } from './OnboardingManager';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  current?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ProgressTrackerProps {
  userActivity?: {
    generationCount?: number;
    hasCompletedProfile?: boolean;
    hasExploredStyles?: boolean;
    hasSharedImage?: boolean;
    hasJoinedCommunity?: boolean;
  };
}

export const ProgressTracker = ({ userActivity = {} }: ProgressTrackerProps) => {
  const { hasCompletedWelcome, hasCompletedFirstGeneration, userProfile } = useOnboarding();

  const steps: ProgressStep[] = [
    {
      id: 'welcome',
      title: 'Complete Welcome Setup',
      description: 'Tell us about your goals and preferences',
      icon: <Star className="h-5 w-5" />,
      completed: hasCompletedWelcome,
      action: !hasCompletedWelcome ? {
        label: 'Start Setup',
        onClick: () => {
          // Trigger welcome flow
          window.location.reload(); // Simple approach - in production you'd use proper state management
        }
      } : undefined
    },
    {
      id: 'first_generation',
      title: 'Create Your First Image',
      description: 'Generate your first AI artwork',
      icon: <Palette className="h-5 w-5" />,
      completed: hasCompletedFirstGeneration || (userActivity.generationCount || 0) > 0,
      current: hasCompletedWelcome && !hasCompletedFirstGeneration,
      action: hasCompletedWelcome && !hasCompletedFirstGeneration ? {
        label: 'Create Image',
        onClick: () => {
          window.location.href = '/text-to-image';
        }
      } : undefined
    },
    {
      id: 'explore_styles',
      title: 'Explore Art Styles',
      description: 'Try different artistic styles',
      icon: <Target className="h-5 w-5" />,
      completed: userActivity.hasExploredStyles || false,
      current: hasCompletedFirstGeneration && !userActivity.hasExploredStyles,
      action: hasCompletedFirstGeneration && !userActivity.hasExploredStyles ? {
        label: 'Explore Styles',
        onClick: () => {
          window.location.href = '/style-gallery';
        }
      } : undefined
    },
    {
      id: 'complete_profile',
      title: 'Complete Your Profile',
      description: 'Add your personal information',
      icon: <Circle className="h-5 w-5" />,
      completed: userActivity.hasCompletedProfile || false,
      action: !userActivity.hasCompletedProfile ? {
        label: 'Complete Profile',
        onClick: () => {
          window.location.href = '/dashboard';
        }
      } : undefined
    },
    {
      id: 'share_creation',
      title: 'Share Your Creation',
      description: 'Share your AI art with the community',
      icon: <Gift className="h-5 w-5" />,
      completed: userActivity.hasSharedImage || false,
      action: !userActivity.hasSharedImage && (userActivity.generationCount || 0) > 0 ? {
        label: 'Share Image',
        onClick: () => {
          window.location.href = '/community';
        }
      } : undefined
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;
  const currentStep = steps.find(step => step.current);

  // Don't show tracker if user hasn't started onboarding
  if (!hasCompletedWelcome && (userActivity.generationCount || 0) === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Your Journey Progress
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {completedSteps}/{steps.length} Complete
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-blue-100" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Step Highlight */}
        {currentStep && (
          <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-blue-600">
                  {currentStep.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{currentStep.title}</h3>
                  <p className="text-sm text-gray-600">{currentStep.description}</p>
                </div>
              </div>
              {currentStep.action && (
                <Button 
                  size="sm" 
                  onClick={currentStep.action.onClick}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentStep.action.label}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* All Steps List */}
        <div className="space-y-2">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                step.completed 
                  ? 'bg-green-50 text-green-900' 
                  : step.current 
                    ? 'bg-blue-50 text-blue-900'
                    : 'bg-gray-50 text-gray-600'
              }`}
            >
              <div className={`${
                step.completed 
                  ? 'text-green-600' 
                  : step.current 
                    ? 'text-blue-600'
                    : 'text-gray-400'
              }`}>
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{step.title}</h4>
                <p className="text-xs opacity-75">{step.description}</p>
              </div>

              {step.action && !step.completed && !step.current && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={step.action.onClick}
                  className="text-xs"
                >
                  {step.action.label}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Completion Celebration */}
        {completedSteps === steps.length && (
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-bold">Congratulations! 🎉</h3>
            <p className="text-sm opacity-90">You've completed your onboarding journey!</p>
          </div>
        )}

        {/* Personalized Tips */}
        {userProfile && (
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 text-sm mb-1">
              💡 Tip for {userProfile.primaryGoal.replace('_', ' ')} users:
            </h4>
            <p className="text-xs text-purple-700">
              {userProfile.primaryGoal === 'business' && 
                'Try creating variations of successful images for A/B testing your marketing materials.'}
              {userProfile.primaryGoal === 'personal' && 
                'Experiment with different prompts to discover your unique artistic style.'}
              {userProfile.primaryGoal === 'creative' && 
                'Combine multiple art styles to create truly unique hybrid artworks.'}
              {userProfile.primaryGoal === 'content' && 
                'Use consistent visual themes across your generated images for brand cohesion.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};