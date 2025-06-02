import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedPricingHero } from '@/components/pricing/EnhancedPricingHero';
import { EnhancedPricingTable } from '@/components/pricing/EnhancedPricingTable';
import { EnhancedFAQ } from '@/components/pricing/EnhancedFAQ';
import { PricingCTA } from '@/components/pricing/PricingCTA';
import { Helmet } from 'react-helmet-async';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing Plans - WordToImage | AI Image Generation</title>
        <meta name="description" content="Choose the perfect plan for your AI image generation needs. From free to enterprise, find transparent pricing with no hidden fees." />
        <meta name="keywords" content="AI image generation pricing, text to image cost, subscription plans, free AI art" />
      </Helmet>
      
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
