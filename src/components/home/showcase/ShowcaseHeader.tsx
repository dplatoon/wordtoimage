
import { GalleryHorizontal } from 'lucide-react';

export const ShowcaseHeader = () => {
  return (
    <div 
      className="text-center mb-12 animate-fade-in"
    >
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
        <GalleryHorizontal className="h-4 w-4 mr-2" aria-hidden="true" />
        <span>Inspiration Gallery</span>
      </span>
      
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
        See What You Can Create
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Browse through a collection of AI-generated images from simple text prompts
      </p>
    </div>
  );
};
