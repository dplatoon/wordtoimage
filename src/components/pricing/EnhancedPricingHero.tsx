import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const EnhancedPricingHero = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple, Transparent Pricing</span>
          </motion.div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" id="pricing-heading">
            <span className="text-foreground">Choose Your </span>
            <span className="bg-gradient-to-r from-primary via-neon-coral to-neon-amber bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            From free exploration to professional creation, find the plan that matches your needs. 
            All plans include our core AI image generation with no setup fees or hidden costs.
          </p>
          
          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/50"
          >
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Trusted by 100,000+ creators worldwide</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};