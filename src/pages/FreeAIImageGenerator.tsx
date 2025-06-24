
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EnhancedSEOManager } from '@/components/seo/EnhancedSEOManager';
import { FreeGeneratorHero } from '@/components/free-generator/FreeGeneratorHero';
import { FreeGeneratorTool } from '@/components/free-generator/FreeGeneratorTool';
import { CompetitorComparison } from '@/components/free-generator/CompetitorComparison';
import { PromptEngineeringGuide } from '@/components/free-generator/PromptEngineeringGuide';
import { UserGalleryShowcase } from '@/components/free-generator/UserGalleryShowcase';
import { EmailCaptureModule } from '@/components/free-generator/EmailCaptureModule';
import { useState } from 'react';

const FreeAIImageGenerator = () => {
  const [generatedImages, setGeneratedImages] = useState<Array<{
    url: string;
    prompt: string;
    style?: string;
    timestamp?: number;
  }>>([]);

  const handleImageGenerated = (url: string, prompt: string, style?: string) => {
    const newImage = {
      url,
      prompt,
      style,
      timestamp: Date.now()
    };
    setGeneratedImages(prev => [newImage, ...prev]);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free AI Image Generator",
    "description": "Create unlimited AI art for free with no signup required. Advanced text-to-image AI tool with multiple styles and instant download.",
    "url": "https://wordtoimage.com/free-ai-image-generator",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "No signup required",
      "Unlimited free generations",
      "Multiple art styles",
      "Instant download",
      "Commercial usage rights"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <EnhancedSEOManager
        customConfig={{
          title: "Free AI Image Generator Online - No Signup Needed | WordToImage",
          description: "Create unlimited AI art for free. Compare tools, master prompts, and download our prompt library. No filters or login required. Start generating now!",
          keywords: "ai image generator free no login, free ai art generator online, text to image ai free, prompt engineering for beginners, ai art maker",
          structuredData
        }}
      />
      
      <Nav />
      
      <main>
        {/* Hero Section */}
        <FreeGeneratorHero />
        
        {/* Real-Time Tool Section */}
        <FreeGeneratorTool onImageGenerated={handleImageGenerated} />
        
        {/* Competitor Comparison Matrix */}
        <CompetitorComparison />
        
        {/* Prompt Engineering Tips */}
        <PromptEngineeringGuide />
        
        {/* User Gallery Showcase */}
        <UserGalleryShowcase userImages={generatedImages} />
        
        {/* Email Capture Module */}
        <EmailCaptureModule />
      </main>
      
      <Footer />
    </div>
  );
};

export default FreeAIImageGenerator;
