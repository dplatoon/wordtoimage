
import React from 'react';
import { Button } from '@/components/ui/button';
import { UrgencyBadge } from '@/components/ui/urgency-badge';
import { Crown, Zap, Users, Timer } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

export const UrgentProCTA = () => {
  const { planName } = useSubscription();

  if (planName === 'Pro' || planName === 'Business') {
    return null; // Don't show to existing Pro/Business users
  }

  const handleUpgrade = () => {
    // Track urgent CTA click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'urgent_pro_cta_click', {
        event_category: 'conversion',
        event_label: 'limited_50_percent_off'
      });
    }
    
    window.location.href = '/pricing?offer=limited50';
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl border-2 border-yellow-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse"></div>

      <div className="relative z-10">
        {/* Urgency badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <UrgencyBadge 
            type="limited_offer" 
            message="50% OFF - First 100 Users Only!" 
            className="text-xs"
          />
          <UrgencyBadge 
            type="user_count" 
            message="73 spots left" 
            className="text-xs bg-red-500 text-white"
          />
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-purple-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">
              Join Pro Now - Limited 50% OFF!
            </h3>
            <p className="text-purple-100 mb-4 text-sm">
              Unlock unlimited HD images, premium styles, and priority processing. 
              This exclusive offer expires in 24 hours!
            </p>
            
            {/* Value props */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Unlimited generations</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span>50+ premium styles</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-yellow-400" />
                <span>3x faster processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-yellow-400" />
                <span>Commercial license</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold text-yellow-400">
                $7.49/mo
              </div>
              <div className="text-sm">
                <span className="line-through text-purple-200">$14.99</span>
                <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  SAVE 50%
                </span>
              </div>
            </div>

            <Button 
              onClick={handleUpgrade}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              Claim Limited Offer Now →
            </Button>
            
            <div className="text-xs text-purple-200 mt-2 text-center">
              ⏰ Offer expires in 23:45:12 • No setup fees • Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
