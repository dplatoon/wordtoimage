
import React from 'react';
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
  return (
    <div
      className={`p-6 rounded-xl border ${isActive ? 'border-primary/50 shadow-md animate-fade-in' : 'border-border opacity-70'} 
        cursor-pointer transition-all hover:shadow-lg bg-card`}
      onClick={onClick}
    >
      <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4`}>
        <step.icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
      <p className="text-muted-foreground mb-4">{step.description}</p>
      
      {isActive && (
        <div 
          className="mt-4 p-4 bg-background border border-border rounded-md shadow-sm animate-fade-in"
        >
          {step.illustration ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-2">{step.demoContent}</p>
              <div className="rounded-lg overflow-hidden border border-border">
                <img 
                  src={step.illustration} 
                  alt={`${step.title} illustration`} 
                  className="w-full h-auto"
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{step.demoContent}</p>
          )}
        </div>
      )}
    </div>
  );
};
