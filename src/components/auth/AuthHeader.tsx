
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/navigation/Logo';

export function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <Link to="/">
        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
      </Link>
    </div>
  );
}
