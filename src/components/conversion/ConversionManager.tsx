
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SmartOnboardingFlow } from './SmartOnboardingFlow';
import { LeadMagnetSystem } from './LeadMagnetSystem';
import { BehavioralAnalytics } from './BehavioralAnalytics';
import { ViralGrowthSystem } from './ViralGrowthSystem';
import { trackEvent } from '@/utils/analytics';
import { toast } from 'sonner';

interface ConversionManagerProps {
  children: React.ReactNode;
  pageId: string;
  userActivity?: {
    generationCount?: number;
    hasCompletedQuiz?: boolean;
    quizResult?: any;
    lastImageUrl?: string;
    lastPrompt?: string;
    timeSpent?: number;
  };
}

interface ConversionState {
  showOnboarding: boolean;
  onboardingTrigger?: 'first_generation' | 'quiz_complete' | 'multiple_generations' | 'feature_discovery';
  showLeadMagnet: boolean;
  leadMagnetType?: 'style_report' | 'pro_styles' | 'creation_pack' | 'tips_guide';
  leadMagnetTrigger?: 'quiz_complete' | 'multiple_generations' | 'time_spent' | 'feature_interest';
  showViralGrowth: boolean;
  viralGrowthType?: 'share_creation' | 'challenge_friend' | 'referral_program' | 'quiz_share';
  cooldownUntil?: number;
}

