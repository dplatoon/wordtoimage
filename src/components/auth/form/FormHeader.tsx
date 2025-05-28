
import { CheckCircle } from 'lucide-react';

interface FormHeaderProps {
  mode: 'signin' | 'signup';
}

export function FormHeader({ mode }: FormHeaderProps) {
  if (mode === 'signin') {
    return (
      <div className="sr-only" aria-live="polite">
        Enter your credentials to sign in to WordToImage
      </div>
    );
  }

  return (
    <div className="text-center mb-4" role="region" aria-label="Account benefits">
      <div className="sr-only" aria-live="polite">
        Complete the form below to create your free WordToImage account
      </div>
      <div className="flex items-center justify-center space-x-4 text-sm text-slate-600 mb-2">
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
          <span>Takes less than a minute</span>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
          <span>No credit card required</span>
        </div>
      </div>
      <p className="text-sm text-slate-500">
        Join thousands of creators making amazing images with AI
      </p>
    </div>
  );
}
