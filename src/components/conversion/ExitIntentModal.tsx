
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Gift, Zap, Sparkles } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal = ({ isOpen, onClose }: ExitIntentModalProps) => {
  const handleSignUp = () => {
    trackEvent({
      action: 'exit_intent_signup_clicked',
      category: 'conversion',
      label: 'free_account'
    });
    window.location.href = '/auth?tab=signup';
    onClose();
  };

  const handleClose = () => {
    trackEvent({
      action: 'exit_intent_dismissed',
      category: 'conversion',
      label: 'modal_closed'
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto glass-card border-primary/30">
        <DialogHeader className="relative">
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute -top-2 -right-2 w-8 h-8 bg-secondary hover:bg-muted rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground mb-2">
              Before you go — it's free
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="text-center space-y-4">
          <div className="bg-secondary/50 rounded-xl p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Create a free account to save your work
            </h3>
            <p className="text-muted-foreground text-sm">
              Free accounts get image history, style presets, and higher-resolution downloads — no credit card needed.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {['Image history saved to your account', 'Access to all art styles', 'No credit card required'].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={handleSignUp}
              variant="neon"
              className="w-full"
            >
              <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
              Create free account
            </Button>

            <button
              onClick={handleClose}
              className="w-full text-muted-foreground hover:text-foreground text-sm underline transition-colors"
            >
              Continue without an account
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
