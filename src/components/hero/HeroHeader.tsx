
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroHeader = () => {
  const navigate = useNavigate();

  const handleGenerateImageClick = () => {
    // Scroll to the image generation form
    const imageForm = document.querySelector('.image-generation-section');
    if (imageForm) {
      imageForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTemplateGalleryClick = () => {
    navigate('/templates');
  };

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 mb-6 text-sm font-medium animate-fade-in">
        <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
        <span>AI Image Generator</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins mb-6">
        Create Amazing Images <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">From Text</span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Type your description and our AI will generate stunning visuals in seconds.
        No design skills required.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-lg px-6 shadow-md"
          onClick={handleGenerateImageClick}
        >
          Create Your Image
          <Wand2 className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="text-lg border-blue-700 text-blue-300 hover:bg-blue-900/50"
          onClick={handleTemplateGalleryClick}
        >
          Browse Templates
          <ImagePlus className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
