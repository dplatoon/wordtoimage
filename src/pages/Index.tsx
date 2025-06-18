
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FastHero } from "@/components/home/FastHero";
import { FastFeatures } from "@/components/home/FastFeatures";
import { ShowcaseSection } from "@/components/home/showcase/ShowcaseSection";
import { SEOManager } from "@/components/seo/SEOManager";
import { FAQStructuredData, AI_IMAGE_GENERATION_FAQS } from "@/components/seo/FAQStructuredData";
import { CriticalCSS } from "@/components/performance/CriticalCSS";
import { ResourcePreloader } from "@/components/performance/ResourcePreloader";
import { EnhancedSchemaMarkup } from "@/components/seo/EnhancedSchemaMarkup";
import { MobileOptimizedNav } from "@/components/navigation/MobileOptimizedNav";
import { CoreWebVitalsMonitor } from "@/components/performance/CoreWebVitalsMonitor";
import { ConversionManager } from "@/components/conversion/ConversionManager";

const Index = () => {
  return (
    <ConversionManager pageId="homepage" userActivity={{}}>
      <div className="min-h-screen">
        <CriticalCSS />
        <ResourcePreloader />
        <CoreWebVitalsMonitor />
        
        {/* Enhanced SEO and Schema Markup */}
        <SEOManager />
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
        
        {/* Main Content */}
        <FastHero />
        <FastFeatures />
        <ShowcaseSection />
        <Footer />
      </div>
    </ConversionManager>
  );
};

export default Index;
