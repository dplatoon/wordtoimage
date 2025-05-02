import { Link } from 'react-router-dom';
export const Logo = () => {
  return <Link to="/" className="flex items-center space-x-2 hover:opacity-85 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md" aria-label="WordToImage - Homepage">
      <div className="flex items-center h-10">
        <img alt="WordToImage Logo" className="h-8 md:h-10 object-cover" src="/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png" />
      </div>
    </Link>;
};