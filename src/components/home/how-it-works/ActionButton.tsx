
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

export const ActionButton: React.FC = () => {
  return (
    <div className="text-center mt-16">
      <Button 
        size="lg"
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300"
        onClick={() => {
          const heroSection = document.querySelector('.image-generation-section');
          if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        Try It Now
        <Wand2 className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
