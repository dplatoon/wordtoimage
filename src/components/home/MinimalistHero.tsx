
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2, Play } from 'lucide-react';
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
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Professional background with subtle pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-slate-50 via-white to-brand-slate-50/50" />
      </div>
      
      {/* Hero content with better typography and spacing */}
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-brand-teal rounded-full mr-2 animate-pulse"></span>
            AI-Powered Creative Studio
          </motion.div>
          
          <h1 className="font-inter font-bold tracking-tight text-brand-slate-900 leading-tight mb-8">
            Turn Your Words Into <br className="hidden md:block" />
            <span className="text-gradient-brand">
              Stunning Images
            </span> Instantly
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-brand-slate-600 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create beautiful AI-generated visuals from simple text descriptions.
            <span className="block mt-2 text-lg text-brand-slate-500">No design skills required.</span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="btn-primary text-lg h-14 px-10 group" 
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
              className="btn-outline text-lg h-14 px-10 group"
              onClick={onShowProFeatures}
            >
              See Examples
              <Play className="ml-3 h-4 w-4 fill-current transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-brand-slate-500"
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
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-brand-navy/10 rounded-full opacity-60 hidden lg:block"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-brand-purple/10 rounded-full opacity-60 hidden lg:block"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-brand-teal rounded-full opacity-40 hidden lg:block animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-brand-coral rounded-full opacity-40 hidden lg:block animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};
