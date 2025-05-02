
import React from 'react';
import { ImageOff } from 'lucide-react';

interface ImageErrorStateProps {
  message?: string;
  className?: string;
  iconSize?: number;
}

export function ImageErrorState({ 
  message = "Image unavailable", 
  className = "w-full h-48", 
  iconSize = 8 
}: ImageErrorStateProps) {
  return (
    <div className={`${className} bg-gray-100 flex flex-col items-center justify-center p-4`}>
      <ImageOff className={`h-${iconSize} w-${iconSize} text-gray-300 mb-2`} />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}
