import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Palette, 
  Camera, 
  Briefcase, 
  Heart, 
  Target, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeStep {
  id: string;
  title: string;
  description: string;
  type: 'welcome' | 'goal_selection' | 'experience_level' | 'interests' | 'personalization' | 'completion';
  icon?: React.ReactNode;
  options?: Array<{
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

interface UserProfile {
  primaryGoal: string;
  experienceLevel: string;
  interests: string[];
  name?: string;
  favoriteStyles: string[];
}

interface WelcomeFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserProfile) => void;
}

export const WelcomeFlow = ({ isOpen, onClose, onComplete }: WelcomeFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    primaryGoal: '',
    experienceLevel: '',
    interests: [],
    favoriteStyles: []
  });
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();

  const steps: WelcomeStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to WordToImage!',
      description: 'Let\'s personalize your AI art creation experience in just a few quick steps.',
      type: 'welcome',
      icon: <Sparkles className="h-8 w-8 text-purple-600" />
    },
    {
      id: 'goal_selection',
      title: 'What\'s your main goal?',
      description: 'Help us understand how you\'ll use AI-generated images.',
      type: 'goal_selection',
      options: [
        {
          id: 'personal',
          label: 'Personal Projects',
          description: 'Art for fun, social media, or personal use',
          icon: <Heart className="h-6 w-6" />
        },
        {
          id: 'business',
          label: 'Business & Marketing',
          description: 'Professional content, marketing materials, branding',
          icon: <Briefcase className="h-6 w-6" />
        },
        {
          id: 'creative',
          label: 'Creative Exploration',
          description: 'Artistic experimentation and inspiration',
          icon: <Palette className="h-6 w-6" />
        },
        {
          id: 'content',
          label: 'Content Creation',
          description: 'Blog posts, presentations, educational materials',
          icon: <Camera className="h-6 w-6" />
        }
      ]
    },
    {
      id: 'experience_level',
      title: 'How familiar are you with AI image generation?',
      description: 'This helps us customize your experience.',
      type: 'experience_level',
      options: [
        {
          id: 'beginner',
          label: 'Complete Beginner',
          description: 'New to AI image generation',
          icon: <Target className="h-6 w-6" />
        },
        {
          id: 'some_experience',
          label: 'Some Experience',
          description: 'Used AI tools a few times',
          icon: <Star className="h-6 w-6" />
        },
        {
          id: 'experienced',
          label: 'Experienced',
          description: 'Regular user of AI image tools',
          icon: <CheckCircle className="h-6 w-6" />
        }
      ]
    },
    {
      id: 'interests',
      title: 'What styles interest you most?',
      description: 'Select all that apply - we\'ll show you relevant examples.',
      type: 'interests',
      options: [
        { id: 'photorealistic', label: 'Photorealistic', description: 'Lifelike images', icon: <Camera className="h-5 w-5" /> },
        { id: 'artistic', label: 'Artistic & Painterly', description: 'Oil paintings, watercolors', icon: <Palette className="h-5 w-5" /> },
        { id: 'anime', label: 'Anime & Manga', description: 'Japanese animation style', icon: <Star className="h-5 w-5" /> },
        { id: 'abstract', label: 'Abstract', description: 'Creative and experimental', icon: <Sparkles className="h-5 w-5" /> },
        { id: 'vintage', label: 'Vintage & Retro', description: 'Classic and nostalgic', icon: <Heart className="h-5 w-5" /> },
        { id: 'fantasy', label: 'Fantasy & Sci-fi', description: 'Imaginative worlds', icon: <Target className="h-5 w-5" /> }
      ]
    },
    {
      id: 'completion',
      title: 'You\'re all set!',
      description: 'Your personalized AI art experience is ready. Let\'s create something amazing!',
      type: 'completion',
      icon: <CheckCircle className="h-8 w-8 text-green-600" />
    }
  ];

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100);
  }, [currentStep]);

  useEffect(() => {
    if (isOpen) {
      trackEvent({
        action: 'welcome_flow_started',
        category: 'onboarding',
        label: 'enhanced_welcome'
      });
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      trackEvent({
        action: 'welcome_step_completed',
        category: 'onboarding',
        label: steps[currentStep].id
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionSelect = (stepType: string, value: string) => {
    setUserProfile(prev => {
      switch (stepType) {
        case 'goal_selection':
          return { ...prev, primaryGoal: value };
        case 'experience_level':
          return { ...prev, experienceLevel: value };
        case 'interests':
          const interests = prev.interests.includes(value)
            ? prev.interests.filter(i => i !== value)
            : [...prev.interests, value];
          return { ...prev, interests };
        default:
          return prev;
      }
    });
  };

  const handleComplete = () => {
    trackEvent({
      action: 'welcome_flow_completed',
      category: 'onboarding',
      label: 'enhanced_welcome',
      custom_parameters: {
        primary_goal: userProfile.primaryGoal,
        experience_level: userProfile.experienceLevel,
        interests_count: userProfile.interests.length
      }
    });
    
    onComplete(userProfile);
    onClose();
  };

  const currentStepData = steps[currentStep];
  const canProceed = () => {
    switch (currentStepData.type) {
      case 'welcome':
      case 'completion':
        return true;
      case 'goal_selection':
        return userProfile.primaryGoal !== '';
      case 'experience_level':
        return userProfile.experienceLevel !== '';
      case 'interests':
        return userProfile.interests.length > 0;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-2xl font-bold">
              {currentStepData.title}
            </DialogTitle>
            <Badge variant="outline" className="text-sm">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </DialogHeader>

        <div className="py-6">
          {currentStepData.type === 'welcome' && (
            <div className="text-center space-y-6">
              <div className="mx-auto p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full w-fit">
                {currentStepData.icon}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {currentStepData.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-900">Personalized Experience</div>
                  <div className="text-blue-700">Customized recommendations</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-900">Quick Setup</div>
                  <div className="text-purple-700">Just 2 minutes to complete</div>
                </div>
              </div>
            </div>
          )}

          {(currentStepData.type === 'goal_selection' || currentStepData.type === 'experience_level') && (
            <div className="space-y-6">
              <p className="text-gray-600 text-center">{currentStepData.description}</p>
              <RadioGroup 
                value={currentStepData.type === 'goal_selection' ? userProfile.primaryGoal : userProfile.experienceLevel}
                onValueChange={(value) => handleOptionSelect(currentStepData.type, value)}
                className="space-y-3"
              >
                {currentStepData.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label 
                      htmlFor={option.id} 
                      className="flex-1 cursor-pointer p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-4"
                    >
                      <div className="text-purple-600">
                        {option.icon}
                      </div>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentStepData.type === 'interests' && (
            <div className="space-y-6">
              <p className="text-gray-600 text-center">{currentStepData.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {currentStepData.options?.map((option) => (
                  <Label
                    key={option.id}
                    className={`cursor-pointer p-4 border rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors ${
                      userProfile.interests.includes(option.id) 
                        ? 'bg-purple-50 border-purple-300 text-purple-900' 
                        : ''
                    }`}
                    onClick={() => handleOptionSelect('interests', option.id)}
                  >
                    <div className={userProfile.interests.includes(option.id) ? 'text-purple-600' : 'text-gray-500'}>
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-600">{option.description}</div>
                    </div>
                  </Label>
                ))}
              </div>
            </div>
          )}

          {currentStepData.type === 'completion' && (
            <div className="text-center space-y-6">
              <div className="mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-full w-fit">
                {currentStepData.icon}
              </div>
              <p className="text-gray-600 text-lg">{currentStepData.description}</p>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Your Personalized Setup:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Primary Goal:</span>
                    <div className="text-gray-600 capitalize">{userProfile.primaryGoal.replace('_', ' ')}</div>
                  </div>
                  <div>
                    <span className="font-medium">Experience Level:</span>
                    <div className="text-gray-600 capitalize">{userProfile.experienceLevel.replace('_', ' ')}</div>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Interested Styles:</span>
                    <div className="text-gray-600">{userProfile.interests.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Get Started
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};