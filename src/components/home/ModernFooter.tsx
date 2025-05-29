
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Github, Linkedin, Heart, Wand2, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/navigation/Logo';

export const ModernFooter = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
  };

  return (
    <footer className="bg-ai-dark text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-ai-neon/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-ai-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="content-container relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 text-center md:text-left">
              <div className="mb-6">
                <Logo variant="footer" />
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                Transform your ideas into stunning visuals with AI-powered image generation. 
                Create professional-quality images in seconds.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300">
                  <Phone className="h-4 w-4 text-ai-neon" />
                  <a 
                    href="tel:+15551234567" 
                    className="hover:text-ai-neon transition-colors touch-target"
                    aria-label="Call us at +1 555 123 4567"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300">
                  <Mail className="h-4 w-4 text-ai-neon" />
                  <a 
                    href="mailto:contact@wordtoimage.com" 
                    className="hover:text-ai-neon transition-colors touch-target"
                    aria-label="Send email to contact@wordtoimage.com"
                  >
                    contact@wordtoimage.com
                  </a>
                </div>
                <div className="flex items-start justify-center md:justify-start gap-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4 text-ai-neon mt-0.5 flex-shrink-0" />
                  <span>123 AI Street, Tech City, TC 12345</span>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="font-semibold text-ai-accent">Stay Updated</h4>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-ai-neon text-sm"
                    required
                    aria-label="Email address for newsletter"
                  />
                  <Button type="submit" className="btn-ai-neon px-4 touch-target">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Subscribe to newsletter</span>
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  Get the latest AI art tips and updates
                </p>
              </div>
            </div>

            {/* Product Links */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-ai-accent mb-6 text-lg">Product</h4>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/text-to-image" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    AI Image Generator
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/features" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/templates" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/api" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-ai-accent mb-6 text-lg">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/help" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tutorials" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/community" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/updates" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    What's New
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company & Legal */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-ai-accent mb-6 text-lg">Company</h4>
              <ul className="space-y-4 mb-8">
                <li>
                  <Link 
                    to="/about" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/careers" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cookies" 
                    className="text-gray-300 hover:text-ai-neon transition-colors touch-target inline-block py-1"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>

              {/* Social Links */}
              <div>
                <h5 className="font-medium text-white mb-4">Follow Us</h5>
                <div className="flex gap-3 justify-center md:justify-start">
                  <a 
                    href="https://twitter.com/wordtoimage" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-ai-neon hover:bg-white/20 transition-all touch-target"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/wordtoimage" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-ai-neon hover:bg-white/20 transition-all touch-target"
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://github.com/wordtoimage" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-ai-neon hover:bg-white/20 transition-all touch-target"
                    aria-label="Follow us on GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm text-center md:text-left">
              <div className="flex items-center gap-2">
                <span>© 2024 WordToImage. Made with</span>
                <Heart className="h-4 w-4 text-ai-coral fill-current" />
                <span>for creators worldwide</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-ai-neon transition-colors touch-target py-2"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-ai-neon transition-colors touch-target py-2"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-ai-neon transition-colors touch-target py-2"
              >
                Cookie Policy
              </Link>
              <div className="flex items-center gap-2 text-gray-400">
                <Wand2 className="h-4 w-4" />
                <span>Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
