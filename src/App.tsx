
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { initPerformanceOptimizations } from "@/utils/performanceOptimizer";
import { initAccessibility } from "@/utils/accessibility";
import { initAnalytics } from "@/utils/analytics";
import "./App.css";

// Lazy load non-critical pages for better performance
const Index = lazy(() => import("./pages/Index"));
const TextToImage = lazy(() => import("./pages/TextToImage"));
const Templates = lazy(() => import("./pages/Templates"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Features = lazy(() => import("./pages/Features"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Community = lazy(() => import("./pages/Community"));
const BetaLanding = lazy(() => import("./pages/BetaLanding"));
const Blog = lazy(() => import("./pages/Blog"));
const DesignTips = lazy(() => import("./pages/DesignTips"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const Help = lazy(() => import("./pages/Help"));
const API = lazy(() => import("./pages/API"));
const Updates = lazy(() => import("./pages/Updates"));
const Careers = lazy(() => import("./pages/Careers"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Enhanced loading component for better UX
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize enhanced performance optimizations on app start
    initPerformanceOptimizations();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Initialize analytics (replace with your actual GA4 measurement ID)
    initAnalytics('G-XXXXXXXXXX');
    
    // Log app initialization
    console.log('🚀 WordToImage app initialized with enhanced performance optimizations');
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/text-to-image" element={<TextToImage />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/beta" element={<BetaLanding />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/design-tips" element={<DesignTips />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/api" element={<API />} />
                  <Route path="/updates" element={<Updates />} />
                  <Route path="/careers" element={<Careers />} />
                  {/* 404 catch-all route - must be last */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
