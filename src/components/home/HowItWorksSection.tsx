
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { steps } from './how-it-works/stepsData';
import { DesktopTimeline } from './how-it-works/DesktopTimeline';
import { MobileTimeline } from './how-it-works/MobileTimeline';
import { ActionButton } from './how-it-works/ActionButton';

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
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
            Simple Steps to Create Your Image
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
        <DesktopTimeline 
          steps={steps} 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
          setIsPlaying={setIsPlaying} 
        />
        
        {/* Mobile version - Vertical Steps */}
        <MobileTimeline 
          steps={steps} 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
          setIsPlaying={setIsPlaying} 
        />
        
        <ActionButton />
      </div>
    </section>
  );
};
