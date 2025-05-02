
import { Image } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="text-center px-4 sm:px-8 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg w-full h-full flex flex-col items-center justify-center">
      <div className="p-4 bg-white/80 backdrop-blur-sm rounded-full mb-4 shadow-inner border border-gray-100">
        <Image className="h-12 w-12 text-indigo-400" />
      </div>
      <p className="text-gray-600 mb-2 font-medium">Enter a prompt above to generate your image</p>
      <p className="text-xs text-gray-500 max-w-xs">Be descriptive for best results. Try mentioning style, colors, and subject</p>
    </div>
  );
};
