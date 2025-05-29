import { useState } from 'react';
import { BillingToggle } from './BillingToggle';
import { PlanCard } from './PlanCard';
import { SubscriptionStatus } from '@/components/SubscriptionStatus';
import { useSubscription } from '@/contexts/SubscriptionContext';

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
    <section className="py-16 relative overflow-hidden" aria-labelledby="pricing-heading">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <BillingToggle
          billingCycle={billingCycle}
          onToggle={setBillingCycle}
          discount={20}
        />

        {/* Subscription Status Display */}
        <div className="flex justify-center mb-8">
          <SubscriptionStatus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-6" role="list" aria-label="Pricing plans">
          {pricingPlans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              billingCycle={billingCycle}
              isCurrentPlan={plan.name === currentPlan}
            />
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" id="help-choosing">Need help choosing the right plan?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900 mb-2">✓ Easy upgrades & downgrades</p>
                <p>Switch plans anytime with prorated billing. Changes take effect immediately with no setup fees.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">✓ Transparent pricing</p>
                <p>No setup fees, no hidden costs. Pay only for what you use with clearly defined limits and overage rates.</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            All plans include access to our core AI image generation technology with 99.9% uptime SLA
          </p>
          <p className="text-sm text-gray-500">
            Enterprise teams with 10+ users? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">Contact us for volume pricing, custom integrations, and dedicated infrastructure</a>
          </p>
        </div>
      </div>
    </section>
  );
};
