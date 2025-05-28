
import { Zap, Users, Shield, Sparkles } from 'lucide-react';

interface AuthBenefitsProps {
  mode: 'signin' | 'signup';
}

export function AuthBenefits({ mode }: AuthBenefitsProps) {
  if (mode !== 'signup') return null;

  return (
    <div className="space-y-3 mt-4">
      {/* Main benefits row */}
      <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
        <div className="flex items-center space-x-1.5">
          <Zap className="h-4 w-4 text-blue-500" />
          <span className="font-medium">Instant access</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Users className="h-4 w-4 text-green-500" />
          <span className="font-medium">Join 50,000+ creators</span>
        </div>
      </div>
      
      {/* Additional reassurance */}
      <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
        <div className="flex items-center space-x-1">
          <Shield className="h-3 w-3 text-violet-500" />
          <span>No credit card required</span>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles className="h-3 w-3 text-blue-500" />
          <span>Free tier included</span>
        </div>
      </div>
    </div>
  );
}
