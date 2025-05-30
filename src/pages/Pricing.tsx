
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
      
      <div className="min-h-screen bg-white">
        <Nav />
        
        <SubscriptionProvider>
          <main>
            <EnhancedPricingHero />
            <EnhancedPricingTable />
            <EnhancedFAQ />
            <PricingCTA />
          </main>
        </SubscriptionProvider>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
