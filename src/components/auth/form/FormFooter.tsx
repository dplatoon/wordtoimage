
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface FormFooterProps {
  mode: 'signin' | 'signup';
  isLoading: boolean;
}

export function FormFooter({ mode, isLoading }: FormFooterProps) {
  const [email, setEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(email);
      setIsOpen(false);
      setEmail('');
    } catch (error) {
      // Error handling is done in the resetPassword function
    } finally {
      setResetLoading(false);
    }
  };

  if (mode === 'signin') {
    return (
      <div className="text-center pt-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              disabled={isLoading}
              aria-label="Reset your password"
            >
              Forgot your password?
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email address and we'll send you a link to reset your password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={resetLoading}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={resetLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1"
                >
                  {resetLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="text-center pt-2" role="region" aria-label="Terms and conditions">
      <p className="text-xs text-slate-500 leading-relaxed">
        By creating an account, you agree to our{' '}
        <a 
          href="/terms" 
          className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a 
          href="/privacy" 
          className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
