import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Github, Linkedin, Heart, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/navigation/Logo';

export const ModernFooter = () => {
  return (
    <footer className="bg-background text-foreground relative overflow-hidden border-t border-primary/10">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo variant="footer" />
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Transform your ideas into stunning visuals with AI-powered image generation. 
                Create professional-quality images in seconds.
              </p>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Stay Updated</h4>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter your email"
                    className="bg-background/60 backdrop-blur-sm border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                  <Button variant="neon" size="icon" className="shrink-0">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get the latest AI art tips and updates
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-primary mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/text-to-image" className="text-muted-foreground hover:text-primary transition-colors">
                    AI Image Generator
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-primary mb-6">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/prompt-guide" className="text-muted-foreground hover:text-primary transition-colors">
                    Prompt Guide
                  </Link>
                </li>
                <li>
                  <Link to="/api" className="text-muted-foreground hover:text-primary transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-primary mb-6">Company</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>

              {/* Social Links */}
              <div>
                <h5 className="font-medium text-foreground mb-3">Follow Us</h5>
                <div className="flex gap-3">
                  <a 
                    href="https://twitter.com/wordtoimage" 
                    className="w-10 h-10 bg-background/60 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-neon transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/wordtoimage" 
                    className="w-10 h-10 bg-background/60 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-neon transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://github.com/wordtoimage" 
                    className="w-10 h-10 bg-background/60 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-neon transition-all"
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
        <div className="border-t border-primary/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>© 2024 WordToImage. Made with</span>
              <Heart className="h-4 w-4 text-primary fill-current" />
              <span>for creators worldwide</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wand2 className="h-4 w-4 text-primary" />
                <span>Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};