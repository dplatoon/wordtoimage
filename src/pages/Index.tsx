
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeContent } from "@/components/home/HomeContent";
import { MobilePerformanceIndicator } from "@/components/testing/MobilePerformanceIndicator";
import { SEOManager } from "@/components/seo/SEOManager";
import { SEOPerformanceMonitor } from "@/components/seo/SEOPerformanceMonitor";
import { FAQStructuredData, AI_IMAGE_GENERATION_FAQS } from "@/components/seo/FAQStructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOManager />
      <FAQStructuredData 
        faqs={AI_IMAGE_GENERATION_FAQS} 
        pageTitle="AI Image Generation FAQ - WordToImage"
      />
      <SEOPerformanceMonitor />
      
      <Nav />
      <HomeContent />
      <Footer />
      <MobilePerformanceIndicator />
    </div>
  );
};

export default Index;
