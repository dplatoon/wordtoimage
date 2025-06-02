
import { Link } from 'react-router-dom';
import { Wand2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent } from '@/utils/analytics';
import { motion } from 'framer-motion';

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
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Words</span> Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Visual Magic</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Create stunning images from text descriptions in seconds using our advanced AI technology
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105" 
            asChild
          >
            <Link to="/text-to-image" onClick={handleGetStarted}>
              Create Free
              <Wand2 className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg border-2 border-indigo-300 text-gray-700 hover:bg-indigo-50 transition-colors transform hover:scale-105 px-8 py-6"
            onClick={handleProFeatures}
          >
            Explore Pro Features
            <Star className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
