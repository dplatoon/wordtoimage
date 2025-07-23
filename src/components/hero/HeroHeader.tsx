
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
    <div className="text-center mb-8 animate-fade-in">
      <h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins mb-6 animate-fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Words</span> into <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Stunning Visuals</span> Instantly!
      </h1>
      
      <p 
        className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto animate-fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        Harness the power of AI to create beautiful visuals from any text.
        No design skills required.
      </p>
      
      <p 
        className="text-sm text-gray-500 mb-8 max-w-xl mx-auto animate-fade-in"
        style={{ animationDelay: '0.5s' }}
      >
        Try it free - no signup required! Create your first AI image instantly.
      </p>
      
      <div 
        className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
        style={{ animationDelay: '0.6s' }}
      >
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          onClick={handleGenerateImageClick}
        >
          Create Your Image
          <Wand2 className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="text-lg border-2 border-indigo-300 text-gray-700 hover:bg-indigo-50 transition-colors transform hover:scale-105"
          onClick={handleLearnHowClick}
        >
          See Examples
          <Play className="ml-2 h-4 w-4 fill-current" />
        </Button>
      </div>
    </div>
  );
};
