
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeContent } from "@/components/home/HomeContent";
import { MobilePerformanceIndicator } from "@/components/testing/MobilePerformanceIndicator";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Nav />
      <HomeContent />
      <Footer />
      <MobilePerformanceIndicator />
    </div>
  );
};

export default Index;
