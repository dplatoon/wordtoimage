
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Gift, Clock, Zap } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal = ({ isOpen, onClose }: ExitIntentModalProps) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

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
      label: 'free_pro_images'
    });
    
    // Redirect to signup with special offer
    window.location.href = '/auth?tab=signup&offer=exit-intent-pro';
    onClose();
  };

  const handleClose = () => {
    trackEvent({
      action: 'exit_intent_offer_dismissed',
      category: 'conversion',
      label: 'modal_closed'
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
        <DialogHeader className="relative">
          <button 
            onClick={handleClose}
            className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-purple-600" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">
              Wait! Special Offer Inside! 🎉
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="text-center space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-bold text-lg">LIMITED TIME OFFER</span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Get 10 FREE Pro Images Today!
            </h3>
            <p className="text-white/90 text-sm">
              Unlock premium styles, HD quality, and priority processing
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-red-300">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Expires in: {formatTime(timeLeft)}</span>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleClaimOffer}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 text-lg"
            >
              Claim My FREE Pro Images →
            </Button>
            
            <button 
              onClick={handleClose}
              className="w-full text-white/70 hover:text-white text-sm underline"
            >
              No thanks, I'll continue browsing
            </button>
          </div>

          <div className="text-xs text-white/60 mt-4">
            * Offer valid for new signups only. No credit card required.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
