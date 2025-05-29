
import { Link } from 'react-router-dom';
import { Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { motion } from 'framer-motion';
import { localGalleryImages } from '@/utils/imageUtils';

export const GallerySection = () => {
  // Define trending styles
  const trendingStyles = ['Cyberpunk', 'Fantasy Art', 'Abstract Digital'];
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">AI Image Gallery</h2>
          <p className="mt-4 text-lg text-gray-600">Explore the possibilities of AI-generated imagery</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {localGalleryImages.map((image, i) => (
            <motion.div 
              key={i} 
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Trending Badge */}
              {image.style && trendingStyles.includes(image.style) && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <TrendingUp className="h-3 w-3" />
                    Hot
                  </div>
                </div>
              )}
              
              <div className="w-full h-full relative overflow-hidden">
                <ResponsiveImage 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  width="300" 
                  height="300" 
                  trackEvent="gallery_home" 
                  fallbackSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&crop=center" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-medium truncate">{image.alt}</p>
                    <p className="text-white/80 text-xs mt-1">Style: {image.style}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="default" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md" asChild>
            <Link to="/text-to-image">
              <Download className="mr-2 h-5 w-5" />
              Create Your Own
            </Link>
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            No credit card needed • Free trial available
          </p>
        </div>
      </div>
    </section>
  );
};
