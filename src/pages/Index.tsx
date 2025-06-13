
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FastHero } from "@/components/home/FastHero";
import { FastFeatures } from "@/components/home/FastFeatures";
import { ShowcaseSection } from "@/components/home/showcase/ShowcaseSection";
import { SEOManager } from "@/components/seo/SEOManager";
import { FAQStructuredData, AI_IMAGE_GENERATION_FAQS } from "@/components/seo/FAQStructuredData";
import { CriticalCSS } from "@/components/performance/CriticalCSS";
import { ResourcePreloader } from "@/components/performance/ResourcePreloader";

const Index = () => {
  return (
    <div className="min-h-screen">
      <CriticalCSS />
      <ResourcePreloader />
      <SEOManager />
      <FAQStructuredData 
        faqs={AI_IMAGE_GENERATION_FAQS} 
        pageTitle="AI Image Generation FAQ - WordToImage"
      />
      
      <Nav />
      <FastHero />
      <FastFeatures />
      <ShowcaseSection />
      <Footer />
    </div>
  );
};

export default Index;
