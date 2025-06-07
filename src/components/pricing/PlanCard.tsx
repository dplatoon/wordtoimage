
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { PaymentMethodModal } from '@/components/PaymentMethodModal';
import { useAuthState } from '@/hooks/useAuthState';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Crown } from 'lucide-react';

interface PlanCardProps {
  name: string;
  description: string;
  price: { monthly: number; annual: number };
  features: Array<{
    name: string;
    included: boolean;
    highlight?: boolean;
  }>;
  ctaText: string;
  ctaVariant?: 'default' | 'outline';
  guarantee: string;
  badge?: string;
  popular?: boolean;
  isFree?: boolean;
  productId?: string;
  billingCycle: 'monthly' | 'annual';
  isCurrentPlan?: boolean;
}

export const PlanCard = ({
  name,
  description,
  price,
  features,
  ctaText,
  ctaVariant = 'default',
  guarantee,
  badge,
  popular,
  isFree,
  productId,
  billingCycle,
  isCurrentPlan = false,
}: PlanCardProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const { session } = useAuthState();
  const { openCustomerPortal } = useSubscription();

  const handleCTAClick = () => {
    if (isFree) {
      // For free plan, redirect to main app
      window.location.href = '/';
      return;
    }

    if (isCurrentPlan) {
      // If this is the current plan, open customer portal
      openCustomerPortal();
      return;
    }

    if (!session) {
      toast.error("Please log in to subscribe to a plan");
      return;
    }

    setPaymentModalOpen(true);
  };

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

  const getCTAText = () => {
    if (isCurrentPlan) {
      return 'Manage Plan';
    }
    return ctaText;
  };

  return (
    <>
      <div
        className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in ${
          popular || isCurrentPlan 
            ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
            : 'border border-gray-200 shadow-sm hover:border-blue-300'
        } ${isCurrentPlan ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}
        role="listitem"
      >
        {/* Header badges */}
        <div className="relative">
          {(popular || badge) && !isCurrentPlan && (
            <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <Badge 
                variant="default" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-xs font-semibold tracking-wide"
              >
                {badge || 'Most Popular'}
              </Badge>
            </div>
          )}
          
          {isCurrentPlan && (
            <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <Badge 
                variant="default" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 text-xs font-semibold tracking-wide flex items-center gap-1"
              >
                <Crown className="h-3 w-3" />
                Your Plan
              </Badge>
            </div>
          )}
        </div>

        <div className={`p-8 ${popular || isCurrentPlan ? 'pt-12' : 'pt-8'}`}>
          {/* Plan name and description */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-5xl font-bold text-gray-900">
                {getDisplayPrice()}
              </span>
              {!isFree && (
                <span className="text-gray-500 ml-2">
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

          {/* Features list */}
          <ul className="space-y-4 mb-8" role="list">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start" role="listitem">
                {feature.included ? (
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <span 
                  className={`ml-3 text-sm leading-relaxed ${
                    feature.included ? 'text-gray-700' : 'text-gray-400'
                  } ${feature.highlight ? 'font-semibold' : ''}`}
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button
            variant={isCurrentPlan ? 'outline' : (ctaVariant === 'outline' ? 'outline' : 'default')}
            size="lg"
            className={`w-full text-base font-semibold py-4 transition-all duration-200 ${
              !isCurrentPlan && ctaVariant === 'default'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                : isCurrentPlan
                ? 'border-blue-500 text-blue-600 hover:bg-blue-50'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={handleCTAClick}
            aria-label={`${getCTAText()} for ${name} plan`}
          >
            {getCTAText()}
          </Button>
        </div>
      </div>

      <PaymentMethodModal 
        open={paymentModalOpen} 
        onOpenChange={setPaymentModalOpen}
        planName={name}
      />
    </>
  );
};
