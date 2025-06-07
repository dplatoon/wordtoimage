
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FeaturesHeroSection } from "@/components/features/FeaturesHeroSection";
import { CoreFeaturesGrid } from "@/components/features/CoreFeaturesGrid";
import { DetailedFeaturesSection } from "@/components/features/DetailedFeaturesSection";
import { LiveDemoSection } from "@/components/features/LiveDemoSection";
import { FeaturesCTASection } from "@/components/features/FeaturesCTASection";
import { SEOManager } from "@/components/seo/SEOManager";
import { FAQStructuredData, FEATURES_FAQS } from "@/components/seo/FAQStructuredData";
import { ContentBreadcrumbs } from "@/components/seo/ContentBreadcrumbs";

const Features = () => {
  return (
    <div className="min-h-screen">
      <SEOManager />
      <FAQStructuredData 
        faqs={FEATURES_FAQS} 
        pageTitle="WordToImage Features FAQ"
      />
      
      <Nav />
      <main>
        <ContentBreadcrumbs />
        <FeaturesHeroSection />
        <CoreFeaturesGrid />
        <DetailedFeaturesSection />
        <LiveDemoSection />
        <FeaturesCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
