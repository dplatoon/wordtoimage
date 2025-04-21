
import { useState } from "react";
import { Check, X, CreditCard, Users } from "lucide-react";
import { Button } from './ui/button';
import { PaymentMethodModal } from './PaymentMethodModal';

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out WordToImage",
    features: [
      { included: true, text: "5 designs per month" },
      { included: true, text: "Basic templates" },
      { included: true, text: "720p resolution" },
      { included: false, text: "Premium templates" },
      { included: false, text: "No watermarks" },
      { included: false, text: "Brand kit" }
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    disabled: true // Free plan cannot use payment
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for creators and influencers",
    popular: true,
    features: [
      { included: true, text: "Unlimited designs" },
      { included: true, text: "All templates" },
      { included: true, text: "1080p resolution" },
      { included: true, text: "Premium templates" },
      { included: true, text: "No watermarks" },
      { included: false, text: "Brand kit" }
    ],
    buttonText: "Get Pro",
    buttonVariant: "default" as const,
    disabled: false
  },
  {
    name: "Business",
    price: "$19.99",
    description: "For teams and businesses",
    features: [
      { included: true, text: "Unlimited designs" },
      { included: true, text: "All templates" },
      { included: true, text: "4K resolution" },
      { included: true, text: "Premium templates" },
      { included: true, text: "No watermarks" },
      { included: true, text: "Brand kit" }
    ],
    buttonText: "Get Business",
    buttonVariant: "outline" as const,
    disabled: false
  }
];

export const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include core WordToImage features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`
                rounded-xl border p-8 relative flex flex-col
                ${plan.popular ? 'shadow-lg border-blue-200 bg-blue-50/30' : 'bg-white'}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full font-medium text-sm">
                  Most Popular
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0" />
                    )}
                    <span className={`${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.buttonVariant} 
                className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                disabled={plan.disabled}
                onClick={() => {
                  if (!plan.disabled) {
                    setSelectedPlan(plan.name);
                    setPaymentModalOpen(true);
                  }
                }}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Need a custom plan for your team?</h3>
          <p className="text-gray-600 mt-1">Contact our sales team for custom pricing and features tailored to your needs.</p>
          <Button variant="link" className="text-blue-600 mt-2">
            Contact Sales
          </Button>
        </div>
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        planName={selectedPlan}
      />
    </section>
  );
};
