
import { useState } from 'react';
import { BillingToggle } from './BillingToggle';
import { PlanCard } from './PlanCard';

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
      { name: 'Personal use only', included: true },
      { name: 'Watermark on images', included: true },
      { name: 'HD resolution', included: false },
      { name: 'Commercial usage', included: false },
      { name: 'Priority support', included: false }
    ],
    ctaText: 'Start Free',
    ctaVariant: 'outline' as const
  },
  {
    name: 'Pro',
    description: 'For creators and professionals',
    price: { monthly: 19, annual: 15 },
    popular: true,
    features: [
      { name: '500 AI generations per month', included: true, highlight: true },
      { name: 'HD resolution (2048x2048)', included: true, highlight: true },
      { name: 'Advanced editing options', included: true },
      { name: 'Priority support', included: true },
      { name: 'Commercial usage rights', included: true, highlight: true },
      { name: 'No watermarks', included: true },
      { name: 'API access (1,000 calls/month)', included: true },
      { name: 'Custom styles', included: true },
      { name: 'Export in multiple formats', included: true }
    ],
    ctaText: 'Choose Pro',
    productId: 'prod_SEe2MxYit85qLo'
  },
  {
    name: 'Business',
    description: 'For teams and enterprises',
    price: { monthly: 49, annual: 39 },
    badge: 'Best Value',
    features: [
      { name: 'Unlimited AI generations', included: true, highlight: true },
      { name: '4K resolution (4096x4096)', included: true, highlight: true },
      { name: 'Team collaboration (5 seats)', included: true, highlight: true },
      { name: 'Dedicated support', included: true },
      { name: 'Extended commercial license', included: true },
      { name: 'API access (10,000 calls/month)', included: true },
      { name: 'Custom branding', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority rendering queue', included: true }
    ],
    ctaText: 'Contact Sales',
    productId: 'prod_SEe3iHfdBt84EE'
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

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include access to our core AI image generation technology
          </p>
          <p className="text-sm text-gray-500">
            Need a custom solution? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
};
