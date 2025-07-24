import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from '@/components/ui/sonner';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalDialog } from '@/components/hero/AuthModalDialog';
import { trackEvent } from '@/utils/analytics';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Download, HelpCircle, Wand2, ArrowRight, History, BookOpen, Palette, Zap, Star, Users } from 'lucide-react';
import { SkipToContent } from '@/components/home/SkipToContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { EnhancedPromptInput } from '@/components/word-to-image/EnhancedPromptInput';
import { GenerationProgress } from '@/components/word-to-image/GenerationProgress';
import { EnhancedImageGallery } from '@/components/word-to-image/EnhancedImageGallery';
import { storageService } from '@/services/storageService';
import { useStyleParams } from '@/hooks/useStyleParams';
import { Link } from 'react-router-dom';
import { useStyleRecommendations } from '@/hooks/useStyleRecommendations';
import { useRecentStyles } from '@/hooks/useRecentStyles';
import { useGenerationHistory } from '@/hooks/useGenerationHistory';
import { StyleRecommendations } from '@/components/word-to-image/StyleRecommendations';
import { RecentStyles } from '@/components/word-to-image/RecentStyles';
import { GenerationHistory } from '@/components/word-to-image/GenerationHistory';
import { FloatingActionPanel, defaultActions } from '@/components/ui/floating-action-panel';
import { ProgressRing, PulseAnimation } from '@/components/ui/micro-interactions';
import { QuickTooltip } from '@/components/ui/enhanced-tooltip';

