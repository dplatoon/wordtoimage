
import { Link } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingActionButtonProps {
  to: string;
  label: string;
  className?: string;
}

export const FloatingActionButton = ({ to, label, className = '' }: FloatingActionButtonProps) => {
  return (
    <Link
      to={to}
      className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      aria-label={label}
    >
      <motion.div
        whileHover={{ rotate: 12 }}
        transition={{ duration: 0.2 }}
      >
        <Wand2 className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
      </motion.div>
      
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};
