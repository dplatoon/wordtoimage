
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FastHero } from "@/components/home/FastHero";
import { FastFeatures } from "@/components/home/FastFeatures";
import { ShowcaseSection } from "@/components/home/showcase/ShowcaseSection";
import { EnhancedSEOManager } from "@/components/seo/EnhancedSEOManager";
import { FAQStructuredData, AI_IMAGE_GENERATION_FAQS } from "@/components/seo/FAQStructuredData";
import { EnhancedSchemaMarkup } from "@/components/seo/EnhancedSchemaMarkup";
import { MobileOptimizedNav } from "@/components/navigation/MobileOptimizedNav";
import { ConversionManager } from "@/components/conversion/ConversionManager";
import { OnboardingManager } from "@/components/onboarding/OnboardingManager";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useAuth } from "@/contexts/AuthContext";
import { SeoHead } from "@/components/home/SeoHead";
import { TryStyleGallery } from "@/components/home/TryStyleGallery";
import { Suspense, lazy } from "react";

// Lazy load heavy non-critical components
const TestimonialsSocial = lazy(() => import("@/components/home/TestimonialsSocial"));
const InternalLinking = lazy(() => import("@/components/seo/InternalLinking"));
const LiveCounter = lazy(() => import("@/components/ui/LiveCounter"));
const ExitIntentModal = lazy(() => import("@/components/ui/ExitIntentModal"));

const Index = () => {
  const { user } = useAuth();
  const { showModal: showExitIntent, closeModal: closeExitIntent } = useExitIntent({ enabled: !user });

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
          {/* SEO - Critical for ranking */}
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
          
          {/* Critical above-the-fold content */}
          <main id="main-content" role="main">
            <FastHero />
            <TryStyleGallery />
            <FastFeatures />
            <ShowcaseSection />
            
            {/* Lazy load non-critical content */}
            <Suspense fallback={<div className="h-8" />}>
              <TestimonialsSocial />
              <InternalLinking />
              <LiveCounter />
              <ExitIntentModal 
                isOpen={showExitIntent} 
                onClose={closeExitIntent} 
              />
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </ConversionManager>
    </OnboardingManager>
  );
};

export default Index;
