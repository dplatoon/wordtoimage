
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

const Index = () => {
  const { user } = useAuth();
  const { showExitIntent, closeExitIntent } = useExitIntent(!user); // Only show for non-logged-in users

  // Initialize performance monitoring
  useEffect(() => {
    initPerformanceMonitoring();
  }, []);

  return (
    <ConversionManager pageId="homepage" userActivity={{}}>
      <div className="min-h-screen">
        <CriticalCSS />
        <ResourcePreloader />
        <CoreWebVitalsMonitor />
        
        {/* Enhanced SEO with proper heading structure */}
        <EnhancedSEOManager 
          pageContent={{
            h1: "Create Stunning Images from Any Text in Seconds",
            h2Headings: [
              "How AI Image Generation Works",
              "Why Choose WordToImage", 
              "Featured AI Art Styles",
              "Start Creating Today"
            ]
          }}
        />
        <EnhancedSchemaMarkup 
          type="homepage" 
          pageData={{
            title: "WordToImage - AI Image Generator",
            description: "Transform text into stunning AI-generated images instantly",
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
        
        {/* Main Content with proper heading structure */}
        <FastHero />
        <FastFeatures />
        <ShowcaseSection />
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
