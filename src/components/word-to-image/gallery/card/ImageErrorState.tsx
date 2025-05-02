
import React from 'react';
import { ImageOff } from 'lucide-react';

export function ImageErrorState() {
  return (
    <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center p-4">
      <ImageOff className="h-8 w-8 text-gray-300 mb-2" />
      <p className="text-sm text-gray-400">Image unavailable</p>
    </div>
  );
}
