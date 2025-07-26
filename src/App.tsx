import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

// Import critical pages that should load immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load all other pages for performance
const TextToImage = lazy(() => import("./pages/TextToImage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Templates = lazy(() => import("./pages/Templates"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Help = lazy(() => import("./pages/Help"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Product = lazy(() => import("./pages/Product"));
const Beta = lazy(() => import("./pages/Beta"));
const BetaLanding = lazy(() => import("./pages/BetaLanding"));
const Blog = lazy(() => import("./pages/Blog"));
const API = lazy(() => import("./pages/API"));
const Community = lazy(() => import("./pages/Community"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const DesignTips = lazy(() => import("./pages/DesignTips"));
const Updates = lazy(() => import("./pages/Updates"));
const Careers = lazy(() => import("./pages/Careers"));
const JoinOurTeam = lazy(() => import("./pages/JoinOurTeam"));
const AIUpscaler = lazy(() => import("./pages/AIUpscaler"));
const VideoTutorials = lazy(() => import("./pages/VideoTutorials"));
const WhatsNew = lazy(() => import("./pages/WhatsNew"));
const PromptGuide = lazy(() => import("./pages/PromptGuide"));
const AITemplates = lazy(() => import("./pages/AITemplates"));
const StyleGallery = lazy(() => import("./pages/StyleGallery"));
const BatchGenerator = lazy(() => import("./pages/BatchGenerator"));
const ContactSupport = lazy(() => import("./pages/ContactSupport"));
const PDFToJPG = lazy(() => import("./pages/PDFToJPG"));
const WordToJPG = lazy(() => import("./pages/WordToJPG"));
const JPGToWord = lazy(() => import("./pages/JPGToWord"));
const JPGToPDF = lazy(() => import("./pages/JPGToPDF"));

// HuggingFace transformer only loaded on background remover page
const RemoveBackground = lazy(() => import("./pages/RemoveBackground"));

// Lazy load blog posts
const AIArtStylesBlogPost = lazy(() => import("@/pages/blog/ai-art-styles"));
const PromptWritingGuideBlogPost = lazy(() => import("@/pages/blog/prompt-writing-guide"));
const AIMarketingSuccessBlogPost = lazy(() => import("@/pages/blog/ai-marketing-success"));
const BestFreeAIImageGenerators = lazy(() => import("@/pages/blog/best-free-ai-image-generators"));
const AIImageGeneratorOnlineFree = lazy(() => import("@/pages/blog/ai-image-generator-online-free"));
const ImageGeneratorCodesGuide = lazy(() => import("@/pages/blog/image-generator-codes-guide"));
const AIImageGeneratorRevolution = lazy(() => import("@/pages/blog/ai-image-generator-revolution"));
const BingImageGeneratorReview = lazy(() => import("@/pages/blog/bing-image-generator-review"));
const MasteringAIArtPrompts = lazy(() => import("@/pages/blog/mastering-ai-art-prompts"));
const FutureAIImageGeneration = lazy(() => import("@/pages/blog/future-ai-image-generation"));
const ProfessionalMarketingVisuals = lazy(() => import("@/pages/blog/professional-marketing-visuals"));

// Lazy load dashboard and gallery pages
const Gallery = lazy(() => import("./pages/Gallery"));
const CommunityGallery = lazy(() => import("./pages/CommunityGallery"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));
const ContentHub = lazy(() => import("./pages/ContentHub"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const OnboardingDemo = lazy(() => import("./pages/OnboardingDemo"));
const TechnicalEnhancements = lazy(() => import("./pages/TechnicalEnhancements"));

// Lazy load testing components
const ComprehensiveDashboard = lazy(() => import("./components/testing/ComprehensiveDashboard").then(module => ({ default: module.ComprehensiveDashboard })));

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
// Performance monitoring temporarily disabled for optimization
import { EnhancedLighthouseOptimizer } from "./components/performance/EnhancedLighthouseOptimizer";
import { MobileLighthouseOptimizer } from "./components/performance/MobileLighthouseOptimizer";
import { BehaviorTracker } from "./components/analytics/BehaviorTracker";

// Loading component for Suspense fallback
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-32 w-96 mx-auto" />
      <Skeleton className="h-4 w-64 mx-auto" />
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BehaviorTracker />
            <OptimizedFontLoader />
            {/* Performance monitoring temporarily disabled */}
            <EnhancedLighthouseOptimizer />
            <MobileLighthouseOptimizer />
            <BrowserRouter>
              <Suspense fallback={<PageLoadingFallback />}>
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
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/community-gallery" element={<CommunityGallery />} />
                  <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
                  <Route path="/content-hub" element={<ContentHub />} />
                  <Route path="/blog/:slug" element={<BlogPostDetail />} />
                  <Route path="/pdf-to-jpg" element={<PDFToJPG />} />
                  <Route path="/word-to-jpg" element={<WordToJPG />} />
                  <Route path="/jpg-to-word" element={<JPGToWord />} />
                  <Route path="/jpg-to-pdf" element={<JPGToPDF />} />
                  <Route path="/remove-background" element={<RemoveBackground />} />
                  <Route path="/blog/ai-art-styles" element={<AIArtStylesBlogPost />} />
                  <Route path="/blog/prompt-writing-guide" element={<PromptWritingGuideBlogPost />} />
                  <Route path="/blog/ai-marketing-success" element={<AIMarketingSuccessBlogPost />} />
                  <Route path="/blog/best-free-ai-image-generators" element={<BestFreeAIImageGenerators />} />
                  <Route path="/blog/ai-image-generator-online-free" element={<AIImageGeneratorOnlineFree />} />
                  <Route path="/blog/image-generator-codes-guide" element={<ImageGeneratorCodesGuide />} />
                  <Route path="/blog/ai-image-generator-revolution" element={<AIImageGeneratorRevolution />} />
                  <Route path="/blog/bing-image-generator-review" element={<BingImageGeneratorReview />} />
                  <Route path="/blog/mastering-ai-art-prompts" element={<MasteringAIArtPrompts />} />
                  <Route path="/blog/future-ai-image-generation" element={<FutureAIImageGeneration />} />
                  <Route path="/blog/professional-marketing-visuals" element={<ProfessionalMarketingVisuals />} />
                  <Route path="/dev-dashboard" element={<ComprehensiveDashboard />} />
                  <Route path="/onboarding-demo" element={<OnboardingDemo />} />
                  <Route path="/technical-enhancements" element={<TechnicalEnhancements />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;