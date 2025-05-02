
import React from 'react';
import { motion } from 'framer-motion';
import { StepCard } from './StepCard';
import type { Step } from './stepsData';

interface DesktopTimelineProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (index: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const DesktopTimeline: React.FC<DesktopTimelineProps> = ({
  steps,
  activeStep,
  setActiveStep,
  setIsPlaying
}) => {
  return (
    <div className="hidden md:block">
      <div className="flex items-center justify-center mb-16">
        <div className="w-full max-w-4xl bg-gray-200 h-1 relative">
          {steps.map((_, index) => (
            <motion.div 
              key={index}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
               ${index <= activeStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
              style={{ left: `calc(${(index / (steps.length - 1)) * 100}% - 1rem)` }}
              onClick={() => {
                setActiveStep(index);
                setIsPlaying(false);
              }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              {index + 1}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            step={step}
            index={index}
            isActive={index === activeStep}
            onClick={() => {
              setActiveStep(index);
              setIsPlaying(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};
