
import { Link } from 'react-router-dom';
import { productItems, resourceItems } from './navigationData';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200 py-4">
      <div className="space-y-4">
        {/* Product Section */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Product</h3>
          <div className="space-y-2 pl-4">
            {productItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="block text-gray-600 hover:text-violet-600 transition-colors"
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Resources</h3>
          <div className="space-y-2 pl-4">
            {resourceItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="block text-gray-600 hover:text-violet-600 transition-colors"
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/pricing"
          className="block text-gray-600 hover:text-violet-600 transition-colors font-medium"
          onClick={onClose}
        >
          Pricing
        </Link>
      </div>
    </div>
  );
};
