
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wand2, TrendingUp } from 'lucide-react';
import { localGalleryImages } from '@/utils/imageUtils';
import { OptimizedImage } from '@/components/common/OptimizedImage';

export const OptimizedGallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const images = localGalleryImages.slice(0, 8);
  const trendingStyles = ['Cyberpunk', 'Fantasy Art', 'Abstract Digital'];
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 
            id="gallery-heading" 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            AI Image Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the possibilities of AI-generated imagery with our showcase of stunning creations
          </p>
        </motion.div>
        
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          role="grid"
          aria-label="Gallery of AI-generated images"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-square bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group relative border border-gray-200"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              role="gridcell"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setHoveredIndex(index);
                }
              }}
              aria-label={`AI generated image: ${image.alt}. Style: ${image.style || 'Default'}`}
            >
              {/* Trending Badge */}
              {image.style && trendingStyles.includes(image.style) && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <TrendingUp className="h-3 w-3" aria-hidden="true" />
                    <span>Trending</span>
                  </div>
                </div>
              )}
              
              <OptimizedImage
                src={image.src}
                alt={`AI generated artwork: ${image.alt}`}
                className={`w-full h-full transition-transform duration-500 ${
                  hoveredIndex === index ? 'scale-110' : 'scale-100'
                }`}
                priority={index < 2}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={hoveredIndex !== index}
              >
                <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
                  {image.alt}
                </h3>
                {image.style && (
                  <p className="text-white/80 text-xs">
                    Style: <span className="text-blue-300">{image.style}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join thousands of creators who use our AI to bring their ideas to life. 
              Start creating professional-quality images in seconds.
            </p>
            
            <Button 
              size="lg"
              className="btn-ai-primary text-lg h-14 px-8 group focus-ring" 
              asChild
            >
              <Link to="/text-to-image" aria-describedby="gallery-cta-description">
                <Wand2 className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
                Start Creating Now
              </Link>
            </Button>
            
            <p id="gallery-cta-description" className="mt-4 text-sm text-gray-500">
              Free to try • No credit card required • Instant results
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
