
import { Link } from 'react-router-dom';
import { Logo } from '@/components/navigation/Logo';
import { Mail, Twitter, Github, Linkedin, ArrowUpRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  product: [
    { name: 'Text to Image', href: '/text-to-image' },
    { name: 'AI Templates', href: '/ai-templates' },
    { name: 'Style Gallery', href: '/style-gallery' },
    { name: 'Batch Generator', href: '/batch-generator' },
    { name: 'AI Upscaler', href: '/ai-upscaler' },
    { name: 'Pricing', href: '/pricing' },
  ],
  resources: [
    { name: 'AI Art Blog', href: '/blog' },
    { name: 'Prompt Guide', href: '/prompt-guide' },
    { name: 'Tutorials', href: '/video-tutorials' },
    { name: 'Help Center', href: '/help' },
    { name: 'API Docs', href: '/api' },
  ],
  tools: [
    { name: 'PDF to JPG', href: '/pdf-to-jpg' },
    { name: 'Word to JPG', href: '/word-to-jpg' },
    { name: 'JPG to Word', href: '/jpg-to-word' },
    { name: 'JPG to PDF', href: '/jpg-to-pdf' },
    { name: 'Remove Background', href: '/remove-background' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/join-our-team' },
    { name: 'Contact', href: '/contact-support' },
    { name: 'Community', href: '/community' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/wordtoimage' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/wordtoimage' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/wordtoimage' },
  { name: 'Email', icon: Mail, href: 'mailto:support@wordtoimage.com' },
];

export const AdvancedFooter = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-white/5">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Logo variant="footer" className="mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Transform text into stunning AI-generated images. Create, enhance, and explore the limitless possibilities of artificial intelligence.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:border-l lg:border-white/10 lg:pl-6">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:pl-6">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© {new Date().getFullYear()} WordToImage.</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for creators
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
