
import { Check } from 'lucide-react';
import { Button } from './ui/button';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started with Lovable.',
    price: '0',
    features: [
      'Post and share moments',
      'Like and comment on content',
      'Explore positivity gallery',
      'Basic profile customization',
      'Join community discussions'
    ],
    featured: false,
  },
  {
    name: 'Premium',
    description: 'Everything you need to make the most of Lovable.',
    price: '4.99',
    features: [
      'All Free plan features',
      'Exclusive stickers and GIFs',
      'Priority profile visibility',
      'Premium seasonal themes',
      'Ad-free experience',
      'Early access to new features'
    ],
    featured: true,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-lovable-softgray/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-poppins text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that works best for your needs.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-5xl lg:grid-cols-2">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`lovable-card flex flex-col ${plan.featured ? 'border-2 border-lovable-pink relative' : ''}`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-lovable-pink text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 font-poppins">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                  <span className="ml-1 text-lg text-gray-500">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className={`h-5 w-5 ${plan.featured ? 'text-lovable-rose' : 'text-gray-400'}`} />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Button 
                  className={`w-full ${plan.featured ? 'lovable-button-primary' : 'lovable-button-secondary'}`}
                >
                  Get {plan.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
