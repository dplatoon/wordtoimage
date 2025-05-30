
import { motion } from 'framer-motion';

interface BillingToggleProps {
  billingCycle: 'monthly' | 'annual';
  onToggle: (cycle: 'monthly' | 'annual') => void;
  discount?: number;
}

export const BillingToggle = ({ billingCycle, onToggle, discount = 20 }: BillingToggleProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-flex items-center p-1.5 border-2 border-gray-200 rounded-2xl bg-white shadow-lg backdrop-blur-sm">
        {/* Enhanced animated background */}
        <motion.div
          className="absolute inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md"
          initial={false}
          animate={{
            x: billingCycle === 'monthly' ? 0 : '100%',
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            mass: 0.8
          }}
          aria-hidden="true"
        />
        
        {/* Enhanced monthly button */}
        <button
          onClick={() => onToggle('monthly')}
          className={`relative z-10 px-8 py-4 text-base font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[120px] ${
            billingCycle === 'monthly' 
              ? 'text-white shadow-sm' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
          }`}
          aria-pressed={billingCycle === 'monthly'}
          aria-label="Select monthly billing"
        >
          Monthly
        </button>
        
        {/* Enhanced annual button */}
        <button
          onClick={() => onToggle('annual')}
          className={`relative z-10 px-8 py-4 text-base font-semibold transition-all duration-300 rounded-xl flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[140px] ${
            billingCycle === 'annual' 
              ? 'text-white shadow-sm' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
          }`}
          aria-pressed={billingCycle === 'annual'}
          aria-label={`Select annual billing and save ${discount} percent`}
        >
          <span>Annual</span>
          <motion.span 
            className={`text-sm px-3 py-1.5 rounded-full font-bold transition-all duration-300 ${
              billingCycle === 'annual' 
                ? 'bg-white/25 text-white shadow-sm' 
                : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 shadow-sm'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${discount} percent discount`}
          >
            Save {discount}%
          </motion.span>
        </button>
      </div>
      
      {/* Enhanced savings callout */}
      {billingCycle === 'annual' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute mt-20 text-center"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 shadow-sm">
            <p className="text-sm font-medium text-green-800">
              🎉 You'll save up to ${(14.99 * 12 - 11.99 * 12).toFixed(0)} per year!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
