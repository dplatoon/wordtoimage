
import { Sparkles, Wand } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
      <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-md">
        <Wand className="h-5 w-5 text-white" />
      </div>
      <div className="flex items-center space-x-1">
        <span className="font-poppins font-bold text-xl text-gray-900">Word</span>
        <Sparkles className="h-4 w-4 text-blue-600" />
        <span className="font-poppins font-bold text-xl text-gray-900">Image</span>
      </div>
    </Link>
  );
};

