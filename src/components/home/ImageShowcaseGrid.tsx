
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { localGalleryImages } from '@/utils/imageUtils';

export const ImageShowcaseGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const images = localGalleryImages.slice(0, 8); // Only show the first 8 images
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className={`w-full h-full object-cover transition-transform duration-500 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`} 
            />
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-white text-sm font-medium line-clamp-2">{image.alt}</p>
              {image.style && <p className="text-white/70 text-xs mt-1">Style: {image.style}</p>}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md rounded-full px-8" 
          asChild
        >
          <Link to="/text-to-image">
            <Download className="mr-2 h-5 w-5" />
            Create Your Own
          </Link>
        </Button>
      </div>
    </div>
  );
};
