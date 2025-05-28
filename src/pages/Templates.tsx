
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { TemplatesSection } from '@/components/TemplatesSection';
import { TemplateGalleryHero } from '@/components/templates/TemplateGalleryHero';
import { usePagePerformance } from '@/hooks/usePerformanceMonitoring';

const Templates = () => {
  usePagePerformance('Templates');

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <main className="pt-8 pb-16">
        <TemplateGalleryHero />
        <TemplatesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Templates;
