
import { motion } from 'framer-motion';

interface BillingToggleProps {
  billingCycle: 'monthly' | 'annual';
  onToggle: (cycle: 'monthly' | 'annual') => void;
  discount?: number;
}

export const BillingToggle = ({ billingCycle, onToggle, discount = 20 }: BillingToggleProps) => {
  return (
    <div className="flex items-center justify-center mb-16">
      <div 
        className="relative inline-flex items-center p-1 border border-gray-300 rounded-xl bg-white shadow-sm"
        role="group"
        aria-label="Billing cycle selection"
      >
        <motion.div
          className="absolute inset-1 bg-blue-600 rounded-lg shadow-sm"
          initial={false}
          animate={{
            x: billingCycle === 'monthly' ? 0 : '100%',
            width: billingCycle === 'monthly' ? '50%' : '50%'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          aria-hidden="true"
        />
        
        <button
          onClick={() => onToggle('monthly')}
          className={`relative z-10 px-8 py-3 text-base font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            billingCycle === 'monthly' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
          aria-pressed={billingCycle === 'monthly'}
          aria-label="Select monthly billing"
        >
          Monthly
        </button>
        
        <button
          onClick={() => onToggle('annual')}
          className={`relative z-10 px-8 py-3 text-base font-medium transition-colors duration-200 rounded-lg flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            billingCycle === 'annual' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
          aria-pressed={billingCycle === 'annual'}
          aria-label={`Select annual billing and save ${discount} percent`}
        >
          Annual
          <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
            billingCycle === 'annual' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800'
          }`} aria-label={`${discount} percent discount`}>
            Save {discount}%
          </span>
        </button>
      </div>
    </div>
  );
};
