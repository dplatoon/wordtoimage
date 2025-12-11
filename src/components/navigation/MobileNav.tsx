
import { Link } from 'react-router-dom';
import { productItems, resourceItems } from './navigationData';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  const glowStyle = "[text-shadow:0_0_10px_rgba(255,255,255,0.3)] hover:[text-shadow:0_0_15px_hsl(var(--primary)/0.6)]";

  return (
    <div className="md:hidden border-t border-primary/20 py-4 bg-background/95 backdrop-blur-xl">
      <div className="space-y-4">
        {/* Product Section */}
        <div>
          <h3 className={`font-medium text-white mb-2 ${glowStyle}`}>Product</h3>
          <div className="space-y-2 pl-4">
            {productItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`block text-white/80 hover:text-primary transition-all duration-300 ${glowStyle}`}
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className={`font-medium text-white mb-2 ${glowStyle}`}>Resources</h3>
          <div className="space-y-2 pl-4">
            {resourceItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`block text-white/80 hover:text-primary transition-all duration-300 ${glowStyle}`}
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/pricing"
          className={`block text-white hover:text-primary transition-all duration-300 font-medium ${glowStyle}`}
          onClick={onClose}
        >
          Pricing
        </Link>
      </div>
    </div>
  );
};
