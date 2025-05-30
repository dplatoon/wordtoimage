
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
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            <span>AI-Powered Creative Studio</span>
            <Zap className="w-4 h-4 ml-2" />
          </motion.div>
          
          {/* Main H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6 sm:mb-8 px-4 sm:px-6 lg:px-0">
            <span className="block">
              Transform Text into
            </span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Stunning Images
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-cyan-300">
              with AI
            </span>
          </h1>
          
          {/* Subtitle */}
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4 sm:px-6 lg:px-0 font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create stunning AI-generated visuals from simple text descriptions.
            <span className="block mt-3 text-cyan-300 font-medium text-base sm:text-lg md:text-xl lg:text-2xl">
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
                  <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg">1</div>
                  <span className="font-semibold">Describe</span>
                </div>
                <ArrowRight className="h-5 w-5 text-cyan-300 rotate-90 sm:rotate-0 animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
                  <span className="font-semibold">Generate</span>
                </div>
                <ArrowRight className="h-5 w-5 text-cyan-300 rotate-90 sm:rotate-0 animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
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
            {/* Primary CTA */}
            <Button 
              size="lg" 
              className="bg-teal-500 hover:bg-pink-500 text-white font-bold px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[56px] w-full sm:w-auto" 
              asChild
            >
              <Link to="/text-to-image">
                <span className="flex items-center justify-center gap-3">
                  <Wand2 className="h-7 w-7 transition-transform group-hover:rotate-12" />
                  <span className="font-bold">Start Creating Now</span>
                </span>
              </Link>
            </Button>
            
            {/* Secondary CTA */}
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-10 py-8 text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[56px] w-full sm:w-auto"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-cyan-300 px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Free to try</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="font-medium">4K quality images</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="font-medium">50+ AI styles</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
