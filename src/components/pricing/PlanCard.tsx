
import React, { useState } from 'react';
import { Check, X, Crown, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { PaymentMethodModal } from '@/components/PaymentMethodModal';
import { useAuthState } from '@/hooks/useAuthState';
import { useSubscription } from '@/contexts/SubscriptionContext';

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
      window.location.href = '/';
      return;
    }

    if (isCurrentPlan) {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
          popular || isCurrentPlan 
            ? 'ring-2 ring-blue-500 shadow-xl border-blue-200' 
            : 'border border-gray-200 shadow-md hover:border-blue-300'
        } ${isCurrentPlan ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}
        style={{ minHeight: '600px' }}
        role="listitem"
      >
        {/* Plan Name Badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
            name === 'Free' 
              ? 'bg-gray-100 text-gray-700 border border-gray-300'
              : name === 'Pro'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
          }`}>
            {name}
          </div>
        </div>

        {/* Popular/Current Plan Badge */}
        {(popular || isCurrentPlan) && (
          <div className="absolute top-6 right-4 z-10">
            {isCurrentPlan ? (
              <Badge 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 text-xs font-semibold tracking-wide flex items-center gap-1"
              >
                <Crown className="h-3 w-3" />
                Your Plan
              </Badge>
            ) : (
              <Badge 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-semibold tracking-wide flex items-center gap-1"
              >
                <Star className="h-3 w-3" />
                {badge || 'Most Popular'}
              </Badge>
            )}
          </div>
        )}

        <div className="p-8 h-full flex flex-col pt-12">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Pricing Section */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-5xl font-bold text-gray-900">
                {getDisplayPrice()}
              </span>
              {!isFree && (
                <span className="text-gray-500 ml-2 text-lg">
                  /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                </span>
              )}
            </div>
            
            {getSavingsText() && (
              <div className="text-green-600 text-sm font-medium mb-2">
                {getSavingsText()}
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="flex-1 mb-8">
            <ul className="space-y-4" role="list">
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
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <Button
              variant={isCurrentPlan ? 'outline' : (ctaVariant === 'outline' ? 'outline' : 'default')}
              size="lg"
              className={`w-full text-base font-semibold py-4 transition-all duration-200 min-h-[52px] ${
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
            
            <div className="text-center mt-3">
              <p className="text-xs text-gray-500">{guarantee}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <PaymentMethodModal 
        open={paymentModalOpen} 
        onOpenChange={setPaymentModalOpen}
        planName={name}
      />
    </>
  );
};
