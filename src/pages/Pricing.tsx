
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EnhancedPricingHero } from "@/components/pricing/EnhancedPricingHero";
import { EnhancedPricingTable } from "@/components/pricing/EnhancedPricingTable";
import { EnhancedFAQ } from "@/components/pricing/EnhancedFAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";
import { SEOManager } from "@/components/seo/SEOManager";
import { FAQStructuredData, PRICING_FAQS } from "@/components/seo/FAQStructuredData";
import { ContentBreadcrumbs } from "@/components/seo/ContentBreadcrumbs";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <SEOManager />
      <FAQStructuredData 
        faqs={PRICING_FAQS} 
        pageTitle="WordToImage Pricing FAQ"
      />
      
      <Nav />
      <main>
        <ContentBreadcrumbs />
        <EnhancedPricingHero />
        <EnhancedPricingTable />
        <EnhancedFAQ />
        <PricingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
