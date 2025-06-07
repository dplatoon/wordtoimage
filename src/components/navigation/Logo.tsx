
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 group touch-target"
      aria-label="WordToImage Home"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
        <Sparkles className="h-4 w-4 text-white drop-shadow-sm" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
        WordToImage
      </span>
    </Link>
  );
};
