
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileOptimizedApp } from "@/components/layout/MobileOptimizedApp";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const TextToImage = lazy(() => import("./pages/TextToImage"));

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
            </Routes>
          </BrowserRouter>
        </MobileOptimizedApp>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
