
import { useState, useEffect } from 'react';
import React from 'react';
import { Wand2, PenTool, Download } from 'lucide-react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const steps = [
    {
      title: "Enter Your Text",
      description: "Input any text or phrase that you want to visualize. Our AI understands complex descriptions and contexts.",
      icon: PenTool,
      color: "bg-blue-100 text-blue-600",
      demoContent: "Type your prompt here, like 'A sunset over a calm ocean with sailboats on the horizon'...",
    },
    {
      title: "Choose a Style",
      description: "Select from a variety of artistic styles, from photorealistic to abstract art and everything in between.",
      icon: Wand2,
      color: "bg-purple-100 text-purple-600",
      demoContent: "Choose your preferred style: Photorealistic, Watercolor, Oil Painting, Digital Art, Sketch...",
    },
    {
      title: "Generate & Download",
      description: "Our AI instantly creates your image. Preview, adjust if needed, and download in high resolution.",
      icon: Download,
      color: "bg-green-100 text-green-600",
      demoContent: "Your image is ready! Click to download in PNG, JPG, or SVG formats.",
    }
  ];
  
  // Auto-advance demo when playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);
  
  const handlePlayDemo = () => {
    setIsPlaying(!isPlaying);
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into images in just three simple steps
          </p>
          
          <div className="mt-6 mb-10">
            <Button 
              onClick={handlePlayDemo} 
              variant="outline" 
              className="border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <span className="w-4 h-4 bg-blue-600 rounded"></span>
                  Stop Demo
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Watch Interactive Demo
                </>
              )}
            </Button>
          </div>
        </motion.div>
        
        {/* Desktop version - Timeline */}
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
              <motion.div
                key={index}
                className={`p-6 rounded-xl border ${index === activeStep ? 'border-blue-300 shadow-md' : 'border-gray-200'} 
                  cursor-pointer transition-all`}
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                }}
                variants={fadeIn}
                initial="hidden"
                animate={index === activeStep ? "visible" : { opacity: 0.7 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                {index === activeStep && (
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
            ))}
          </div>
        </div>
        
        {/* Mobile version - Vertical Steps */}
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
        
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              const heroSection = document.querySelector('.image-generation-section');
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Try It Now
            <Wand2 className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
