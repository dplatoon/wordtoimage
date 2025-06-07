
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalDialog } from '@/components/hero/AuthModalDialog';
import { trackEvent } from '@/utils/analytics';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Download, HelpCircle, Wand2, ArrowRight } from 'lucide-react';
import { SkipToContent } from '@/components/home/SkipToContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { EnhancedPromptInput } from '@/components/word-to-image/EnhancedPromptInput';
import { GenerationProgress } from '@/components/word-to-image/GenerationProgress';
import { EnhancedImageGallery } from '@/components/word-to-image/EnhancedImageGallery';

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<{
    url: string;
    prompt?: string;
    timestamp?: number;
  }[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [lastGenerationTime, setLastGenerationTime] = useState<number | null>(null);
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  
  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: url => {
      setGeneratedImages(prev => [...prev, { 
        url, 
        prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
        timestamp: Date.now()
      }]);
      setLastGenerationTime(Date.now());
      setProgress(100);
      
      toast.success("Image generated successfully!", {
        description: "Your custom graphic is ready to download.",
        action: {
          label: "Download",
          onClick: () => window.open(url, '_blank')
        }
      });
      trackEvent('text_to_image_generated');
    },
    onGeneratingChange: (generating) => {
      setIsGenerating(generating);
      if (generating) {
        setProgress(0);
        setError(null);
        // Simulate progress
        const interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + Math.random() * 15;
            if (newProgress >= 95) {
              clearInterval(interval);
              return 95;
            }
            return newProgress;
          });
        }, 200);
      }
    },
    onError: errorMsg => {
      setError(errorMsg);
      setProgress(0);
      toast.error("Failed to generate image", {
        description: errorMsg || "An unexpected error occurred",
        action: {
          label: "Try Again",
          onClick: () => handleGenerate()
        }
      });
      trackEvent('text_to_image_error', {
        errorMessage: errorMsg
      });
    }
  });
  
  const handleGenerate = async () => {
    if (!user && !isLoading) {
      setAuthModalOpen(true);
      trackEvent('auth_modal_opened', {
        source: 'text_to_image'
      });
      return;
    }
    
    if (!prompt.trim()) {
      toast.error("Please enter a description", {
        description: "Tell us what you'd like to create!"
      });
      return;
    }
    
    try {
      trackEvent('text_to_image_generate_attempt', {
        promptLength: prompt.length
      });
      await generateImageFromPrompt(prompt, '', false, '');
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to generate image", {
        description: errorMessage
      });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (prompt.trim() && !isGenerating) {
          handleGenerate();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [prompt, isGenerating]);

  const faqItems = [
    {
      question: "How does the AI text-to-image generator work?",
      answer: "Our AI uses advanced machine learning models to turn your text descriptions into unique images. Simply describe what you want to see, and our AI will create it in seconds!"
    },
    {
      question: "What makes a good prompt?",
      answer: "Be specific and descriptive! Instead of 'forest', try 'a watercolor painting of a misty forest at sunrise with golden light filtering through the trees'. Include details about style, colors, mood, and composition."
    },
    {
      question: "How fast is image generation?",
      answer: "Most images are generated in just 3-5 seconds. Our AI works quickly to bring your ideas to life without the wait."
    },
    {
      question: "Are there any limitations?",
      answer: "We don't allow inappropriate content. Free users get limited generations per day, while Pro users enjoy unlimited access and HD quality images."
    }
  ];

  const generationTime = lastGenerationTime ? ((Date.now() - lastGenerationTime) / 1000).toFixed(1) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      <SkipToContent />
      <Nav />
      
      <main className={cn(
        "container mx-auto px-4 py-8 flex-grow",
        isMobile ? "px-2" : "py-12"
      )} id="main-content" role="main">
        {/* Enhanced Page Header */}
        <div className={cn(
          "mx-auto text-center mb-8",
          isMobile ? "max-w-full" : "max-w-4xl mb-12"
        )}>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Wand2 className="text-violet-600 mr-3 h-10 w-10" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-bounce" />
            </div>
            <h1 className={cn(
              "font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600",
              isMobile ? "text-3xl" : "text-4xl md:text-5xl"
            )}>
              AI Image Generator
            </h1>
          </div>
          
          <p className={cn(
            "text-gray-600 mb-8 leading-relaxed",
            isMobile ? "text-lg px-2" : "text-xl"
          )}>
            Transform your imagination into stunning visuals with our advanced AI. 
            Describe your vision and watch it come to life in seconds.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">3-5s</div>
              <div className="text-xs text-gray-500">Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">HD</div>
              <div className="text-xs text-gray-500">Quality Output</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">∞</div>
              <div className="text-xs text-gray-500">Possibilities</div>
            </div>
          </div>

          {/* User Status Alert */}
          {!user && !isLoading && (
            <Alert className="max-w-2xl mx-auto mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <div className="flex items-center justify-between">
                  <span>Try it free – first 3 images on us!</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="ml-4 border-amber-300 text-amber-700 hover:bg-amber-100"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Sign up <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        {/* Enhanced Main Generator Interface */}
        <div className={cn(
          "mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden",
          isMobile ? "max-w-full" : "max-w-4xl"
        )}>
          <div className={cn(
            "p-6 bg-gradient-to-r from-violet-50 to-blue-50",
            !isMobile && "p-8"
          )}>
            <EnhancedPromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
          
          {/* Generation Progress */}
          {isGenerating && (
            <div className="px-6 pb-6">
              <GenerationProgress
                isGenerating={isGenerating}
                progress={progress}
                currentPrompt={prompt}
                estimatedTime={5}
              />
            </div>
          )}

          {/* Success Feedback */}
          {generationTime && !isGenerating && (
            <div className="px-6 pb-4">
              <Alert className="bg-green-50 border-green-200">
                <Sparkles className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Success!</strong> Generated in {generationTime}s. Your image is ready below.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
        
        {/* Enhanced Results Section */}
        <div className="mt-8" role="region" aria-label="Generated images">
          <EnhancedImageGallery 
            images={generatedImages} 
            loading={isGenerating}
          />
          
          {/* Next Steps CTA */}
          {generatedImages.length > 0 && !isGenerating && (
            <div className="mt-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-violet-600 mr-2" />
                  What's next?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setPrompt('')}
                    className="hover:bg-violet-50 hover:border-violet-300 transition-colors"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Create Another
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleGenerate()}
                    disabled={!prompt.trim()}
                    className="hover:bg-violet-50 hover:border-violet-300 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Variation
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced FAQ Section */}
        <div className={cn(
          "mx-auto mt-16",
          isMobile ? "max-w-full" : "max-w-4xl"
        )}>
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
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
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
        </div>

        {/* Enhanced Pro Features Teaser */}
        {!user && !isLoading && (
          <div className="mt-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Create Without Limits?
              </h3>
              <p className="mb-8 opacity-90 text-lg">
                Join thousands of creators using our Pro features for unlimited HD image generation
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Sparkles className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Unlimited Images</h4>
                  <p className="text-sm opacity-90">Generate as many as you need</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Wand2 className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">HD Quality</h4>
                  <p className="text-sm opacity-90">2K+ resolution, no watermarks</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Download className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Priority Speed</h4>
                  <p className="text-sm opacity-90">3× faster generation</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-white text-violet-600 hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
                onClick={() => setAuthModalOpen(true)}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating Free
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      
      <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