// Style mapping for URL parameters
const STYLE_MAPPINGS: Record<string, string> = {
  'photorealistic': 'photorealistic, ultra detailed, professional photography',
  'digital-art': 'digital art illustration, vibrant colors, modern style',
  'oil-painting': 'oil painting style, classical art, visible brushstrokes',
  'watercolor': 'watercolor painting style, soft brushstrokes, flowing colors',
  'cyberpunk': 'cyberpunk style, neon lights, futuristic, sci-fi',
  'anime': 'anime style illustration, manga art, Japanese animation'
};

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<{
    url: string;
    prompt?: string;
    timestamp?: number;
    style?: string;
  }[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [lastGenerationTime, setLastGenerationTime] = useState<number | null>(null);
  const [showTips, setShowTips] = useState(true);
  const [showGalleryManager, setShowGalleryManager] = useState(false);
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const { selectedStyle, hasStyleParam, clearStyleParam } = useStyleParams();
  const recommendations = useStyleRecommendations(prompt);
  const { recentStyles, addRecentStyle, clearRecentStyles } = useRecentStyles();
  const { history, addToHistory, regenerateFromHistory, clearHistory } = useGenerationHistory();
  
  const { generateImageFromPrompt } = useImageGeneration({
    onImageGenerated: (url) => {
      const newImage = { 
        url, 
        prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
        timestamp: Date.now(),
        style: selectedStyle || undefined
      };
      
      setGeneratedImages(prev => [...prev, newImage]);
      setLastGenerationTime(Date.now());
      setProgress(100);
      
      // Add to generation history
      addToHistory({
        prompt: prompt,
        style: selectedStyle || undefined,
        imageUrl: url
      });
      
      // Track recent style usage
      if (selectedStyle) {
        addRecentStyle(selectedStyle);
      }
      
      toast.success("Image generated successfully!", {
        description: selectedStyle ? `Your custom graphic with ${selectedStyle} style is ready to download.` : "Your custom graphic is ready to download.",
        action: {
          label: "Download",
          onClick: () => window.open(url, '_blank')
        }
      });
      trackEvent('text_to_image_generated', {
        style: selectedStyle || 'none'
      });
    },
    onGeneratingChange: (generating) => {
      setIsGenerating(generating);
      if (generating) {
        setProgress(0);
        setError(null);
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
        errorMessage: errorMsg,
        style: selectedStyle || 'none'
      });
    }
  });

  // Load user preferences on mount
  useEffect(() => {
    const preferences = storageService.getPreferences();
    if (preferences.autoSave === false) {
      setShowTips(false);
    }
  }, []);

  // Show style notification when coming from gallery
  useEffect(() => {
    if (hasStyleParam && selectedStyle) {
      toast.success(`${selectedStyle.replace('-', ' ')}` + ' style selected!', {
        description: "Your images will be generated with this artistic style.",
        action: {
          label: "Clear Style",
          onClick: () => clearStyleParam()
        }
      });
    }
  }, [hasStyleParam, selectedStyle, clearStyleParam]);
  
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
    
    // Enhance prompt with selected style
    let enhancedPrompt = prompt.trim();
    if (selectedStyle && STYLE_MAPPINGS[selectedStyle]) {
      enhancedPrompt = `${enhancedPrompt}, ${STYLE_MAPPINGS[selectedStyle]}`;
    }
    
    storageService.addSearchTerm(prompt.trim());
    
    try {
      trackEvent('text_to_image_generate_attempt', {
        promptLength: prompt.length,
        style: selectedStyle || 'none'
      });
      await generateImageFromPrompt(enhancedPrompt, '', false, '');
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to generate image", {
        description: errorMessage
      });
    }
  };

  const handleSelectRecommendedStyle = (styleId: string) => {
    clearStyleParam();
    // Update URL to show selected style
    const url = new URL(window.location.href);
    url.searchParams.set('style', styleId);
    window.history.pushState({}, '', url.toString());
    
    toast.success(`${styleId.replace('-', ' ')} style selected!`, {
      description: "Your images will be generated with this artistic style."
    });
  };

  const handleRegenerateFromHistory = (historyPrompt: string, historyStyle?: string) => {
    setPrompt(historyPrompt);
    if (historyStyle) {
      handleSelectRecommendedStyle(historyStyle);
    }
    
    toast.success("Prompt and style loaded from history!", {
      description: "Ready to regenerate with previous settings"
    });
    
    // Focus on the prompt input
    setTimeout(() => {
      const promptInput = document.querySelector('textarea[placeholder*="Describe"]') as HTMLTextAreaElement;
      if (promptInput) {
        promptInput.focus();
        promptInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSelectFromHistory = (historicalPrompt: string) => {
    setPrompt(historicalPrompt);
    toast.success("Prompt loaded from history");
  };

  // Fix the Create Another functionality
  const handleCreateAnother = () => {
    // Clear the prompt and focus on input
    setPrompt('');
    setError(null);
    setProgress(0);
    
    // Focus on the prompt input
    setTimeout(() => {
      const promptInput = document.querySelector('textarea[placeholder*="Describe"]') as HTMLTextAreaElement;
      if (promptInput) {
        promptInput.focus();
        promptInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    toast.success("Ready for your next creation!", {
      description: "Enter a new prompt to generate another image"
    });
  };

  // Fix the Generate Variation functionality  
  const handleGenerateVariation = async () => {
    if (!prompt.trim()) {
      toast.error("No prompt available for variation", {
        description: "Please enter a description first"
      });
      return;
    }
    
    // Add variation keywords to the existing prompt
    const variationPrompt = `${prompt}, different style, alternate version, creative variation`;
    
    try {
      await generateImageFromPrompt(variationPrompt, '', false, '');
      toast.info("Generating variation...", {
        description: "Creating a different version of your image"
      });
    } catch (error) {
      console.error('Failed to generate variation:', error);
    }
  };

  // Fix the Manage Gallery functionality
  const handleManageGallery = () => {
    setShowGalleryManager(true);
    toast.success("Gallery Manager opened", {
      description: "Manage your generated images below"
    });
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
      question: "How are my images stored?",
      answer: "All your generated images are automatically saved to your personal gallery with search, filtering, and organization features. You can favorite images, search by prompt, and manage your entire collection."
    },
    {
      question: "Can I download all my images at once?",
      answer: "Yes! Use the Gallery Manager to select multiple images and download them in bulk. You can also export your entire gallery data for backup purposes."
    }
  ];

  const generationTime = lastGenerationTime ? ((Date.now() - lastGenerationTime) / 1000).toFixed(1) : null;
  const searchHistory = storageService.getSearchHistory().slice(0, 5);

  const pageContent = {
    h1: "AI Image Generator: Turn Words to Art in Seconds",
    h2Headings: [
      "How to Generate AI Images",
      "Popular Use Cases for AI Art",
      "Frequently Asked Questions",
      "Ready to Create Without Limits?"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      <Helmet>
        <title>AI Image Generator: Turn Words to Art in Seconds | WordToImage</title>
        <meta name="description" content="Free AI-powered text-to-image tool. Create stunning visuals from text prompts instantly. No design skills needed. Try now!" />
        <meta name="keywords" content="AI image generator, text to image, AI art generator, free image generator, AI artwork, digital art creator" />
        <link rel="canonical" href="https://wordtoimage.com/text-to-image" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "WordToImage AI Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "description": "AI-powered text-to-image generator that creates stunning visuals from text descriptions",
            "url": "https://wordtoimage.com/text-to-image",
            "provider": {
              "@type": "Organization",
              "name": "WordToImage",
              "url": "https://wordtoimage.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Text-to-image AI generation",
              "50+ artistic styles",
              "HD quality images",
              "Auto-save gallery",
              "Batch generation",
              "Style recommendations"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "12500"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Generate AI Images from Text",
            "description": "Step-by-step guide to creating AI-generated images using text prompts",
            "image": "https://wordtoimage.com/text-to-image-tutorial.jpg",
            "totalTime": "PT2M",
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "Text description or prompt"
              }
            ],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "WordToImage AI Generator"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Enter your text prompt",
                "text": "Describe what you want to see in detail. Be specific about style, colors, and composition.",
                "image": "https://wordtoimage.com/step1.jpg"
              },
              {
                "@type": "HowToStep", 
                "name": "Choose an art style",
                "text": "Select from 50+ artistic styles like photorealistic, anime, digital art, or watercolor.",
                "image": "https://wordtoimage.com/step2.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Generate your image",
                "text": "Click 'Create Your Free Image Now' and our AI will generate your artwork in 3-5 seconds.",
                "image": "https://wordtoimage.com/step3.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Download and share",
                "text": "Your image is automatically saved to your gallery. Download in HD quality and share anywhere.",
                "image": "https://wordtoimage.com/step4.jpg"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://wordtoimage.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Image Generator",
                "item": "https://wordtoimage.com/text-to-image"
              }
            ]
          })}
        </script>
      </Helmet>
      <EnhancedSEOManager pageContent={pageContent} />
      
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
              AI Image Generator: Turn Words to Art in Seconds
            </h1>
          </div>
          
          <p className={cn(
            "text-gray-600 mb-8 leading-relaxed",
            isMobile ? "text-lg px-2" : "text-xl"
          )}>
            Transform your imagination into stunning visuals with our advanced AI. 
            All your creations are automatically saved and organized for easy access.
          </p>

          {/* Style Selection Indicator */}
          {selectedStyle && (
            <div className="mb-6">
              <Alert className="max-w-md mx-auto bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
                <Palette className="h-4 w-4 text-violet-600" />
                <AlertDescription className="text-violet-800">
                  <div className="flex items-center justify-between">
                    <span>Style: <strong>{selectedStyle.replace('-', ' ')}</strong></span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearStyleParam}
                      className="text-violet-600 hover:bg-violet-100"
                    >
                      Clear
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">3-5s</div>
              <div className="text-xs text-gray-500">Generation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">HD</div>
              <div className="text-xs text-gray-500">Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">Auto</div>
              <div className="text-xs text-gray-500">Save</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">∞</div>
              <div className="text-xs text-gray-500">Storage</div>
            </div>
          </div>

          {/* Browse Styles Link */}
          <div className="mb-6">
            <Button variant="outline" asChild className="hover:bg-violet-50">
              <Link to="/style-gallery">
                <Palette className="h-4 w-4 mr-2" />
                Browse 50+ Art Styles
              </Link>
            </Button>
          </div>

          {searchHistory.length > 0 && (
            <div className="mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTips(!showTips)}
                className="mb-3"
              >
                <History className="h-4 w-4 mr-2" />
                Recent Prompts ({searchHistory.length})
              </Button>
              
              {showTips && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {searchHistory.map((term, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSelectFromHistory(term)}
                      className="text-xs max-w-48 truncate hover:bg-violet-50"
                    >
                      "{term}"
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!user && !isLoading && (
            <Alert className="max-w-2xl mx-auto mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <div className="flex items-center justify-between">
                  <span>Try it free – first 3 images on us! All images auto-saved.</span>
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
          
          {/* New: Style Recommendations */}
          {recommendations.length > 0 && (
            <div className="px-6">
              <StyleRecommendations
                recommendations={recommendations}
                onSelectStyle={handleSelectRecommendedStyle}
                className="mb-4"
              />
            </div>
          )}
          
          {/* New: Recent Styles */}
          {recentStyles.length > 0 && (
            <div className="px-6">
              <RecentStyles
                recentStyles={recentStyles}
                onSelectStyle={handleSelectRecommendedStyle}
                onClearRecent={clearRecentStyles}
                className="mb-4"
              />
            </div>
          )}
          
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
                  <strong>Success!</strong> Generated in {generationTime}s{selectedStyle ? ` with ${selectedStyle.replace('-', ' ')} style` : ''} and auto-saved to your gallery.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
        
        {/* New: Generation History */}
        {history.length > 0 && (
          <div className="mt-6 max-w-4xl mx-auto">
            <GenerationHistory
              history={history}
              onRegenerate={handleRegenerateFromHistory}
              onClearHistory={clearHistory}
            />
          </div>
        )}
        
        {/* Enhanced Results Section */}
        <div className="mt-8" role="region" aria-label="Generated images">
          <EnhancedImageGallery 
            images={generatedImages} 
            loading={isGenerating}
            showGalleryManager={showGalleryManager}
            onToggleGalleryManager={setShowGalleryManager}
          />
          
          {/* Fixed Next Steps CTA */}
          {generatedImages.length > 0 && !isGenerating && (
            <div className="mt-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-violet-600 mr-2" />
                  What's next?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleCreateAnother}
                    className="hover:bg-violet-50 hover:border-violet-300 transition-colors"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Create Another
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleGenerateVariation}
                    disabled={!prompt.trim()}
                    className="hover:bg-violet-50 hover:border-violet-300 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Variation
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleManageGallery}
                    className="hover:bg-violet-50 hover:border-violet-300 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Manage Gallery
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* How to Generate AI Images Section */}
        <div className={cn(
          "mx-auto mt-16",
          isMobile ? "max-w-full" : "max-w-6xl"
        )}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Generate AI Images
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our simple 4-step process to create stunning AI artwork in seconds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Prompt</h3>
              <p className="text-gray-600">Describe what you want to see in detail. Be specific about style, colors, and composition.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Art Style</h3>
              <p className="text-gray-600">Select from 50+ artistic styles like photorealistic, anime, digital art, or watercolor.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate Image</h3>
              <p className="text-gray-600">Click 'Create Your Free Image Now' and our AI will generate your artwork in 3-5 seconds.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Download & Share</h3>
              <p className="text-gray-600">Your image is automatically saved to your gallery. Download in HD quality and share anywhere.</p>
            </div>
          </div>
        </div>

        {/* Popular Use Cases Section */}
        <div className={cn(
          "mx-auto mt-16",
          isMobile ? "max-w-full" : "max-w-6xl"
        )}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Use Cases for AI Art
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how creators worldwide are using our AI image generator
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Social Media Content</h3>
              <p className="text-gray-600 mb-4">Create eye-catching posts, stories, and profile images that stand out on Instagram, TikTok, and Facebook.</p>
              <div className="text-sm text-blue-600 font-medium">
                <Star className="w-4 h-4 inline mr-1" />
                Most Popular Use Case
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Marketing & Advertising</h3>
              <p className="text-gray-600 mb-4">Generate unique visuals for ads, banners, product mockups, and promotional materials without expensive stock photos.</p>
              <div className="text-sm text-green-600 font-medium">
                <Zap className="w-4 h-4 inline mr-1" />
                Business Favorite
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Creative Projects</h3>
              <p className="text-gray-600 mb-4">Bring stories to life with book covers, game art, character designs, and concept art for any creative project.</p>
              <div className="text-sm text-purple-600 font-medium">
                <Palette className="w-4 h-4 inline mr-1" />
                Artist's Choice
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Website Design</h3>
              <p className="text-gray-600">Create custom backgrounds, hero images, icons, and illustrations that perfectly match your brand.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Print Materials</h3>
              <p className="text-gray-600">Design posters, flyers, business cards, and merchandise with unique AI-generated artwork.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Education & Presentations</h3>
              <p className="text-gray-600">Enhance lectures, reports, and presentations with custom visuals that explain complex concepts.</p>
            </div>
          </div>
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
                Everything you need to know about our AI image generator and gallery features
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
                Join thousands of creators using our Pro features for unlimited HD image generation and advanced gallery management
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <BookOpen className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Advanced Gallery</h4>
                  <p className="text-sm opacity-90">Cloud sync & organization</p>
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
      
      {/* Floating Action Panel for Enhanced UX */}
      <FloatingActionPanel
        actions={[
          {
            id: 'generate',
            icon: <Sparkles className="h-5 w-5" />,
            label: 'Generate Image',
            action: handleGenerate,
            shortcut: 'Ctrl+Enter',
            color: 'purple',
            disabled: !prompt.trim() || isGenerating
          },
          {
            id: 'styles',
            icon: <Palette className="h-5 w-5" />,
            label: 'Browse Styles',
            action: () => window.location.href = '/style-gallery',
            color: 'pink'
          },
          {
            id: 'history',
            icon: <History className="h-5 w-5" />,
            label: 'View History',
            action: () => {
              const historySection = document.querySelector('[aria-label="Generation history"]');
              historySection?.scrollIntoView({ behavior: 'smooth' });
            },
            color: 'green',
            disabled: history.length === 0
          },
          {
            id: 'gallery',
            icon: <BookOpen className="h-5 w-5" />,
            label: 'Manage Gallery',
            action: handleManageGallery,
            color: 'blue',
            disabled: generatedImages.length === 0
          }
        ]}
        position="bottom-right"
        autoHide={true}
      />
    </div>
  );
}
