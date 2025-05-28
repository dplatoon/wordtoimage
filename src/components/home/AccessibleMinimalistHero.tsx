
import { MobileOptimizedHero } from './MobileOptimizedHero';

interface AccessibleMinimalistHeroProps {
  onShowProFeatures: () => void;
}

export const AccessibleMinimalistHero = ({ onShowProFeatures }: AccessibleMinimalistHeroProps) => {
  return <MobileOptimizedHero onShowProFeatures={onShowProFeatures} />;
};
