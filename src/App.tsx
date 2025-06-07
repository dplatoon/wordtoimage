
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MobileOptimizedApp } from "@/components/layout/MobileOptimizedApp";
import { AuthProvider } from "@/contexts/AuthContext";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const TextToImage = lazy(() => import("./pages/TextToImage"));
const PerformanceTest = lazy(() => import("./pages/PerformanceTest"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const API = lazy(() => import("./pages/API"));
const Beta = lazy(() => import("./pages/Beta"));
const BetaLanding = lazy(() => import("./pages/BetaLanding"));
const Blog = lazy(() => import("./pages/Blog"));
const Careers = lazy(() => import("./pages/Careers"));
const Community = lazy(() => import("./pages/Community"));
const Cookies = lazy(() => import("./pages/Cookies"));
const DesignTips = lazy(() => import("./pages/DesignTips"));
const Help = lazy(() => import("./pages/Help"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Templates = lazy(() => import("./pages/Templates"));
const Terms = lazy(() => import("./pages/Terms"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const Updates = lazy(() => import("./pages/Updates"));
const WordToImageImprovementsUI = lazy(() => import("./pages/WordToImageImprovementsUI"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1, // Reduce retries on mobile for faster experience
    },
  },
});

// Mobile-optimized loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <MobileOptimizedApp>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Index />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/features" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Features />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/pricing" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Pricing />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/contact" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Contact />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/auth" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Auth />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/text-to-image" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <TextToImage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/performance-test" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PerformanceTest />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Dashboard />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/about" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <About />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/api" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <API />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/beta" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Beta />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/beta-landing" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <BetaLanding />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/blog" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Blog />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/careers" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Careers />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/community" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Community />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/cookies" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Cookies />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/design-tips" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <DesignTips />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/help" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Help />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/payment-success" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PaymentSuccess />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/privacy" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Privacy />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/templates" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Templates />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/terms" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Terms />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/tutorials" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Tutorials />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/updates" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Updates />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/word-to-image-improvements" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <WordToImageImprovementsUI />
                      </Suspense>
                    } 
                  />
                  {/* 404 Catch-all route */}
                  <Route 
                    path="*" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <NotFound />
                      </Suspense>
                    } 
                  />
                </Routes>
              </BrowserRouter>
            </MobileOptimizedApp>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
