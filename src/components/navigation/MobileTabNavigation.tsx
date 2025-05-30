
import { Link, useLocation } from 'react-router-dom';
import { Home, Palette, CreditCard, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface TabItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MobileTabNavigation = () => {
  const location = useLocation();
  const { isMobile } = useResponsiveDesign();

  // Only show on mobile devices
  if (!isMobile) return null;

  const tabs: TabItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Features', path: '/features', icon: Palette },
    { name: 'Pricing', path: '/pricing', icon: CreditCard },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex-1 flex flex-col items-center py-3 px-2 relative transition-all duration-200 ${
                active 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label={tab.name}
            >
              <Icon className={`h-5 w-5 mb-1 transition-all duration-200 ${
                active ? 'scale-110' : ''
              }`} />
              <span className={`text-xs font-medium transition-all duration-200 ${
                active ? 'text-indigo-600' : 'text-gray-500'
              }`}>
                {tab.name}
              </span>
              
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="mobileTabActive"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Touch ripple effect */}
              <div className="absolute inset-0 bg-gray-50 opacity-0 active:opacity-100 transition-opacity duration-150 rounded-lg" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
