
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
        title="WordToImage - Best AI Image Generator | Create AI Art from Text"
        description="Transform text into stunning AI-generated images instantly. Free AI art generator with 50+ styles. Create professional images for social media, marketing, and creative projects."
        type="website"
        url="https://wordtoimage.com"
      />
      
      <ReadingProgress target="main" />
      <SkipToContent />
      <BetaBanner />
      <Nav />
      
      <main id="main-content" className="relative">
        <ModernAIHero onShowProFeatures={handleShowProFeatures} />
        <FeaturesGridSection />
        <HowItWorksDetailed />
        <ImageShowcaseGrid />
        <StylePresetsGallery />
        <SamplePromptsSection />
        <EnhancedTestimonials />
        <MinimalistPricing onShowProFeatures={handleShowProFeatures} />
        <FAQSection />
      </main>
      
      <ModernFooter />
      
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
