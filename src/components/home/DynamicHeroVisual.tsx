
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { localGalleryImages } from '@/utils/imageUtils';
import { Wand2, Sparkles } from 'lucide-react';

export const DynamicHeroVisual = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Select 4 high-quality images for the showcase
  const showcaseImages = localGalleryImages.slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGenerating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length);
        setIsGenerating(false);
      }, 800);
    }, 4000);

    return () => clearInterval(interval);
  }, [showcaseImages.length]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Generation Interface Mockup */}
      <div className="bg-white rounded-2xl shadow-brand-lg border border-brand-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-brand-teal to-brand-purple rounded-lg flex items-center justify-center">
            <Wand2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-brand-slate-700 font-medium">AI Image Generator</span>
        </div>
        
        <div className="relative">
          <motion.div
            className="h-12 bg-brand-slate-50 rounded-lg flex items-center px-4 text-brand-slate-600 text-sm mb-3"
            animate={isGenerating ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {showcaseImages[currentImageIndex]?.alt || "Creating beautiful artwork..."}
          </motion.div>
          
          <motion.button
            className="w-full h-12 bg-gradient-to-r from-brand-navy to-brand-purple text-white rounded-lg font-medium flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={isGenerating ? { 
              background: ["linear-gradient(to right, rgb(30, 58, 138), rgb(124, 58, 237))", 
                          "linear-gradient(to right, rgb(20, 184, 166), rgb(236, 72, 153))",
                          "linear-gradient(to right, rgb(30, 58, 138), rgb(124, 58, 237))"] 
            } : {}}
            transition={{ duration: 0.8 }}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Image
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Dynamic Image Showcase */}
      <div className="relative aspect-square bg-gradient-to-br from-brand-slate-100 to-brand-slate-50 rounded-2xl overflow-hidden shadow-brand border border-brand-slate-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotateY: 90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <OptimizedImage
              src={showcaseImages[currentImageIndex]?.src || ''}
              alt={`AI Generated: ${showcaseImages[currentImageIndex]?.alt || 'Beautiful artwork'}`}
              className="w-full h-full object-cover"
              priority={currentImageIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Style Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-medium">
                Style: {showcaseImages[currentImageIndex]?.style || 'AI Generated'}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Generation Effect Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-brand-teal/20 to-brand-purple/20 backdrop-blur-[1px] flex items-center justify-center"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-brand-teal border-t-transparent rounded-full animate-spin" />
                  <span className="text-brand-slate-700 font-medium">Creating magic...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {showcaseImages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-brand-teal w-6' : 'bg-brand-slate-300'
            }`}
            animate={isGenerating && index === currentImageIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};
