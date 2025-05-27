
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesHeroSection = () => {
  return (
    <section id="hero" className="py-12 md:py-20 relative">
      <div className="content-container">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-ai-primary to-ai-secondary text-white border-none px-6 py-2 text-lg">
              <Sparkles className="h-5 w-5 mr-2" />
              ✨ Powerful Features
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient-neon">Unleash Your</span>
              <br />
              <span className="text-white">Creative Potential</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your imagination into stunning visuals with our cutting-edge AI technology. 
              From concept to creation in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="btn-ai-neon text-lg px-8 py-4">
                Start Creating Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <Button className="btn-ai-outline text-lg px-8 py-4">
                Watch Demo
                <ImageIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
