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
import { CoreWebVitalsMonitor } from "@/components/performance/CoreWebVitalsMonitor";
import { ConversionManager } from "@/components/conversion/ConversionManager";
import { LiveActivityCounter } from "@/components/social-proof/LiveActivityCounter";
import { ExitIntentModal } from "@/components/conversion/ExitIntentModal";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useAuth } from "@/contexts/AuthContext";
import { BrokenLinkChecker } from "@/components/common/BrokenLinkChecker";
import { useEffect } from "react";
import { initPerformanceMonitoring } from "@/utils/performance";
import { CriticalPathOptimizer } from "@/components/performance/CriticalPathOptimizer";
import { LCPOptimizer } from "@/components/performance/LCPOptimizer";
import { AccessibilityOptimizer } from "@/components/performance/AccessibilityOptimizer";
import { JSOptimizer } from "@/components/performance/JSOptimizer";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { TestimonialsSocial } from "@/components/home/TestimonialsSocial";
import { InternalLinking } from "@/components/home/InternalLinking";
import { SeoHead } from "@/components/home/SeoHead";

const Index = () => {
  const { user } = useAuth();
  const { showExitIntent, closeExitIntent } = useExitIntent(!user);

  // Initialize performance monitoring
  useEffect(() => {
    initPerformanceMonitoring();
  }, []);

  return (
    <ConversionManager pageId="homepage" userActivity={{}}>
      <div className="min-h-screen">
        {/* Critical performance optimizations - loaded first */}
        <CriticalPathOptimizer />
        <LCPOptimizer />
        <AccessibilityOptimizer />
        <JSOptimizer />
        <PerformanceMonitor />
        
        {/* Existing performance components */}
        <CriticalCSS />
        <ResourcePreloader />
        <CoreWebVitalsMonitor />
        
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
        
        {/* Main Content with proper heading structure and accessibility */}
        <main id="main-content" role="main">
          <FastHero />
          <FastFeatures />
          <ShowcaseSection />
          <TestimonialsSocial />
          <InternalLinking />
        </main>
        
        <Footer />

        {/* Social Proof & Conversion Elements */}
        <LiveActivityCounter />
        <ExitIntentModal 
          isOpen={showExitIntent} 
          onClose={closeExitIntent} 
        />

        {/* Performance & Quality Monitoring */}
        <BrokenLinkChecker 
          enabled={process.env.NODE_ENV === 'development'} 
          checkInterval={60000} 
        />
      </div>
    </ConversionManager>
  );
};

export default Index;
