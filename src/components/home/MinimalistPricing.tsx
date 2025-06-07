
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MinimalistPricingProps {
  onShowProFeatures: () => void;
}

export const MinimalistPricing = ({ onShowProFeatures }: MinimalistPricingProps) => {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out the platform',
      price: {
        monthly: '$0',
        yearly: '$0',
      },
      features: [
        '50 images per month',
        'Standard resolution',
        'Basic image editing',
        'Community support',
        'Personal use only'
      ],
      cta: 'Get Started',
      ctaLink: '/text-to-image',
      highlighted: false
    },
    {
      name: 'Pro',
      description: 'For creators and professionals',
      price: {
        monthly: '$19',
        yearly: '$190',
      },
      yearlyDiscount: 'Save $38',
      features: [
        '500 images per month',
        'HD resolution',
        'Advanced editing options',
        'Priority support',
        'Commercial usage rights',
        'Remove watermarks'
      ],
      cta: 'Upgrade to Pro',
      ctaLink: '/pricing',
      highlighted: true
    },
    {
      name: 'Business',
      description: 'For teams and enterprises',
      price: {
        monthly: '$49',
        yearly: '$490',
      },
      yearlyDiscount: 'Save $98',
      features: [
        'Unlimited images',
        '4K resolution',
        'API access',
        'Dedicated support',
        'Multiple team seats',
        'Custom branding',
        'Advanced analytics'
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlighted: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Simple Pricing</h2>
        <p className="mt-4 text-xl text-gray-600">Choose the plan that's right for you</p>
        
        {/* Billing interval toggle */}
        <div className="mt-6 inline-flex items-center p-1 bg-gray-100 rounded-full">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              billingInterval === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              billingInterval === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Yearly <span className="text-xs text-green-600 font-bold">Save 20%</span>
          </button>
        </div>
      </div>
      
      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl overflow-hidden border animate-fade-in ${
              plan.highlighted ? 'border-indigo-500 shadow-xl' : 'border-gray-200 shadow-sm'
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {plan.highlighted && (
              <div className="bg-indigo-500 py-1 px-4 text-center">
                <p className="text-xs font-medium text-white">MOST POPULAR</p>
              </div>
            )}
            
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-gray-900">{plan.price[billingInterval]}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {billingInterval === 'monthly' ? 'per month' : 'per year'}
                </p>
                {billingInterval === 'yearly' && plan.yearlyDiscount && (
                  <p className="text-sm font-medium text-green-600 mt-1">{plan.yearlyDiscount}</p>
                )}
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className={`w-full ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    : "border-gray-300"
                } rounded-full`}
                onClick={plan.name === 'Pro' ? onShowProFeatures : undefined}
                asChild={plan.name !== 'Pro'}
              >
                {plan.name === 'Pro' ? (
                  <span>{plan.cta}</span>
                ) : (
                  <Link to={plan.ctaLink}>{plan.cta}</Link>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* FAQ tooltip */}
      <div className="text-center mt-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-gray-500 hover:text-gray-700 flex items-center mx-auto">
              <HelpCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">Need help choosing a plan?</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                Not sure which plan is right for you? Start with the Free plan and upgrade anytime.
                Or contact our sales team for customized solutions.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
