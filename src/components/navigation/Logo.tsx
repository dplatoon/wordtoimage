
import { Sparkles, Wand } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 hover:opacity-90 transition-opacity group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
      aria-label="WordToImage - Homepage"
    >
      <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
        <Wand className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <div className="flex items-center space-x-1">
        <span className="font-poppins font-bold text-xl md:text-2xl text-gray-900">Word</span>
        <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-blue-600" aria-hidden="true" />
        <span className="font-poppins font-bold text-xl md:text-2xl text-gray-900">Image</span>
      </div>
    </Link>
  );
};
