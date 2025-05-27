
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Zap, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { PaymentMethodModal } from '@/components/PaymentMethodModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

interface PlanCardProps {
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  billingCycle: 'monthly' | 'annual';
  features: PlanFeature[];
  popular?: boolean;
  ctaText: string;
  ctaVariant?: 'default' | 'outline';
  productId?: string;
  badge?: string;
  icon?: React.ReactNode;
  guarantee?: string;
  isFree?: boolean;
}

export const PlanCard = ({
  name,
  description,
  price,
  billingCycle,
  features,
  popular,
  ctaText,
  ctaVariant = 'default',
  productId,
  badge,
  icon,
  guarantee,
  isFree
}: PlanCardProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  const currentPrice = billingCycle === 'monthly' ? price.monthly : price.annual;
  const monthlyPrice = billingCycle === 'annual' ? price.annual : price.monthly;
  const yearlyTotal = price.annual * 12;
  const savings = billingCycle === 'annual' && price.monthly > 0 ? Math.round((1 - (yearlyTotal / (price.monthly * 12))) * 100) : 0;

  const handlePlanSelect = () => {
    if (name === 'Free') {
      alert("You've selected the Free plan. No payment required - start creating immediately!");
      return;
    }
    setPaymentModalOpen(true);
  };

  const getIcon = () => {
    if (icon) return icon;
    if (name === 'Free') return <Zap className="h-5 w-5" />;
    if (name === 'Pro') return <Star className="h-5 w-5" />;
    if (name === 'Business' || name === 'Enterprise') return <Crown className="h-5 w-5" />;
    return <Zap className="h-5 w-5" />;
  };

  const getFeatureTooltip = (featureName: string) => {
    const tooltips: { [key: string]: string } = {
      'Fair use policy': 'Unlimited for normal business use. We monitor for abuse but most customers never hit limits.',
      'API access': 'Programmatic access to generate images from your own applications.',
      'White-label option': 'Remove all WordToImage branding from your generated images and interface.',
      'Extended commercial license': 'Includes rights to resell generated images and use in client work.',
      'Priority rendering queue': 'Your images are processed ahead of standard users during peak times.',
      'Team workspace': 'Shared account with individual user management and centralized billing.',
      'Community support': 'Access to community forum with peer support and basic documentation.',
      'Priority email support': 'Direct email support with faster response times during business hours.',
      'Dedicated phone & chat support': 'Direct phone and live chat access with priority queue placement.'
    };
    
    const key = Object.keys(tooltips).find(k => featureName.includes(k));
    return key ? tooltips[key] : null;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl overflow-hidden bg-white ${
          popular
            ? 'ring-2 ring-blue-500 shadow-xl scale-105 z-10'
            : 'border border-gray-200 shadow-lg hover:shadow-xl'
        } transition-all duration-300 hover:-translate-y-1`}
        role="listitem"
        aria-labelledby={`plan-${name.toLowerCase()}`}
      >
        {/* Free plan ribbon */}
        {isFree && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
              <Zap className="h-3 w-3" />
              FREE
            </div>
          </div>
        )}

        {/* Popular plan badge */}
        {popular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              Most Popular
            </div>
          </div>
        )}

        {/* Best value badge */}
        {badge && !popular && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
              <Crown className="h-3 w-3" />
              {badge}
            </div>
          </div>
        )}

        <div className="p-8 bg-gradient-to-b from-white to-gray-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900" id={`plan-${name.toLowerCase()}`}>{name}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900" aria-label={`${currentPrice} dollars`}>
                ${currentPrice}
              </span>
              <span className="text-gray-500 ml-1">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            
            {billingCycle === 'annual' && savings > 0 && (
              <p className="text-sm text-green-600 mt-1 font-medium">
                Save {savings}% with annual billing (${(price.monthly * 12 - yearlyTotal).toFixed(2)}/year savings)
              </p>
            )}
            
            {billingCycle === 'monthly' && price.annual > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Annual: ${price.annual}/month (billed ${price.annual * 12}/year)
              </p>
            )}
          </div>

          <ul className="space-y-3 mb-8" role="list" aria-label={`${name} plan features`}>
            {features.map((feature, index) => {
              const tooltip = getFeatureTooltip(feature.name);
              
              return (
                <li key={index} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    feature.included
                      ? feature.highlight
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                      : 'bg-gray-100'
                  }`} aria-hidden="true">
                    {feature.included ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-1">
                    <span className={`text-sm ${
                      feature.included 
                        ? feature.highlight 
                          ? 'text-gray-900 font-medium' 
                          : 'text-gray-700'
                        : 'text-gray-400 line-through'
                    }`}>
                      {feature.included ? feature.name : `${feature.name} (Not included)`}
                    </span>
                    {tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                              aria-label={`More information about ${feature.name}`}
                            >
                              <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <Button
            onClick={handlePlanSelect}
            variant={popular ? 'default' : ctaVariant}
            className={`w-full mb-4 ${
              popular
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                : ctaVariant === 'outline'
                ? 'border-gray-300 hover:bg-gray-50'
                : ''
            }`}
            size="lg"
            aria-label={`${ctaText} for ${name} plan`}
          >
            {ctaText}
          </Button>

          {guarantee && (
            <p className="text-xs text-center text-gray-500 border-t pt-3">
              {guarantee}
            </p>
          )}
        </div>
      </motion.div>

      <PaymentMethodModal 
        open={paymentModalOpen} 
        onOpenChange={setPaymentModalOpen}
        planName={name}
      />
    </>
  );
};
