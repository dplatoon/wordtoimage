
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  demoContent: string;
}

interface MobileTimelineProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (index: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const MobileTimeline: React.FC<MobileTimelineProps> = ({
  steps,
  activeStep,
  setActiveStep,
  setIsPlaying
}) => {
  return (
    <div className="md:hidden">
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="flex"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="mr-4">
              <div 
                className={`w-10 h-10 ${index === activeStep ? 'bg-blue-600 text-white' : step.color} rounded-full flex items-center justify-center cursor-pointer`}
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                }}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && <div className="w-0.5 bg-gray-200 h-full mx-auto mt-2"></div>}
            </div>
            <div 
              className={`bg-white p-4 rounded-lg shadow-sm border flex-1 ${
                index === activeStep ? 'border-blue-300 shadow-md' : 'border-gray-100'
              }`}
              onClick={() => {
                setActiveStep(index);
                setIsPlaying(false);
              }}
            >
              <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mb-3`}>
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{step.description}</p>
              
              {index === activeStep && (
                <motion.div 
                  className="mt-3 pt-3 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-gray-500">{step.demoContent}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
