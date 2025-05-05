
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Return to Home
            </Link>
            <p className="text-gray-500 text-sm">
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
