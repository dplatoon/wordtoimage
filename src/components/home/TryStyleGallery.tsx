import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LazyImage } from '@/components/common/LazyImage';

interface Style {
  id: string;
  name: string;
  imageUrl: string;
  prompt: string;
  description: string;
}

const TOP_STYLES: Style[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    imageUrl: '/lovable-uploads/4034377e-d4f1-439d-b479-367253c12770.png',
    prompt: 'cyberpunk city with neon lights, futuristic architecture, rain-soaked streets',
    description: 'Neon-lit futuristic cityscapes'
  },
  {
    id: 'anime',
    name: 'Anime',
    imageUrl: '/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png',
    prompt: 'anime style character portrait, vibrant colors, detailed features',
    description: 'Japanese animation style art'
  },
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    imageUrl: '/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png',
    prompt: 'photorealistic portrait, ultra detailed, professional photography',
    description: 'Ultra-realistic photography'
  },
  {
    id: 'digital_art',
    name: 'Digital Art',
    imageUrl: '/lovable-uploads/99f5c8dc-6b8d-4daf-81a1-ff186d0ee10a.png',
    prompt: 'digital art illustration, vibrant colors, modern abstract style',
    description: 'Modern digital illustrations'
  },
  {
    id: 'movie',
    name: 'Cinematic',
    imageUrl: '/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png',
    prompt: 'cinematic movie scene, dramatic lighting, epic composition',
    description: 'Hollywood movie scenes'
  },
  {
    id: 'comic',
    name: 'Comic Book',
    imageUrl: '/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png',
    prompt: 'comic book style illustration, bold colors, dynamic action',
    description: 'Comic book illustrations'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    imageUrl: '/lovable-uploads/4034377e-d4f1-439d-b479-367253c12770.png',
    prompt: 'watercolor painting, soft brushstrokes, artistic style',
    description: 'Soft watercolor paintings'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    imageUrl: '/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png',
    prompt: 'fantasy artwork, magical creatures, mystical landscapes',
    description: 'Magical fantasy worlds'
  }
];

export const TryStyleGallery = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleStyleClick = (style: Style) => {
    navigate(`/text-to-image?style=${style.id}&prompt=${encodeURIComponent(style.prompt)}`);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-sm font-medium mb-4">
            <Palette className="w-4 h-4 mr-2" />
            Try a Style
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore AI <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Art Styles</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click any style to instantly start creating with that artistic approach
          </p>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TOP_STYLES.map((style, index) => (
              <div
                key={style.id}
                className="flex-shrink-0 w-72 group cursor-pointer"
                onClick={() => handleStyleClick(style)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <LazyImage
                      src={style.imageUrl}
                      alt={`${style.name} AI art style example`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      aspectRatio={16/9}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        size="sm" 
                        className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white transition-colors"
                      >
                        Try {style.name}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                      {style.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {style.description}
                    </p>
                    
                    {/* Example Prompt */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Example prompt:</p>
                      <p className="text-sm text-gray-700 line-clamp-2 font-medium">
                        "{style.prompt}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-3 hover:shadow-xl transition-shadow z-10 hidden md:flex items-center justify-center"
            onClick={scrollLeft}
            aria-label="Scroll to previous styles"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-3 hover:shadow-xl transition-shadow z-10 hidden md:flex items-center justify-center"
            onClick={scrollRight}
            aria-label="Scroll to more styles"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* View All Styles CTA */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-violet-200 text-violet-600 hover:bg-violet-50"
            onClick={() => navigate('/gallery')}
          >
            View All 50+ Styles
          </Button>
        </div>
      </div>
    </section>
  );
};