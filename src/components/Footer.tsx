
import { Facebook, Instagram, Twitter, Linkedin, Users, Shield, Zap, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SimpleLogo } from '@/components/navigation/SimpleLogo';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-violet-600/10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-600/10 animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6">
              <SimpleLogo />
            </div>
            <p className="text-violet-400 text-sm font-medium mb-4">
              Transforming text into stunning visuals with AI in seconds
            </p>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Professional-quality AI-generated images for social media, marketing, and creative projects.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-violet-400">
                <Shield className="h-4 w-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-400">
                <Zap className="h-4 w-4" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-pink-400">
                <Heart className="h-4 w-4" />
                <span>10,000+ Happy Users</span>
              </div>
            </div>
          </div>
          
          {/* Product Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-violet-400">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/text-to-image" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Text to Image</Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">AI Templates</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Style Gallery</Link></li>
              <li><Link to="/text-to-image" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Batch Generator</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">AI Upscaler</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Pricing Plans</Link></li>
              <li><Link to="/beta" className="text-gray-300 hover:text-violet-400 transition-colors text-sm flex items-center">
                <span className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></span>
                Beta Features
              </Link></li>
            </ul>
          </div>
          
          {/* Resources Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-violet-400">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">AI Art Blog</Link></li>
              <li><Link to="/design-tips" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Prompt Guide</Link></li>
              <li><Link to="/tutorials" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Video Tutorials</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/api" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Developer API</Link></li>
              <li><Link to="/updates" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">What's New</Link></li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-violet-400">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Join Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">Contact Support</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-violet-400 transition-colors text-sm flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Community
              </Link></li>
              <li><a href="mailto:support@wordtoimage.com" className="text-gray-300 hover:text-violet-400 transition-colors text-sm flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Contact Email
              </a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="mb-8 bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
          <div className="max-w-md mx-auto text-center md:text-left md:max-w-none md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold text-lg mb-2 text-violet-400">Stay Updated with AI Tips</h4>
              <p className="text-gray-300 text-sm">Get the latest AI art techniques and WordToImage updates delivered to your inbox.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm mx-auto md:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent min-h-[48px]"
                required
              />
              <Button 
                type="submit" 
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 font-semibold whitespace-nowrap min-h-[48px]"
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media & Quick Actions */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-sm mr-3">Follow us:</span>
            <div className="flex space-x-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-gray-800 hover:bg-violet-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm border border-gray-700 hover:border-violet-500"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-gray-800 hover:bg-violet-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm border border-gray-700 hover:border-violet-500"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-gray-800 hover:bg-violet-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm border border-gray-700 hover:border-violet-500"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-gray-800 hover:bg-violet-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm border border-gray-700 hover:border-violet-500"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/text-to-image"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm min-h-[48px] flex items-center"
            >
              Try AI Generator
            </Link>
            <Link
              to="/pricing"
              className="border border-violet-600 hover:border-violet-500 text-white hover:bg-violet-600/20 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm min-h-[48px] flex items-center"
            >
              View Pricing
            </Link>
          </div>
        </div>
        
        {/* Bottom Section - Legal & Copyright */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">© 2025 Available View LLC | All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Powered by advanced AI</span>
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-center">
            <Link to="/privacy" className="text-gray-400 hover:text-violet-400 text-sm transition-colors min-h-[48px] flex items-center">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-violet-400 text-sm transition-colors min-h-[48px] flex items-center">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-violet-400 text-sm transition-colors min-h-[48px] flex items-center">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
