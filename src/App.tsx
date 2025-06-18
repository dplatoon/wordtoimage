
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import TextToImage from "./pages/TextToImage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Templates from "./pages/Templates";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Product from "./pages/Product";
import Beta from "./pages/Beta";
import BetaLanding from "./pages/BetaLanding";
import Blog from "./pages/Blog";
import API from "./pages/API";
import Community from "./pages/Community";
import Tutorials from "./pages/Tutorials";
import DesignTips from "./pages/DesignTips";
import Updates from "./pages/Updates";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/text-to-image" element={<TextToImage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/product" element={<Product />} />
              <Route path="/beta" element={<Beta />} />
              <Route path="/beta-landing" element={<BetaLanding />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/api" element={<API />} />
              <Route path="/community" element={<Community />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/design-tips" element={<DesignTips />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
