
import { PrimaryButton } from '@/components/ui/primary-button';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LogIn, LogOut, User, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AuthButtons = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (user) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Account menu"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium truncate max-w-[180px]">{user.email}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border border-gray-200">
            <Link to="/dashboard">
              <DropdownMenuItem className="cursor-pointer focus:bg-blue-50 focus:text-blue-600">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem 
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="cursor-pointer focus:bg-blue-50 focus:text-blue-600"
            >
              {isLoggingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
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
        <Button 
          variant="ghost"
          className="focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <LogIn className="mr-2 h-4 w-4" />
          <span>{t('sign_in')}</span>
        </Button>
      </Link>
      <Link to="/auth?tab=signup">
        <PrimaryButton 
          gradient 
          className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <User className="mr-2 h-4 w-4" />
          <span>{t('start_creating')}</span>
        </PrimaryButton>
      </Link>
    </div>
  );
};
