
import React from 'react';

interface PlanPricingProps {
  price: { monthly: number; annual: number };
  billingCycle: 'monthly' | 'annual';
  guarantee: string;
  isFree?: boolean;
}

export const PlanPricing = ({ price, billingCycle, guarantee, isFree }: PlanPricingProps) => {
  const getDisplayPrice = () => {
    const currentPrice = price[billingCycle];
    return currentPrice === 0 ? 'Free' : `$${currentPrice}`;
  };

  const getSavingsText = () => {
    if (billingCycle === 'annual' && price.annual > 0) {
      const monthlyCost = price.monthly * 12;
      const annualCost = price.annual * 12;
      const savings = monthlyCost - annualCost;
      return `Save $${savings.toFixed(0)}/year`;
    }
    return null;
  };

  return (
    <div className="text-center mb-6 md:mb-8">
      <div className="flex items-baseline justify-center mb-2">
        <span className="text-3xl md:text-4xl font-bold text-gray-900">
          {getDisplayPrice()}
        </span>
        {!isFree && (
          <span className="text-gray-500 ml-2 text-sm">
            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
          </span>
        )}
      </div>
      
      {getSavingsText() && (
        <div className="text-green-600 text-sm font-medium">
          {getSavingsText()}
        </div>
      )}
      
      <div className="text-gray-500 text-xs mt-1">{guarantee}</div>
    </div>
  );
};
