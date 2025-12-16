
import { useState } from 'react';
import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for testing the waters',
      price: { monthly: 0, annual: 0 },
      features: [
        '10 image generations per month',
        'Basic styles and filters',
        'Standard resolution images',
        'Community support',
        'Watermarked downloads'
      ],
      limitations: [
        'Limited style options',
        'Standard resolution only',
        'Watermarked images'
      ],
      ctaText: 'Get Started',
      variant: 'glass' as const
    },
    {
      name: 'Pro',
      description: 'Best for individuals and creators',
      popular: true,
      price: { monthly: 9.99, annual: 7.99 },
      features: [
        'Unlimited image generations',
        'All styles and filters',
        'High-resolution downloads',
        'Priority support',
        'No watermarks',
        'API access (100 calls/day)',
        'Commercial usage rights'
      ],
      ctaText: 'Choose Pro',
      variant: 'neon' as const
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: { monthly: 29.99, annual: 24.99 },
      features: [
        'Everything in Pro',
        'Ultra high-resolution',
        'Dedicated account manager',
        'Custom style development',
        'Advanced API access (10,000 calls/day)',
        'White-label options',
        'Priority rendering'
      ],
      ctaText: 'Contact Sales',
      variant: 'neon' as const
    }
  ];

  const discount = 20;

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
            <span>Pricing</span>
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground font-poppins">
            Affordable Plans for Everyone
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs, from free to enterprise-grade features
          </p>
          
          <div className="mt-8 inline-flex items-center p-1 border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Save {discount}%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden animate-fade-in bg-card/30 backdrop-blur-xl ${
                plan.popular
                  ? 'ring-2 ring-primary shadow-neon'
                  : 'border border-primary/20 shadow-glass'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4 flex items-baseline text-foreground">
                  <span className="text-4xl font-extrabold">
                    ${billingCycle === 'annual' ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
                </div>
                {billingCycle === 'annual' && plan.price.annual !== 0 && (
                  <p className="mt-1 text-xs text-green-400">Billed annually (${(plan.price.annual * 12).toFixed(2)})</p>
                )}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <Check className="h-5 w-5 text-green-400 shrink-0" />
                      <span className="ml-2 text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations && plan.limitations.map((limitation, limitationIndex) => (
                    <li key={`limitation-${limitationIndex}`} className="flex">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-5 w-5 text-muted-foreground shrink-0" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Limitation of the free plan</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="ml-2 text-sm text-muted-foreground/50 line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.variant}
                  className="mt-8 w-full"
                >
                  {plan.ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
