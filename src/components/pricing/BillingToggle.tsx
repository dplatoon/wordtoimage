
import { motion } from 'framer-motion';

interface BillingToggleProps {
  billingCycle: 'monthly' | 'annual';
  onToggle: (cycle: 'monthly' | 'annual') => void;
  discount?: number;
}

export const BillingToggle = ({ billingCycle, onToggle, discount = 20 }: BillingToggleProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="relative inline-flex items-center p-1 border border-gray-300 rounded-xl bg-white shadow-sm">
        <motion.div
          className="absolute inset-1 bg-blue-600 rounded-lg"
          initial={false}
          animate={{
            x: billingCycle === 'monthly' ? 0 : '100%',
            width: billingCycle === 'monthly' ? '50%' : '50%'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        
        <button
          onClick={() => onToggle('monthly')}
          className={`relative z-10 px-6 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
            billingCycle === 'monthly' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          Monthly
        </button>
        
        <button
          onClick={() => onToggle('annual')}
          className={`relative z-10 px-6 py-3 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center gap-2 ${
            billingCycle === 'annual' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          Annual
          <span className={`text-xs px-2 py-1 rounded-full ${
            billingCycle === 'annual' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800'
          }`}>
            Save {discount}%
          </span>
        </button>
      </div>
    </div>
  );
};
