
import { Button } from '@/components/ui/button';

interface ProFeaturesModalProps {
  showModal?: boolean;
  onClose: () => void;
}

export const ProFeaturesModal = ({ showModal = true, onClose }: ProFeaturesModalProps) => {
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>
        
        <h3 className="text-2xl font-bold mb-4">Upgrade to Pro</h3>
        <p className="text-gray-600 mb-6">
          Get access to HD renders, faster generation, and more with our Pro plan.
        </p>
        
        <div className="space-y-4">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Subscribe Now - $9.99/month
          </Button>
          
          <Button variant="outline" className="w-full" onClick={onClose}>
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
};
