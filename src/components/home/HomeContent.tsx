
import { lazy, Suspense, useEffect, useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FaqSection } from './FaqSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ShowcaseSection } from '@/components/home/ShowcaseSection';

// Dynamically load non-critical sections
const LazyTemplatesSection = lazy(() => import('@/components/TemplatesSection').then(module => ({ default: module.TemplatesSection })));
const LazyFeaturesSection = lazy(() => import('@/components/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const LazyTestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const LazyPricingSection = lazy(() => import('@/components/PricingSection').then(module => ({ default: module.PricingSection })));
const LazyCTASection = lazy(() => import('@/components/CTASection').then(module => ({ default: module.CTASection })));

// Simple skeletal loading component
const SectionSkeleton = ({ height = "h-40", bg = "bg-white" }: { height?: string, bg?: string }) => (
  <div className={`${height} ${bg} w-full animate-pulse flex items-center justify-center`}>
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

// Demo images for initial rendering
const demoImages = [
  {
    url: 'https://images.unsplash.com/photo-1686002359940-6a51b0d8184b?auto=format&fit=crop&w=400&q=75&fm=webp',
    prompt: 'Futuristic city with flying cars',
    style: 'Futuristic'
  },
  {
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=75&fm=webp',
    prompt: 'Mountain landscape with lake',
    style: 'Photorealistic'
  },
  {
    url: 'https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?auto=format&fit=crop&w=400&q=75&fm=webp',
    prompt: 'Abstract geometric patterns',
    style: 'Abstract'
  },
  {
    url: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=400&q=75&fm=webp',
    prompt: 'Enchanted forest',
    style: 'Fantasy'
  }
];

// Using Intersection Observer to load components on-demand
export const HomeContent = () => {
  const [visibleSections, setVisibleSections] = useState({
    templates: false,
    features: false,
    testimonials: false,
    pricing: false,
    cta: false,
  });

  useEffect(() => {
    const sectionIds = ['templates', 'features', 'testimonials', 'pricing', 'cta'];
    const sectionRefs: Record<string, HTMLElement | null> = {};
    
    sectionIds.forEach(id => {
      const element = document.getElementById(id + '-section');
      if (element) sectionRefs[id] = element;
    });
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const id = entry.target.id.replace('-section', '');
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [id]: true }));
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
  
  const LazyGallery = lazy(() => import('@/components/hero/GenerationGallery').then(module => ({ default: module.GenerationGallery })));

  return (
    <main id="main-content" className="relative">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <HeroSection />
      </div>
      
      {/* Gallery section */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SectionSkeleton height="h-64" />}>
            <LazyGallery images={demoImages} />
          </Suspense>
        </div>
      </div>
      
      {/* How it works section */}
      <div className="bg-gray-50 py-16">
        <HowItWorksSection />
      </div>
      
      {/* Showcase section */}
      <div className="bg-white py-16">
        <ShowcaseSection />
      </div>
      
      {/* Features section */}
      <div id="features-section" className="bg-white">
        <Suspense fallback={<SectionSkeleton />}>
          {visibleSections.features && <LazyFeaturesSection />}
        </Suspense>
      </div>
      
      {/* Templates section */}
      <div id="templates-section" className="bg-gray-50">
        <Suspense fallback={<SectionSkeleton bg="bg-gray-50" />}>
          {visibleSections.templates && <LazyTemplatesSection />}
        </Suspense>
      </div>
      
      {/* Testimonials section */}
      <div id="testimonials-section" className="bg-gray-100">
        <Suspense fallback={<SectionSkeleton bg="bg-gray-100" />}>
          {visibleSections.testimonials && <LazyTestimonialsSection />}
        </Suspense>
      </div>
      
      {/* Pricing section */}
      <div id="pricing-section" className="bg-white">
        <Suspense fallback={<SectionSkeleton />}>
          {visibleSections.pricing && <LazyPricingSection />}
        </Suspense>
      </div>
      
      {/* CTA section */}
      <div id="cta-section" className="bg-gray-50">
        <Suspense fallback={<SectionSkeleton bg="bg-gray-50" height="h-24" />}>
          {visibleSections.cta && <LazyCTASection />}
        </Suspense>
      </div>
      
      <FaqSection />
    </main>
  );
};
