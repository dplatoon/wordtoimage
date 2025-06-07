
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CtaGeneratorSection = () => {
  return (
    <section className="py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-white shadow-xl">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-white opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white opacity-5 translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Transform Text to Image in Seconds</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Create stunning visuals from simple text descriptions with our AI-powered generator. No design skills needed.
            </p>
            <Button 
              className="bg-white text-indigo-600 hover:bg-gray-100 text-lg shadow-lg px-8 py-6 transform transition-transform hover:scale-105"
              asChild
            >
              <Link to="/text-to-image">
                <Image className="mr-2 h-5 w-5" />
                Start Creating Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
