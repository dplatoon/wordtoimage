
import React from 'react';
import { Button } from '@/components/ui/button';

interface PlanCTAProps {
  ctaText: string;
  ctaVariant?: 'default' | 'outline';
  isCurrentPlan: boolean;
  planName: string;
  onCTAClick: () => void;
}

export const PlanCTA = ({ ctaText, ctaVariant = 'default', isCurrentPlan, planName, onCTAClick }: PlanCTAProps) => {
  const getCTAText = () => {
    if (isCurrentPlan) {
      return 'Manage Plan';
    }
    return ctaText;
  };

  return (
    <Button
      variant={isCurrentPlan ? 'outline' : (ctaVariant === 'outline' ? 'outline' : 'default')}
      size="lg"
      className={`w-full text-sm md:text-base font-semibold py-3 md:py-4 transition-all duration-200 ${
        !isCurrentPlan && ctaVariant === 'default'
          ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl'
          : isCurrentPlan
          ? 'border-primary text-primary hover:bg-primary/10'
          : 'border-border text-muted-foreground hover:bg-muted/50'
      }`}
      onClick={onCTAClick}
      aria-label={`${getCTAText()} for ${planName} plan`}
    >
      {getCTAText()}
    </Button>
  );
};
