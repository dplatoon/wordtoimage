
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EnhancedPricingHero } from "@/components/pricing/EnhancedPricingHero";
import { EnhancedPricingTable } from "@/components/pricing/EnhancedPricingTable";
import { EnhancedFAQ } from "@/components/pricing/EnhancedFAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";
import { SEOManager } from "@/components/seo/SEOManager";
import { FAQStructuredData, PRICING_FAQS } from "@/components/seo/FAQStructuredData";
import { PageSEO } from "@/components/seo/PageSEO";
import { usePagePerformance } from "@/hooks/usePerformanceMonitoring";

const Pricing = () => {
  usePagePerformance('Pricing');

  const pricingSEO = {
    title: "AI Image Generator Pricing - Free & Pro Plans | WordToImage",
    description: "Affordable AI image generation pricing. Start free with daily credits or upgrade to Pro for unlimited generations. Commercial use included.",
    keywords: "AI image generator pricing, text to image cost, AI art subscription, image generation plans, affordable AI tools",
    canonical: "https://wordtoimage.com/pricing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "WordToImage Pro",
      "description": "Professional AI image generation service",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Plan",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free daily AI image generations"
        },
        {
          "@type": "Offer",
          "name": "Pro Plan", 
          "price": "9.99",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "9.99",
            "priceCurrency": "USD",
            "billingDuration": "P1M"
          },
          "description": "Unlimited AI image generations with advanced features"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/50 to-indigo-50/50">
      <PageSEO {...pricingSEO} />
      <FAQStructuredData 
        faqs={PRICING_FAQS} 
        pageTitle="WordToImage Pricing FAQ"
      />
      
      <Nav />
      
      <main id="main-content" className="pt-8 pb-16" role="main">
        <header>
          <EnhancedPricingHero />
        </header>
        
        <section aria-labelledby="pricing-plans-heading" role="region">
          <EnhancedPricingTable />
        </section>
        
        <section aria-labelledby="pricing-faq-heading" role="region">
          <EnhancedFAQ />
        </section>
        
        <section aria-labelledby="pricing-cta-heading" role="region">
          <PricingCTA />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
