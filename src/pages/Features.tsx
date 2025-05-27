
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { Sparkles, Image as ImageIcon, Zap, Palette, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FeatureNavigation } from '@/components/features/FeatureNavigation';
import { FeaturesHeroSection } from '@/components/features/FeaturesHeroSection';
import { CoreFeaturesGrid } from '@/components/features/CoreFeaturesGrid';
import { LiveDemoSection } from '@/components/features/LiveDemoSection';
import { FeaturesCTASection } from '@/components/features/FeaturesCTASection';

const Features = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Feature sections for navigation
  const featureSections = [
    { id: 'hero', title: 'Overview', icon: Sparkles },
    { id: 'ai-features', title: 'AI Features', icon: Zap },
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
    <div className="min-h-screen bg-gradient-to-br from-ai-dark via-ai-surface to-ai-muted text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
      
      <main className="relative z-10">
        <FeaturesHeroSection />
        <CoreFeaturesGrid />
        <LiveDemoSection />
        
        <section id="detailed-features">
          <FeaturesSection />
        </section>

        <section id="templates">
          <TemplatesSection />
        </section>

        <FeaturesCTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Features;
