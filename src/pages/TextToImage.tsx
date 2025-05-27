
import React, { useState, useEffect } from 'react';
import { TextToImageForm } from '@/components/word-to-image/TextToImageForm';
import { toast } from '@/components/ui/sonner';
import { ImageGallery } from '@/components/word-to-image/ImageGallery';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalDialog } from '@/components/hero/AuthModalDialog';
import { trackEvent } from '@/utils/analytics';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Download, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SkipToContent } from '@/components/home/SkipToContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceImage, setSourceImage] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<{
    url: string;
  }[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [lastGenerationTime, setLastGenerationTime] = useState<number | null>(null);
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  
  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: url => {
      setGeneratedImages(prev => [...prev, { url }]);
      setLastGenerationTime(Date.now());
      toast.success("Image generated successfully!", {
        description: "Your custom graphic is ready to download.",
        action: {
          label: "Download",
          onClick: () => window.open(url, '_blank')
        }
      });
      trackEvent('text_to_image_generated');
      
      // Auto-scroll to results on mobile
      if (isMobile) {
        setTimeout(() => {
          const resultsSection = document.getElementById('results-section');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    },
    onGeneratingChange: setIsGenerating,
    onError: errorMsg => {
      setError(errorMsg);
      toast.error("Failed to generate image", {
        description: errorMsg || "An unexpected error occurred",
        action: {
          label: "Try Again",
          onClick: () => handleGenerate(prompt)
        }
      });
      trackEvent('text_to_image_error', {
        errorMessage: errorMsg
      });
    }
  });
  
  const handleGenerate = async (promptText: string) => {
    if (!user && !isLoading) {
      setAuthModalOpen(true);
      trackEvent('auth_modal_opened', {
        source: 'text_to_image'
      });
      return;
    }
    
    if (!promptText.trim()) {
      toast.error("Please enter a description", {
        description: "Tell us what you'd like to create!"
      });
      return;
    }
    
    try {
      trackEvent('text_to_image_generate_attempt', {
        promptLength: promptText.length,
        hasSourceImage: !!sourceImage
      });
      await generateImageFromPrompt(promptText, '', false, sourceImage);
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to generate image", {
        description: errorMessage
      });
    }
  };

  const faqItems = [
    {
      question: "How does the AI text-to-image generator work?",
      answer: "Our AI uses advanced machine learning models to turn your text descriptions into unique images. Simply describe what you want to see, and our AI will create it in seconds!"
    },
    {
      question: "Do I need design experience to use this?",
      answer: "Not at all! Our tool is designed for everyone. No design skills or technical knowledge required – just describe your idea in plain English."
    },
    {
      question: "What kind of images can I create?",
      answer: "You can create almost anything you can imagine: artwork, logos, illustrations, product mockups, social media graphics, and more. The possibilities are endless!"
    },
    {
      question: "How fast is image generation?",
      answer: "Most images are generated in just 3-5 seconds. Our AI works quickly to bring your ideas to life without the wait."
    },
    {
      question: "What makes a good prompt?",
      answer: "Be specific and descriptive! Instead of 'forest', try 'a watercolor painting of a misty forest at sunrise with golden light filtering through the trees'. Include details about style, colors, mood, and composition."
    },
    {
      question: "Are there any limitations?",
      answer: "We don't allow inappropriate content. Free users get limited generations per day, while Pro users enjoy unlimited access and HD quality images."
    }
  ];

  const examplePrompts = [
    "A watercolor painting of a sunset over mountains with dramatic clouds",
    "Modern minimalist logo design for a tech startup, clean and professional",
    "Cozy coffee shop interior with warm lighting and wooden furniture",
    "Futuristic cityscape at night with neon lights and flying cars"
  ];

  const generationTime = lastGenerationTime ? ((Date.now() - lastGenerationTime) / 1000).toFixed(1) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <SkipToContent />
      <Nav />
      
      <main className={cn(
        "container mx-auto px-4 py-8 flex-grow",
        isMobile ? "px-2" : "py-12"
      )} id="main-content">
        {/* Page Header */}
        <motion.div 
          className={cn(
            "mx-auto text-center mb-8",
            isMobile ? "max-w-full" : "max-w-4xl mb-12"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className={cn(
            "font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600",
            isMobile ? "text-2xl" : "text-3xl md:text-4xl"
          )}>
            AI Image Generator
          </h1>
          <p className={cn(
            "text-gray-600 mb-6",
            isMobile ? "text-base px-2" : "text-lg"
          )}>
            Enter a description below and our AI will create a matching image in seconds. 
            No design experience needed – just describe your vision!
          </p>
          
          {/* Usage Tips */}
          <Alert className="max-w-2xl mx-auto mb-6 bg-blue-50 border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Pro tip:</strong> Be specific for best results! Include details about style, lighting, colors, and mood.
            </AlertDescription>
          </Alert>

          {/* User Status Banner */}
          {!user && !isLoading && (
            <Alert className="max-w-2xl mx-auto mb-6 bg-amber-50 border-amber-200">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Try it out – first 3 images free! <Button 
                  variant="link" 
                  className="text-amber-800 underline p-0 h-auto font-semibold"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Sign up
                </Button> for unlimited access and HD quality.
              </AlertDescription>
            </Alert>
          )}
        </motion.div>
        
        {/* Main Generator Interface */}
        <motion.div 
          className={cn(
            "mx-auto bg-white rounded-xl shadow-lg border border-gray-100",
            isMobile ? "p-4 max-w-full" : "p-8 max-w-4xl"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <TextToImageForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          
          {/* Example Prompts */}
          {!isGenerating && generatedImages.length === 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Need inspiration? Try these examples:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-left p-2 text-xs text-gray-600 hover:bg-white hover:text-blue-600 rounded border border-transparent hover:border-blue-200 transition-all"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Generation Feedback */}
          {isGenerating && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-800 font-medium">Creating your image... This usually takes 3-5 seconds</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {generationTime && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center text-green-800">
                <Zap className="h-4 w-4 mr-2" />
                <span className="text-sm">Generated in {generationTime}s! Your image is ready.</span>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Results Section */}
        <div id="results-section" className="mt-8">
          <ImageGallery 
            images={generatedImages} 
            onEdit={() => {}} 
            loading={isGenerating}
          />
          
          {/* Next Steps */}
          {generatedImages.length > 0 && !isGenerating && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What's next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(generatedImages[generatedImages.length - 1]?.url, '_blank')}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Image
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setPrompt('');
                      const textareaElement = document.querySelector('textarea');
                      if (textareaElement) {
                        textareaElement.focus();
                      }
                    }}
                  >
                    Try New Prompt
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleGenerate(prompt)}
                    disabled={!prompt.trim()}
                  >
                    Generate Again
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* FAQ Section */}
        <motion.div 
          className={cn(
            "mx-auto mt-16",
            isMobile ? "max-w-full" : "max-w-4xl"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Everything you need to know about our AI image generator
              </p>
            </div>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="font-medium text-gray-800">{item.question}</span>
                    <HelpCircle className="h-5 w-5 text-gray-500" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pt-3 pb-4 text-gray-600 leading-relaxed">
                    {item.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pro Features Teaser */}
        {!user && !isLoading && (
          <motion.div 
            className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 md:p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Ready to Create Without Limits?
            </h3>
            <p className="mb-6 opacity-90">
              Join thousands of creators who use our Pro features for unlimited HD image generation
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-white/10 p-3 rounded-lg">
                <strong>Unlimited Images</strong><br/>
                Generate as many as you need
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <strong>HD Quality</strong><br/>
                2K+ resolution, no watermarks
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <strong>Priority Speed</strong><br/>
                3× faster generation
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign Up Free
            </Button>
          </motion.div>
        )}
      </main>
      
      <Footer />
      
      <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
