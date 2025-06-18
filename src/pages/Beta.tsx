
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaHero } from '@/components/beta/BetaHero';
import { BetaBenefits } from '@/components/beta/BetaBenefits';
import { BetaProcess } from '@/components/beta/BetaProcess';
import { BetaFeatures } from '@/components/beta/BetaFeatures';
import { BetaCTA } from '@/components/beta/BetaCTA';
import { PageSEO } from '@/components/seo/PageSEO';
import { usePagePerformance } from '@/hooks/usePerformanceMonitoring';

const Beta = () => {
  usePagePerformance('Beta');

  const betaSEO = {
    title: "Beta Features - Early Access to Advanced AI Tools | WordToImage",
    description: "Get exclusive early access to WordToImage's cutting-edge AI features. Test new image generation capabilities and help shape the future of AI art.",
    keywords: "WordToImage beta, AI features beta, early access AI tools, beta testing AI, advanced AI features",
    canonical: "https://wordtoimage.com/beta",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "WordToImage Beta Features",
      "description": "Early access to advanced AI image generation features",
      "url": "https://wordtoimage.com/beta",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "WordToImage Beta",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "releaseNotes": "Beta version with cutting-edge AI features and enhanced capabilities"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/50 to-indigo-50/50">
      <PageSEO {...betaSEO} />
      
      <Nav />
      
      <main id="main-content" className="pt-8 pb-16" role="main">
        <header>
          <BetaHero />
        </header>
        
        <section aria-labelledby="beta-benefits-heading" role="region">
          <BetaBenefits />
        </section>
        
        <section aria-labelledby="beta-process-heading" role="region">
          <BetaProcess />
        </section>
        
        <section aria-labelledby="beta-features-heading" role="region">
          <BetaFeatures />
        </section>
        
        <section aria-labelledby="beta-cta-heading" role="region">
          <BetaCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Beta;
