
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
    <div className="py-16 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-purple-50/30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced section header */}
        <header className="text-center mb-16 space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transparent pricing with no hidden fees. Start free and upgrade anytime to unlock premium features.
            </p>
          </div>
          
          {/* Enhanced billing toggle section */}
          <div className="pt-4">
            <BillingToggle
              billingCycle={billingCycle}
              onToggle={setBillingCycle}
              discount={20}
            />
          </div>
        </header>

        {/* Enhanced subscription status */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
            <SubscriptionStatus />
          </div>
        </div>

        {/* Enhanced pricing cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.name} 
              className={`relative transform transition-all duration-300 hover:scale-102 ${
                plan.popular ? 'lg:scale-105 lg:z-20' : 'lg:z-10'
              }`}
            >
              <PlanCard
                {...plan}
                billingCycle={billingCycle}
                isCurrentPlan={plan.name === currentPlan}
              />
            </div>
          ))}
        </div>

        {/* Enhanced bottom information section */}
        <footer className="space-y-8 mt-16 pt-12 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose WordToImage?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Join thousands of creators who trust our platform for professional AI image generation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900">Easy Plan Changes</h4>
                <p className="text-sm text-gray-600">
                  Switch plans anytime with prorated billing. Changes take effect immediately.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold text-xl">$</span>
                </div>
                <h4 className="font-semibold text-gray-900">Transparent Pricing</h4>
                <p className="text-sm text-gray-600">
                  No setup fees, no hidden costs. Pay only for what you use with clear limits.
                </p>
              </div>
              
              <div className="text-center space-y-3 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold text-xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-900">99.9% Uptime SLA</h4>
                <p className="text-sm text-gray-600">
                  Reliable service with enterprise-grade infrastructure and support.
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced contact section */}
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700 font-medium">
              Need a custom solution for your team?
            </p>
            <p className="text-gray-600">
              Enterprise teams with 10+ users get volume pricing and dedicated support.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contact Sales Team
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
