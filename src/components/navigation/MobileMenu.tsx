import { Link } from 'react-router-dom';
import { Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MobileMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenu = ({ open, setOpen }: MobileMenuProps) => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
      setOpen(false);
    } catch (error) {
      toast.error('Error signing out', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  if (!open) return null;

  return (
    <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3">
      <div className="flex flex-col space-y-3 px-2">
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Product</p>
          <Link to="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Features</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Pricing</Link>
          <Link to="/updates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Updates</Link>
          <Link to="/templates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Templates Library</Link>
          <Link to="/beta" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Beta Program</Link>
        </div>
        
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Resources</p>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Blog</Link>
          <Link to="/design-tips" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Design Tips</Link>
          <Link to="/tutorials" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Tutorials</Link>
          <Link to="/help" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Help Center</Link>
          <Link to="/api" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">API</Link>
        </div>
        
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Company</p>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">About</Link>
          <Link to="/careers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Careers</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block">Contact</Link>
        </div>

        <div className="py-2">
          <Link to="/community" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Community
          </Link>
        </div>

        <div className="py-2">
          {user ? (
            <div className="space-y-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Account</p>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center"
                onClick={() => setOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/auth" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/auth?tab=signup" onClick={() => setOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
