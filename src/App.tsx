
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

const queryClient = new QueryClient();

// Loading component for Suspense fallbacks
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize performance optimizations on app start
    initPerformanceOptimizations();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Initialize analytics (replace with your actual GA4 measurement ID)
    initAnalytics('G-XXXXXXXXXX');
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
