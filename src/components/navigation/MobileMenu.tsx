
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isMenuOpen: boolean;
}

export const MobileMenu = ({ isMenuOpen }: MobileMenuProps) => {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3">
      <div className="flex flex-col space-y-3 px-2">
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Product</p>
          <a href="#templates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Templates</a>
          <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Pricing</a>
          <Link to="/updates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Updates</Link>
          <Link to="/beta" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Beta Program</Link>
        </div>
        
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Resources</p>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Blog</Link>
          <Link to="/design-tips" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Design Tips</Link>
          <Link to="/tutorials" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Tutorials</Link>
          <Link to="/help" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Help Center</Link>
          <Link to="/api" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">API</Link>
        </div>
        
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Company</p>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">About</Link>
          <Link to="/careers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Careers</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Contact</Link>
        </div>

        <div className="py-2">
          <Link to="/community" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Community
          </Link>
        </div>

        <div className="flex flex-col space-y-2 pt-2">
          <Button variant="outline" className="rounded-md w-full">Sign In</Button>
          <Button className="rounded-md bg-blue-600 w-full">Get Started</Button>
        </div>
      </div>
    </div>
  );
};
