import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FastHero } from "@/components/home/FastHero";
import { FastFeatures } from "@/components/home/FastFeatures";
import { ShowcaseSection } from "@/components/home/showcase/ShowcaseSection";
import { EnhancedSEOManager } from "@/components/seo/EnhancedSEOManager";
import { FAQStructuredData, AI_IMAGE_GENERATION_FAQS } from "@/components/seo/FAQStructuredData";
import { CriticalCSS } from "@/components/performance/CriticalCSS";
import { ResourcePreloader } from "@/components/performance/ResourcePreloader";
import { EnhancedSchemaMarkup } from "@/components/seo/EnhancedSchemaMarkup";
import { MobileOptimizedNav } from "@/components/navigation/MobileOptimizedNav";
// Performance monitoring temporarily disabled for optimization
import { ConversionManager } from "@/components/conversion/ConversionManager";
import { OnboardingManager } from "@/components/onboarding/OnboardingManager";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
// Performance monitoring temporarily disabled for optimization
import { SeoHead } from "@/components/home/SeoHead";
import { TryStyleGallery } from "@/components/home/TryStyleGallery";
import { PerformanceErrorHandler, CriticalResourceErrorHandler } from "@/components/performance/ErrorHandling";
import { CriticalPerformanceOptimizer } from "@/components/performance/CriticalPerformanceOptimizer";

// Lazy load non-critical components for better performance
import { 
  TestimonialsSocial,
  InternalLinking,
  OnboardingTooltips,
  LiveCounter,
  ExitIntentModal,
  BrokenLinkChecker,
  ComponentFallback,
  Suspense
} from "@/components/performance/LazyComponents";

const Index = () => {
  const { user } = useAuth();
  const { showModal: showExitIntent, closeModal: closeExitIntent } = useExitIntent({ enabled: !user });

  // Initialize performance monitoring
  useEffect(() => {
    // Performance monitoring temporarily disabled
  }, []);

  return (
    <OnboardingManager 
      pageId="homepage" 
      triggerTutorial="first_generation"
      userActivity={{ 
        isFirstVisit: !user,
        generationCount: 0 
      }}
    >
      <ConversionManager pageId="homepage" userActivity={{}}>
        <div className="min-h-screen">
        {/* CRITICAL: Performance optimization must run first */}
        <CriticalPerformanceOptimizer />
        
        {/* Critical error handling - prevent crashes from blocking render */}
        <PerformanceErrorHandler />
        <CriticalResourceErrorHandler />
        
        {/* Essential performance monitoring only */}
        <CriticalCSS />
        <ResourcePreloader />
        {/* Performance monitoring temporarily disabled */}
        
        {/* Enhanced SEO with proper heading structure */}
        <SeoHead />
        <EnhancedSEOManager 
          pageContent={{
            h1: "AI Image Generator: Free Text-to-Art Converter",
            h2Headings: [
              "How Our AI Image Generator Works",
              "Why Choose WordToImage AI Generator", 
              "Everything You Need to Create Amazing AI Art",
              "Perfect for Every Creative Project",
              "Trusted by Creators Worldwide"
            ]
          }}
        />
        <EnhancedSchemaMarkup 
          type="homepage" 
          pageData={{
            title: "WordToImage - AI Image Generator: Transform Text Into Art",
            description: "Generate professional-quality images from simple text descriptions using advanced artificial intelligence. Create stunning visual artwork in seconds with our AI image generator.",
            url: "https://wordtoimage.com",
            datePublished: "2024-01-01",
            dateModified: new Date().toISOString()
          }}
        />
        <FAQStructuredData 
          faqs={AI_IMAGE_GENERATION_FAQS} 
          pageTitle="AI Image Generation FAQ - WordToImage"
        />
        
        {/* Navigation - Mobile Optimized */}
        <div className="hidden md:block">
          <Nav />
        </div>
        <MobileOptimizedNav />
        
        {/* Main Content - Critical path optimized */}
        <main id="main-content" role="main">
          <FastHero />
          <TryStyleGallery />
          <FastFeatures />
          <ShowcaseSection />
          
          {/* Lazy load non-critical below-the-fold content */}
          <Suspense fallback={<ComponentFallback />}>
            <TestimonialsSocial />
            <InternalLinking />
          </Suspense>
        </main>
        
        <Footer />

        {/* Lazy load conversion and monitoring components */}
        <Suspense fallback={<ComponentFallback />}>
          <LiveCounter />
          <ExitIntentModal 
            isOpen={showExitIntent} 
            onClose={closeExitIntent} 
          />
          <OnboardingTooltips pageType="homepage" />
          <BrokenLinkChecker 
            enabled={process.env.NODE_ENV === 'development'} 
            checkInterval={60000} 
          />
        </Suspense>
        </div>
      </ConversionManager>
    </OnboardingManager>
  );
};

export default Index;
