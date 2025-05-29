
import { Button } from '@/components/ui/button';
import { Wand2, Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HeroHeader = () => {
  const handleGenerateImageClick = () => {
    // Scroll to the image generation form
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnHowClick = () => {
    // Scroll to the how it works section
    const howItWorks = document.getElementById('how-it-works');
    if (howItWorks) {
      howItWorks.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="text-center mb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Main H1 - Semantic heading structure */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 font-poppins mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Transform Text into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Stunning Images
          </span>{' '}
          <span className="block mt-2">
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">AI</span>
          </span>
        </motion.h1>
        
        {/* Supporting H2 for semantic hierarchy */}
        <motion.h2 
          className="sr-only"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Free AI Image Generator - No Design Skills Required
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed text-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Harness the power of AI to create beautiful visuals from any text description.
          <span className="block mt-2 font-medium text-gray-700">
            No design skills required. Start creating in seconds.
          </span>
        </motion.p>
        
        {/* How it Works Preview */}
        <motion.div
          className="max-w-3xl mx-auto mb-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">How it works:</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">1</div>
              <span className="font-medium">Describe your image</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
              <span className="font-medium">Choose your style</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
              <span className="font-medium">Download instantly</span>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced CTA Section with high contrast */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <Button 
            size="lg" 
            className="btn-primary shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6 font-semibold"
            onClick={handleGenerateImageClick}
            aria-label="Start creating your AI image now - free and instant"
          >
            Create Your Image Now
            <Wand2 className="ml-3 h-6 w-6" aria-hidden="true" />
          </Button>
          
          <Button 
            size="lg" 
            className="btn-secondary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6 font-semibold border-2"
            onClick={handleLearnHowClick}
            aria-label="View examples and learn how WordToImage works"
          >
            See Examples
            <Play className="ml-3 h-5 w-5 fill-current" aria-hidden="true" />
          </Button>
        </motion.div>

        {/* Trust indicators with better visibility */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Free to try</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Professional quality</span>
          </div>
        </motion.div>

        {/* Additional CTA link for accessibility */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            to="/text-to-image"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-lg underline decoration-2 underline-offset-4 hover:decoration-indigo-700 transition-colors duration-200"
            aria-label="Go directly to the AI image generator tool"
          >
            Skip intro - Start generating images
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
};
