
import { Zap, Users } from 'lucide-react';

interface AuthBenefitsProps {
  mode: 'signin' | 'signup';
}

export function AuthBenefits({ mode }: AuthBenefitsProps) {
  if (mode !== 'signup') return null;

  return (
    <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-slate-600">
      <div className="flex items-center space-x-1">
        <Zap className="h-4 w-4 text-blue-500" />
        <span>Instant access</span>
      </div>
      <div className="flex items-center space-x-1">
        <Users className="h-4 w-4 text-green-500" />
        <span>Join 50,000+ creators</span>
      </div>
    </div>
  );
}
