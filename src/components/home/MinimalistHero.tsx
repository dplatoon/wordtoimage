
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2, Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MinimalistHeroProps {
  onShowProFeatures: () => void;
}

export const MinimalistHero = ({ onShowProFeatures }: MinimalistHeroProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Professional background with subtle pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-slate-50 via-white to-brand-slate-50/50" />
      </div>
      
      {/* Hero content with improved mobile typography and spacing */}
      <div className="content-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Professional badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-sm font-medium mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 bg-brand-teal rounded-full mr-2 animate-pulse"></span>
            AI-Powered Creative Studio
          </motion.div>
          
          <h1 className="font-inter font-bold tracking-tight text-brand-slate-900 leading-tight mb-6 sm:mb-8 px-4 sm:px-6 lg:px-0">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl block">
              Turn Your Words Into
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl block mt-2 sm:mt-3 text-gradient-brand">
              Stunning Images
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block mt-2 sm:mt-3 font-medium">
              Instantly
            </span>
          </h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-brand-slate-600 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ lineHeight: '1.7' }}
          >
            Create beautiful AI-generated visuals from simple text descriptions.
            <span className="block mt-3 sm:mt-2 text-base sm:text-lg text-brand-slate-500 font-medium">
              No design skills required.
            </span>
          </motion.p>

          {/* How it Works Summary */}
          <motion.div
            className="max-w-3xl mx-auto mb-8 sm:mb-10 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-white/80 backdrop-blur-sm border border-brand-slate-200 rounded-2xl p-6 sm:p-8 shadow-subtle">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-brand-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center text-white font-semibold text-sm">1</div>
                  <span className="font-medium">Describe your image</span>
                </div>
                <ArrowRight className="h-5 w-5 text-brand-slate-400 rotate-90 sm:rotate-0" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center text-white font-semibold text-sm">2</div>
                  <span className="font-medium">Choose your style</span>
                </div>
                <ArrowRight className="h-5 w-5 text-brand-slate-400 rotate-90 sm:rotate-0" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-coral rounded-full flex items-center justify-center text-white font-semibold text-sm">3</div>
                  <span className="font-medium">Generate instantly</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="btn-primary group w-full sm:w-auto" 
              asChild
            >
              <Link to="/text-to-image">
                Get Started Free
                <Wand2 className="ml-3 h-5 w-5 transition-transform group-hover:rotate-12" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-outline group w-full sm:w-auto"
              onClick={onShowProFeatures}
            >
              See Examples
              <Play className="ml-3 h-4 w-4 fill-current transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          {/* Enhanced Trust indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-brand-slate-500 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
              Free tier available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
              Professional quality
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements - hidden on mobile for cleaner look */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-brand-navy/10 rounded-full opacity-60 hidden lg:block"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-brand-purple/10 rounded-full opacity-60 hidden lg:block"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-brand-teal rounded-full opacity-40 hidden lg:block animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-brand-coral rounded-full opacity-40 hidden lg:block animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};
