
import { Link } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  to: string;
  label: string;
  className?: string;
}

export const FloatingActionButton = ({ to, label, className }: FloatingActionButtonProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "w-14 h-14 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 touch-target",
        className
      )}
      aria-label={label}
    >
      <Wand2 className="h-6 w-6" />
    </Link>
  );
};
