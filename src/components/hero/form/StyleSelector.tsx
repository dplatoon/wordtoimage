
import React from 'react';
import { StyleCard } from './controls/StyleCard';
import { ChevronRight } from 'lucide-react';

interface Style {
  id: string;
  label: string;
  image: string;
}

const STYLE_OPTIONS: Style[] = [
  {
    id: 'auto',
    label: 'Auto',
    image: 'https://placehold.co/300x200/8B5CF6/fff?text=Auto'
  },
  {
    id: '3d_anime',
    label: '3D Anime',
    image: 'https://placehold.co/300x200/FF6B6B/fff?text=3D+Anime'
  },
  {
    id: '3d_model',
    label: '3D Model',
    image: 'https://placehold.co/300x200/4ECDC4/fff?text=3D+Model'
  },
  {
    id: 'japanese_anime',
    label: 'Japanese Anime',
    image: 'https://placehold.co/300x200/FF8C42/fff?text=Japanese+Anime'
  },
  {
    id: 'movie',
    label: 'Movie',
    image: 'https://placehold.co/300x200/6A0572/fff?text=Movie'
  },
  {
    id: 'comic',
    label: 'Comic',
    image: 'https://placehold.co/300x200/1A535C/fff?text=Comic'
  }
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

export const StyleSelector = ({ selectedStyle, onStyleChange }: StyleSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-3">Select Style</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {STYLE_OPTIONS.map(style => (
          <StyleCard
            key={style.id}
            image={style.image}
            label={style.label}
            selected={selectedStyle === style.id}
            onClick={() => onStyleChange(style.id)}
          />
        ))}
        
        <button 
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-1 hidden lg:flex"
          aria-label="Show more styles"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
