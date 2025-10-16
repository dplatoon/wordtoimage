import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface OptimizedCTAProps {
  onAction: () => void;
  className?: string;
}

export const OptimizedCTA = ({ onAction, className }: OptimizedCTAProps) => {
  return (
    <Button onClick={onAction} className={className}>
      Get Started Now
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
};