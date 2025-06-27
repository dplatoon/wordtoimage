
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { OptimizedFreeGeneratorHero } from '@/components/free-generator/OptimizedFreeGeneratorHero';
import { FreeGeneratorTool } from '@/components/free-generator/FreeGeneratorTool';
import { OptimizedUserGalleryShowcase } from '@/components/free-generator/OptimizedUserGalleryShowcase';
import { ResourcePreloader } from '@/components/performance/ResourcePreloader';
import { WebVitalsMonitor } from '@/components/performance/WebVitalsMonitor';
import { CriticalCSS } from '@/components/performance/CriticalCSS';
import { useState, lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load non-critical components for better performance
const LazyCompetitorComparison = lazy(() => import('@/components/free-generator/CompetitorComparison').then(m => ({ default: m.CompetitorComparison })));
const LazyPromptEngineeringGuide = lazy(() => import('@/components/free-generator/PromptEngineeringGuide').then(m => ({ default: m.PromptEngineeringGuide })));
const LazyEmailCaptureModule = lazy(() => import('@/components/free-generator/EmailCaptureModule').then(m => ({ default: m.EmailCaptureModule })));

const FreeAIImageGenerator = () => {
  const [generatedImages, setGeneratedImages] = useState<Array<{
    url: string;
    prompt: string;
    style?: string;
    timestamp?: number;
  }>>([]);

  const handleImageGenerated = (url: string, prompt: string, style?: string) => {
    const newImage = {
      url,
      prompt,
      style,
      timestamp: Date.now()
    };
    setGeneratedImages(prev => [newImage, ...prev]);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free AI Image Generator",
    "description": "Create unlimited AI art for free with no signup required. Advanced text-to-image AI tool with multiple styles and instant download.",
    "url": "https://wordtoimage.com/free-ai-image-generator",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "No signup required",
      "Unlimited free generations", 
      "Multiple art styles",
      "Instant download",
      "Commercial usage rights"
    ]
  };

  const LoadingSkeleton = () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg mx-auto max-w-4xl" />
  );

  return (
    <div className="min-h-screen bg-white">
      <CriticalCSS />
      <ResourcePreloader />
      <WebVitalsMonitor />
      
      <EnhancedSEOManager
        customConfig={{
          title: "Free AI Image Generator Online - No Signup Needed | WordToImage",
          description: "Create unlimited AI art for free. Compare tools, master prompts, and download our prompt library. No filters or login required. Start generating now!",
          keywords: "ai image generator free no login, free ai art generator online, text to image ai free, prompt engineering for beginners, ai art maker",
          structuredData
        }}
      />
      
      <Nav />
      
      <main>
        {/* Hero Section - Critical, load immediately with optimized images */}
        <OptimizedFreeGeneratorHero />
        
        {/* Real-Time Tool Section - Critical, load immediately */}
        <FreeGeneratorTool onImageGenerated={handleImageGenerated} />
        
        {/* User Gallery - Optimized version loads immediately */}
        <OptimizedUserGalleryShowcase userImages={generatedImages} />
        
        {/* Non-critical sections - Load lazily for better performance */}
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyCompetitorComparison />
        </Suspense>
        
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyPromptEngineeringGuide />
        </Suspense>
        
        <Suspense fallback={<LoadingSkeleton />}>
          <LazyEmailCaptureModule />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default FreeAIImageGenerator;
