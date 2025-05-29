
import { PageSEO } from '@/components/seo/PageSEO';

export const SeoHead = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WordToImage - AI Image Generator",
    "description": "Create stunning AI-generated images from text descriptions. Fast, easy, and high-quality results.",
    "url": "https://wordtoimage.com",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "browserRequirements": "Requires JavaScript. Compatible with Chrome, Firefox, Safari, Edge.",
    "softwareVersion": "2.0",
    "datePublished": "2024-01-01",
    "dateModified": "2025-01-01",
    "keywords": "AI image generator, text to image AI, AI art generator, artificial intelligence image creation, machine learning art, AI-powered visual content, automated image generation, free AI image maker, online AI art tool, AI graphics generator, text-to-image converter, AI illustration generator, digital art AI, AI design tool, smart image creation",
    "author": {
      "@type": "Organization",
      "name": "WordToImage",
      "url": "https://wordtoimage.com"
    },
    "offers": [
      {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free AI image generation with daily credits",
        "category": "Free",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "price": "9.99",
        "priceCurrency": "USD",
        "description": "Pro plan with unlimited AI image generations and advanced features",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "9.99",
          "priceCurrency": "USD",
          "billingDuration": "P1M"
        },
        "availability": "https://schema.org/InStock"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI-powered text to image generation",
      "50+ artistic styles and formats",
      "High-resolution 4K image output",
      "Instant AI image generation",
      "No design skills required",
      "Commercial use allowed",
      "Voice search optimized prompts",
      "Batch AI image generation",
      "Social media ready formats",
      "Marketing campaign visuals"
    ],
    "screenshot": "https://wordtoimage.com/app-screenshot.jpg",
    "video": "https://wordtoimage.com/demo-video.mp4"
  };

  return (
    <PageSEO
      title="WordToImage – AI Text-to-Image Generator"
      description="Create stunning AI-generated images from text descriptions. Fast, easy, and high-quality results."
      keywords="AI image generator, text to image, AI art generator, image creation, artificial intelligence"
      structuredData={structuredData}
      aiKeywords={[
        'AI text-to-image generator',
        'create images from text',
        'AI art creation tool',
        'artificial intelligence image maker'
      ]}
      voiceSearchQueries={[
        'how to create AI images from text',
        'best AI image generator',
        'text to image AI tool'
      ]}
    />
  );
};
