
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const StaticPricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "5 images per day",
        "Basic AI styles",
        "Standard quality",
        "Community support"
      ],
      cta: "Get Started",
      href: "/text-to-image",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      features: [
        "Unlimited images",
        "50+ premium styles",
        "4K high resolution",
        "Priority support",
        "Commercial license"
      ],
      cta: "Start Free Trial",
      href: "/pricing",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: [
        "Custom AI models",
        "API access",
        "White-label solution",
        "Dedicated support",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your creative needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white p-8 rounded-xl shadow-sm border-2 ${
              plan.popular ? 'border-violet-500' : 'border-gray-200'
            } relative`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-violet-600 hover:bg-violet-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                <Link to={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
