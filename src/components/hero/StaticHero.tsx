
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2, Play, ArrowRight } from 'lucide-react';

interface StaticHeroProps {
  onShowProFeatures: () => void;
}

export const StaticHero = ({ onShowProFeatures }: StaticHeroProps) => {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Simplified background - no animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* AI Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium mb-6 sm:mb-8">
          <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
          AI-Powered Creative Studio
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8">
          <span className="block">Transform Your</span>
          <span className="block mt-2 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Words Into Magic
          </span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-300">
            Instantly with AI
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Create stunning AI-generated visuals from simple text descriptions.
          <span className="block mt-3 text-violet-300 font-medium">
            No design skills required • Professional quality • Lightning fast
          </span>
        </p>

        {/* How it Works Flow */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                <span className="font-semibold">Describe</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                <span className="font-semibold">Generate</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                <span className="font-semibold">Download</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold px-10 py-6 text-xl rounded-xl shadow-lg transition-all duration-300 w-full sm:w-auto" 
            asChild
          >
            <Link to="/text-to-image">
              Start Creating Now
              <Wand2 className="ml-3 h-6 w-6" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            className="border-2 border-violet-400 text-violet-400 bg-transparent hover:bg-violet-400 hover:text-slate-900 w-full sm:w-auto text-xl px-10 py-6 rounded-xl transition-all duration-300"
            onClick={onShowProFeatures}
          >
            See Examples
            <Play className="ml-3 h-5 w-5" />
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
            Free to try
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
            4K quality images
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
            50+ AI styles
          </div>
        </div>
      </div>
    </section>
  );
};
