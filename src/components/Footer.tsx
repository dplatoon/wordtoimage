
import { Facebook, Instagram, Twitter, Linkedin, Users, Shield, Zap, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/navigation/Logo';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <footer className="text-white py-12 md:py-16 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-indigo-900"></div>
      
      {/* Animated decorative elements */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white opacity-5 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white opacity-5 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 h-32 w-32 rounded-full bg-teal-400 opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section - Enhanced */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-5 h-14">
              <div className="min-w-[200px]">
                <Logo variant="footer" />
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Create stunning AI-generated images from text descriptions in seconds. 
              Professional-quality visuals for social media, marketing, and creative projects.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-green-300">
                <Shield className="h-4 w-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-300">
                <Zap className="h-4 w-4" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-pink-300">
                <Heart className="h-4 w-4" />
                <span>10,000+ Happy Users</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <h4 className="font-semibold text-sm mb-3">Get AI Updates & Tips</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 whitespace-nowrap"
                >
                  {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
          
          {/* AI Tools */}
          <div>
            <h3 className="font-semibold text-lg mb-4">AI Tools</h3>
            <ul className="space-y-3">
              <li><Link to="/text-to-image" className="text-gray-300 hover:text-white transition-colors text-sm">Text to Image</Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-white transition-colors text-sm">AI Templates</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors text-sm">Style Gallery</Link></li>
              <li><Link to="/text-to-image" className="text-gray-300 hover:text-white transition-colors text-sm">Batch Generator</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors text-sm">AI Upscaler</Link></li>
              <li><Link to="/beta" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Beta Features
              </Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">AI Art Blog</Link></li>
              <li><Link to="/design-tips" className="text-gray-300 hover:text-white transition-colors text-sm">Prompt Guide</Link></li>
              <li><Link to="/tutorials" className="text-gray-300 hover:text-white transition-colors text-sm">Video Tutorials</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/api" className="text-gray-300 hover:text-white transition-colors text-sm">Developer API</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors text-sm">Pricing Plans</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">Join Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Support</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Community
              </Link></li>
              <li><Link to="/updates" className="text-gray-300 hover:text-white transition-colors text-sm">What's New</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Quick Actions */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-sm mr-3">Follow us:</span>
            <div className="flex space-x-3">
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Action */}
          <div className="flex items-center gap-4">
            <Link
              to="/text-to-image"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
            >
              Try AI Generator
            </Link>
            <Link
              to="/pricing"
              className="border border-white/30 hover:border-white/50 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:bg-white/10 text-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">© 2025 Available View LLC | All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Powered by advanced AI</span>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-center">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
