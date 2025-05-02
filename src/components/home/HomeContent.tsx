
import { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FaqSection } from './FaqSection';

// Sample demo images for new users
const demoImages = [
  {
    url: 'https://images.unsplash.com/photo-1686002359940-6a51b0d8184b?auto=format&fit=crop&w=500&q=80',
    prompt: 'A futuristic city with flying cars and neon lights',
    style: 'Futuristic'
  },
  {
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=500&q=80',
    prompt: 'Mountain landscape with reflective lake at sunset',
    style: 'Photorealistic'
  },
  {
    url: 'https://images.unsplash.com/photo-1655635949212-1d8f4f103ea1?auto=format&fit=crop&w=500&q=80',
    prompt: 'Colorful abstract geometric patterns',
    style: 'Abstract'
  },
  {
    url: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=500&q=80',
    prompt: 'Enchanted forest with magical creatures',
    style: 'Fantasy'
  }
];

// Lazy load non-critical sections for better initial load performance
const LazyGenerationGallery = lazy(() => import('@/components/hero/GenerationGallery').then(module => ({ default: module.GenerationGallery })));
const LazyTemplatesSection = lazy(() => import('@/components/TemplatesSection').then(module => ({ default: module.TemplatesSection })));
const LazyFeaturesSection = lazy(() => import('@/components/FeaturesSection').then(module => ({ default: module.FeaturesSection })));
const LazyTestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const LazyPricingSection = lazy(() => import('@/components/PricingSection').then(module => ({ default: module.PricingSection })));
const LazyCTASection = lazy(() => import('@/components/CTASection').then(module => ({ default: module.CTASection })));

export const HomeContent = () => {
  return (
    <main id="main-content" className="relative">
      <div className="bg-gradient-to-b from-blue-50 to-white">
        {/* Hero section with simplified, modern interface */}
        <HeroSection />
      </div>
      
      {/* Lazily load all other sections */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading gallery...</div>}>
        <div className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LazyGenerationGallery images={demoImages} />
          </div>
        </div>
      </Suspense>
      
      <div className="bg-gray-50">
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading templates...</div>}>
          <LazyTemplatesSection />
        </Suspense>
      </div>
      
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading features...</div>}>
        <LazyFeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading testimonials...</div>}>
        <LazyTestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading pricing...</div>}>
        <LazyPricingSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
        <LazyCTASection />
      </Suspense>
      
      <FaqSection />
    </main>
  );
};
