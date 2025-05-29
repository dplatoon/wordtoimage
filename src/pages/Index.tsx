
import { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { BetaBanner } from '@/components/BetaBanner';
import { OptimizedSeoHead } from '@/components/home/OptimizedSeoHead';
import { SkipToContent } from '@/components/accessibility/SkipToContent';
import { OptimizedHeroSection } from '@/components/home/OptimizedHeroSection';
import { FeaturesGridSection } from '@/components/home/FeaturesGridSection';
import { OptimizedGallerySection } from '@/components/home/OptimizedGallerySection';
import { EnhancedTestimonials } from '@/components/home/EnhancedTestimonials';
import { MinimalistPricing } from '@/components/home/MinimalistPricing';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
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
      <OptimizedSeoHead page="home" />
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
          <OptimizedHeroSection />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-features" contentType="features">
          <section aria-labelledby="features-heading" className="py-16 bg-white">
            <div className="content-container">
              <h2 id="features-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
                Powerful AI Features
              </h2>
              <FeaturesGridSection />
            </div>
          </section>
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-gallery" contentType="gallery">
          <OptimizedGallerySection />
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-testimonials" contentType="testimonials">
          <section aria-labelledby="testimonials-heading" className="py-16 bg-white">
            <div className="content-container">
              <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
                What Our Users Say
              </h2>
              <EnhancedTestimonials />
            </div>
          </section>
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-pricing" contentType="pricing">
          <section aria-labelledby="pricing-heading" className="py-16 bg-gray-50">
            <div className="content-container">
              <h2 id="pricing-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
                Choose Your Plan
              </h2>
              <MinimalistPricing onShowProFeatures={handleShowProFeatures} />
            </div>
          </section>
        </UserEngagementTracker>
        
        <UserEngagementTracker contentId="home-faq" contentType="faq">
          <section aria-labelledby="faq-heading" className="py-16 bg-white">
            <div className="content-container">
              <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
                Frequently Asked Questions
              </h2>
              <FAQSection />
            </div>
          </section>
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
