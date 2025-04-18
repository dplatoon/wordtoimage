
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import DesignTips from "./pages/DesignTips";
import Tutorials from "./pages/Tutorials";
import Help from "./pages/Help";
import API from "./pages/API";
import Templates from "./pages/Templates";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Community route */}
          <Route path="/community" element={<Community />} />
          
          {/* Product routes */}
          <Route path="/updates" element={<NotFound />} />
          <Route path="/beta" element={<NotFound />} />
          <Route path="/templates" element={<Templates />} />
          
          {/* Resources routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/design-tips" element={<DesignTips />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/help" element={<Help />} />
          <Route path="/api" element={<API />} />
          
          {/* Company routes - Updated with actual page components */}
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
