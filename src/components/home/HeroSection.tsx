
import { Link } from 'react-router-dom';
import { Wand2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent } from '@/utils/analytics';

export const HeroSection = () => {
  const { user } = useAuth();
  const [showProModal, setShowProModal] = useState(false);
  
  const handleGetStarted = () => {
    trackEvent('cta_get_started_clicked');
  };
  
  const handleProFeatures = () => {
    setShowProModal(true);
    trackEvent('cta_pro_features_clicked');
  };
  
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins mb-6">
          Turn Words Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Stunning Images</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Word To Image - Transform Word Into Images Generation in Seconds
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" 
            asChild
          >
            <Link to="/text-to-image" onClick={handleGetStarted}>
              Start Free
              <Wand2 className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg border-2 border-blue-300 text-gray-700 hover:bg-blue-50 transition-colors px-8 py-6"
            onClick={handleProFeatures}
          >
            View Pro Features
            <Star className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
