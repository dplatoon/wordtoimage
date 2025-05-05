
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Beta from '@/pages/Beta'; // Add this import

function App() {
  return (
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
        <Route path="/beta" element={<Beta />} /> {/* Add this route */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
