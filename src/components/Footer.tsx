
import { Facebook, Instagram, Twitter, Linkedin, Image, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="text-white py-12 md:py-16 bg-violet-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-5 h-14">
              <div className="h-14 w-auto relative min-w-[180px]">
                <img 
                  src="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png" 
                  alt="WordToImage Logo" 
                  className="h-full w-auto object-contain" 
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-gray-400 mb-5">
              Transform your words into stunning social media graphics in seconds with our AI-powered design tool.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/text-to-image" className="text-gray-400 hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/updates" className="text-gray-400 hover:text-white transition-colors">Updates</Link></li>
              <li><Link to="/text-to-image" className="text-gray-400 hover:text-white transition-colors">Templates Library</Link></li>
              <li><Link to="/beta" className="text-gray-400 hover:text-white transition-colors">Beta Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/design-tips" className="text-gray-400 hover:text-white transition-colors">Design Tips</Link></li>
              <li><Link to="/tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Community
              </Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {currentYear} WordToImage. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>;
};
