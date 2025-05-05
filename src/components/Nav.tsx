
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { trackEvent, events } from "@/utils/analytics";
import { Logo } from "@/components/navigation/Logo";

export const Nav = () => {
  const { user, signOut, isLoading } = useAuth();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      trackEvent(events.SIGN_OUT);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium">
              Home
            </Link>
            
            <Link to="/text-to-image" className="px-3 py-2 text-sm font-medium">
              Text to Image
            </Link>
            
            <Link to="/blog" className="px-3 py-2 text-sm font-medium">
              Blog
            </Link>
            
            <Link to="/about" className="px-3 py-2 text-sm font-medium">
              About
            </Link>
            
            {isMounted &&
              (isLoading ? (
                <Skeleton className="h-10 w-[100px]" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={user?.user_metadata?.avatar_url} 
                          alt={user?.user_metadata?.full_name || user.email || "User"} 
                        />
                        <AvatarFallback>
                          {user?.user_metadata?.full_name?.charAt(0) || 
                          user.email?.charAt(0) || "U"}
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
              ) : (
                <Link to="/auth" className="px-3 py-2 text-sm font-medium">
                  Login
                </Link>
              ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
