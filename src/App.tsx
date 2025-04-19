import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LoginForm } from "@/components/auth/LoginForm";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import DesignTips from "./pages/DesignTips";
import Tutorials from "./pages/Tutorials";
import Help from "./pages/Help";
import API from "./pages/API";
import Templates from "./pages/Templates";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Updates from "./pages/Updates";
import Beta from "./pages/Beta";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/community" element={<Community />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/beta" element={<Beta />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/design-tips" element={<DesignTips />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/help" element={<Help />} />
            <Route path="/api" element={<API />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
