
import React from 'react';

interface ImageOverlayProps {
  isVisible: boolean;
}

export const ImageOverlay = ({ isVisible }: ImageOverlayProps) => {
  return (
    <div 
      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent 
        transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};
