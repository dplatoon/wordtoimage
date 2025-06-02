
import { Link } from 'react-router-dom';
import { Wand2, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecorativeBackground } from './home/DecorativeBackground';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-24">
      <DecorativeBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Hero Title */}
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 leading-tight break-words max-w-4xl mx-auto mb-6">
          Transform Text into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Stunning Images</span> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">AI</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
          Harness the power of AI to create beautiful visuals from any text description. 
          <span className="block mt-2 text-gray-700 font-medium">
            No design skills required. Start creating in seconds.
          </span>
        </p>
        
        {/* How It Works Flow */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-gray-200 p-4 sm:p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">How it works:</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-700">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              <span className="text-sm sm:text-base break-normal">Describe your image</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" aria-hidden="true" />
            
            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
              <span className="text-sm sm:text-base break-normal">Choose your style</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" aria-hidden="true" />
            
            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
              <span className="text-sm sm:text-base break-normal">Download instantly</span>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 md:mb-8">
          <Link to="/text-to-image" className="w-full sm:w-auto">
            <Button className="min-h-[52px] w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl transition transform hover:scale-105">
              Create Your Image Now <Wand2 className="ml-3 h-6 w-6" />
            </Button>
          </Link>
          <Link to="/examples" className="w-full sm:w-auto">
            <Button variant="outline" className="min-h-[52px] w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
              See Examples <Play className="ml-3 h-5 w-5 fill-current" />
            </Button>
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600 px-4 sm:px-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Free to try</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Professional quality</span>
          </div>
        </div>
        
        {/* Skip Intro Link */}
        <div className="mt-6">
          <Link
            to="/text-to-image"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-lg underline decoration-2 underline-offset-4 hover:decoration-indigo-700 transition"
            aria-label="Skip intro - Start generating images"
          >
            Skip intro – Start generating images <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
