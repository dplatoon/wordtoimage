
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2, Play, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ModernAIHeroProps {
  onShowProFeatures: () => void;
}

export const ModernAIHero = ({ onShowProFeatures }: ModernAIHeroProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden bg-ai-hero-gradient">
      {/* AI-themed animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-ai-neon/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-ai-purple/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ai-coral/5 rounded-full blur-3xl animate-pulse-glow"></div>
        
        {/* Floating AI particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-ai-neon rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-ai-coral rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-ai-purple rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Hero content */}
      <div className="content-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-ai-neon/20 border border-ai-neon/30 text-ai-neon text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            AI-Powered Creative Studio
            <Zap className="w-4 h-4 ml-2" />
          </motion.div>
          
          {/* Main H1 - Proper semantic structure */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6 sm:mb-8 px-4 sm:px-6 lg:px-0">
            <span className="block">
              Transform Text into
            </span>
            <span className="block mt-2 text-gradient-neon">
              Stunning Images
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-ai-accent">
              with AI
            </span>
          </h1>
          
          {/* Subtitle - H2 for proper hierarchy */}
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4 sm:px-6 lg:px-0 font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create stunning AI-generated visuals from simple text descriptions.
            <span className="block mt-3 text-ai-accent font-medium text-base sm:text-lg md:text-xl lg:text-2xl">
              No design skills required • Professional quality • Lightning fast
            </span>
          </motion.h2>

          {/* How it Works Flow */}
          <motion.div
            className="max-w-4xl mx-auto mb-10 sm:mb-12 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ai-neon rounded-full flex items-center justify-center text-ai-dark font-bold text-lg shadow-lg">1</div>
                  <span className="font-semibold">Describe</span>
                </div>
                <ArrowRight className="h-5 w-5 text-ai-accent rotate-90 sm:rotate-0 animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ai-purple rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
                  <span className="font-semibold">Generate</span>
                </div>
                <ArrowRight className="h-5 w-5 text-ai-accent rotate-90 sm:rotate-0 animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ai-coral rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
                  <span className="font-semibold">Download</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced CTA Buttons with better contrast and visibility */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-10 sm:mb-12 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Primary CTA - Enhanced visibility and contrast */}
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-h-[56px] border-2 border-orange-400/50 hover:border-orange-300" 
              asChild
            >
              <Link to="/text-to-image">
                <span className="flex items-center justify-center gap-3">
                  <Wand2 className="h-7 w-7 transition-transform group-hover:rotate-12" />
                  <span className="font-extrabold text-shadow">Start Creating Now</span>
                </span>
              </Link>
            </Button>
            
            {/* Secondary CTA - Improved contrast */}
            <Button 
              size="lg" 
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold px-10 py-8 text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-h-[56px]"
              onClick={onShowProFeatures}
            >
              <span className="flex items-center justify-center gap-3">
                <Play className="h-6 w-6 fill-current transition-transform group-hover:translate-x-1" />
                <span>See Examples</span>
              </span>
            </Button>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-ai-accent px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ai-neon rounded-full animate-pulse"></div>
              Free to try
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ai-neon rounded-full animate-pulse"></div>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ai-neon rounded-full animate-pulse"></div>
              4K quality images
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ai-neon rounded-full animate-pulse"></div>
              50+ AI styles
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
