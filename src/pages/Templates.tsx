
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { TemplatesSection } from '@/components/TemplatesSection';
import { TemplateGalleryHero } from '@/components/templates/TemplateGalleryHero';
import { PageSEO } from '@/components/seo/PageSEO';
import { usePagePerformance } from '@/hooks/usePerformanceMonitoring';

const Templates = () => {
  usePagePerformance('Templates');

  const templatesSEO = {
    title: "AI Image Templates - Ready-to-Use Text-to-Image Prompts",
    description: "Browse our collection of AI image templates and prompts. Generate stunning visuals instantly with pre-made styles for social media, marketing, art, and more.",
    keywords: "AI image templates, text-to-image prompts, AI art styles, image generation templates, social media graphics, marketing visuals",
    canonical: "https://wordtoimage.com/templates",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "AI Image Templates",
      "description": "Collection of AI-powered image generation templates and prompts",
      "url": "https://wordtoimage.com/templates",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Template Categories",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Social Media Templates"
          },
          {
            "@type": "ListItem", 
            "position": 2,
            "name": "Marketing Graphics"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Art Styles"
          }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO {...templatesSEO} />
      
      <Nav />
      
      <main id="main-content" className="pt-8 pb-16" role="main">
        <header>
          <TemplateGalleryHero />
        </header>
        
        <section aria-labelledby="templates-section-heading" role="region">
          <h2 id="templates-section-heading" className="sr-only">Template Gallery</h2>
          <TemplatesSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;
