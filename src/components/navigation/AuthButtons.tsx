
import { PrimaryButton } from '@/components/ui/primary-button';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LogIn, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AuthButtons = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  if (user) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative">
              <User className="h-4 w-4 mr-2" />
              {user.email}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <Link to="/dashboard">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('sign_out')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/auth">
        <Button variant="ghost">
          <LogIn className="mr-2 h-4 w-4" />
          {t('sign_in')}
        </Button>
      </Link>
      <Link to="/auth?tab=signup">
        <PrimaryButton gradient>
          <User className="mr-2 h-4 w-4" />
          {t('start_creating')}
        </PrimaryButton>
      </Link>
    </div>
  );
};
