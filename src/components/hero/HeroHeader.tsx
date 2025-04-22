import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, ImagePlus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroHeader = () => {
  const navigate = useNavigate();
  
  const handleSamplePrompt = () => {
    // You can replace this with your actual prompt
    const samplePrompt = "A serene landscape with mountains at sunset, digital art style";
    // Find the nearest input and set its value
    const promptInput = document.querySelector('input[placeholder*="Describe"]') as HTMLInputElement;
    if (promptInput) {
      promptInput.value = samplePrompt;
      promptInput.focus();
      
      // Optionally trigger the generate button click
      const generateButton = promptInput.closest('form')?.querySelector('button') as HTMLButtonElement;
      if (generateButton) {
        generateButton.click();
      }
    }
  };

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
    <div className="text-center lg:text-left mb-8">
      <div 
        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-6 text-sm font-medium"
        role="banner"
        aria-label="Feature highlight"
      >
        <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
        <span>Turn Words Into Stunning Graphics</span>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl" aria-hidden="true" />
        <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-poppins mb-6">
          Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Text Into Stunning AI Images</span> in Seconds
        </h1>
        <p className="relative text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
          Transform your words into stunning, shareable graphics for all social platforms with our AI-powered design tool. No design skills required!
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-lg px-6"
          onClick={handleGenerateImageClick}
        >
          Generate Your First Image
          <Wand2 className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="text-lg"
          onClick={handleTemplateGalleryClick}
        >
          Browse Template Gallery
          <ImagePlus className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <button
        onClick={handleSamplePrompt}
        className="mt-4 text-blue-600 hover:text-blue-700 flex items-center justify-center lg:justify-start mx-auto lg:mx-0 text-sm font-medium group"
      >
        Try a Sample Prompt
        <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
      </button>
      <div 
        className="mt-8 flex items-center justify-center lg:justify-start"
        role="complementary"
        aria-label="User statistics"
      >
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-300 border-2 border-white" />
          ))}
        </div>
        <div className="ml-3 text-sm text-gray-600">
          <span className="font-medium text-gray-900">2,500+</span> creators trust WordToImage
        </div>
      </div>
    </div>
  );
};
