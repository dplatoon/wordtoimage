
import React from 'react';
import { cn } from '@/lib/utils';
import { ImageOverlay } from '../../gallery/ImageOverlay';
import { OptimizedImage } from '@/components/performance/OptimizedImage';

interface StyleCardProps {
  image: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  color?: string;
}

export const StyleCard = ({ image, label, selected, onClick, color }: StyleCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-end relative overflow-hidden rounded-lg border h-[90px] md:h-[108px] w-full transition-all duration-200 group",
        selected ? "border-violet-600 ring-2 ring-violet-400" : "border-gray-200 hover:border-gray-300"
      )}
      aria-label={`Select ${label} style`}
      aria-pressed={selected}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: color || 'transparent' }}
    >
      <OptimizedImage
        src={image}
        alt={`${label} AI art style preview`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        enableCompression={true}
        quality={0.85}
        lazy={true}
        structuredData={{
          caption: `${label} style preview`,
          creator: 'AI Generated Style Example',
          keywords: [label.toLowerCase(), 'AI art', 'style']
        }}
      />
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1 md:p-2 z-10">
        <p className="text-white text-xs md:text-sm font-medium text-center line-clamp-1">{label}</p>
      </div>
      
      {selected && (
        <div className="absolute inset-0 bg-violet-500/20 flex items-center justify-center z-20">
          <div className="bg-violet-600 rounded-full p-1">
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
