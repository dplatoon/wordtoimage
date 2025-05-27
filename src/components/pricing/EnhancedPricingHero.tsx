
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const EnhancedPricingHero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none px-6 py-2 text-lg">
            <Sparkles className="h-5 w-5 mr-2" />
            Simple, Transparent Pricing
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Perfect Plan</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From free exploration to professional creation, find the plan that matches your needs. 
            All plans include our core AI image generation with no setup fees.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>Trusted by 100,000+ creators worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
