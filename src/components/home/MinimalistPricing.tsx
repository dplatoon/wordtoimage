
import { Check, Sparkles, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MinimalistPricingProps {
  onShowProFeatures: () => void;
}

export const MinimalistPricing = ({ onShowProFeatures }: MinimalistPricingProps) => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out AI image generation",
      icon: Sparkles,
      features: [
        "5 images per day",
        "Standard quality (512x512)",
        "Basic AI styles",
        "Community support",
        "No watermark"
      ],
      cta: "Start Free",
      popular: false,
      color: "gray"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For creators and professionals",
      icon: Crown,
      features: [
        "Unlimited images",
        "HD & 4K quality",
        "50+ premium AI styles",
        "Priority processing",
        "Commercial license",
        "Priority support"
      ],
      cta: "Upgrade to Pro",
      popular: true,
      color: "indigo"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and businesses",
      icon: Zap,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Custom AI training",
        "Dedicated support",
        "Advanced analytics"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "purple"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your creative needs. Start free and upgrade as you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular 
                  ? 'border-indigo-500 ring-4 ring-indigo-100 scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                  plan.color === 'indigo' ? 'bg-indigo-100' :
                  plan.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <plan.icon className={`h-8 w-8 ${
                    plan.color === 'indigo' ? 'text-indigo-600' :
                    plan.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                } transition-all duration-300 transform hover:scale-105`}
                onClick={onShowProFeatures}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
