
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";

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
          
          {/* Resources routes */}
          <Route path="/blog" element={<NotFound />} />
          <Route path="/design-tips" element={<NotFound />} />
          <Route path="/tutorials" element={<NotFound />} />
          <Route path="/help" element={<NotFound />} />
          <Route path="/api" element={<NotFound />} />
          
          {/* Company routes */}
          <Route path="/about" element={<NotFound />} />
          <Route path="/careers" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="/terms" element={<NotFound />} />
          <Route path="/cookies" element={<NotFound />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
