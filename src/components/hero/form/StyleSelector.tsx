
import React from 'react';
import { StyleCard } from './controls/StyleCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Style {
  id: string;
  label: string;
  image: string;
  color?: string;
}

const STYLE_OPTIONS: Style[] = [
  {
    id: 'auto',
    label: 'Auto',
    image: '/lovable-uploads/4034377e-d4f1-439d-b479-367253c12770.png',
    color: '#8B5CF6'
  },
  {
    id: '3d_anime',
    label: '3D Anime',
    image: '/lovable-uploads/99f5c8dc-6b8d-4daf-81a1-ff186d0ee10a.png',
    color: '#F87171'
  },
  {
    id: '3d_model',
    label: '3D Model',
    image: 'https://placehold.co/300x200/4ECDC4/fff?text=3D+Model',
    color: '#06B6D4'
  },
  {
    id: 'japanese_anime',
    label: 'Anime',
    image: 'https://placehold.co/300x200/FF8C42/fff?text=Anime',
    color: '#F59E0B'
  },
  {
    id: 'movie',
    label: 'Movie',
    image: 'https://placehold.co/300x200/6A0572/fff?text=Movie',
    color: '#8B5CF6'
  },
  {
    id: 'comic',
    label: 'Comic',
    image: 'https://placehold.co/300x200/1A535C/fff?text=Comic',
    color: '#0EA5E9'
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
      <h3 className="font-medium text-gray-800 mb-3">Select Style</h3>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className={`grid gap-3 overflow-x-auto pb-2 hide-scrollbar ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {STYLE_OPTIONS.map(style => (
            <StyleCard
              key={style.id}
              image={style.image}
              label={style.label}
              selected={selectedStyle === style.id}
              onClick={() => onStyleChange(style.id)}
              color={style.color}
            />
          ))}
        </div>
        
        <button 
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-1 hidden md:flex items-center justify-center"
          aria-label="Show previous styles"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <button 
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-1 hidden md:flex items-center justify-center"
          aria-label="Show more styles"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
