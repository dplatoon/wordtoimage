
import { Link } from 'react-router-dom';
import { Logo } from '@/components/navigation/Logo';
import { Mail, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  const productLinks = [
    { name: 'Text to Image', href: '/text-to-image' },
    { name: 'AI Templates', href: '/ai-templates' },
    { name: 'Style Gallery', href: '/style-gallery' },
    { name: 'Batch Generator', href: '/batch-generator' },
    { name: 'AI Upscaler', href: '/ai-upscaler' },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'Beta Features', href: '/beta' },
  ];

  const resourceLinks = [
    { name: 'AI Art Blog', href: '/blog' },
    { name: 'Prompt Guide', href: '/prompt-guide' },
    { name: 'Video Tutorials', href: '/video-tutorials' },
    { name: 'Help Center', href: '/help' },
    { name: 'Developer API', href: '/api' },
    { name: "What's New", href: '/whats-new' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Join Our Team', href: '/join-our-team' },
    { name: 'Contact Support', href: '/contact-support' },
    { name: 'Community', href: '/community' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Logo variant="footer" className="mb-4" />
            <p className="text-gray-300 text-sm mb-6 max-w-xs">
              Transform text into stunning AI-generated images. Create, enhance, and explore the possibilities of artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:support@wordtoimage.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} WordToImage. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Made with ❤️ for creators worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
