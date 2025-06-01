
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const AuthSection = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-3">
      {user ? (
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-200 font-medium">Welcome, {user.email}</span>
          <Button
            variant="outline"
            onClick={signOut}
            className="min-h-[44px] focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 hover:text-white hover:border-white transition-all duration-200"
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link to="/auth">
            <Button 
              variant="outline" 
              className="min-h-[44px] focus:ring-4 focus:ring-slate-400/50 bg-transparent border-slate-400 text-slate-200 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 hover:text-white hover:border-white transition-all duration-200"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="min-h-[44px] focus:ring-4 focus:ring-blue-400/50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
