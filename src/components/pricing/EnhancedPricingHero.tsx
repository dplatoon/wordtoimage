
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles } from 'lucide-react';

export const EnhancedPricingHero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-purple-200/15 rounded-full blur-2xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="animate-fade-in">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none px-6 py-2 text-lg shadow-lg">
            <Sparkles className="h-5 w-5 mr-2" />
            Simple, Transparent Pricing
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6" id="pricing-heading">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Perfect Plan</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From free exploration to professional creation, find the plan that matches your needs. 
            All plans include our core AI image generation with no setup fees or hidden costs.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>Trusted by 100,000+ creators worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};
