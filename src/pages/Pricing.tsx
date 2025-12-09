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
import { useEffect } from "react";

const Pricing = () => {
  usePagePerformance('Pricing');

  useEffect(() => {
    console.log('Pricing page viewed');
  }, []);

  const pricingSEO = {
    title: "AI Image Generator Pricing - Free & Pro Plans | WordToImage",
    description: "Affordable AI image generation pricing. Start free with daily credits or upgrade to Pro for unlimited generations. Commercial use included.",
    keywords: "AI image generator pricing, text to image cost, AI art subscription, image generation plans, affordable AI tools",
    canonical: "https://wordtoimage.online/pricing",
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-neon-coral/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

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