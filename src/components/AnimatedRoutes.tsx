import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import PageTransition from './PageTransition';

// Import critical pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// Lazy load all other pages
const TextToImage = lazy(() => import('@/pages/TextToImage'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Auth = lazy(() => import('@/pages/Auth'));
const Features = lazy(() => import('@/pages/Features'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Templates = lazy(() => import('@/pages/Templates'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Help = lazy(() => import('@/pages/Help'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Cookies = lazy(() => import('@/pages/Cookies'));
const Product = lazy(() => import('@/pages/Product'));
const Beta = lazy(() => import('@/pages/Beta'));
const BetaLanding = lazy(() => import('@/pages/BetaLanding'));
const Blog = lazy(() => import('@/pages/Blog'));
const API = lazy(() => import('@/pages/API'));
const Community = lazy(() => import('@/pages/Community'));
const Tutorials = lazy(() => import('@/pages/Tutorials'));
const DesignTips = lazy(() => import('@/pages/DesignTips'));
const Updates = lazy(() => import('@/pages/Updates'));
const Careers = lazy(() => import('@/pages/Careers'));
const JoinOurTeam = lazy(() => import('@/pages/JoinOurTeam'));
const AIUpscaler = lazy(() => import('@/pages/AIUpscaler'));
const VideoTutorials = lazy(() => import('@/pages/VideoTutorials'));
const WhatsNew = lazy(() => import('@/pages/WhatsNew'));
const PromptGuide = lazy(() => import('@/pages/PromptGuide'));
const AITemplates = lazy(() => import('@/pages/AITemplates'));
const StyleGallery = lazy(() => import('@/pages/StyleGallery'));
const BatchGenerator = lazy(() => import('@/pages/BatchGenerator'));
const ContactSupport = lazy(() => import('@/pages/ContactSupport'));
const PDFToJPG = lazy(() => import('@/pages/PDFToJPG'));
const WordToJPG = lazy(() => import('@/pages/WordToJPG'));
const JPGToWord = lazy(() => import('@/pages/JPGToWord'));
const JPGToPDF = lazy(() => import('@/pages/JPGToPDF'));
const AIEnhance = lazy(() => import('@/pages/AIEnhance'));
const RemoveBackground = lazy(() => import('@/pages/RemoveBackground'));
const Tools = lazy(() => import('@/pages/Tools'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const ContentHub = lazy(() => import('@/pages/ContentHub'));
const BlogPostDetail = lazy(() => import('@/pages/BlogPostDetail'));
const OnboardingDemo = lazy(() => import('@/pages/OnboardingDemo'));
const TechnicalEnhancements = lazy(() => import('@/pages/TechnicalEnhancements'));
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccess'));
const ComprehensiveDashboard = lazy(() => import('@/components/testing/ComprehensiveDashboard').then(module => ({ default: module.ComprehensiveDashboard })));

// Blog posts
const AIArtStylesBlogPost = lazy(() => import('@/pages/blog/ai-art-styles'));
const PromptWritingGuideBlogPost = lazy(() => import('@/pages/blog/prompt-writing-guide'));
const AIMarketingSuccessBlogPost = lazy(() => import('@/pages/blog/ai-marketing-success'));
const BestFreeAIImageGenerators = lazy(() => import('@/pages/blog/best-free-ai-image-generators'));
const AIImageGeneratorOnlineFree = lazy(() => import('@/pages/blog/ai-image-generator-online-free'));
const ImageGeneratorCodesGuide = lazy(() => import('@/pages/blog/image-generator-codes-guide'));
const AIImageGeneratorRevolution = lazy(() => import('@/pages/blog/ai-image-generator-revolution'));
const BingImageGeneratorReview = lazy(() => import('@/pages/blog/bing-image-generator-review'));
const MasteringAIArtPrompts = lazy(() => import('@/pages/blog/mastering-ai-art-prompts'));
const FutureAIImageGeneration = lazy(() => import('@/pages/blog/future-ai-image-generation'));
const ProfessionalMarketingVisuals = lazy(() => import('@/pages/blog/professional-marketing-visuals'));

const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-32 w-96 mx-auto" />
      <Skeleton className="h-4 w-64 mx-auto" />
    </div>
  </div>
);

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/text-to-image" element={<PageTransition><TextToImage /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
          <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/help" element={<PageTransition><Help /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
          <Route path="/cookies" element={<PageTransition><Cookies /></PageTransition>} />
          <Route path="/product" element={<PageTransition><Product /></PageTransition>} />
          <Route path="/beta" element={<PageTransition><Beta /></PageTransition>} />
          <Route path="/beta-landing" element={<PageTransition><BetaLanding /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/api" element={<PageTransition><API /></PageTransition>} />
          <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
          <Route path="/tutorials" element={<PageTransition><Tutorials /></PageTransition>} />
          <Route path="/design-tips" element={<PageTransition><DesignTips /></PageTransition>} />
          <Route path="/updates" element={<PageTransition><Updates /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/join-our-team" element={<PageTransition><JoinOurTeam /></PageTransition>} />
          <Route path="/ai-upscaler" element={<PageTransition><AIUpscaler /></PageTransition>} />
          <Route path="/video-tutorials" element={<PageTransition><VideoTutorials /></PageTransition>} />
          <Route path="/whats-new" element={<PageTransition><WhatsNew /></PageTransition>} />
          <Route path="/prompt-guide" element={<PageTransition><PromptGuide /></PageTransition>} />
          <Route path="/ai-templates" element={<PageTransition><AITemplates /></PageTransition>} />
          <Route path="/style-gallery" element={<PageTransition><StyleGallery /></PageTransition>} />
          <Route path="/batch-generator" element={<PageTransition><BatchGenerator /></PageTransition>} />
          <Route path="/contact-support" element={<PageTransition><ContactSupport /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/content-hub" element={<PageTransition><ContentHub /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPostDetail /></PageTransition>} />
          <Route path="/pdf-to-jpg" element={<PageTransition><PDFToJPG /></PageTransition>} />
          <Route path="/word-to-jpg" element={<PageTransition><WordToJPG /></PageTransition>} />
          <Route path="/jpg-to-word" element={<PageTransition><JPGToWord /></PageTransition>} />
          <Route path="/jpg-to-pdf" element={<PageTransition><JPGToPDF /></PageTransition>} />
          <Route path="/remove-background" element={<PageTransition><RemoveBackground /></PageTransition>} />
          <Route path="/ai-enhance" element={<PageTransition><AIEnhance /></PageTransition>} />
          <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
          <Route path="/blog/ai-art-styles" element={<PageTransition><AIArtStylesBlogPost /></PageTransition>} />
          <Route path="/blog/prompt-writing-guide" element={<PageTransition><PromptWritingGuideBlogPost /></PageTransition>} />
          <Route path="/blog/ai-marketing-success" element={<PageTransition><AIMarketingSuccessBlogPost /></PageTransition>} />
          <Route path="/blog/best-free-ai-image-generators" element={<PageTransition><BestFreeAIImageGenerators /></PageTransition>} />
          <Route path="/blog/ai-image-generator-online-free" element={<PageTransition><AIImageGeneratorOnlineFree /></PageTransition>} />
          <Route path="/blog/image-generator-codes-guide" element={<PageTransition><ImageGeneratorCodesGuide /></PageTransition>} />
          <Route path="/blog/ai-image-generator-revolution" element={<PageTransition><AIImageGeneratorRevolution /></PageTransition>} />
          <Route path="/blog/bing-image-generator-review" element={<PageTransition><BingImageGeneratorReview /></PageTransition>} />
          <Route path="/blog/mastering-ai-art-prompts" element={<PageTransition><MasteringAIArtPrompts /></PageTransition>} />
          <Route path="/blog/future-ai-image-generation" element={<PageTransition><FutureAIImageGeneration /></PageTransition>} />
          <Route path="/blog/professional-marketing-visuals" element={<PageTransition><ProfessionalMarketingVisuals /></PageTransition>} />
          <Route path="/dev-dashboard" element={<PageTransition><ComprehensiveDashboard /></PageTransition>} />
          <Route path="/onboarding-demo" element={<PageTransition><OnboardingDemo /></PageTransition>} />
          <Route path="/technical-enhancements" element={<PageTransition><TechnicalEnhancements /></PageTransition>} />
          <Route path="/payment-success" element={<PageTransition><PaymentSuccess /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
