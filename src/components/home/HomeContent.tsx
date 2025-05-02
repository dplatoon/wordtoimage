
import { HeroSection } from '@/components/HeroSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { PricingSection } from '@/components/PricingSection';
import { CTASection } from '@/components/CTASection';
import { FaqSection } from './FaqSection';
import { lazy, Suspense } from 'react';
import { GenerationGallery } from '@/components/hero/GenerationGallery';

// Sample demo images for new users
const demoImages = [
  {
    url: 'https://images.unsplash.com/photo-1686002359940-6a51b0d8184b',
    prompt: 'A futuristic city with flying cars and neon lights',
    style: 'Futuristic'
  },
  {
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4',
    prompt: 'Mountain landscape with reflective lake at sunset',
    style: 'Photorealistic'
  },
  {
    url: 'https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1',
    prompt: 'Colorful abstract geometric patterns',
    style: 'Abstract'
  },
  {
    url: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5',
    prompt: 'Enchanted forest with magical creatures',
    style: 'Fantasy'
  }
];

// Lazy load non-critical sections for better initial load performance
const LazyFeaturesSection = lazy(() => import('@/components/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const LazyTestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const LazyPricingSection = lazy(() => import('@/components/PricingSection').then(module => ({ default: module.PricingSection })));

export const HomeContent = () => {
  return (
    <main id="main-content" className="relative">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        {/* Hero section with simplified, modern interface */}
        <HeroSection />
      </div>
      
      {/* Gallery showcase immediately after hero */}
      <div className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GenerationGallery images={demoImages} />
        </div>
      </div>
      
      {/* Templates section with cleaner layout */}
      <div className="bg-gray-50">
        <TemplatesSection />
      </div>
      
      {/* Lazily load less critical sections */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading features...</div>}>
        <LazyFeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading testimonials...</div>}>
        <LazyTestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading pricing...</div>}>
        <LazyPricingSection />
      </Suspense>
      
      <CTASection />
      <FaqSection />
    </main>
  );
};
