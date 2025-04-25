
import { useState } from "react";
import { Check, X, CreditCard, Users } from "lucide-react";
import { Button } from './ui/button';
import { PaymentMethodModal } from './PaymentMethodModal';
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const calculateAnnualPrice = (monthlyPrice: number) => {
  const annualPrice = (monthlyPrice * 12 * 0.833).toFixed(2); // 2 months free
  return annualPrice;
};

const plans = [
  {
    name: "Free",
    price: "0",
    annualPrice: "0",
    description: "Perfect for trying out our platform",
    features: [
      { included: true, text: "10 AI image generations per month" },
      { included: true, text: "Basic templates" },
      { included: true, text: "Standard resolution" },
      { included: true, text: "Personal use license" },
      { included: false, text: "Priority queue" },
      { included: false, text: "HD downloads" },
      { included: false, text: "Team collaboration" }
    ],
    cta: "Start Free",
    buttonVariant: "outline" as const,
    disabled: true
  },
  {
    name: "Pro",
    price: "9.99",
    annualPrice: calculateAnnualPrice(9.99),
    description: "Perfect for individual creators",
    features: [
      { included: true, text: "250 AI image generations per month" },
      { included: true, text: "All templates" },
      { included: true, text: "High resolution" },
      { included: true, text: "Commercial use license" },
      { included: true, text: "Priority queue" },
      { included: false, text: "Unlimited HD downloads" },
      { included: false, text: "Team collaboration" }
    ],
    cta: "Subscribe",
    buttonVariant: "default" as const,
    popular: true,
    disabled: false,
    overageRate: "$0.05 per additional image"
  },
  {
    name: "Business",
    price: "24.99",
    annualPrice: calculateAnnualPrice(24.99),
    description: "For teams and growing businesses",
    features: [
      { included: true, text: "500 AI image generations per month" },
      { included: true, text: "All templates + priority support" },
      { included: true, text: "4K resolution" },
      { included: true, text: "Extended commercial license" },
      { included: true, text: "Priority generation queue" },
      { included: true, text: "Unlimited HD downloads" },
      { included: true, text: "Team collaboration (5 seats)" }
    ],
    cta: "Get Business",
    buttonVariant: "outline" as const,
    disabled: false,
    overageRate: "$0.04 per additional image"
  }
];

export const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your needs. All plans include our core features.
          </p>
          
          <div className="flex items-center justify-center mt-8 gap-3">
            <Label htmlFor="billing-toggle" className={!isAnnual ? "font-semibold" : ""}>Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className={isAnnual ? "font-semibold" : ""}>
              Annual <span className="text-green-600 font-medium">(Save 20%)</span>
            </Label>
          </div>
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
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.annualPrice : plan.price}
                  </span>
                  <span className="text-gray-500 ml-1">/{isAnnual ? 'year' : 'month'}</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
                {plan.overageRate && (
                  <li className="text-sm text-gray-600 mt-2">
                    Overage: {plan.overageRate}
                  </li>
                )}
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
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Need a custom enterprise plan?</h3>
          <p className="text-gray-600 mt-1">Contact our sales team for custom volume pricing and advanced features.</p>
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
