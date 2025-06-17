
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { logger } from '@/utils/logger';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    logger.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Nav />
      
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          
          <div className="space-y-4">
            <Button 
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            
            <p className="text-gray-500 text-sm pt-4">
              If you believe this is an error, please <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
