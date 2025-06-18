import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/navigation/Logo';
import { useAuthState } from '@/hooks/useAuthState';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session } = useAuthState();
  const location = useLocation();

  const productItems = [
    { title: 'Text to Image', href: '/text-to-image', description: 'Create AI images from text descriptions' },
    { title: 'AI Templates', href: '/ai-templates', description: 'Ready-to-use prompt templates' },
    { title: 'Style Gallery', href: '/style-gallery', description: 'Explore 50+ artistic styles' },
    { title: 'Batch Generator', href: '/batch-generator', description: 'Generate multiple images at once' },
    { title: 'AI Upscaler', href: '/ai-upscaler', description: 'Enhance image quality with AI' },
  ];

  const resourceItems = [
    { title: 'AI Art Blog', href: '/blog', description: 'Latest insights and tips' },
    { title: 'Prompt Guide', href: '/prompt-guide', description: 'Master prompt writing' },
    { title: 'Video Tutorials', href: '/video-tutorials', description: 'Step-by-step guides' },
    { title: 'Help Center', href: '/help', description: 'FAQ and support' },
    { title: 'Developer API', href: '/api', description: 'Integrate our AI technology' },
  ];

  const companyItems = [
    { title: 'About Us', href: '/about', description: 'Our mission and story' },
    { title: 'Join Our Team', href: '/join-our-team', description: 'Career opportunities' },
    { title: 'Contact Support', href: '/contact-support', description: 'Get help and support' },
    { title: "What's New", href: '/whats-new', description: 'Latest updates and features' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Product Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-violet-500 to-violet-600 p-6 no-underline outline-none focus:shadow-md"
                            to="/product"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              AI Image Platform
                            </div>
                            <p className="text-sm leading-tight text-violet-100">
                              Complete suite of AI-powered image generation tools
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {productItems.map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <Link
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {resourceItems.map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <Link
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {companyItems.map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <Link
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/pricing"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link to="/text-to-image">
                  <Button className="bg-violet-600 hover:bg-violet-700">Create</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/text-to-image">
                  <Button className="bg-violet-600 hover:bg-violet-700">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Product Section */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Product</h3>
                <div className="space-y-2 pl-4">
                  {productItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block text-gray-600 hover:text-violet-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Resources</h3>
                <div className="space-y-2 pl-4">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block text-gray-600 hover:text-violet-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/pricing"
                className="block text-gray-600 hover:text-violet-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {session ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Dashboard</Button>
                    </Link>
                    <Link to="/text-to-image" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-violet-600 hover:bg-violet-700">Create</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/text-to-image" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-violet-600 hover:bg-violet-700">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
