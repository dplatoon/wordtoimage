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
import { CriticalCSSOptimizer } from "@/components/performance/CriticalCSSOptimizer";
import Index from "./pages/Index";
import TextToImage from "./pages/TextToImage";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import API from "./pages/API";
import Templates from "./pages/Templates";
import StyleGallery from "./pages/StyleGallery";
import Tutorials from "./pages/Tutorials";
import WhatsNew from "./pages/WhatsNew";
import AITemplates from "./pages/AITemplates";
import AIUpscaler from "./pages/AIUpscaler";
import BatchGenerator from "./pages/BatchGenerator";
import Beta from "./pages/Beta";
import BetaLanding from "./pages/BetaLanding";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import ContactSupport from "./pages/ContactSupport";
import Cookies from "./pages/Cookies";
import DesignTips from "./pages/DesignTips";
import Features from "./pages/Features";
import Help from "./pages/Help";
import JoinOurTeam from "./pages/JoinOurTeam";
import PaymentSuccess from "./pages/PaymentSuccess";
import PerformanceTest from "./pages/PerformanceTest";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Product from "./pages/Product";
import PromptGuide from "./pages/PromptGuide";
import Terms from "./pages/Terms";
import Updates from "./pages/Updates";
import VideoTutorials from "./pages/VideoTutorials";
import WordToImageImprovementsUI from "./pages/WordToImageImprovementsUI";

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
                <CriticalCSSOptimizer />
                <ResourcePreloader />
                <SEOPerformanceMonitor />
                <Routes>
                  {/* Main Pages */}
                  <Route path="/" element={<Index />} />
                  <Route path="/text-to-image" element={<TextToImage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* Product Pages */}
                  <Route path="/product" element={<Product />} />
                  <Route path="/ai-templates" element={<AITemplates />} />
                  <Route path="/style-gallery" element={<StyleGallery />} />
                  <Route path="/batch-generator" element={<BatchGenerator />} />
                  <Route path="/ai-upscaler" element={<AIUpscaler />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/beta" element={<Beta />} />
                  <Route path="/beta-landing" element={<BetaLanding />} />
                  
                  {/* Resources Pages */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/prompt-guide" element={<PromptGuide />} />
                  <Route path="/video-tutorials" element={<VideoTutorials />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/api" element={<API />} />
                  <Route path="/whats-new" element={<WhatsNew />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/design-tips" element={<DesignTips />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/updates" element={<Updates />} />
                  
                  {/* Company Pages */}
                  <Route path="/join-our-team" element={<JoinOurTeam />} />
                  <Route path="/contact-support" element={<ContactSupport />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/careers" element={<Careers />} />
                  
                  {/* Legal Pages */}
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  
                  {/* Additional Pages */}
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/performance-test" element={<PerformanceTest />} />
                  <Route path="/word-to-image-improvements" element={<WordToImageImprovementsUI />} />
                  
                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
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
