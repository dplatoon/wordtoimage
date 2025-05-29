
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
      { name: '50 AI generations per month', included: true, highlight: true },
      { name: 'Standard resolution (1024x1024)', included: true },
      { name: 'Basic editing tools', included: true },
      { name: 'Community support', included: true },
      { name: 'Personal use license only', included: true },
      { name: 'WordToImage watermark on downloads', included: true },
      { name: 'HD resolution (2048x2048)', included: false },
      { name: 'Commercial usage rights', included: false },
      { name: 'Priority support', included: false }
    ],
    ctaText: 'Start Free',
    ctaVariant: 'outline' as const,
    guarantee: 'Free forever • No hidden fees',
    isFree: true
  },
  {
    name: 'Pro',
    description: 'Best for creators and professionals',
    price: { monthly: 14.99, annual: 11.99 },
    popular: true,
    features: [
      { name: '500 AI generations per month', included: true, highlight: true },
      { name: 'HD resolution up to 2048x2048', included: true, highlight: true },
      { name: 'Advanced editing suite', included: true },
      { name: 'Priority email support (24-hour response)', included: true },
      { name: 'Full commercial usage rights', included: true, highlight: true },
      { name: 'No watermarks on downloads', included: true },
      { name: 'API access (1,000 calls/month)', included: true },
      { name: 'Access to 50+ premium styles', included: true },
      { name: 'Export in multiple formats', included: true }
    ],
    ctaText: 'Choose Pro',
    productId: 'prod_SEe2MxYit85qLo',
    guarantee: '14-day money-back guarantee • Cancel anytime',
    badge: 'Most Popular'
  },
  {
    name: 'Enterprise',
    description: 'For teams and growing businesses',
    price: { monthly: 29.99, annual: 23.99 },
    features: [
      { name: 'Unlimited AI generations', included: true, highlight: true },
      { name: '4K resolution up to 4096x4096', included: true, highlight: true },
      { name: 'Team workspace for up to 5 users', included: true, highlight: true },
      { name: 'Dedicated phone & chat support', included: true },
      { name: 'Extended commercial license', included: true },
      { name: 'Advanced API access (10,000 calls/month)', included: true },
      { name: 'White-label option', included: true },
      { name: 'Usage analytics dashboard', included: true },
      { name: 'Priority rendering queue', included: true }
    ],
    ctaText: 'Choose Enterprise',
    productId: 'prod_SEe3iHfdBt84EE',
    guarantee: '30-day money-back guarantee • Dedicated support'
  }
];

export const EnhancedPricingTable = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { planName: currentPlan } = useSubscription();

  return (
    <section className="py-16 relative overflow-hidden" aria-labelledby="pricing-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Transparent pricing with no hidden fees. Upgrade or cancel anytime.
          </p>
        </div>

        <BillingToggle
          billingCycle={billingCycle}
          onToggle={setBillingCycle}
          discount={20}
        />

        {/* Subscription Status Display */}
        <div className="flex justify-center mb-12">
          <SubscriptionStatus />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-16">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative ${plan.popular ? 'lg:scale-105 lg:z-10' : ''}`}
            >
              <PlanCard
                {...plan}
                billingCycle={billingCycle}
                isCurrentPlan={plan.name === currentPlan}
              />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-6 mt-12 pt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need help choosing?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="text-left">
                <p className="font-medium text-gray-900 mb-2">✓ Easy Plan Changes</p>
                <p>Switch plans anytime with prorated billing. Changes take effect immediately.</p>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 mb-2">✓ Transparent Pricing</p>
                <p>No setup fees, no hidden costs. Pay only for what you use with clear limits.</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            All plans include access to our core AI technology with 99.9% uptime SLA
          </p>
          <p className="text-sm text-gray-500">
            Enterprise teams with 10+ users? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">Contact us for volume pricing</a>
          </p>
        </div>
      </div>
    </section>
  );
};
