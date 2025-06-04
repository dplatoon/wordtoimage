
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface FloatingActionButtonProps {
  to: string;
  label: string;
  className?: string;
}

export const FloatingActionButton = ({ to, label, className = '' }: FloatingActionButtonProps) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center justify-center w-14 h-14 bg-ai-neon-gradient rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation group ${className}`}
      aria-label={label}
    >
      {/* Icon */}
      <Sparkles className="h-6 w-6 text-white drop-shadow-sm" />
      
      {/* Animated background glow - using CSS animation */}
      <div className="absolute inset-0 bg-ai-neon-gradient rounded-full opacity-30 scale-110 animate-pulse" />
      
      {/* Press feedback */}
      <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-150" />
      
      {/* Enhanced shadow for depth */}
      <div className="absolute inset-0 bg-ai-neon-gradient rounded-full blur-md opacity-40 -z-10" />
    </Link>
  );
};
