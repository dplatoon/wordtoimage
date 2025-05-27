
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Zap, Info } from 'lucide-react';
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
  guarantee
}: PlanCardProps) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  const currentPrice = billingCycle === 'monthly' ? price.monthly : price.annual;
  const monthlyPrice = billingCycle === 'annual' ? price.annual : price.monthly;
  const yearlyTotal = price.annual * 12;
  const savings = billingCycle === 'annual' ? Math.round((1 - (yearlyTotal / (price.monthly * 12))) * 100) : 0;

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
      'Team workspace': 'Shared account with individual user management and centralized billing.'
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
        className={`relative rounded-2xl overflow-hidden ${
          popular
            ? 'ring-2 ring-blue-500 shadow-xl scale-105'
            : 'border border-gray-200 shadow-sm hover:shadow-lg'
        } transition-all duration-300`}
      >
        {popular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Most Popular
            </div>
          </div>
        )}

        {badge && !popular && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {badge}
            </span>
          </div>
        )}

        <div className="p-8 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
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

          <ul className="space-y-3 mb-8">
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
                  }`}>
                    {feature.included ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm ${
                      feature.included 
                        ? feature.highlight 
                          ? 'text-gray-900 font-medium' 
                          : 'text-gray-700'
                        : 'text-gray-400'
                    }`}>
                      {feature.name}
                    </span>
                    {tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
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
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : ctaVariant === 'outline'
                ? 'border-gray-300 hover:bg-gray-50'
                : ''
            }`}
            size="lg"
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
