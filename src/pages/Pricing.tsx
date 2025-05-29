
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { EnhancedPricingHero } from '@/components/pricing/EnhancedPricingHero';
import { EnhancedPricingTable } from '@/components/pricing/EnhancedPricingTable';
import { EnhancedFAQ } from '@/components/pricing/EnhancedFAQ';
import { PricingCTA } from '@/components/pricing/PricingCTA';
import { Helmet } from 'react-helmet-async';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { SkipToContent } from '@/components/accessibility/SkipToContent';

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing Plans - WordToImage | Transparent AI Image Generation Pricing</title>
        <meta name="description" content="Choose the perfect AI image generation plan. From free to enterprise, find transparent pricing with no hidden fees. Start creating AI art today." />
        <meta name="keywords" content="AI image generation pricing, text to image cost, subscription plans, free AI art, enterprise AI tools" />
        <link rel="canonical" href="https://wordtoimage.com/pricing" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Pricing Plans - WordToImage AI Generator" />
        <meta property="og:description" content="Transparent pricing for AI image generation. Free plan available, no hidden fees." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordtoimage.com/pricing" />
        
        {/* Structured data for pricing */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "WordToImage AI Generator",
            "description": "Professional AI image generation platform",
            "offers": [
              {
                "@type": "Offer",
                "name": "Free Plan",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Basic AI image generation with limited credits"
              },
              {
                "@type": "Offer", 
                "name": "Pro Plan",
                "price": "19",
                "priceCurrency": "USD",
                "billingIncrement": "month",
                "description": "Unlimited AI image generation with premium features"
              },
              {
                "@type": "Offer",
                "name": "Enterprise Plan", 
                "description": "Custom AI image generation solutions for businesses"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <SkipToContent />
        <Nav />
        
        <SubscriptionProvider>
          <main id="main-content">
            <header>
              <h1 className="sr-only">AI Image Generation Pricing Plans</h1>
            </header>
            
            <EnhancedPricingHero />
            <EnhancedPricingTable />
            <EnhancedFAQ />
            <PricingCTA />
          </main>
        </SubscriptionProvider>

        <ModernFooter />
      </div>
    </>
  );
};

export default Pricing;
