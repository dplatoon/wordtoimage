
import React from 'react';
import { cn } from '@/lib/utils';
import { ImageOverlay } from '../../gallery/ImageOverlay';

interface StyleCardProps {
  image: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const StyleCard = ({ image, label, selected, onClick }: StyleCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-end relative overflow-hidden rounded-lg border h-[108px] w-full transition-all duration-200",
        selected ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-200 hover:border-gray-300"
      )}
      aria-label={`Select ${label} style`}
      aria-pressed={selected}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={image} 
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
        <p className="text-white text-sm font-medium text-center">{label}</p>
      </div>
      {selected && (
        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
          <div className="bg-blue-600 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      )}
      <ImageOverlay isVisible={isHovered && !selected} />
    </button>
  );
};
