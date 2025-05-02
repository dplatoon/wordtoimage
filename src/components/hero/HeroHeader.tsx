
import { Button } from '@/components/ui/button';
import { Wand2, Play } from 'lucide-react';

export const HeroHeader = () => {
  const handleGenerateImageClick = () => {
    // Scroll to the image generation form
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnHowClick = () => {
    // Scroll to the how it works section
    const howItWorks = document.getElementById('how-it-works');
    if (howItWorks) {
      howItWorks.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins mb-6">
        Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Words</span> into <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Stunning Visuals</span> with AI
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Effortlessly convert text into high-quality, customizable images in seconds.
        No design skills required.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-none hover:bg-blue-600 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          onClick={handleGenerateImageClick}
        >
          Get Started for Free
          <Wand2 className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="text-lg border-2 border-blue-300 text-gray-700 hover:bg-blue-50"
          onClick={handleLearnHowClick}
        >
          Learn How It Works
          <Play className="ml-2 h-4 w-4 fill-current" />
        </Button>
      </div>
    </div>
  );
};
