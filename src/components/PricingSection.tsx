
import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
      ctaColor: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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
      ctaColor: 'bg-blue-600 text-white hover:bg-blue-700'
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
      ctaColor: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const discount = 20; // 20% discount for annual billing

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            <span>Pricing</span>
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Affordable Plans for Everyone
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs, from free to enterprise-grade features
          </p>
          
          <div className="mt-8 inline-flex items-center p-1 border border-gray-300 rounded-lg bg-white">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                billingCycle === 'annual'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Annual <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">Save {discount}%</span>
            </button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? 'ring-2 ring-blue-500 shadow-xl'
                  : 'border border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-extrabold">
                    ${billingCycle === 'annual' ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
                </div>
                {billingCycle === 'annual' && plan.price.annual !== 0 && (
                  <p className="mt-1 text-xs text-green-600">Billed annually (${(plan.price.annual * 12).toFixed(2)})</p>
                )}
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="ml-2 text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations && plan.limitations.map((limitation, limitationIndex) => (
                    <li key={`limitation-${limitationIndex}`} className="flex">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-5 w-5 text-gray-400 shrink-0" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Limitation of the free plan</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="ml-2 text-sm text-gray-400 line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`mt-8 w-full ${plan.ctaColor}`}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
