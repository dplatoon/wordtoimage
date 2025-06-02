
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 images per month", "Standard quality", "Basic styles", "Personal use"],
    cta: "Get Started",
    href: "/text-to-image",
    popular: false
  },
  {
    name: "Pro",
    price: "$9",
    period: "month",
    features: ["Unlimited images", "4K quality", "50+ styles", "Commercial license", "Priority support"],
    cta: "Start Free Trial",
    href: "/pricing",
    popular: true
  },
  {
    name: "Team",
    price: "$29",
    period: "month",
    features: ["Everything in Pro", "Team collaboration", "API access", "Custom styles", "Dedicated support"],
    cta: "Contact Sales",
    href: "/contact",
    popular: false
  }
];

export const StaticPricingSection = () => {
  return (
    <section className="py-16 bg-white" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="pricing-heading" className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that works best for you
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <article
              key={index}
              className={`relative bg-white p-8 rounded-2xl border-2 ${
                plan.popular ? 'border-indigo-600 shadow-lg' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <header className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
              </header>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={plan.href}
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
