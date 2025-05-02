
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 hover:opacity-85 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
      aria-label="WordToImage - Homepage"
    >
      <div className="flex items-center h-10">
        <img 
          src="/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png" 
          alt="WordToImage Logo" 
          className="h-8 md:h-10"
        />
      </div>
    </Link>
  );
};
