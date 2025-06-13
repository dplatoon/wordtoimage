
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, ArrowRight, Users, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FastHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 overflow-hidden">
      {/* Optimized background pattern - CSS only, no images */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Trust indicators - Load immediately */}
          <div className="inline-flex items-center gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="font-medium">50,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="font-medium">10M+ Images Created</span>
            </div>
          </div>

          {/* Main headline - Optimized for conversion */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Create Stunning Images from
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              Any Text in Seconds
            </span>
          </h1>

          {/* Value proposition */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators using AI to transform ideas into professional visuals.
            <strong className="text-gray-900"> No design skills required.</strong>
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              asChild
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link to="/text-to-image">
                Start Creating Free
                <Wand2 className={`ml-2 h-5 w-5 transition-transform ${isHovered ? 'rotate-12' : ''}`} />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors px-8 py-6"
              asChild
            >
              <Link to="#demo">
                Watch Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by creative professionals worldwide</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {/* Company logos as simple text for now - will be replaced with optimized logos later */}
              <div className="text-sm font-semibold text-gray-400">TechCorp</div>
              <div className="text-sm font-semibold text-gray-400">DesignStudio</div>
              <div className="text-sm font-semibold text-gray-400">CreateCo</div>
              <div className="text-sm font-semibold text-gray-400">ArtLabs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance optimized decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
};
