
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShowcaseHeader } from './ShowcaseHeader';
import { ShowcaseGrid } from './ShowcaseGrid';
import { ShowcaseMobileCarousel } from './ShowcaseMobileCarousel';
import { localGalleryImages } from '@/utils/imageUtils';

export const ShowcaseSection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generate showcase items from our updated local gallery images
  const showcaseItems = localGalleryImages.slice(0, 6).map((image, index) => ({
    id: index + 1,
    imageUrl: image.src,
    prompt: image.alt,
    style: image.style,
    author: ["Alex M.", "Sophia R.", "Noah T.", "Emma K.", "Michael J.", "Lila P."][index % 6],
    likes: Math.floor(Math.random() * 300) + 100
  }));

  return (
    <section id="showcase" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ShowcaseHeader />
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <ShowcaseMobileCarousel 
            items={showcaseItems}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:block mt-8">
          <ShowcaseGrid 
            items={showcaseItems}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </div>
        
        {/* Explore more button */}
        <div className="text-center mt-12">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="outline"
              className="border-purple-400 text-purple-600 hover:bg-purple-50 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transform hover:scale-105 transition-all duration-300 min-h-[48px] px-6"
              onClick={() => navigate('/gallery')}
            >
              Explore More Creations
              <ImagePlus className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="mt-4 text-sm text-gray-500">
              Submit your own creations to be featured in our gallery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
