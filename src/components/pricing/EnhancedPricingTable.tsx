
import { useState } from 'react';
import { BillingToggle } from './BillingToggle';
import { PlanCard } from './PlanCard';

const pricingPlans = [
  {
    name: 'Free',
    description: 'Perfect for trying out our platform',
    price: { monthly: 0, annual: 0 },
    features: [
      { name: '50 AI generations per month (resets monthly)', included: true, highlight: true },
      { name: 'Standard resolution (1024x1024)', included: true },
      { name: 'Basic editing tools (crop, resize, filters)', included: true },
      { name: 'Community support (48-hour response)', included: true },
      { name: 'Personal use license only', included: true },
      { name: 'WordToImage watermark on downloads', included: true },
      { name: 'HD resolution (2048x2048)', included: false },
      { name: 'Commercial usage rights', included: false },
      { name: 'Priority support (24-hour response)', included: false }
    ],
    ctaText: 'Start Free - No Credit Card Required',
    ctaVariant: 'outline' as const,
    guarantee: 'Free forever • No hidden fees'
  },
  {
    name: 'Pro',
    description: 'Best for creators and small businesses',
    price: { monthly: 19, annual: 15 },
    popular: true,
    features: [
      { name: '500 AI generations per month (resets monthly)', included: true, highlight: true },
      { name: 'HD resolution up to 2048x2048', included: true, highlight: true },
      { name: 'Advanced editing suite (backgrounds, styles, effects)', included: true },
      { name: 'Priority email support (24-hour response)', included: true },
      { name: 'Full commercial usage rights', included: true, highlight: true },
      { name: 'No watermarks on any downloads', included: true },
      { name: 'API access (1,000 calls/month)', included: true },
      { name: 'Access to 50+ premium styles', included: true },
      { name: 'Export in PNG, JPG, WebP formats', included: true }
    ],
    ctaText: 'Start Pro Trial',
    productId: 'prod_SEe2MxYit85qLo',
    guarantee: '14-day money-back guarantee • Cancel anytime'
  },
  {
    name: 'Business',
    description: 'For teams and growing businesses',
    price: { monthly: 49, annual: 39 },
    badge: 'Most Popular',
    features: [
      { name: 'Unlimited AI generations (fair use policy)', included: true, highlight: true },
      { name: '4K resolution up to 4096x4096', included: true, highlight: true },
      { name: 'Team workspace for up to 5 users', included: true, highlight: true },
      { name: 'Dedicated phone & chat support (4-hour response)', included: true },
      { name: 'Extended commercial license (resale rights)', included: true },
      { name: 'Advanced API access (10,000 calls/month)', included: true },
      { name: 'White-label option (remove all branding)', included: true },
      { name: 'Usage analytics and team reporting', included: true },
      { name: 'Priority rendering queue (2x faster)', included: true }
    ],
    ctaText: 'Start Business Trial',
    productId: 'prod_SEe3iHfdBt84EE',
    guarantee: '30-day money-back guarantee • Dedicated account manager'
  }
];

export const EnhancedPricingTable = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BillingToggle
          billingCycle={billingCycle}
          onToggle={setBillingCycle}
          discount={20}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="bg-blue-50 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need help choosing the right plan?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900 mb-2">✓ Easy upgrades & downgrades</p>
                <p>Switch plans anytime with prorated billing. Changes take effect immediately.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">✓ Transparent pricing</p>
                <p>No setup fees, no hidden costs. Pay only for what you use with clear limits.</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            All plans include access to our core AI image generation technology with 99.9% uptime SLA
          </p>
          <p className="text-sm text-gray-500">
            Enterprise teams with 10+ users? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact our sales team</a> for volume pricing, custom integrations, and dedicated infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
};
