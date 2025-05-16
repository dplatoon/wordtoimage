
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MinimalistHeroProps {
  onShowProFeatures: () => void;
}

export const MinimalistHero = ({ onShowProFeatures }: MinimalistHeroProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Blurred background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm" 
          style={{ 
            backgroundImage: "url('/lovable-uploads/9baa5403-54fd-4d41-9dff-b6762b238e3e.png')",
            opacity: 0.2
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white/90 to-white" />
      </div>
      
      {/* Hero content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Turn Your Words Into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Stunning Images
            </span> Instantly
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Create beautiful AI-generated visuals from simple text descriptions.
            No design skills required.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105" 
              asChild
            >
              <Link to="/text-to-image">
                Get Started Free
                <Wand2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-indigo-300 text-gray-700 hover:bg-indigo-50 px-8 py-6 rounded-full text-lg transition-all transform hover:scale-105"
              onClick={onShowProFeatures}
            >
              See Examples
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free tier available
          </p>
        </motion.div>
      </div>
    </section>
  );
};
