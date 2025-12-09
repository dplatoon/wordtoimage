import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from '@/components/ui/sonner';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModalDialog } from '@/components/hero/AuthModalDialog';
import { trackEvent } from '@/utils/analytics';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, ArrowRight, Palette, Zap, Clock, Shield, Star, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GenerationProgress } from '@/components/word-to-image/GenerationProgress';
import { EnhancedImageGallery } from '@/components/word-to-image/EnhancedImageGallery';
import { BrowseStylesModal } from '@/components/text-to-image/BrowseStylesModal';
import { storageService } from '@/services/storageService';
import { useStyleParams } from '@/hooks/useStyleParams';
import { useStyleRecommendations } from '@/hooks/useStyleRecommendations';
import { useRecentStyles } from '@/hooks/useRecentStyles';
import { useGenerationHistory } from '@/hooks/useGenerationHistory';
import { StyleRecommendations } from '@/components/word-to-image/StyleRecommendations';
import { RecentStyles } from '@/components/word-to-image/RecentStyles';
import { BrowserCompatibilityWrapper } from '@/components/compatibility/BrowserCompatibilityWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileOptimizedNav } from '@/components/navigation/MobileOptimizedNav';
import { ModernPromptInput } from '@/components/text-to-image/ModernPromptInput';
import { ModernFeatureCards } from '@/components/text-to-image/ModernFeatureCards';
import { ModernStyleSelector } from '@/components/text-to-image/ModernStyleSelector';

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
  const [showGalleryManager, setShowGalleryManager] = useState(false);
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const { selectedStyle, hasStyleParam, clearStyleParam } = useStyleParams();
  const recommendations = useStyleRecommendations(prompt);
  const { recentStyles, addRecentStyle, clearRecentStyles } = useRecentStyles();
  const { history, addToHistory } = useGenerationHistory();
  
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
      
      addToHistory({
        prompt: prompt,
        style: selectedStyle || undefined,
        imageUrl: url
      });
      
      if (selectedStyle) {
        addRecentStyle(selectedStyle);
      }
      
      toast.success("Image generated successfully!", {
        description: selectedStyle ? `Your custom graphic with ${selectedStyle} style is ready.` : "Your custom graphic is ready.",
        action: {
          label: "Download",
          onClick: () => window.open(url, '_blank')
        }
      });
      trackEvent('text_to_image_generated', { style: selectedStyle || 'none' });
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
        description: errorMsg || "An unexpected error occurred"
      });
    }
  });

  useEffect(() => {
    if (hasStyleParam && selectedStyle) {
      toast.success(`${selectedStyle.replace('-', ' ')} style selected!`, {
        description: "Your images will be generated with this artistic style.",
        action: { label: "Clear Style", onClick: () => clearStyleParam() }
      });
    }
  }, [hasStyleParam, selectedStyle, clearStyleParam]);
  
  const handleGenerate = async () => {
    if (!user && !isLoading) {
      setAuthModalOpen(true);
      trackEvent('auth_modal_opened', { source: 'text_to_image' });
      return;
    }
    
    if (!prompt.trim()) {
      toast.error("Please enter a description", { description: "Tell us what you'd like to create!" });
      return;
    }
    
    let enhancedPrompt = prompt.trim();
    if (selectedStyle && STYLE_MAPPINGS[selectedStyle]) {
      enhancedPrompt = `${enhancedPrompt}, ${STYLE_MAPPINGS[selectedStyle]}`;
    }
    
    storageService.addSearchTerm(prompt.trim());
    
    try {
      trackEvent('text_to_image_generate_attempt', { promptLength: prompt.length, style: selectedStyle || 'none' });
      await generateImageFromPrompt(enhancedPrompt, '', false, '');
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  };

  const handleSelectRecommendedStyle = (styleId: string) => {
    clearStyleParam();
    const url = new URL(window.location.href);
    url.searchParams.set('style', styleId);
    window.history.pushState({}, '', url.toString());
    toast.success(`${styleId.replace('-', ' ')} style selected!`);
  };

  const handleStyleChange = (newStyle: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('style', newStyle);
    window.history.pushState({}, '', url.toString());
    toast.success(`${newStyle.replace('-', ' ')} style selected!`);
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

  const pageContent = {
    h1: "AI Image Generator",
    h2Headings: ["Transform Words Into Art", "Popular Use Cases", "FAQ"]
  };

  return (
    <BrowserCompatibilityWrapper>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Futuristic Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-dark-gradient" />
          <div className="absolute inset-0 cyber-grid opacity-20" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-coral/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <Helmet>
          <title>AI Image Generator: Turn Words to Art | WordToImage</title>
          <meta name="description" content="Free AI-powered text-to-image tool. Create stunning visuals from text prompts instantly." />
          <link rel="canonical" href="https://wordtoimage.online/text-to-image" />
        </Helmet>
        <EnhancedSEOManager pageContent={pageContent} />
        
        <MobileOptimizedNav />
        
        {/* Modern Hero Section */}
        <section className="relative pt-20 pb-8 md:pt-28 md:pb-16 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-8 md:mb-12"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 mb-6"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="text-foreground">Turn Words Into</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-neon-coral to-neon-amber bg-clip-text text-transparent">
                  Stunning Art
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Create beautiful, unique images from your imagination in seconds. 
                No design skills required.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <ModernFeatureCards />

            {/* Main Generation Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative glass-card rounded-3xl border-primary/20 shadow-glass-lg overflow-hidden">
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-neon-coral/5 pointer-events-none" />
                
                <div className="relative p-6 md:p-10">
                  {/* Prompt Input */}
                  <ModernPromptInput
                    prompt={prompt}
                    onChange={setPrompt}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    canGenerate={!!prompt.trim() && !isGenerating}
                  />

                  {/* Generation Progress */}
                  <AnimatePresence>
                    {isGenerating && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <GenerationProgress 
                          isGenerating={isGenerating}
                          progress={progress}
                          currentPrompt={prompt}
                          estimatedTime={5}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Display */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6"
                      >
                        <Alert className="border-destructive/50 bg-destructive/10">
                          <AlertDescription className="text-destructive">
                            {error}
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Style Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <ModernStyleSelector
                selectedStyle={selectedStyle}
                onStyleChange={handleStyleChange}
              />
            </motion.div>

            {/* Style Recommendations */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <RecentStyles
                  recentStyles={recentStyles}
                  onSelectStyle={handleSelectRecommendedStyle}
                  onClearRecent={clearRecentStyles}
                />
              </motion.div>
            )}

            {/* Browse Styles Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <BrowseStylesModal onStyleSelect={handleStyleChange}>
                <Button 
                  variant="glass" 
                  size="lg"
                  className="group rounded-full px-8 border-primary/30 hover:border-primary/50"
                >
                  <Palette className="h-5 w-5 mr-2 text-primary" />
                  <span>Explore 50+ Art Styles</span>
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </BrowseStylesModal>
            </motion.div>

            {/* Generated Images Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12"
              role="region"
              aria-label="Generated images"
            >
              <EnhancedImageGallery 
                images={generatedImages} 
                loading={isGenerating}
                showGalleryManager={showGalleryManager}
                onToggleGalleryManager={setShowGalleryManager}
              />
            </motion.div>

            {/* Bottom Spacing for Mobile Nav */}
            <div className="h-24 md:h-0" />
          </div>
        </section>
        
        <AuthModalDialog open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    </BrowserCompatibilityWrapper>
  );
}