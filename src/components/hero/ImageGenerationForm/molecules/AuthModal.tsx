
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-9 max-w-sm w-full text-center flex flex-col gap-6 relative">
        <h2 className="text-2xl font-bold">Sign up or Log in to WordToImage</h2>
        <p className="text-gray-600">
          Log in or sign up in seconds. It's free!
        </p>
        <Link to="/auth?tab=signup">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" autoFocus>Get Started — It's Free</Button>
        </Link>
        <div>
          <Link to="/auth" className="text-blue-700 underline hover:text-blue-900">
            Already have an account? Log in
          </Link>
        </div>
        <button aria-label="Close Modal" onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-black text-2xl font-bold">&times;</button>
      </div>
    </div>
  );
};
