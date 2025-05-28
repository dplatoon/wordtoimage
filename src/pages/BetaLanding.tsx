
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaHero } from '@/components/beta/BetaHero';
import { BetaBenefits } from '@/components/beta/BetaBenefits';
import { BetaProcess } from '@/components/beta/BetaProcess';
import { BetaFeatures } from '@/components/beta/BetaFeatures';
import { BetaCTA } from '@/components/beta/BetaCTA';
import { usePagePerformance } from '@/hooks/usePerformanceMonitoring';

const BetaLanding = () => {
  usePagePerformance('BetaLanding');

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <main className="pt-8 pb-16">
        <BetaHero />
        <BetaBenefits />
        <BetaProcess />
        <BetaFeatures />
        <BetaCTA />
      </main>

      <Footer />
    </div>
  );
};

export default BetaLanding;
