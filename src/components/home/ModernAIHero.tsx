
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
          
          {/* Main Headline */}
          <h1 className="hero-title text-white leading-tight mb-6 sm:mb-8 px-4 sm:px-6 lg:px-0">
            <span className="block">
              Transform Your
            </span>
            <span className="block mt-2 text-gradient-neon">
              Words Into Magic
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-ai-accent">
              Instantly with AI
            </span>
          </h1>
          
          {/* Subtitle */}
          <motion.p 
            className="hero-subtitle text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create stunning AI-generated visuals from simple text descriptions.
            <span className="block mt-3 text-ai-accent font-medium">
              No design skills required • Professional quality • Lightning fast
            </span>
          </motion.p>

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
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-10 sm:mb-12 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold px-10 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto touch-target-large" 
              asChild
            >
              <Link to="/text-to-image">
                Start Creating Now
                <Wand2 className="ml-3 h-6 w-6 transition-transform group-hover:rotate-12" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              className="btn-ai-secondary group w-full sm:w-auto touch-target-large text-xl px-10 py-6 border-ai-neon text-ai-neon hover:bg-ai-neon hover:text-ai-dark"
              onClick={onShowProFeatures}
            >
              See Examples
              <Play className="ml-3 h-5 w-5 fill-current transition-transform group-hover:translate-x-1" />
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
