
import React from 'react';
import { StyleCard } from './controls/StyleCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { OptimizedImage } from '@/components/performance/OptimizedImage';

interface Style {
  id: string;
  label: string;
  image: string;
  color?: string;
  description?: string;
}

const STYLE_OPTIONS: Style[] = [
  {
    id: 'auto',
    label: 'Auto',
    image: '/lovable-uploads/4034377e-d4f1-439d-b479-367253c12770.png',
    color: '#8B5CF6',
    description: 'Let AI choose the best style'
  },
  {
    id: '3d_anime',
    label: '3D Anime',
    image: '/lovable-uploads/99f5c8dc-6b8d-4daf-81a1-ff186d0ee10a.png',
    color: '#F87171',
    description: 'Modern 3D anime characters'
  },
  {
    id: '3d_model',
    label: '3D Model',
    image: '/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png',
    color: '#06B6D4',
    description: 'Realistic 3D rendered models'
  },
  {
    id: 'japanese_anime',
    label: 'Anime',
    image: '/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png',
    color: '#F59E0B',
    description: 'Traditional anime/manga style'
  },
  {
    id: 'movie',
    label: 'Movie',
    image: '/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png',
    color: '#8B5CF6',
    description: 'Cinematic movie scenes'
  },
  {
    id: 'comic',
    label: 'Comic',
    image: '/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png',
    color: '#0EA5E9',
    description: 'Comic book illustration style'
  }
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

export const StyleSelector = ({ selectedStyle, onStyleChange }: StyleSelectorProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
        Select Style
        <span className="text-sm text-gray-500 font-normal">
          Choose how your image should look
        </span>
      </h3>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className={`grid gap-3 overflow-x-auto pb-2 hide-scrollbar ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {STYLE_OPTIONS.map(style => (
            <div
              key={style.id}
              className={`flex flex-col items-center justify-end relative overflow-hidden rounded-lg border h-[90px] md:h-[108px] w-full transition-all duration-200 cursor-pointer group ${
                selectedStyle === style.id 
                  ? "border-violet-600 ring-2 ring-violet-400" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onStyleChange(style.id)}
              aria-label={`Select ${style.label} style`}
              title={style.description}
            >
              <OptimizedImage
                src={style.image}
                alt={`${style.label} AI art style example`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                enableCompression={true}
                quality={0.85}
                lazy={true}
                structuredData={{
                  caption: `${style.label} style preview`,
                  creator: 'AI Generated',
                  keywords: [style.label.toLowerCase(), 'AI art style']
                }}
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1 md:p-2 z-10">
                <p className="text-white text-xs md:text-sm font-medium text-center line-clamp-1">
                  {style.label}
                </p>
              </div>
              
              {selectedStyle === style.id && (
                <div className="absolute inset-0 bg-violet-500/20 flex items-center justify-center z-20">
                  <div className="bg-violet-600 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button 
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-1 hidden md:flex items-center justify-center hover:bg-gray-50 transition-colors z-30"
          aria-label="Show previous styles"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <button 
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-1 hidden md:flex items-center justify-center hover:bg-gray-50 transition-colors z-30"
          aria-label="Show more styles"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
