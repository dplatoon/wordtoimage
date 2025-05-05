
import { Link } from 'react-router-dom';
import { Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
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
    <div className="md:hidden fixed top-16 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 max-h-[80vh] overflow-y-auto">
      <div className="flex flex-col space-y-1 px-2 py-3">
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Product</p>
          <Link to="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Features</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Pricing</Link>
          <Link to="/updates" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Updates</Link>
          <Link to="/text-to-image" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Templates Library</Link>
          <Link to="/beta" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Beta Program</Link>
        </div>
        
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Resources</p>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/design-tips" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Design Tips</Link>
          <Link to="/tutorials" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Tutorials</Link>
          <Link to="/help" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Help Center</Link>
          <Link to="/api" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>API</Link>
        </div>
        
        <div className="py-2">
          <p className="px-3 text-sm font-semibold text-gray-500">Company</p>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>About</Link>
          <Link to="/careers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Careers</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block" onClick={() => setOpen(false)}>Contact</Link>
        </div>

        <div className="py-2">
          <Link to="/community" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center" onClick={() => setOpen(false)}>
            <Users className="mr-2 h-4 w-4" />
            Community
          </Link>
        </div>

        <div className="py-2 border-t border-gray-200 mt-2 pt-4">
          {user ? (
            <div className="space-y-2">
              <p className="px-3 text-sm font-semibold text-gray-500">Account</p>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center"
                onClick={() => setOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
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
            <div className="flex flex-col space-y-2 px-3 pt-2">
              <Link to="/auth" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/auth?tab=signup" onClick={() => setOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
