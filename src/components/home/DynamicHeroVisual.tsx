
import { useState, useEffect } from 'react';
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
          <div className={`h-12 bg-brand-slate-50 rounded-lg flex items-center px-4 text-brand-slate-600 text-sm mb-3 transition-transform duration-300 ${isGenerating ? 'scale-102' : ''}`}>
            {showcaseImages[currentImageIndex]?.alt || "Creating beautiful artwork..."}
          </div>
          
          <button className={`w-full h-12 bg-gradient-to-r from-brand-navy to-brand-purple text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-102 active:scale-98`}>
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
          </button>
        </div>
      </div>

      {/* Dynamic Image Showcase */}
      <div className="relative aspect-square bg-gradient-to-br from-brand-slate-100 to-brand-slate-50 rounded-2xl overflow-hidden shadow-brand border border-brand-slate-200">
        <div key={currentImageIndex} className="absolute inset-0 animate-fade-in">
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
        </div>

        {/* Generation Effect Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/20 to-brand-purple/20 backdrop-blur-[1px] flex items-center justify-center animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-3 border-brand-teal border-t-transparent rounded-full animate-spin" />
                <span className="text-brand-slate-700 font-medium">Creating magic...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {showcaseImages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-brand-teal w-6' : 'bg-brand-slate-300 w-2'
            } ${isGenerating && index === currentImageIndex ? 'animate-pulse' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};
