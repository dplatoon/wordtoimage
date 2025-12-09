import { useState } from 'react';
import { BillingToggle } from './BillingToggle';
import { OptimizedPlanCard } from './OptimizedPlanCard';
import { SubscriptionStatus } from '@/components/SubscriptionStatus';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { UrgentProCTA } from './UrgentProCTA';
import { TrustElements } from '@/components/trust/TrustElements';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Free',
    description: 'Perfect for trying out our platform',
    price: { monthly: 0, annual: 0 },
    features: [
      { name: '50 AI generations per month (resets monthly)', included: true, highlight: true },
      { name: 'Standard resolution (1024x1024)', included: true },
      { name: 'Basic editing tools (crop, resize, filters)', included: true },
      { name: 'Community support (email responses within 48 hours)', included: true },
      { name: 'Personal use license only', included: true },
      { name: 'WordToImage watermark on downloads', included: true },
      { name: 'HD resolution (2048x2048)', included: false },
      { name: 'Commercial usage rights', included: false },
      { name: 'Priority support (24-hour response)', included: false }
    ],
    ctaText: 'Start Free - No Credit Card Required',
    ctaVariant: 'outline' as const,
    guarantee: 'Free forever • No hidden fees',
    isFree: true
  },
  {
    name: 'Standard',
    description: 'Great for individual creators',
    price: { monthly: 9.99, annual: 7.99 },
    features: [
      { name: '150 AI generations per month (resets monthly)', included: true, highlight: true },
      { name: 'HD resolution up to 1792x1024', included: true, highlight: true },
      { name: 'Advanced editing suite (backgrounds, styles, effects)', included: true },
      { name: 'Priority email support (24-hour response on business days)', included: true },
      { name: 'Commercial usage rights', included: true, highlight: true },
      { name: 'No watermarks on any downloads', included: true },
      { name: 'API access (500 calls/month)', included: true },
      { name: 'Access to 30+ premium styles', included: true },
      { name: 'Export in PNG, JPG, WebP formats', included: true }
    ],
    ctaText: 'Choose Standard',
    productId: 'prod_SGdyRu7i1RabBb',
    guarantee: '14-day money-back guarantee • Upgrade or cancel anytime'
  },
  {
    name: 'Pro',
    description: 'Best for creators and small businesses',
    price: { monthly: 14.99, annual: 11.99 },
    popular: true,
    features: [
      { name: '500 AI generations per month (resets monthly)', included: true, highlight: true },
      { name: 'HD resolution up to 2048x2048', included: true, highlight: true },
      { name: 'Advanced editing suite (backgrounds, styles, effects)', included: true },
      { name: 'Priority email support (24-hour response on business days)', included: true },
      { name: 'Full commercial usage rights', included: true, highlight: true },
      { name: 'No watermarks on any downloads', included: true },
      { name: 'API access (1,000 calls/month, $0.02 per additional call)', included: true },
      { name: 'Access to 50+ premium styles', included: true },
      { name: 'Export in PNG, JPG, WebP formats', included: true }
    ],
    ctaText: 'Choose Pro',
    productId: 'prod_SEe2MxYit85qLo',
    guarantee: '14-day money-back guarantee • Upgrade or cancel anytime'
  },
  {
    name: 'Business',
    description: 'For teams and growing businesses',
    price: { monthly: 29.99, annual: 23.99 },
    badge: 'Best Value',
    features: [
      { name: 'Unlimited AI generations (fair use policy - normal business use)', included: true, highlight: true },
      { name: '4K resolution up to 4096x4096', included: true, highlight: true },
      { name: 'Team workspace for up to 5 users with role management', included: true, highlight: true },
      { name: 'Dedicated phone & chat support (4-hour response, business hours)', included: true },
      { name: 'Extended commercial license (includes resale rights)', included: true },
      { name: 'Advanced API access (10,000 calls/month, $0.015 per additional call)', included: true },
      { name: 'White-label option (remove all WordToImage branding)', included: true },
      { name: 'Usage analytics and team reporting dashboard', included: true },
      { name: 'Priority rendering queue (2x faster processing)', included: true }
    ],
    ctaText: 'Choose Business',
    productId: 'prod_SEe3iHfdBt84EE',
    guarantee: '30-day money-back guarantee • Dedicated account manager included'
  }
];

export const EnhancedPricingTable = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { planName: currentPlan } = useSubscription();

  return (
    <section className="py-8 md:py-16 relative overflow-hidden" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Urgent Pro CTA */}
        <div className="mb-8">
          <UrgentProCTA />
        </div>

        <BillingToggle
          billingCycle={billingCycle}
          onToggle={setBillingCycle}
          discount={20}
        />

        {/* Subscription Status Display */}
        <div className="flex justify-center mb-6 md:mb-8">
          <SubscriptionStatus />
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" 
          role="list" 
          aria-label="Pricing plans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <OptimizedPlanCard
                {...plan}
                billingCycle={billingCycle}
                isCurrentPlan={plan.name === currentPlan}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Elements */}
        <div className="mt-8 max-w-md mx-auto">
          <TrustElements />
        </div>

        <div className="mt-8 md:mt-12 text-center space-y-4">
          <div className="glass-card rounded-2xl p-6 border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4" id="help-choosing">Need help choosing the right plan?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-2">✓ Easy upgrades & downgrades</p>
                <p>Switch plans anytime with prorated billing. Changes take effect immediately with no setup fees.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">✓ Transparent pricing</p>
                <p>No setup fees, no hidden costs. Pay only for what you use with clearly defined limits and overage rates.</p>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 text-sm md:text-base">
            All plans include access to our core AI image generation technology with 99.9% uptime SLA
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Enterprise teams with 10+ users? <a href="/contact" className="text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors">Contact us for volume pricing, custom integrations, and dedicated infrastructure</a>
          </p>
        </div>
      </div>
    </section>
  );
};