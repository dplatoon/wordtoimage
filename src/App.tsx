
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { MobileOptimizedApp } from '@/components/layout/MobileOptimizedApp';

// Lazy load pages
const Index = lazy(() => import('./pages/Index'));
const TextToImage = lazy(() => import('./pages/TextToImage'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Templates = lazy(() => import('./pages/Templates'));
const Blog = lazy(() => import('./pages/Blog'));
const Tutorials = lazy(() => import('./pages/Tutorials'));
const DesignTips = lazy(() => import('./pages/DesignTips'));
const Community = lazy(() => import('./pages/Community'));
const Help = lazy(() => import('./pages/Help'));
const API = lazy(() => import('./pages/API'));
const Updates = lazy(() => import('./pages/Updates'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Careers = lazy(() => import('./pages/Careers'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const Beta = lazy(() => import('./pages/Beta'));
const BetaLanding = lazy(() => import('./pages/BetaLanding'));
const PerformanceTest = lazy(() => import('./pages/PerformanceTest'));
const WordToImageImprovementsUI = lazy(() => import('./pages/WordToImageImprovementsUI'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Create a stable query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <BrowserRouter>
                <MobileOptimizedApp>
                  <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/text-to-image" element={<TextToImage />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/templates" element={<Templates />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/tutorials" element={<Tutorials />} />
                      <Route path="/design-tips" element={<DesignTips />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/api" element={<API />} />
                      <Route path="/updates" element={<Updates />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/cookies" element={<Cookies />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/payment-success" element={<PaymentSuccess />} />
                      <Route path="/beta" element={<Beta />} />
                      <Route path="/beta-landing" element={<BetaLanding />} />
                      <Route path="/performance-test" element={<PerformanceTest />} />
                      <Route path="/word-to-image-improvements" element={<WordToImageImprovementsUI />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <Toaster />
                </MobileOptimizedApp>
              </BrowserRouter>
            </SubscriptionProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
