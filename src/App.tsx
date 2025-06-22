import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
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
import JoinOurTeam from "./pages/JoinOurTeam";
import NotFound from "./pages/NotFound";
import AIUpscaler from "./pages/AIUpscaler";
import VideoTutorials from "./pages/VideoTutorials";
import WhatsNew from "./pages/WhatsNew";
import PromptGuide from "./pages/PromptGuide";
import AITemplates from "./pages/AITemplates";
import StyleGallery from "./pages/StyleGallery";
import BatchGenerator from "./pages/BatchGenerator";
import ContactSupport from "./pages/ContactSupport";
import AIArtStylesBlogPost from "@/pages/blog/ai-art-styles";
import PromptWritingGuideBlogPost from "@/pages/blog/prompt-writing-guide";
import AIMarketingSuccessBlogPost from "@/pages/blog/ai-marketing-success";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
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
                <Route path="/join-our-team" element={<JoinOurTeam />} />
                <Route path="/ai-upscaler" element={<AIUpscaler />} />
                <Route path="/video-tutorials" element={<VideoTutorials />} />
                <Route path="/whats-new" element={<WhatsNew />} />
                <Route path="/prompt-guide" element={<PromptGuide />} />
                <Route path="/ai-templates" element={<AITemplates />} />
                <Route path="/style-gallery" element={<StyleGallery />} />
                <Route path="/batch-generator" element={<BatchGenerator />} />
                <Route path="/contact-support" element={<ContactSupport />} />
                <Route path="/blog/ai-art-styles" element={<AIArtStylesBlogPost />} />
                <Route path="/blog/prompt-writing-guide" element={<PromptWritingGuideBlogPost />} />
                <Route path="/blog/ai-marketing-success" element={<AIMarketingSuccessBlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
