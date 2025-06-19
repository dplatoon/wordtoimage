
import React from 'react';
import { Clock, Users, Zap } from 'lucide-react';

interface UrgencyBadgeProps {
  type: 'limited_offer' | 'user_count' | 'time_sensitive';
  message: string;
  icon?: boolean;
  className?: string;
}

export const UrgencyBadge = ({ 
  type, 
  message, 
  icon = true, 
  className = '' 
}: UrgencyBadgeProps) => {
  const getIcon = () => {
    switch (type) {
      case 'limited_offer':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'user_count':
        return <Users className="w-4 h-4 text-green-500" />;
      case 'time_sensitive':
        return <Clock className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'limited_offer':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'user_count':
        return 'bg-gradient-to-r from-green-400 to-blue-500 text-white';
      case 'time_sensitive':
        return 'bg-gradient-to-r from-red-400 to-pink-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getBgColor()} ${className} animate-pulse`}>
      {icon && getIcon()}
      <span>{message}</span>
    </div>
  );
};
