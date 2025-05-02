
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { BetaBanner } from '@/components/BetaBanner';
import { CursorTrail } from '@/components/home/CursorTrail';
import { SeoHead } from '@/components/home/SeoHead';
import { DecorativeBackground } from '@/components/home/DecorativeBackground';
import { SkipToContent } from '@/components/home/SkipToContent';
import { HomeContent } from '@/components/home/HomeContent';
import { AnalyticsTracker } from '@/components/home/AnalyticsTracker';

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SeoHead />
      <AnalyticsTracker />
      
      {/* Implement cursor trail for desktop users */}
      <CursorTrail />
      
      <SkipToContent />
      <Nav />
      
      <DecorativeBackground />
      <HomeContent />
      
      <Footer />
      <BetaBanner />
    </div>
  );
};

export default Index;
