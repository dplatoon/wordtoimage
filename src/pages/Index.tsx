
import { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { BetaBanner } from '@/components/BetaBanner';
import { SeoHead } from '@/components/home/SeoHead';
import { SkipToContent } from '@/components/home/SkipToContent';
import { ModernAIHero } from '@/components/home/ModernAIHero';
import { StylePresetsGallery } from '@/components/home/StylePresetsGallery';
import { SamplePromptsSection } from '@/components/home/SamplePromptsSection';
import { EnhancedTestimonials } from '@/components/home/EnhancedTestimonials';
import { ImageShowcaseGrid } from '@/components/home/ImageShowcaseGrid';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { HowItWorksDetailed } from '@/components/home/HowItWorksDetailed';
import { FeaturesGridSection } from '@/components/home/FeaturesGridSection';
import { FAQSection } from '@/components/home/FAQSection';
import { SocialMetaTags } from '@/components/social/SocialMetaTags';
import { UserEngagementTracker } from '@/components/analytics/UserEngagementTracker';
import { ReadingProgress } from '@/components/content/ReadingProgress';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { trackInteraction } = usePerformanceMonitoring('HomePage');

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined') {
      import('@/utils/analytics').then(({ trackPageView }) => {
        trackPageView('/', 'Home - AI Image Generator');
      });
    }
  }, []);

  const handleShowProFeatures = () => {
    setIsPricingModalOpen(true);
    trackInteraction('pricing_modal', 'open');
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
        <UserEngagementTracker contentId="home-hero" contentType="hero">
          <ModernAIHero onShowProFeatures={handleShowProFeatures} />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-features" contentType="features">
          <FeaturesGridSection />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-how-it-works" contentType="tutorial">
          <HowItWorksDetailed />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-gallery" contentType="gallery">
          <ImageShowcaseGrid />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-styles" contentType="styles">
          <StylePresetsGallery />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-prompts" contentType="prompts">
          <SamplePromptsSection />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-testimonials" contentType="testimonials">
          <EnhancedTestimonials />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-pricing" contentType="pricing">
          <MinimalistPricing onShowProFeatures={handleShowProFeatures} />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-faq" contentType="faq">
          <FAQSection />
        </UserEngagementTracker>
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
