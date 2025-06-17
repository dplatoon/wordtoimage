
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { SEOPerformanceMonitor } from "@/components/seo/SEOPerformanceMonitor";
import { CriticalCSS } from "@/components/performance/CriticalCSS";
import { ResourcePreloader } from "@/components/performance/ResourcePreloader";
import Index from "./pages/Index";
import TextToImage from "./pages/TextToImage";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <BrowserRouter>
                <CriticalCSS />
                <ResourcePreloader />
                <SEOPerformanceMonitor />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/text-to-image" element={<TextToImage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
                <Toaster 
                  position="bottom-right"
                  expand={true}
                  richColors={true}
                  closeButton={true}
                />
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
