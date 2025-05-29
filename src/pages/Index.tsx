
import { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { BetaBanner } from '@/components/BetaBanner';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { ModernAIHero } from '@/components/home/ModernAIHero';
import { FeaturesGridSection } from '@/components/home/FeaturesGridSection';
import { HowItWorksDetailed } from '@/components/home/HowItWorksDetailed';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { StylePresetsGallery } from '@/components/home/StylePresetsGallery';
import { SamplePromptsSection } from '@/components/home/SamplePromptsSection';
import { EnhancedTestimonials } from '@/components/home/EnhancedTestimonials';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { FAQSection } from '@/components/home/FAQSection';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { SocialMetaTags } from '@/components/social/SocialMetaTags';
import { ReadingProgress } from '@/components/content/ReadingProgress';

const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined') {
      import('@/utils/analytics').then(({ trackPageView }) => {
        trackPageView('/', 'Home - AI Image Generator');
      }).catch(error => {
        console.warn('Analytics tracking failed:', error);
      });
    }
  }, []);

  const handleShowProFeatures = () => {
    setIsPricingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead />
      <SocialMetaTags
        title="WordToImage – AI Text-to-Image Generator"
        description="Create stunning AI-generated images from text descriptions. Fast, easy, and high-quality results."
        type="website"
        url="https://wordtoimage.com"
      />
      
      <ReadingProgress target="main" />
      <SkipToContent />
      <BetaBanner />
      
      <header>
        <Nav />
      </header>
      
      <main id="main-content" className="relative">
        <section aria-label="Hero section">
          <ModernAIHero onShowProFeatures={handleShowProFeatures} />
        </section>
        
        <section aria-label="Features overview">
          <FeaturesGridSection />
        </section>
        
        <section aria-label="How it works">
          <HowItWorksDetailed />
        </section>
        
        <section aria-label="Image showcase">
          <ImageShowcaseGrid />
        </section>
        
        <section aria-label="Style presets">
          <StylePresetsGallery />
        </section>
        
        <section aria-label="Sample prompts">
          <SamplePromptsSection />
        </section>
        
        <section aria-label="Customer testimonials">
          <EnhancedTestimonials />
        </section>
        
        <section aria-label="Pricing plans">
          <MinimalistPricing onShowProFeatures={handleShowProFeatures} />
        </section>
        
        <section aria-label="Frequently asked questions">
          <FAQSection />
        </section>
      </main>
      
      <footer id="footer">
        <ModernFooter />
      </footer>
      
      {isPricingModalOpen && (
        <ProFeaturesModal 
          showModal={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
