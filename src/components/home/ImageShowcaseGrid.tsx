
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2, TrendingUp } from 'lucide-react';
import { localGalleryImages, defaultFallbackImage } from '@/utils/imageUtils';
import { LazyImage } from '@/components/common/LazyImage';
import { useEnhancedLazyLoading } from '@/hooks/useEnhancedLazyLoading';

export const ImageShowcaseGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [containerRef, isInView] = useEnhancedLazyLoading<HTMLDivElement>({ rootMargin: '100px' });
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const images = localGalleryImages.slice(0, 8);
  
  // Define trending styles (first 3 are trending)
  const trendingStyles = ['Cyberpunk', 'Fantasy Art', 'Abstract Digital'];
  
  const handleImageError = (index: number) => {
    console.log('Image failed to load at index:', index);
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index: number) => {
    console.log('Image loaded successfully at index:', index);
    setImageErrors(prev => ({ ...prev, [index]: false }));
  };
  
  return (
    <div className="space-y-8 sm:space-y-12" ref={containerRef} role="region" aria-labelledby="image-gallery-heading">
      <h3 id="image-gallery-heading" className="sr-only">AI Generated Image Gallery</h3>
      
      <div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
        role="grid"
        aria-label="Gallery of AI-generated images"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded-xl sm:rounded-2xl shadow-subtle hover:shadow-modern transition-all duration-300 group bg-white border border-brand-slate-100 animate-fade-in"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
            role="gridcell"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setHoveredIndex(index);
              }
            }}
            aria-label={`AI generated image: ${image.alt}. Style: ${image.style || 'Default'}`}
          >
            {isInView && (
              <>
                <img
                  src={imageErrors[index] ? defaultFallbackImage : image.src}
                  alt={`AI generated artwork: ${image.alt}`}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                />
                
                {/* Trending Badge */}
                {image.style && trendingStyles.includes(image.style) && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                    <div className="bg-gradient-to-r from-primary to-violet-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  </div>
                )}
                
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-brand-slate-900/80 via-brand-slate-900/20 to-transparent flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={hoveredIndex !== index}
                >
                  <p className="text-white text-xs sm:text-sm font-medium line-clamp-2 mb-1">{image.alt}</p>
                  {image.style && (
                    <p className="text-white/80 text-xs">
                      Style: <span className="text-brand-teal">{image.style}</span>
                    </p>
                  )}
                </div>
                
                {/* Decorative corner accent */}
                <div 
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 bg-brand-teal rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                ></div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Enhanced CTA section with accessibility */}
      <div 
        className="text-center pt-6 sm:pt-8 animate-fade-in"
        style={{ animationDelay: '0.2s' }}
        role="region"
        aria-labelledby="cta-heading"
      >
        <div className="bg-white rounded-xl sm:rounded-2xl border border-brand-slate-200 p-6 sm:p-8 md:p-12 shadow-modern max-w-2xl mx-auto">
          <h3 id="cta-heading" className="text-xl sm:text-2xl md:text-3xl font-inter font-semibold text-brand-slate-900 mb-3 sm:mb-4 leading-tight">
            Ready to Create Your Own?
          </h3>
          <p className="text-brand-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Join thousands of creators who use our AI to bring their ideas to life. 
            Start creating professional-quality images in seconds.
          </p>
          
          <Button 
            size="lg"
            className="btn-accent text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 group w-full sm:w-auto" 
            asChild
          >
            <Link to="/text-to-image" aria-describedby="cta-description">
              Start Creating Now
              <Wand2 className="ml-3 h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
            </Link>
          </Button>
          
          <p id="cta-description" className="mt-3 sm:mt-4 text-xs sm:text-sm text-brand-slate-500">
            Free to try • No credit card required • Instant results
          </p>
        </div>
      </div>
    </div>
  );
};
