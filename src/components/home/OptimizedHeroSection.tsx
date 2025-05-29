
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OptimizedHeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-ai-accent/5 via-white to-ai-purple/5 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      
      <div className="content-container relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Heading - Properly structured H1 */}
          <h1 
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-ai mb-6 leading-tight"
          >
            Transform Text Into
            <span className="block text-ai-accent">Stunning AI Images</span>
          </h1>
          
          {/* Supporting Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create professional-quality images from simple text descriptions. 
            Free AI art generator with 50+ styles and instant results.
          </p>
          
          {/* CTA Buttons - Optimized for mobile touch targets */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="btn-ai-primary w-full sm:w-auto min-h-[48px] px-8 text-lg group relative overflow-hidden"
              asChild
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link 
                to="/text-to-image"
                aria-describedby="primary-cta-description"
              >
                <Wand2 className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <motion.div
                  className="absolute inset-0 bg-ai-purple-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                />
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] px-8 text-lg border-ai-accent text-ai-primary hover:bg-ai-accent/5"
              asChild
            >
              <Link to="/features">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Features
              </Link>
            </Button>
          </div>
          
          {/* Supporting Information */}
          <div 
            id="primary-cta-description"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              Free daily generations
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              Commercial usage rights
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-ai-accent/10 rounded-full blur-xl animate-float" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-ai-purple/10 rounded-full blur-xl animate-float-delayed" aria-hidden="true" />
    </section>
  );
};
