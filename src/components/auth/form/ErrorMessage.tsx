
import { AlertCircle } from 'lucide-react';
import { forwardRef } from 'react';

interface ErrorMessageProps {
  error: string;
}

const getEnhancedErrorMessage = (error: string) => {
  if (error.includes('Invalid login') || error.includes('Invalid credentials')) {
    return 'Incorrect email or password. Please check your credentials and try again.';
  }
  if (error.includes('User already registered')) {
    return "An account with this email already exists. Try signing in instead, or use 'Forgot password' if you need to reset it.";
  }
  if (error.includes('Email not confirmed')) {
    return 'Please check your inbox and click the verification link we sent you before signing in.';
  }
  if (error.includes('Too many requests')) {
    return 'Too many login attempts. Please wait a moment before trying again.';
  }
  return error;
};

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ error }, ref) => {
    return (
      <div 
        ref={ref}
        className="rounded-lg bg-red-50 border border-red-200 p-4"
        role="alert"
        aria-live="assertive"
        tabIndex={-1}
      >
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-800 font-medium">
            {getEnhancedErrorMessage(error)}
          </p>
        </div>
      </div>
    );
  }
);

ErrorMessage.displayName = "ErrorMessage";
