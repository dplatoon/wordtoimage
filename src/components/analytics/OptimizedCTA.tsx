import { Button } from '@/components/ui/button';
import { useOptimizedComponent } from '@/hooks/useConversionTracking';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface OptimizedCTAProps {
  onAction: () => void;
  className?: string;
}

export const OptimizedCTA = ({ onAction, className }: OptimizedCTAProps) => {
  const { variant, loading, trackConversion, isVariant } = useOptimizedComponent('cta_button_test');

  const handleClick = () => {
    trackConversion('cta_click');
    onAction();
  };

  if (loading) {
    return (
      <Button className={className} disabled>
        Loading...
      </Button>
    );
  }

  // Default variant if no A/B test is running
  if (!variant) {
    return (
      <Button onClick={handleClick} className={className}>
        Get Started Now
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    );
  }

  // A/B test variants
  if (isVariant('energetic')) {
    return (
      <Button onClick={handleClick} className={`${className} bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600`}>
        <Zap className="w-4 h-4 mr-2" />
        Start Creating Magic!
      </Button>
    );
  }

  if (isVariant('premium')) {
    return (
      <Button onClick={handleClick} className={`${className} bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700`}>
        <Sparkles className="w-4 h-4 mr-2" />
        Begin Your AI Journey
      </Button>
    );
  }

  // Control variant
  return (
    <Button onClick={handleClick} className={className}>
      Get Started Now
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
};