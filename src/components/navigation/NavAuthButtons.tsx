
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Session } from '@supabase/supabase-js';

interface NavAuthButtonsProps {
  session: Session | null;
  isMobile?: boolean;
  onClose?: () => void;
}

export const NavAuthButtons = ({ session, isMobile = false, onClose }: NavAuthButtonsProps) => {
  const containerClass = isMobile 
    ? "pt-4 border-t border-gray-200 space-y-2"
    : "hidden md:flex items-center space-x-4";

  const buttonClass = isMobile ? "w-full" : "";

  if (session) {
    return (
      <div className={containerClass}>
        <Link to="/dashboard" onClick={onClose}>
          <Button variant={isMobile ? "outline" : "ghost"} className={buttonClass}>
            Dashboard
          </Button>
        </Link>
        <Link to="/text-to-image" onClick={onClose}>
          <Button className={`${buttonClass} bg-violet-600 hover:bg-violet-700`}>
            Create
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Link to="/auth" onClick={onClose}>
        <Button variant={isMobile ? "outline" : "ghost"} className={buttonClass}>
          Sign In
        </Button>
      </Link>
      <Link to="/text-to-image" onClick={onClose}>
        <Button className={`${buttonClass} bg-violet-600 hover:bg-violet-700`}>
          Get Started
        </Button>
      </Link>
    </div>
  );
};
