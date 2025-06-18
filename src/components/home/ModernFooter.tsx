
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Github, Linkedin, Heart, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/navigation/Logo';

export const ModernFooter = () => {
  return (
    <footer className="bg-ai-dark text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-ai-neon/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-ai-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="content-container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo variant="footer" />
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Transform your ideas into stunning visuals with AI-powered image generation. 
                Create professional-quality images in seconds.
              </p>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="font-semibold text-ai-accent">Stay Updated</h4>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-ai-neon"
                  />
                  <Button className="btn-ai-neon px-4">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Get the latest AI art tips and updates
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-ai-accent mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/text-to-image" className="text-gray-300 hover:text-ai-neon transition-colors">
                    AI Image Generator
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-ai-accent mb-6">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/prompt-guide" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Prompt Guide
                  </Link>
                </li>
                <li>
                  <Link to="/api" className="text-gray-300 hover:text-ai-neon transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-ai-accent mb-6">Company</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-ai-neon transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-ai-neon transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>

              {/* Social Links */}
              <div>
                <h5 className="font-medium text-white mb-3">Follow Us</h5>
                <div className="flex gap-3">
                  <a 
                    href="https://twitter.com/wordtoimage" 
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-ai-neon hover:bg-white/20 transition-all touch-target"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/wordtoimage" 
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-ai-neon hover:bg-white/20 transition-all touch-target"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://github.com/wordtoimage" 
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-ai-neon hover:bg-white/20 transition-all touch-target"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 WordToImage. Made with</span>
              <Heart className="h-4 w-4 text-ai-coral fill-current" />
              <span>for creators worldwide</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-ai-neon transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-ai-neon transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-ai-neon transition-colors">
                Cookies
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
