import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Gift, Clock, Zap, Star, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface EnhancedExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerType?: 'pro_images' | 'premium_trial' | 'style_pack';
}

const offers = {
  pro_images: {
    title: 'Wait! Special Offer Inside! 🎉',
    subtitle: 'Get 10 FREE Pro Images Today!',
    description: 'Unlock premium styles, HD quality, and priority processing',
    features: ['HD 4K Resolution', 'Premium Styles', 'Priority Processing', 'Commercial License'],
    ctaText: 'Claim My FREE Pro Images →',
    urgency: 'Limited Time Offer'
  },
  premium_trial: {
    title: 'Before You Go... 🚀',
    subtitle: 'Try Premium Free for 7 Days!',
    description: 'Experience unlimited generations and advanced features',
    features: ['Unlimited Generations', 'Advanced Styles', 'Batch Processing', 'Priority Support'],
    ctaText: 'Start Free Trial →',
    urgency: '7-Day Free Trial'
  },
  style_pack: {
    title: 'Don\'t Miss This! ✨',
    subtitle: 'Exclusive Style Pack - Free!',
    description: 'Download 25 premium art styles absolutely free',
    features: ['25 Premium Styles', 'Instant Download', 'Commercial Use', 'Bonus Templates'],
    ctaText: 'Download Free Pack →',
    urgency: 'Limited Time Only'
  }
};

export const EnhancedExitIntentModal = ({ 
  isOpen, 
  onClose, 
  offerType = 'pro_images' 
}: EnhancedExitIntentModalProps) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showConfetti, setShowConfetti] = useState(false);
  
  const offer = offers[offerType];

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show confetti effect on mount
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClaimOffer = () => {
    trackEvent({
      action: 'exit_intent_offer_claimed',
      category: 'conversion',
      label: offerType,
      custom_parameters: { offer_type: offerType }
    });
    
    // Redirect to signup with special offer
    window.location.href = `/auth?tab=signup&offer=exit-intent-${offerType}`;
    onClose();
  };

  const handleClose = () => {
    trackEvent({
      action: 'exit_intent_offer_dismissed',
      category: 'conversion',
      label: offerType
    });
    onClose();
  };

  const handleMaybeLater = () => {
    trackEvent({
      action: 'exit_intent_maybe_later',
      category: 'conversion',
      label: offerType
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg mx-auto bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white border-0 overflow-hidden">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-pink-300 rounded-full animate-ping"></div>
            <div className="absolute top-12 left-1/3 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-bounce"></div>
          </div>
        )}

        <DialogHeader className="relative">
          <button 
            onClick={handleClose}
            className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-center pt-2">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">
              {offer.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="text-center space-y-6 pb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 text-yellow-300 mb-3">
                <Zap className="w-5 h-5" />
                <Badge className="bg-yellow-400 text-purple-900 font-bold">
                  {offer.urgency}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mb-3">
                {offer.subtitle}
              </h3>
              
              <p className="text-white/90 text-sm mb-4">
                {offer.description}
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {offer.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="w-3 h-3 text-green-300 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-red-300">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Expires in: {formatTime(timeLeft)}</span>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-1 text-yellow-300 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-2 text-white/80">
              Loved by 50,000+ creators
            </span>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleClaimOffer}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-purple-900 font-bold py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
            >
              {offer.ctaText}
            </Button>
            
            <div className="flex gap-2">
              <button 
                onClick={handleMaybeLater}
                className="flex-1 text-white/70 hover:text-white text-sm underline py-2"
              >
                Maybe later
              </button>
              <button 
                onClick={handleClose}
                className="flex-1 text-white/70 hover:text-white text-sm underline py-2"
              >
                No thanks
              </button>
            </div>
          </div>

          <div className="text-xs text-white/60 mt-4">
            * Offer valid for new signups only. No credit card required.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};