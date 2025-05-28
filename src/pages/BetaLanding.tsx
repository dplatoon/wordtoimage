
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaHero } from '@/components/beta/BetaHero';
import { BetaBenefits } from '@/components/beta/BetaBenefits';
import { BetaProcess } from '@/components/beta/BetaProcess';
import { BetaFeatures } from '@/components/beta/BetaFeatures';
import { BetaCTA } from '@/components/beta/BetaCTA';
import { PageSEO } from '@/components/seo/PageSEO';
import { usePagePerformance } from '@/hooks/usePerformanceMonitoring';

const BetaLanding = () => {
  usePagePerformance('BetaLanding');

  const betaSEO = {
    title: "Join WordToImage Beta - Early Access to Advanced AI Features",
    description: "Get exclusive early access to WordToImage's latest AI image generation features. Join our beta program and help shape the future of text-to-image technology.",
    keywords: "WordToImage beta, AI image generation beta, early access, advanced AI features, text-to-image beta program",
    canonical: "https://wordtoimage.com/beta",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "WordToImage Beta Program",
      "description": "Join the WordToImage beta program for early access to advanced AI features",
      "url": "https://wordtoimage.com/beta",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "WordToImage Beta",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "releaseNotes": "Beta version with advanced AI features and enhanced image generation capabilities"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

export default BetaLanding;
