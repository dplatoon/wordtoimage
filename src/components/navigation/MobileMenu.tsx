import { Link } from 'react-router-dom';
import { Users, Settings, LogOut, X, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

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

  const MenuLink = ({ to, label, icon: Icon }: { to: string; label: string; icon?: any }) => (
    <Link
      to={to}
      className="flex items-center justify-between py-3 px-4 hover:bg-muted/30 rounded-md"
      onClick={() => setOpen(false)}
    >
      <div className="flex items-center">
        {Icon && <Icon className="mr-3 h-5 w-5 text-muted-foreground" />}
        <span className="text-foreground font-medium">{label}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="py-2">
      <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-card text-foreground">
      <div className="flex items-center justify-between py-4 px-4 border-b border-border">
        <Logo />
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted/50 hover:text-foreground" onClick={() => setOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        <MenuSection title="Product">
          <MenuLink to="/features" label="Features" />
          <MenuLink to="/pricing" label="Pricing" />
          <MenuLink to="/templates" label="Templates Library" />
          <MenuLink to="/text-to-image" label="AI Generator" />
          <MenuLink to="/beta" label="Beta Program" />
        </MenuSection>
        
        <Separator className="my-2 bg-border" />
        
        <MenuSection title="Resources">
          <MenuLink to="/blog" label="Blog" />
          <MenuLink to="/tutorials" label="Tutorials" />
          <MenuLink to="/design-tips" label="Design Tips" />
          <MenuLink to="/help" label="Help Center" />
          <MenuLink to="/api" label="API" />
        </MenuSection>
        
        <Separator className="my-2 bg-border" />
        
        <MenuSection title="Company">
          <MenuLink to="/about" label="About" />
          <MenuLink to="/careers" label="Careers" />
          <MenuLink to="/contact" label="Contact" />
        </MenuSection>
        
        <Separator className="my-2 bg-border" />
        
        <MenuSection title="Community">
          <MenuLink to="/community" label="Community" icon={Users} />
        </MenuSection>
      </div>
      
      <div className="border-t border-border p-4">
        {user ? (
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center justify-between py-2 px-3 rounded-md bg-secondary hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center">
                <Settings className="mr-3 h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Profile Settings</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-secondary"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full bg-transparent border-border text-foreground hover:bg-muted hover:text-foreground" asChild>
              <Link to="/auth" onClick={() => setOpen(false)}>Sign In</Link>
            </Button>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <Link to="/auth?tab=signup" onClick={() => setOpen(false)}>Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
