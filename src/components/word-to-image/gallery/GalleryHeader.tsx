
import React from 'react';

interface GalleryHeaderProps {
  imageCount: number;
}

export function GalleryHeader({ imageCount }: GalleryHeaderProps) {
  return (
    <h2 className="text-xl font-medium mb-4 text-gray-800 flex items-center">
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Generated Images</span>
      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
        {imageCount} {imageCount === 1 ? 'image' : 'images'}
      </span>
    </h2>
  );
}
