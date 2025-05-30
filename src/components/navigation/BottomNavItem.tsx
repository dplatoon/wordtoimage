
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavItemProps {
  name: string;
  path: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export const BottomNavItem = ({ name, path, icon: Icon, isActive }: BottomNavItemProps) => {
  const location = useLocation();
  const active = isActive ?? location.pathname === path;

  return (
    <Link
      to={path}
      className={`flex flex-col items-center justify-center relative min-h-[56px] px-2 py-1 transition-all duration-300 touch-manipulation ${
        active ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
      }`}
      aria-label={name}
    >
      <div className={`relative transition-all duration-300 ${active ? 'transform -translate-y-0.5' : ''}`}>
        <Icon className={`h-6 w-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} />
        
        {/* Active indicator */}
        {active && (
          <motion.div
            layoutId="bottomNavActive"
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        
        {/* Subtle glow effect when active */}
        {active && (
          <div className="absolute inset-0 bg-indigo-100 rounded-lg scale-150 opacity-50 blur-sm" />
        )}
      </div>
      
      <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
        active ? 'text-indigo-600 opacity-100' : 'opacity-75'
      }`}>
        {name}
      </span>
      
      {/* Touch ripple effect */}
      <div className="absolute inset-0 rounded-lg bg-indigo-50 opacity-0 active:opacity-100 transition-opacity duration-150" />
    </Link>
  );
};
