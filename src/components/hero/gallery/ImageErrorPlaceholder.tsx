
import React from 'react';
import { ImageOff } from 'lucide-react';

export const ImageErrorPlaceholder = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-50">
      <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
      <p className="text-xs text-gray-400 text-center">Image unavailable</p>
    </div>
  );
};
