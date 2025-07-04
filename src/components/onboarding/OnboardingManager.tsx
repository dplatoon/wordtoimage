import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { WelcomeFlow } from './WelcomeFlow';
import { InteractiveTutorial } from './InteractiveTutorial';
import { trackEvent } from '@/utils/analytics';
import { toast } from 'sonner';

interface UserProfile {
  primaryGoal: string;
  experienceLevel: string;
  interests: string[];
  name?: string;
  favoriteStyles: string[];
}

interface OnboardingState {
  showWelcome: boolean;
  showTutorial: boolean;
  tutorialType: 'first_generation' | 'dashboard_tour' | 'advanced_features' | null;
  hasCompletedWelcome: boolean;
  hasCompletedFirstGeneration: boolean;
  userProfile: UserProfile | null;
}

interface OnboardingManagerProps {
  children: React.ReactNode;
  pageId: string;
  triggerTutorial?: 'first_generation' | 'dashboard_tour' | 'advanced_features';
  userActivity?: {
    isFirstVisit?: boolean;
    generationCount?: number;
    hasSeenDashboard?: boolean;
  };
}

export const OnboardingManager = ({ 
  children, 
  pageId, 
  triggerTutorial,
  userActivity = {} 
}: OnboardingManagerProps) => {
  const { user } = useAuth();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    showWelcome: false,
    showTutorial: false,
    tutorialType: null,
    hasCompletedWelcome: false,
    hasCompletedFirstGeneration: false,
    userProfile: null
  });

  // Load onboarding state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('onboardingState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setOnboardingState(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse onboarding state:', error);
      }
    }
  }, []);

  // Save onboarding state to localStorage
  const saveOnboardingState = (newState: Partial<OnboardingState>) => {
    const updatedState = { ...onboardingState, ...newState };
    setOnboardingState(updatedState);
    localStorage.setItem('onboardingState', JSON.stringify(updatedState));
  };

  // Show welcome flow for new authenticated users
  useEffect(() => {
    if (user && !onboardingState.hasCompletedWelcome && userActivity.isFirstVisit) {
      // Delay to allow page to load
      setTimeout(() => {
        setOnboardingState(prev => ({ ...prev, showWelcome: true }));
      }, 1000);
    }
  }, [user, onboardingState.hasCompletedWelcome, userActivity.isFirstVisit]);

  // Handle tutorial triggers
  useEffect(() => {
    if (triggerTutorial && !onboardingState.showTutorial) {
      // Check if user should see this tutorial
      const shouldShowTutorial = () => {
        switch (triggerTutorial) {
          case 'first_generation':
            return userActivity.generationCount === 0 && onboardingState.hasCompletedWelcome;
          case 'dashboard_tour':
            return !userActivity.hasSeenDashboard && user;
          case 'advanced_features':
            return userActivity.generationCount && userActivity.generationCount >= 3;
          default:
            return false;
        }
      };

      if (shouldShowTutorial()) {
        setTimeout(() => {
          setOnboardingState(prev => ({
            ...prev,
            showTutorial: true,
            tutorialType: triggerTutorial
          }));
        }, 500);
      }
    }
  }, [triggerTutorial, onboardingState, userActivity, user]);

  const handleWelcomeComplete = (profile: UserProfile) => {
    trackEvent({
      action: 'welcome_flow_completed',
      category: 'onboarding',
      label: 'enhanced_onboarding',
      custom_parameters: profile
    });

    saveOnboardingState({
      hasCompletedWelcome: true,
      userProfile: profile,
      showWelcome: false
    });

    toast.success('Welcome setup complete! Let\'s create your first AI image.', {
      description: 'We\'ve personalized your experience based on your preferences.'
    });

    // Show first generation tutorial after welcome
    if (pageId === 'text-to-image' || pageId === 'homepage') {
      setTimeout(() => {
        setOnboardingState(prev => ({
          ...prev,
          showTutorial: true,
          tutorialType: 'first_generation'
        }));
      }, 2000);
    }
  };

  const handleWelcomeSkip = () => {
    trackEvent({
      action: 'welcome_flow_skipped',
      category: 'onboarding',
      label: 'enhanced_onboarding'
    });

    saveOnboardingState({
      hasCompletedWelcome: true,
      showWelcome: false
    });
  };

  const handleTutorialComplete = () => {
    const completedTutorial = onboardingState.tutorialType;
    
    trackEvent({
      action: 'tutorial_completed',
      category: 'onboarding',
      label: completedTutorial || 'unknown'
    });

    const updates: Partial<OnboardingState> = {
      showTutorial: false,
      tutorialType: null
    };

    if (completedTutorial === 'first_generation') {
      updates.hasCompletedFirstGeneration = true;
      toast.success('Tutorial complete! You\'re ready to create amazing AI art.', {
        description: 'Try different prompts and styles to explore your creativity.'
      });
    }

    saveOnboardingState(updates);
  };

  const handleTutorialSkip = () => {
    trackEvent({
      action: 'tutorial_skipped',
      category: 'onboarding',
      label: onboardingState.tutorialType || 'unknown'
    });

    setOnboardingState(prev => ({
      ...prev,
      showTutorial: false,
      tutorialType: null
    }));
  };

  // Provide context to children about onboarding state
  const onboardingContext = {
    userProfile: onboardingState.userProfile,
    hasCompletedWelcome: onboardingState.hasCompletedWelcome,
    hasCompletedFirstGeneration: onboardingState.hasCompletedFirstGeneration,
    isInTutorial: onboardingState.showTutorial,
    startTutorial: (type: 'first_generation' | 'dashboard_tour' | 'advanced_features') => {
      setOnboardingState(prev => ({
        ...prev,
        showTutorial: true,
        tutorialType: type
      }));
    }
  };

  return (
    <div className="relative">
      {/* Pass onboarding context through React Context or props */}
      {React.cloneElement(children as React.ReactElement, { onboardingContext })}

      {/* Welcome Flow */}
      {onboardingState.showWelcome && (
        <WelcomeFlow
          isOpen={onboardingState.showWelcome}
          onClose={handleWelcomeSkip}
          onComplete={handleWelcomeComplete}
        />
      )}

      {/* Interactive Tutorial */}
      {onboardingState.showTutorial && onboardingState.tutorialType && (
        <InteractiveTutorial
          isActive={onboardingState.showTutorial}
          onClose={handleTutorialSkip}
          onComplete={handleTutorialComplete}
          tutorialType={onboardingState.tutorialType}
        />
      )}
    </div>
  );
};

// Hook for components to access onboarding context
export const useOnboarding = () => {
  const [onboardingState, setOnboardingState] = useState(() => {
    const saved = localStorage.getItem('onboardingState');
    return saved ? JSON.parse(saved) : {
      hasCompletedWelcome: false,
      hasCompletedFirstGeneration: false,
      userProfile: null
    };
  });

  return {
    ...onboardingState,
    startTutorial: (type: 'first_generation' | 'dashboard_tour' | 'advanced_features') => {
      // This would trigger the tutorial in OnboardingManager
      trackEvent({
        action: 'tutorial_manually_started',
        category: 'onboarding',
        label: type
      });
    }
  };
};