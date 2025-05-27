
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import Dashboard from '@/pages/Dashboard';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import WordToImageImprovementsUI from '@/pages/WordToImageImprovementsUI';
import TextToImage from '@/pages/TextToImage';
import Auth from '@/pages/Auth';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Cookies from '@/pages/Cookies';
import Community from '@/pages/Community';
import DesignTips from '@/pages/DesignTips';
import Tutorials from '@/pages/Tutorials';
import About from '@/pages/About';
import Beta from '@/pages/Beta';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Updates from '@/pages/Updates';
import Blog from '@/pages/Blog';
import Help from '@/pages/Help';
import API from '@/pages/API';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/text-to-image" element={<TextToImage />} />
            <Route path="/word-to-image-improvements-ui" element={<WordToImageImprovementsUI />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<Auth />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/community" element={<Community />} />
            <Route path="/design-tips" element={<DesignTips />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/about" element={<About />} />
            <Route path="/beta" element={<Beta />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/help" element={<Help />} />
            <Route path="/api" element={<API />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
