
import React from 'react';
import { cn } from '@/lib/utils';

interface StyleCardProps {
  image: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const StyleCard = ({ image, label, selected, onClick }: StyleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-end relative overflow-hidden rounded-lg border h-[108px] w-full",
        selected ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-200 hover:border-gray-300"
      )}
      aria-label={`Select ${label} style`}
      aria-pressed={selected}
    >
      <img 
        src={image} 
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1">
        <p className="text-white text-sm font-medium text-center">{label}</p>
      </div>
    </button>
  );
};
