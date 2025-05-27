
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { localGalleryImages } from '@/utils/imageUtils';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { useLazyLoading } from '@/hooks/useLazyLoading';

export const ImageShowcaseGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [containerRef, isInView] = useLazyLoading<HTMLDivElement>({ rootMargin: '100px' });
  const images = localGalleryImages.slice(0, 8);
  
  return (
    <div className="space-y-8 sm:space-y-12" ref={containerRef}>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="aspect-square relative overflow-hidden rounded-xl sm:rounded-2xl shadow-subtle hover:shadow-modern transition-all duration-300 group bg-white border border-brand-slate-100"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            {isInView && (
              <>
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  priority={index < 2}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-brand-slate-900/80 via-brand-slate-900/20 to-transparent flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p className="text-white text-xs sm:text-sm font-medium line-clamp-2 mb-1">{image.alt}</p>
                  {image.style && (
                    <p className="text-white/80 text-xs">
                      Style: <span className="text-brand-teal">{image.style}</span>
                    </p>
                  )}
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 bg-brand-teal rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Professional CTA section with improved mobile layout */}
      <motion.div 
        className="text-center pt-6 sm:pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="bg-white rounded-xl sm:rounded-2xl border border-brand-slate-200 p-6 sm:p-8 md:p-12 shadow-modern max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-inter font-semibold text-brand-slate-900 mb-3 sm:mb-4 leading-tight">
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
            <Link to="/text-to-image">
              Start Creating Now
              <Wand2 className="ml-3 h-5 w-5 transition-transform group-hover:rotate-12" />
            </Link>
          </Button>
          
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-brand-slate-500">
            Free to try • No credit card required • Instant results
          </p>
        </div>
      </motion.div>
    </div>
  );
};
