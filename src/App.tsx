
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import WordToImageImprovementsUI from '@/pages/WordToImageImprovementsUI';
import TextToImage from '@/pages/TextToImage';
import Auth from '@/pages/Auth';
import Privacy from '@/pages/Privacy'; // Add import for Privacy page

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
        <Route path="/privacy" element={<Privacy />} /> {/* Add Privacy Policy route */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
