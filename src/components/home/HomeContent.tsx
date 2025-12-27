
import { lazy, Suspense, useEffect, useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FAQSection } from '@/components/home/FAQSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ShowcaseSection } from '@/components/home/showcase/ShowcaseSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { PricingSection } from '@/components/home/PricingSection';
import { CTASection } from '@/components/home/CTASection';

// Simple skeletal loading component
const SectionSkeleton = ({ height = "h-40", bg = "bg-background" }: { height?: string, bg?: string }) => (
  <div className={`${height} ${bg} w-full animate-pulse flex items-center justify-center`}>
    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

// Using Intersection Observer to load components on-demand
export const HomeContent = () => {
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    testimonials: false,
    pricing: false,
    cta: false,
  });

  useEffect(() => {
    const sectionIds = ['features', 'testimonials', 'pricing', 'cta'];
    const sectionRefs: Record<string, HTMLElement | null> = {};
    
    sectionIds.forEach(id => {
      const element = document.getElementById(id + '-section');
      if (element) sectionRefs[id] = element;
    });
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.target instanceof HTMLElement) {
          const id = entry.target.id.replace('-section', '');
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [id]: true }));
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '200px',
      threshold: 0.1
    });
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <main id="main-content" className="relative w-full">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-b from-secondary to-background">
        <HeroSection />
      </div>
      
      {/* CTA section moved up */}
      <div id="cta-section" className="bg-background">
        <CTASection />
      </div>
      
      {/* Showcase section (similar to Gallery) moved up */}
      <div className="bg-background py-8 md:py-16">
        <ShowcaseSection />
      </div>
      
      {/* How it works section */}
      <div id="how-it-works" className="bg-secondary py-8 md:py-16">
        <HowItWorksSection />
      </div>
      
      {/* Features section moved down */}
      <div id="features-section" className="bg-background">
        <FeaturesSection />
      </div>
      
      {/* Testimonials section */}
      <div id="testimonials-section" className="bg-muted">
        <TestimonialsSection />
      </div>
      
      {/* Pricing section kept at bottom */}
      <div id="pricing-section" className="bg-secondary">
        <PricingSection />
      </div>
      
      <FAQSection />
    </main>
  );
};
