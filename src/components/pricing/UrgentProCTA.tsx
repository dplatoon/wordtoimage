
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Users, Sparkles } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Link } from 'react-router-dom';

export const UrgentProCTA = () => {
  const { planName } = useSubscription();

  if (planName === 'Pro' || planName === 'Business') {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-primary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-xl" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center shrink-0">
            <Crown className="w-6 h-6 text-primary" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Upgrade to Pro
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Unlock unlimited HD image generation, premium styles, and priority processing.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Unlimited generations</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>50+ premium styles</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>HD quality output</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Commercial license</span>
              </div>
            </div>

            <Button variant="neon" className="w-full" asChild>
              <Link to="/pricing">See Pro plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
