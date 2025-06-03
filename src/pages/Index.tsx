
import { useState, useEffect } from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { SeoHead } from '@/components/home/SeoHead';
import { StaticHero } from '@/components/hero/StaticHero';
import { StaticFeaturesSection } from '@/components/features/StaticFeaturesSection';
import { StaticTestimonialsSection } from '@/components/testimonials/StaticTestimonialsSection';
import { StaticPricingSection } from '@/components/pricing/StaticPricingSection';
import { StaticFAQSection } from '@/components/faq/StaticFAQSection';
import { ProFeaturesModal } from '@/components/home/ProFeaturesModal';
import { SocialMetaTags } from '@/components/social/SocialMetaTags';

const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  useEffect(() => {
    // Defer analytics loading
    const loadAnalytics = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Home - AI Image Generator',
          page_location: window.location.href
        });
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAnalytics);
    } else {
      setTimeout(loadAnalytics, 100);
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
      
      <Nav />
      
      <main id="main-content" className="relative">
        <StaticHero onShowProFeatures={handleShowProFeatures} />
        <StaticFeaturesSection />
        <StaticTestimonialsSection />
        <StaticPricingSection />
        <StaticFAQSection />
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
