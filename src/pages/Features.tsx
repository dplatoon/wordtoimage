
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { TemplatesSection } from '@/components/TemplatesSection';
import { Sparkles, Image as ImageIcon, Zap, Palette, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FeatureNavigation } from '@/components/features/FeatureNavigation';
import { FeaturesHeroSection } from '@/components/features/FeaturesHeroSection';
import { CoreFeaturesGrid } from '@/components/features/CoreFeaturesGrid';
import { LiveDemoSection } from '@/components/features/LiveDemoSection';
import { DetailedFeaturesSection } from '@/components/features/DetailedFeaturesSection';
import { FeaturesCTASection } from '@/components/features/FeaturesCTASection';
import { Helmet } from 'react-helmet-async';
import { SkipToContent } from '@/components/accessibility/SkipToContent';

const Features = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Feature sections for navigation
  const featureSections = [
    { id: 'hero', title: 'Overview', icon: Sparkles },
    { id: 'ai-features', title: 'Core Features', icon: Zap },
    { id: 'demo', title: 'Live Demo', icon: ImageIcon },
    { id: 'detailed-features', title: 'All Features', icon: Users },
    { id: 'templates', title: 'Templates', icon: Palette }
  ];

  // Scroll spy for active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = featureSections.map(section => document.getElementById(section.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(featureSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Image Generation Features - WordToImage | Advanced Text-to-Image Tools</title>
        <meta name="description" content="Explore powerful AI image generation features: 50+ art styles, custom resolutions, batch processing, API access, and professional editing tools. Create stunning visuals from text." />
        <meta name="keywords" content="AI image features, text to image tools, AI art styles, batch image generation, AI editing tools, custom AI models" />
        <link rel="canonical" href="https://wordtoimage.com/features" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="AI Image Generation Features - WordToImage" />
        <meta property="og:description" content="Discover advanced AI features for creating stunning images from text. 50+ styles, batch processing, API access & more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordtoimage.com/features" />
        
        {/* Structured data for features */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "WordToImage AI Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "description": "Advanced AI image generation platform with 50+ art styles and professional editing tools",
            "features": [
              "Text-to-image generation",
              "50+ art styles",
              "Batch processing",
              "API access",
              "Custom resolutions",
              "Professional editing tools"
            ],
            "url": "https://wordtoimage.com/features"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-ai-dark via-ai-surface to-ai-muted text-white overflow-hidden">
        <SkipToContent />

        {/* Animated background elements with reduced motion support */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-ai-primary/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-ai-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-ai-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <Nav />
        
        <FeatureNavigation 
          featureSections={featureSections}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />
        
        <main id="main-content" className="relative z-10">
          <header>
            <h1 className="sr-only">AI Image Generation Features - Complete Overview</h1>
          </header>
          
          <FeaturesHeroSection />
          <CoreFeaturesGrid />
          <LiveDemoSection />
          <DetailedFeaturesSection />

          <section id="templates" aria-labelledby="templates-heading">
            <h2 id="templates-heading" className="sr-only">Templates Gallery</h2>
            <TemplatesSection />
          </section>

          <FeaturesCTASection />
        </main>

        <ModernFooter />
      </div>
    </>
  );
};

export default Features;
