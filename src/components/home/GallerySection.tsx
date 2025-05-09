
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';

// Gallery images with reliable sources
const galleryImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80", 
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80", 
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", 
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80", 
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80", 
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80", 
  "https://images.unsplash.com/photo-1633109741715-82b70739edc1?auto=format&fit=crop&w=600&q=80", 
  "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80"
];

export const GallerySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
          <p className="mt-4 text-lg text-gray-600">Examples of what you can create</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
              <ResponsiveImage 
                src={src} 
                alt={`AI generated image ${i + 1}`} 
                className="w-full h-full object-cover" 
                width="300" 
                height="300" 
                trackEvent="gallery_home" 
                fallbackSrc="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80" 
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50" asChild>
            <Link to="/text-to-image">
              <Download className="mr-2 h-5 w-5" />
              Create Your Own
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
