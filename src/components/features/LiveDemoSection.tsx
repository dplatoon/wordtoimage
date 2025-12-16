
import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/common/OptimizedImage';

const demoSteps = [
  {
    title: "Enter Your Prompt",
    description: "Type a description of what you want to create",
    example: "A majestic dragon soaring over a mystical forest",
    image: "/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png"
  },
  {
    title: "Choose Your Style",
    description: "Select from our library of artistic styles",
    example: "Fantasy Art style selected",
    image: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png"
  },
  {
    title: "Generate & Download",
    description: "Get your high-quality image in seconds",
    example: "4K resolution image ready for download",
    image: "/lovable-uploads/fa9c9164-9cf5-482f-9a30-662c41b9b386.png"
  }
];

export const LiveDemoSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
      
      setTimeout(() => {
        clearInterval(interval);
        setIsPlaying(false);
      }, 9000);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how easy it is to create stunning AI images in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={togglePlay}
                variant="neon"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Pause Demo' : 'Play Demo'}
              </Button>
              <Button variant="glass" onClick={resetDemo}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {demoSteps.map((step, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  currentStep === index 
                    ? 'border-primary bg-primary/10 shadow-neon' 
                    : 'border-primary/20 bg-card/30 backdrop-blur-xl hover:border-primary/40'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    <p className="text-sm text-primary font-medium">
                      Example: {step.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <OptimizedImage
                src={demoSteps[currentStep].image}
                alt={`Demo step ${currentStep + 1}: ${demoSteps[currentStep].title}`}
                className="w-full max-w-md rounded-xl shadow-neon border border-primary/20"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl"></div>
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Step {currentStep + 1} of {demoSteps.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
