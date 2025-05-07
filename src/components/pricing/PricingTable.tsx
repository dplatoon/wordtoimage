
import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PricingPlan {
  name: string;
  price: string;
  credits: number;
  keyPerks: string[];
  popular?: boolean;
  ctaText: string;
  ctaColor?: string;
}

export function PricingTable() {
  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: "$0",
      credits: 20,
      keyPerks: [
        "Per day 1 Credit",
        "Basic features",
        "Watermark on images",
        "Standard resolution"
      ],
      ctaText: "Get Started",
      ctaColor: "bg-gray-200 hover:bg-gray-300 text-gray-800"
    },
    {
      name: "Standard",
      price: "$9.99/mo",
      credits: 150,
      keyPerks: [
        "HD downloads",
        "Basic support",
        "No watermarks",
        "Commercial usage"
      ],
      ctaText: "Choose Standard",
      ctaColor: "bg-blue-600 hover:bg-blue-700 text-white"
    },
    {
      name: "Pro",
      price: "$14.99/mo",
      credits: 250,
      keyPerks: [
        "HD downloads",
        "Priority queue",
        "Premium support",
        "API access"
      ],
      popular: true,
      ctaText: "Choose Pro",
      ctaColor: "bg-blue-600 hover:bg-blue-700 text-white"
    },
    {
      name: "Business",
      price: "$29.99/mo",
      credits: 500,
      keyPerks: [
        "Unlimited HD",
        "Team collaboration",
        "Dedicated support",
        "Extended API access"
      ],
      ctaText: "Contact Sales",
      ctaColor: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
    }
  ];

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`bg-white rounded-xl shadow-md overflow-hidden border ${
              plan.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-center py-1 text-xs font-medium">
                Most Popular
              </div>
            )}
            
            <div className="p-5">
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              
              <div className="mb-3">
                <div className="text-2xl font-bold">{plan.price}</div>
                <div className="text-sm text-gray-500">
                  {plan.credits} credits
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {plan.keyPerks.map((perk, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{perk}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={`w-full mt-2 ${plan.ctaColor || ''}`}
                variant={plan.ctaColor ? "default" : "outline"}
              >
                {plan.ctaText}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        All plans include access to our core features. Additional credits can be purchased as needed.
      </p>
    </div>
  );
}
