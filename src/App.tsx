import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { initAccessibility } from "@/utils/accessibility";
import { MobileOptimizer } from "@/components/mobile/MobileOptimizer";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Component imports for performance monitoring
import { OptimizedFontLoader } from "./components/performance/OptimizedFontLoader";
import { EnhancedLighthouseOptimizer } from "./components/performance/EnhancedLighthouseOptimizer";
import { MobileLighthouseOptimizer } from "./components/performance/MobileLighthouseOptimizer";

function App() {
  useEffect(() => {
    initAccessibility();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <MobileOptimizer />
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <OptimizedFontLoader />
            <EnhancedLighthouseOptimizer />
            <MobileLighthouseOptimizer />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
