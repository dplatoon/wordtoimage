
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  step: {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    demoContent: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const StepCard: React.FC<StepCardProps> = ({ 
  step, 
  index, 
  isActive, 
  onClick 
}) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className={`p-6 rounded-xl border ${isActive ? 'border-blue-300 shadow-md' : 'border-gray-200'} 
        cursor-pointer transition-all`}
      onClick={onClick}
      variants={fadeIn}
      initial="hidden"
      animate={isActive ? "visible" : { opacity: 0.7 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4`}>
        <step.icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
      <p className="text-gray-600 mb-4">{step.description}</p>
      
      {isActive && (
        <motion.div 
          className="mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-500">{step.demoContent}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
