
import { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FaqSection } from './FaqSection';

// Sample demo images using WebP format and optimized sizes
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

// Lazy load all non-critical sections
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
        <HeroSection />
      </div>
      
      {/* Lazily load gallery with lightweight loading state */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>}>
        <div className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LazyGenerationGallery images={demoImages} />
          </div>
        </div>
      </Suspense>
      
      <div className="bg-gray-50">
        <Suspense fallback={<div className="h-40 bg-gray-50"></div>}>
          <LazyTemplatesSection />
        </Suspense>
      </div>
      
      <Suspense fallback={<div className="h-40 bg-white"></div>}>
        <LazyFeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-gray-100"></div>}>
        <LazyTestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-white"></div>}>
        <LazyPricingSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-24 bg-gray-50"></div>}>
        <LazyCTASection />
      </Suspense>
      
      <FaqSection />
    </main>
  );
};
