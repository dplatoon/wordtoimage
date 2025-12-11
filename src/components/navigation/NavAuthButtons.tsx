
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
    ? "pt-4 border-t border-white/10 space-y-2"
    : "hidden md:flex items-center space-x-4";

  const buttonClass = isMobile ? "w-full" : "";

  if (session) {
    return (
      <div className={containerClass}>
        <Link to="/dashboard" onClick={onClose}>
          <Button variant={isMobile ? "outline" : "ghost"} className={`${buttonClass} ${!isMobile && 'text-white hover:text-primary hover:bg-white/10 [text-shadow:0_0_10px_rgba(255,255,255,0.3)] hover:[text-shadow:0_0_15px_hsl(var(--primary)/0.6)]'}`}>
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
        <Button variant={isMobile ? "outline" : "ghost"} className={`${buttonClass} ${!isMobile && 'text-white hover:text-primary hover:bg-white/10 [text-shadow:0_0_10px_rgba(255,255,255,0.3)] hover:[text-shadow:0_0_15px_hsl(var(--primary)/0.6)]'}`}>
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
