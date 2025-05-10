import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { trackEvent, events } from "@/utils/analytics";
import { Logo } from "@/components/navigation/Logo";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export const Nav = () => {
  const { user, signOut, isLoading } = useAuth();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      trackEvent(events.SIGN_OUT);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-sm bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          {/* Logo with default variant */}
          <Logo />
        </div>
        
        <div className="flex items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <DesktopNavigation />
          </div>
          
          {/* User Menu or Auth Button */}
          <div className="flex items-center space-x-2 ml-2">
            {isMounted && (isLoading ? 
              <Skeleton className="h-10 w-[100px]" /> 
              : user ? 
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || user.email || "User"} />
                        <AvatarFallback>
                          {user?.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="focus:bg-gray-100">
                      <span className="truncate text-sm font-medium">
                        {user.email}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="focus:outline-none" asChild>
                      <Link to="/dashboard">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              : 
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">Login</Link>
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600" 
                    size="sm" 
                    asChild
                  >
                    <Link to="/auth?tab=signup">Sign Up</Link>
                  </Button>
                </div>
            )}
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden ml-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-0">
                <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
