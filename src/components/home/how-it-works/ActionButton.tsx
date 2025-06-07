
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ActionButton = () => {
  const handleButtonClick = () => {
    // Scroll to the image generation form
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="text-center mt-12 animate-fade-in"
      style={{ animationDelay: '0.2s' }}
    >
      <Button 
        onClick={handleButtonClick}
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        Create Your Image Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      
      <p className="mt-4 text-sm text-gray-500">
        No credit card required • Free to try
      </p>
    </div>
  );
};
