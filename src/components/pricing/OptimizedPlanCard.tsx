
import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { PaymentMethodModal } from '@/components/PaymentMethodModal';
import { useAuthState } from '@/hooks/useAuthState';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { PlanHeader } from './PlanHeader';
import { PlanPricing } from './PlanPricing';
import { PlanFeatures } from './PlanFeatures';
import { PlanCTA } from './PlanCTA';

interface OptimizedPlanCardProps {
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

export const OptimizedPlanCard = ({
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
}: OptimizedPlanCardProps) => {
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

  return (
    <>
      <div
        className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
          popular || isCurrentPlan 
            ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
            : 'border border-gray-200 shadow-sm hover:border-blue-300'
        } ${isCurrentPlan ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : ''}`}
        role="listitem"
      >
        <div className={`p-4 md:p-6 ${popular || isCurrentPlan ? 'pt-8 md:pt-10' : 'pt-6'}`}>
          <PlanHeader 
            name={name}
            description={description}
            popular={popular}
            badge={badge}
            isCurrentPlan={isCurrentPlan}
          />
          
          <PlanPricing 
            price={price}
            billingCycle={billingCycle}
            guarantee={guarantee}
            isFree={isFree}
          />
          
          <PlanFeatures features={features} />
          
          <PlanCTA 
            ctaText={ctaText}
            ctaVariant={ctaVariant}
            isCurrentPlan={isCurrentPlan}
            planName={name}
            onCTAClick={handleCTAClick}
          />
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
