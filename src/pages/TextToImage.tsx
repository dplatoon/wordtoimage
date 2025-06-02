
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
import { Sparkles, Zap, Download, HelpCircle, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [focusOnResult, setFocusOnResult] = useState(false);
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  
  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: url => {
      setGeneratedImages(prev => [...prev, { url }]);
      setLastGenerationTime(Date.now());
      setFocusOnResult(true);
      
      toast.success("Image generated successfully!", {
        description: "Your custom graphic is ready to download.",
        action: {
          label: "Download",
          onClick: () => window.open(url, '_blank')
        }
      });
      trackEvent('text_to_image_generated');
      
      // Auto-scroll to results on mobile with better focus management
      if (isMobile) {
        setTimeout(() => {
          const resultsSection = document.getElementById('results-section');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Set focus to the result for screen readers
            const resultImage = resultsSection.querySelector('img[alt*="generated"]');
            if (resultImage) {
              (resultImage as HTMLElement).focus();
            }
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
      // Focus back to input for better UX
      const textareaElement = document.querySelector('textarea[aria-label="Image description"]');
      if (textareaElement) {
        (textareaElement as HTMLElement).focus();
      }
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

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (prompt.trim()) {
          handleGenerate(prompt);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [prompt]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* AI-themed background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[5%] w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-[10%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 right-[20%] w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Neural network pattern */}
        <div className="absolute top-1/4 left-[15%] w-24 h-24 border-2 border-blue-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-[10%] w-32 h-32 border-2 border-purple-200 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-[25%] w-16 h-16 bg-yellow-100 rounded opacity-30 animate-pulse animation-delay-3000"></div>
      </div>

      <SkipToContent />
      <Nav />
      
      <main className={cn(
        "container mx-auto px-4 py-8 flex-grow relative z-10",
        isMobile ? "px-2" : "py-12"
      )} id="main-content" role="main">
        {/* Page Header with AI branding */}
        <motion.div 
          className={cn(
            "mx-auto text-center mb-8",
            isMobile ? "max-w-full" : "max-w-4xl mb-12"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Wand2 className="text-blue-600 mr-3 h-8 w-8 animate-pulse" />
            <h1 className={cn(
              "font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600",
              isMobile ? "text-2xl" : "text-3xl md:text-4xl"
            )}>
              AI Image Generator
            </h1>
          </div>
          
          <p className={cn(
            "text-gray-600 mb-6",
            isMobile ? "text-base px-2" : "text-lg"
          )}>
            Transform your ideas into stunning visuals. Enter a description below and watch our AI create 
            a matching image in seconds. No design experience needed!
          </p>
          
          {/* Usage Tips with enhanced styling */}
          <Alert className="max-w-2xl mx-auto mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
            <AlertDescription className="text-blue-800">
              <strong>Pro tip:</strong> Be specific for best results! Include details about style, lighting, colors, and mood.
            </AlertDescription>
          </Alert>

          {/* User Status Banner */}
          {!user && !isLoading && (
            <Alert className="max-w-2xl mx-auto mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Try it out – first 3 images free! <Button 
                  variant="link" 
                  className="text-amber-800 underline p-0 h-auto font-semibold hover:text-amber-900"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Sign up
                </Button> for unlimited access and HD quality.
              </AlertDescription>
            </Alert>
          )}
        </motion.div>
        
        {/* Main Generator Interface with enhanced visual appeal */}
        <motion.div 
          className={cn(
            "mx-auto bg-white rounded-xl shadow-lg border border-gray-100 relative",
            isMobile ? "p-4 max-w-full" : "p-8 max-w-4xl"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Subtle interactive area background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 rounded-xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <TextToImageForm onGenerate={handleGenerate} isGenerating={isGenerating} />
            
            {/* Example Prompts with better styling */}
            {!isGenerating && generatedImages.length === 0 && (
              <motion.div 
                className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                  Need inspiration? Try these examples:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="text-left p-3 text-xs text-gray-600 hover:bg-white hover:text-blue-600 rounded border border-transparent hover:border-blue-200 transition-all hover:shadow-sm"
                      aria-label={`Use example prompt: ${example}`}
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Enhanced Generation Feedback */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div 
                  className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                      <Sparkles className="absolute top-0 left-0 h-6 w-6 text-blue-400 animate-pulse" />
                    </div>
                    <span className="text-blue-800 font-medium">Creating your image... This usually takes 3-5 seconds</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Success Message */}
            <AnimatePresence>
              {generationTime && (
                <motion.div 
                  className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center text-green-800">
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="text-sm">Generated in {generationTime}s! Your image is ready.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Results Section with improved accessibility */}
        <div id="results-section" className="mt-8" role="region" aria-label="Generated images">
          <ImageGallery 
            images={generatedImages} 
            onEdit={() => {}} 
            loading={isGenerating}
          />
          
          {/* Enhanced Next Steps */}
          <AnimatePresence>
            {generatedImages.length > 0 && !isGenerating && (
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">What's next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(generatedImages[generatedImages.length - 1]?.url, '_blank')}
                      className="flex items-center hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      aria-label="Download the latest generated image"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Image
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setPrompt('');
                        const textareaElement = document.querySelector('textarea[aria-label="Image description"]');
                        if (textareaElement) {
                          (textareaElement as HTMLElement).focus();
                        }
                      }}
                      className="hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      Try New Prompt
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleGenerate(prompt)}
                      disabled={!prompt.trim()}
                      className="hover:bg-green-50 hover:border-green-300 transition-colors disabled:opacity-50"
                      aria-label="Generate another image with the same prompt"
                    >
                      Generate Again
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Enhanced FAQ Section */}
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
            
            <div className="space-y-4" role="region" aria-label="Frequently asked questions">
              {faqItems.map((item, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-800">{item.question}</span>
                    <HelpCircle className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pt-3 pb-4 text-gray-600 leading-relaxed">
                    {item.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Pro Features Teaser */}
        {!user && !isLoading && (
          <motion.div 
            className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 md:p-8 text-white text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full animate-pulse animation-delay-2000"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Ready to Create Without Limits?
              </h3>
              <p className="mb-6 opacity-90">
                Join thousands of creators who use our Pro features for unlimited HD image generation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <strong>Unlimited Images</strong><br/>
                  Generate as many as you need
                </div>
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <strong>HD Quality</strong><br/>
                  2K+ resolution, no watermarks
                </div>
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <strong>Priority Speed</strong><br/>
                  3× faster generation
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                onClick={() => setAuthModalOpen(true)}
              >
                Sign Up Free
              </Button>
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />
      
      <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
