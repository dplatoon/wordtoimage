
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
    <section className="hero-section-modern py-20 sm:py-28 md:py-36 lg:py-44">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ai-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-ai-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-ai-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="content-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* AI Badge with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-ai-gradient text-white text-sm font-semibold mb-8 shadow-lg hover-glow"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse-slow" />
            AI-Powered Creative Studio
            <Zap className="w-4 h-4 ml-2" />
          </motion.div>
          
          {/* Hero Title with improved typography hierarchy */}
          <h1 className="hero-title text-gray-900 mb-6 px-4 sm:px-6 lg:px-0">
            <span className="block">Transform Your Words Into</span>
            <span className="block mt-2 text-gradient-ai">
              Stunning AI Visuals
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-700">
              In Seconds
            </span>
          </h1>
          
          {/* Enhanced subtitle with better readability */}
          <motion.p 
            className="hero-subtitle text-gray-600 max-w-4xl mx-auto mb-8 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create beautiful AI-generated visuals from simple text descriptions.
            <span className="block mt-3 text-lg text-gray-500 font-medium">
              No design skills required. Professional results guaranteed.
            </span>
          </motion.p>

          {/* Enhanced How it Works with visual indicators */}
          <motion.div
            className="max-w-4xl mx-auto mb-10 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="ai-card-modern">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-gray-700">
                <div className="flex items-center gap-4 hover-lift">
                  <div className="w-12 h-12 bg-ai-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">1</div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Describe</div>
                    <div className="text-sm text-gray-500">Your image idea</div>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-ai-accent rotate-90 md:rotate-0" />
                <div className="flex items-center gap-4 hover-lift">
                  <div className="w-12 h-12 bg-ai-secondary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Customize</div>
                    <div className="text-sm text-gray-500">Style & settings</div>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-ai-accent rotate-90 md:rotate-0" />
                <div className="flex items-center gap-4 hover-lift">
                  <div className="w-12 h-12 bg-ai-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Generate</div>
                    <div className="text-sm text-gray-500">AI magic happens</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced CTA buttons with modern styling */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="btn-ai-primary group w-full sm:w-auto" 
              asChild
            >
              <Link to="/text-to-image">
                Start Creating Free
                <Wand2 className="ml-3 h-6 w-6 transition-transform group-hover:rotate-12" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              className="btn-ai-secondary group w-full sm:w-auto"
              onClick={onShowProFeatures}
            >
              See Examples
              <Play className="ml-3 h-5 w-5 fill-current transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          {/* Enhanced trust indicators with better visual design */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-gray-500 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 hover-lift">
              <div className="w-3 h-3 bg-ai-accent rounded-full animate-pulse-slow"></div>
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-3 hover-lift">
              <div className="w-3 h-3 bg-ai-accent rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              <span className="font-medium">Free tier available</span>
            </div>
            <div className="flex items-center gap-3 hover-lift">
              <div className="w-3 h-3 bg-ai-accent rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
              <span className="font-medium">Professional quality</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Subtle decorative elements */}
      <div className="absolute top-1/3 left-16 w-32 h-32 border border-ai-primary/20 rounded-full opacity-60 hidden lg:block animate-float"></div>
      <div className="absolute bottom-1/3 right-16 w-40 h-40 border border-ai-secondary/20 rounded-full opacity-60 hidden lg:block animate-float" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};
