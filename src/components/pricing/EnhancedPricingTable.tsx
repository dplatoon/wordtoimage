
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
    <section className="py-24 relative overflow-hidden" aria-labelledby="pricing-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with improved typography */}
        <header className="text-center mb-16">
          <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-readable">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 text-readable line-height-reading">
            Transparent pricing with no hidden fees. Start free, upgrade when you're ready, and cancel anytime with our flexible plans designed for every creator.
          </p>
        </header>

        <BillingToggle
          billingCycle={billingCycle}
          onToggle={setBillingCycle}
          discount={20}
        />

        {/* Subscription Status Display with improved spacing */}
        <div className="flex justify-center mb-16">
          <SubscriptionStatus />
        </div>

        {/* Pricing Cards Grid with improved responsive design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-20">
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

        {/* Enhanced Bottom Section with better organization */}
        <div className="text-center space-y-8 mt-16 pt-12 border-t border-gray-200">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-5xl mx-auto shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-readable">Why Choose WordToImage?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-gray-600">
              <div className="text-left">
                <p className="font-medium text-gray-900 mb-3 text-readable">✓ Easy Plan Changes</p>
                <p className="text-readable line-height-reading">Switch plans anytime with prorated billing. Changes take effect immediately with no downtime.</p>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 mb-3 text-readable">✓ Transparent Pricing</p>
                <p className="text-readable line-height-reading">No setup fees, no hidden costs. Pay only for what you use with crystal-clear limits and features.</p>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 mb-3 text-readable">✓ 99.9% Uptime SLA</p>
                <p className="text-readable line-height-reading">Reliable service you can count on with enterprise-grade infrastructure and monitoring.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 text-lg text-readable line-height-reading">
              All plans include access to our core AI technology with industry-leading performance
            </p>
            <p className="text-sm text-gray-500 text-readable">
              Enterprise teams with 10+ users? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded underline">Contact us for volume pricing and custom solutions</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
