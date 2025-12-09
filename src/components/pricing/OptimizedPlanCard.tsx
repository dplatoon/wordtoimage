import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { PaymentMethodModal } from '@/components/PaymentMethodModal';
import { useAuthState } from '@/hooks/useAuthState';
import { useSubscription as useSubscriptionContext } from '@/contexts/SubscriptionContext';
import { useSubscription } from '@/hooks/useSubscription';
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
  const { openCustomerPortal } = useSubscriptionContext();
  const { upgradeToPlane } = useSubscription();

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

    const planId = name.toLowerCase();
    upgradeToPlane(planId);
  };

  return (
    <div
      className={`relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/40 ${
        popular || isCurrentPlan 
          ? 'border-primary/50 shadow-neon transform scale-105' 
          : 'border-border/30 hover:shadow-glass-lg'
      } ${isCurrentPlan ? 'bg-gradient-to-br from-primary/10 to-neon-coral/5' : ''}`}
      role="listitem"
    >
      {/* Glow effect for popular/current */}
      {(popular || isCurrentPlan) && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-neon-coral/5 pointer-events-none" />
      )}

      <div className={`relative p-4 md:p-6 ${popular || isCurrentPlan ? 'pt-8 md:pt-10' : 'pt-6'}`}>
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
  );
};