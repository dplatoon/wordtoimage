
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { motion } from 'framer-motion';

// Updated gallery images that showcase AI-generated art in different styles
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=600&q=80",
    alt: "AI-generated futuristic cityscape with neon lights"
  },
  {
    src: "https://images.unsplash.com/photo-1618331833071-ce81bd50d300?auto=format&fit=crop&w=600&q=80", 
    alt: "AI-generated abstract digital art with flowing colors"
  },
  {
    src: "https://images.unsplash.com/photo-1621075160523-b936ad96132a?auto=format&fit=crop&w=600&q=80", 
    alt: "AI-generated fantasy landscape with floating islands"
  },
  {
    src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&q=80", 
    alt: "AI-generated character portrait in anime style"
  },
  {
    src: "https://images.unsplash.com/photo-1633109740880-50e4c6d09f96?auto=format&fit=crop&w=600&q=80", 
    alt: "AI-generated surreal dreamscape"
  },
  {
    src: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80", 
    alt: "AI-generated cyberpunk scene"
  },
  {
    src: "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?auto=format&fit=crop&w=600&q=80", 
    alt: "AI-generated photorealistic natural landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=600&q=80",
    alt: "AI-generated digital painting of a mystical creature"
  }
];

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
          {galleryImages.map((image, i) => (
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
                  fallbackSrc="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80" 
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
