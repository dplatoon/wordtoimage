
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
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
          : isCurrentPlan
          ? 'border-blue-500 text-blue-600 hover:bg-blue-50'
          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onCTAClick}
      aria-label={`${getCTAText()} for ${planName} plan`}
    >
      {getCTAText()}
    </Button>
  );
};
