
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { localGalleryImages } from '@/utils/imageUtils';
import { OptimizedResponsiveImage } from '@/components/common/OptimizedResponsiveImage';

export const OptimizedFreeGeneratorHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % localGalleryImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToTool = () => {
    const toolSection = document.getElementById('generator-tool');
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Trust indicators */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-green-500" />
                <span className="font-medium">2M+ users</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-blue-500" />
                <span className="font-medium">100% Free</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-purple-500" />
                <span className="font-medium">Free Trial Available</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Create Stunning{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI Art
              </span>{' '}
              100% Free
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your ideas into beautiful images instantly. Start with a free trial, 
              no watermarks, no limits. Sign up to unlock unlimited generations and premium features.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Unlimited generations</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Multiple art styles</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Instant downloads</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Commercial usage</span>
              </div>
            </div>

            <Button 
              onClick={scrollToTool}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Generate Your First Image
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right side - Optimized Rotating Image Gallery */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {localGalleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <OptimizedResponsiveImage
                    src={image.src}
                    alt={`Free AI generated ${image.style}: ${image.alt}`}
                    className="w-full h-full"
                    priority={index === 0}
                    quality={90}
                    aspectRatio={1}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
              
              {/* Overlay with style indicator */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {localGalleryImages[currentImageIndex]?.style}
              </div>
              
              {/* Dots indicator */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {localGalleryImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
