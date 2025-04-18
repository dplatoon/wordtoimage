
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export const BetaBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const dismissBanner = () => {
    // Save dismissal to localStorage
    localStorage.setItem('betaBannerDismissed', 'true');
    setIsVisible(false);
    
    // Track dismissal with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'beta_banner_dismissed', {
        event_category: 'engagement'
      });
    }
  };
  
  // Check if banner was previously dismissed
  React.useEffect(() => {
    const isDismissed = localStorage.getItem('betaBannerDismissed') === 'true';
    if (isDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleFeedbackClick = () => {
    // In a real implementation, this could open a feedback form
    toast({
      title: "Feedback",
      description: "Thanks for participating in our beta! A feedback form will open shortly.",
      duration: 5000,
    });
    
    // Track feedback click with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'beta_feedback_click', {
        event_category: 'engagement'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600 text-white px-4 py-2 text-sm fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center shadow-lg">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="font-semibold mr-2">Beta Release</span>
          <span className="hidden sm:inline">We're collecting feedback to improve WordToImage.</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleFeedbackClick}
            className="bg-white text-blue-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-50 transition-colors"
          >
            Share Feedback
          </button>
          <button 
            onClick={dismissBanner}
            className="text-white hover:text-blue-200 transition-colors"
            aria-label="Dismiss beta banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
