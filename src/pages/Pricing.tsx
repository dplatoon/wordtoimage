
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedPricingHero } from '@/components/pricing/EnhancedPricingHero';
import { EnhancedPricingTable } from '@/components/pricing/EnhancedPricingTable';
import { EnhancedFAQ } from '@/components/pricing/EnhancedFAQ';
import { PricingCTA } from '@/components/pricing/PricingCTA';
import { PageSEO } from '@/components/seo/PageSEO';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';

const Pricing = () => {
  return (
    <>
      <PageSEO
        title="Pricing – AI Image Generation Plans by WordToImage"
        description="Choose the perfect WordToImage plan—free and professional tiers available for all AI image creation needs."
        keywords="AI image generation pricing, text to image cost, subscription plans, free AI art"
        aiKeywords={[
          'AI image generation pricing',
          'text-to-image subscription',
          'AI art pricing plans',
          'image generator costs'
        ]}
      />
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="min-h-screen bg-white">
        <header>
          <Nav />
        </header>
        
        <SubscriptionProvider>
          <main id="main-content" className="relative">
            {/* Improved section spacing and semantic structure */}
            <section aria-label="Pricing introduction">
              <EnhancedPricingHero />
            </section>
            
            <section aria-label="Pricing plans comparison" className="py-8">
              <EnhancedPricingTable />
            </section>
            
            <section aria-label="Frequently asked questions" className="py-16 bg-gray-50">
              <EnhancedFAQ />
            </section>
            
            <section aria-label="Get started call to action" className="py-16">
              <PricingCTA />
            </section>
          </main>
        </SubscriptionProvider>

        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Pricing;
