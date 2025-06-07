
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

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
      className={`flex flex-col items-center justify-center relative min-h-[56px] px-2 py-1 transition-all duration-300 touch-manipulation flex-1 ${
        active ? 'text-violet-600' : 'text-gray-500 hover:text-violet-600'
      }`}
      aria-label={name}
    >
      <div className={`relative transition-all duration-300 ${active ? 'transform -translate-y-0.5' : ''}`}>
        <Icon className={`h-6 w-6 transition-all duration-300 ${active ? 'scale-110' : ''}`} />
        
        {/* Active indicator */}
        {active && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-600 rounded-full" />
        )}
      </div>
      
      <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
        active ? 'text-violet-600 opacity-100' : 'opacity-75'
      }`}>
        {name}
      </span>
    </Link>
  );
};
