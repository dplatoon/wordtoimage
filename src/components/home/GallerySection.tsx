
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { motion } from 'framer-motion';
import { localGalleryImages } from '@/utils/imageUtils';

export const GallerySection = () => {
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
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="w-full h-full relative overflow-hidden">
                <ResponsiveImage 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  width="300" 
                  height="300" 
                  trackEvent="gallery_home" 
                  fallbackSrc="/lovable-uploads/9baa5403-54fd-4d41-9dff-b6762b238e3e.png" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium truncate">{image.alt}</p>
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
