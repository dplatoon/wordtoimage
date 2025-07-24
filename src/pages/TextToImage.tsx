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
import { GenerationProgress } from '@/components/word-to-image/GenerationProgress';
import { EnhancedImageGallery } from '@/components/word-to-image/EnhancedImageGallery';
import { ValueProposition } from '@/components/text-to-image/ValueProposition';
import { EnhancedPromptInput } from '@/components/text-to-image/EnhancedPromptInput';
import { StyleTagSuggestions } from '@/components/text-to-image/StyleTagSuggestions';
import { BrowseStylesModal } from '@/components/text-to-image/BrowseStylesModal';
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
import { BrowserCompatibilityWrapper } from '@/components/compatibility/BrowserCompatibilityWrapper';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { ImageGenerationSidebar } from '@/components/text-to-image/ImageGenerationSidebar';
import { motion } from 'framer-motion';

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
  const [count, setCount] = useState(1);
  const [resolution, setResolution] = useState('1024x1024');
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

  const handleTagSelect = (tag: string) => {
    const newPrompt = prompt ? `${prompt}, ${tag}` : tag;
    setPrompt(newPrompt);
    toast.success(`"${tag}" added to your prompt`, {
      description: "Your prompt has been enhanced with this style tag"
    });
  };

  const handleStyleChange = (newStyle: string) => {
    // Update URL to show selected style
    const url = new URL(window.location.href);
    url.searchParams.set('style', newStyle);
    window.history.pushState({}, '', url.toString());
    
    toast.success(`${newStyle.replace('-', ' ')} style selected!`, {
      description: "Your images will be generated with this artistic style."
    });
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
    <BrowserCompatibilityWrapper>
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="min-h-screen flex w-full bg-gradient-to-b from-violet-50 via-white to-indigo-50">
          <Helmet>
            <title>AI Image Generator: Turn Words to Art in Seconds | WordToImage</title>
            <meta name="description" content="Free AI-powered text-to-image tool. Create stunning visuals from text prompts instantly. No design skills needed. Try now!" />
            <meta name="keywords" content="AI image generator, text to image, AI art generator, free image generator, AI artwork, digital art creator" />
            <link rel="canonical" href="https://wordtoimage.com/text-to-image" />
          </Helmet>
          <EnhancedSEOManager pageContent={pageContent} />
          
          {/* Header with Nav and Sidebar Trigger */}
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-9 w-9" />
                <div>
                  <h1 className="text-xl font-bold text-gradient">AI Image Studio</h1>
                  <p className="text-sm text-muted-foreground">Create stunning visuals with AI</p>
                </div>
              </div>
              <Nav />
            </div>
          </header>

          {/* Sidebar */}
          <ImageGenerationSidebar
            style={selectedStyle || 'auto'}
            onStyleChange={handleStyleChange}
            count={count}
            onCountChange={setCount}
            resolution={resolution}
            onResolutionChange={setResolution}
            prompt={prompt}
            onPromptChange={setPrompt}
          />

          {/* Main Content */}
          <SidebarInset className="flex-1">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <SkipToContent />
              
              {/* Hero Section */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    {pageContent.h1}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                    Transform your imagination into stunning visuals with our AI-powered image generator.
                  </p>
                </motion.div>
              </div>

              {/* Value Proposition */}
              <ValueProposition className="mb-8" />

              {/* Main Generation Section */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <EnhancedPromptInput
                    prompt={prompt}
                    onChange={setPrompt}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    canGenerate={!!prompt.trim() && !isGenerating}
                    className="mb-6"
                  />

                  {/* Generation Progress */}
                  {isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <GenerationProgress 
                        isGenerating={isGenerating}
                        progress={progress}
                        currentPrompt={prompt}
                        estimatedTime={5}
                      />
                    </motion.div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  {/* Style Recommendations */}
                  {recommendations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <StyleRecommendations
                        recommendations={recommendations}
                        onSelectStyle={handleSelectRecommendedStyle}
                      />
                    </motion.div>
                  )}

                  {/* Recent Styles */}
                  {recentStyles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <RecentStyles
                        recentStyles={recentStyles}
                        onSelectStyle={handleSelectRecommendedStyle}
                        onClearRecent={clearRecentStyles}
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Browse Styles Section */}
              <div className="text-center mb-8">
                <BrowseStylesModal onStyleSelect={handleStyleChange}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/60 hover:bg-white/80 border-primary/30 hover:border-primary/50 text-primary"
                  >
                    <Palette className="h-5 w-5 mr-2" />
                    Browse 50+ Art Styles
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </BrowseStylesModal>
              </div>

              {/* Style Tag Suggestions */}
              <StyleTagSuggestions 
                onTagSelect={handleTagSelect}
                className="mb-8"
              />

              {/* Generated Images Gallery */}
              <div className="mt-8" role="region" aria-label="Generated images">
                <EnhancedImageGallery 
                  images={generatedImages} 
                  loading={isGenerating}
                  showGalleryManager={showGalleryManager}
                  onToggleGalleryManager={setShowGalleryManager}
                />
              </div>
            </div>
          </SidebarInset>
        </div>
        
        <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </SidebarProvider>
    </BrowserCompatibilityWrapper>
  );
}
