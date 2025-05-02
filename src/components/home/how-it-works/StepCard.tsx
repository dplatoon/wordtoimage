
import React from 'react';
import { motion } from 'framer-motion';
import type { Step } from './stepsData';

interface StepCardProps {
  step: Step;
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
          {step.illustration ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-2">{step.demoContent}</p>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={step.illustration} 
                  alt={`${step.title} illustration`} 
                  className="w-full h-auto"
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">{step.demoContent}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
