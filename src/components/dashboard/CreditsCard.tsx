import { motion } from 'framer-motion';
import { Sparkles, Plus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${isPro ? 'from-violet-500/10 to-purple-500/10' : 'from-slate-500/10 to-gray-500/10'}`} />
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          Credits
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {/* Credits Display */}
        <div className="flex items-baseline gap-2">
          <motion.span
            className="text-4xl font-bold text-foreground"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {credits}
          </motion.span>
          <span className="text-muted-foreground">/ {maxCredits}</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {percentage.toFixed(0)}% credits remaining
          </p>
        </div>

        {/* Credit Tiers */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className={`p-3 rounded-lg border ${isPro ? 'border-border' : 'border-primary bg-primary/5'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Free</span>
            </div>
            <p className="text-xs text-muted-foreground">10 credits/day</p>
          </div>
          <div className={`p-3 rounded-lg border ${isPro ? 'border-primary bg-primary/5' : 'border-border'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Pro</span>
            </div>
            <p className="text-xs text-muted-foreground">Unlimited</p>
          </div>
        </div>

        {/* CTA */}
        {!isPro && (
          <Button className="w-full mt-4" asChild>
            <Link to="/pricing">
              <Plus className="w-4 h-4 mr-2" />
              Get More Credits
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
