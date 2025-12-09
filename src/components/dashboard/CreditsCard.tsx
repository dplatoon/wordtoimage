import { motion } from 'framer-motion';
import { Sparkles, Plus, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

interface CreditsCardProps {
  credits: number;
  maxCredits?: number;
  subscriptionTier: string;
}

export const CreditsCard = ({ credits, maxCredits = 100, subscriptionTier }: CreditsCardProps) => {
  const percentage = Math.min((credits / maxCredits) * 100, 100);
  const isPro = subscriptionTier === 'pro';

  return (
    <div className="relative overflow-hidden glass-card rounded-2xl border-primary/20">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${isPro ? 'from-primary/10 to-neon-coral/10' : 'from-muted/20 to-background'}`} />
      
      <div className="relative p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-neon-coral">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          Credits
        </h3>

        {/* Credits Display */}
        <div className="flex items-baseline gap-2 mb-4">
          <motion.span
            className="text-4xl font-bold bg-gradient-to-r from-primary to-neon-coral bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {credits}
          </motion.span>
          <span className="text-muted-foreground">/ {maxCredits}</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="relative h-2 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-neon-coral rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <p className="text-xs text-muted-foreground">
            {percentage.toFixed(0)}% credits remaining
          </p>
        </div>

        {/* Credit Tiers */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`p-3 rounded-xl border transition-all duration-300 ${!isPro ? 'border-primary/40 bg-primary/5 shadow-neon' : 'border-border/50 bg-background/30'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Zap className={`w-4 h-4 ${!isPro ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm font-medium text-foreground">Free</span>
            </div>
            <p className="text-xs text-muted-foreground">10 credits/day</p>
          </div>
          <div className={`p-3 rounded-xl border transition-all duration-300 ${isPro ? 'border-primary/40 bg-primary/5 shadow-neon' : 'border-border/50 bg-background/30'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Crown className={`w-4 h-4 ${isPro ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm font-medium text-foreground">Pro</span>
            </div>
            <p className="text-xs text-muted-foreground">Unlimited</p>
          </div>
        </div>

        {/* CTA */}
        {!isPro && (
          <Button variant="neon" className="w-full" asChild>
            <Link to="/pricing">
              <Plus className="w-4 h-4 mr-2" />
              Get More Credits
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};