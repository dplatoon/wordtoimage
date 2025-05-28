
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  mode: 'signin' | 'signup';
  isLoading: boolean;
}

export function SubmitButton({ mode, isLoading }: SubmitButtonProps) {
  return (
    <Button 
      type="submit" 
      className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2" 
      disabled={isLoading}
      aria-describedby={isLoading ? "loading-status" : undefined}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          <span id="loading-status" aria-live="polite">
            {mode === 'signin' ? 'Signing you in...' : 'Creating your account...'}
          </span>
        </>
      ) : (
        <>{mode === 'signin' ? 'Sign In to WordToImage' : 'Create My Free Account'}</>
      )}
    </Button>
  );
}