export const ConversionManager = ({ 
  children, 
  pageId, 
  userActivity = {} 
}: ConversionManagerProps) => {
  const { user } = useAuth();
  const [conversionState, setConversionState] = useState<ConversionState>({
    showOnboarding: false,
    showLeadMagnet: false,
    showViralGrowth: false
  });

  // Cooldown logic to prevent popup fatigue
  const checkCooldown = () => {
    const lastInteraction = localStorage.getItem('lastConversionInteraction');
    if (lastInteraction) {
      const timeSince = Date.now() - parseInt(lastInteraction);
      return timeSince < 300000; // 5 minute cooldown
    }
    return false;
  };

  const setCooldown = () => {
    localStorage.setItem('lastConversionInteraction', Date.now().toString());
  };

  // Handle behavioral triggers
  const handleConversionTrigger = (trigger: any) => {
    if (user || checkCooldown()) return; // Don't show to logged-in users or during cooldown

    const { type, data } = trigger;

    switch (type) {
      case 'time_threshold':
        if (data.minutes >= 1 && data.engagement_score >= 40) {
          setConversionState({
            showOnboarding: false,
            showLeadMagnet: true,
            leadMagnetType: 'tips_guide',
            leadMagnetTrigger: 'time_spent',
            showViralGrowth: false
          });
          setCooldown();
        }
        break;
      
      case 'scroll_depth':
        if (data.depth >= 75 && data.engagement_score >= 30) {
          setConversionState({
            showOnboarding: true,
            onboardingTrigger: 'feature_discovery',
            showLeadMagnet: false,
            showViralGrowth: false
          });
          setCooldown();
        }
        break;
      
      case 'feature_interest':
        if (data.attempts >= 1) {
          setConversionState({
            showOnboarding: true,
            onboardingTrigger: 'first_generation',
            showLeadMagnet: false,
            showViralGrowth: false
          });
          setCooldown();
        }
        break;
      
      case 'exit_intent':
        if (data.engagement_score >= 50) {
          setConversionState({
            showOnboarding: false,
            showLeadMagnet: true,
            leadMagnetType: 'creation_pack',
            leadMagnetTrigger: 'feature_interest',
            showViralGrowth: false
          });
          setCooldown();
        }
        break;
    }
  };

  // Handle activity-based triggers
  useEffect(() => {
    if (user) return; // Don't show conversion flows to logged-in users

    const { generationCount = 0, hasCompletedQuiz = false } = userActivity;

    // First generation trigger
    if (generationCount === 1 && !checkCooldown()) {
      setTimeout(() => {
        setConversionState({
          showOnboarding: true,
          onboardingTrigger: 'first_generation',
          showLeadMagnet: false,
          showViralGrowth: false
        });
        setCooldown();
      }, 3000); // 3 second delay after first generation
    }

    // Quiz completion trigger
    if (hasCompletedQuiz && !checkCooldown()) {
      setTimeout(() => {
        setConversionState({
          showOnboarding: false,
          showLeadMagnet: true,
          leadMagnetType: 'style_report',
          leadMagnetTrigger: 'quiz_complete',
          showViralGrowth: false
        });
        setCooldown();
      }, 2000);
    }

    // Multiple generations trigger
    if (generationCount >= 3 && !checkCooldown()) {
      setConversionState({
        showOnboarding: true,
        onboardingTrigger: 'multiple_generations',
        showLeadMagnet: false,
        showViralGrowth: false
      });
      setCooldown();
    }
  }, [userActivity, user]);

  // Handle successful image generation - show viral growth
  useEffect(() => {
    if (userActivity.lastImageUrl && userActivity.generationCount && userActivity.generationCount >= 1) {
      // Show viral growth after a delay
      setTimeout(() => {
        setConversionState(prev => ({
          ...prev,
          showViralGrowth: true,
          viralGrowthType: 'share_creation'
        }));
      }, 5000); // 5 second delay after successful generation
    }
  }, [userActivity.lastImageUrl, userActivity.generationCount]);

  const handleOnboardingComplete = (action: 'signup' | 'skip' | 'later') => {
    trackEvent({
      action: 'onboarding_completed',
      category: 'conversion',
      label: action,
      custom_parameters: { 
        trigger: conversionState.onboardingTrigger,
        user_activity: userActivity
      }
    });

    setConversionState(prev => ({ ...prev, showOnboarding: false }));

    if (action === 'signup') {
      // Redirect to auth page
      window.location.href = '/auth?tab=signup';
    } else if (action === 'later') {
      // Show lead magnet as alternative
      setTimeout(() => {
        setConversionState(prev => ({
          ...prev,
          showLeadMagnet: true,
          leadMagnetType: 'creation_pack',
          leadMagnetTrigger: 'feature_interest'
        }));
      }, 60000); // 1 minute delay
    }
  };

  const handleEmailSubmit = async (email: string, magnetType: string) => {
    // In a real app, you'd send this to your backend/email service
    trackEvent({
      action: 'email_captured',
      category: 'conversion',
      label: magnetType,
      custom_parameters: { 
        email_domain: email.split('@')[1],
        trigger: conversionState.leadMagnetTrigger
      }
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Success! Check your email for your free download.');
    
    setConversionState(prev => ({ ...prev, showLeadMagnet: false }));
  };

  const handleViralShare = (platform: string, content: any) => {
    trackEvent({
      action: 'viral_share_completed',
      category: 'growth',
      label: platform,
      custom_parameters: { 
        share_type: conversionState.viralGrowthType,
        content_type: content.image ? 'image' : 'text'
      }
    });

    setConversionState(prev => ({ ...prev, showViralGrowth: false }));
    
    toast.success('Thanks for sharing! Your friends will love this.');
  };

  return (
    <BehavioralAnalytics 
      pageId={pageId} 
      onConversionTrigger={handleConversionTrigger}
    >
      {children}
      
      {/* Smart Onboarding Flow */}
      {conversionState.showOnboarding && conversionState.onboardingTrigger && (
        <SmartOnboardingFlow
          trigger={conversionState.onboardingTrigger}
          onComplete={handleOnboardingComplete}
          userData={userActivity}
        />
      )}
      
      {/* Lead Magnet System */}
      {conversionState.showLeadMagnet && conversionState.leadMagnetType && conversionState.leadMagnetTrigger && (
        <LeadMagnetSystem
          type={conversionState.leadMagnetType}
          trigger={conversionState.leadMagnetTrigger}
          onEmailSubmit={handleEmailSubmit}
          onClose={() => setConversionState(prev => ({ ...prev, showLeadMagnet: false }))}
          userData={userActivity}
        />
      )}
      
      {/* Viral Growth System */}
      {conversionState.showViralGrowth && conversionState.viralGrowthType && (
        <ViralGrowthSystem
          type={conversionState.viralGrowthType}
          content={{
            imageUrl: userActivity.lastImageUrl,
            prompt: userActivity.lastPrompt,
            quizResult: userActivity.quizResult
          }}
          onShare={handleViralShare}
          onClose={() => setConversionState(prev => ({ ...prev, showViralGrowth: false }))}
        />
      )}
    </BehavioralAnalytics>
  );
};
