
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/utils/analytics';

interface AuthModalDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModalDialog = ({ open, onClose }: AuthModalDialogProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Lock body scroll when modal is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  
  if (!open) return null;
  
  const handleSignup = () => {
    trackEvent('auth_modal_signup_click');
    onClose();
    navigate('/auth?tab=signup');
  };
  
  const handleLogin = () => {
    trackEvent('auth_modal_login_click');
    onClose();
    navigate('/auth');
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl px-8 py-9 max-w-sm w-full text-center flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">Sign up or Log in to WordToImage</h2>
        <p className="text-gray-600">
          Log in or sign up in seconds. It's free!
        </p>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          autoFocus
          onClick={handleSignup}
        >
          Get Started — It's Free
        </Button>
        <div>
          <button
            onClick={handleLogin}
            className="text-blue-700 underline hover:text-blue-900"
          >
            Already have an account? Log in
          </button>
        </div>
        <button 
          aria-label="Close Modal" 
          onClick={onClose} 
          className="absolute right-6 top-6 text-gray-400 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
