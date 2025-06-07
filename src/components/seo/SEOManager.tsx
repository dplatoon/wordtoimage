
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOPageConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData?: object;
  canonical?: string;
  noindex?: boolean;
  hreflang?: { [key: string]: string };
}

const PAGE_SEO_CONFIG: Record<string, SEOPageConfig> = {
  '/': {
    title: 'WordToImage - Best AI Image Generator | Create Stunning AI Art from Text in 2025',
    description: 'Transform text into stunning AI-generated images instantly. Best AI art generator for social media, marketing, and creative projects. Free AI image maker with 50+ styles.',
    keywords: ['AI image generator', 'text to image AI', 'AI art generator', 'artificial intelligence image creation', 'machine learning art', 'free AI image maker'],
    ogImage: 'https://wordtoimage.com/og-home.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "WordToImage - AI Image Generator",
      "description": "AI-powered text-to-image generator",
      "url": "https://wordtoimage.com",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser"
    }
  },
  '/text-to-image': {
    title: 'AI Text to Image Generator - Create Images from Text | WordToImage',
    description: 'Generate high-quality images from text descriptions using advanced AI. Create artwork, social media content, and marketing visuals instantly.',
    keywords: ['text to image generator', 'AI image creation', 'text to art', 'prompt to image', 'AI visual generator'],
    ogImage: 'https://wordtoimage.com/og-generator.jpg'
  },
  '/features': {
    title: 'AI Image Generator Features - Advanced Text to Image Technology | WordToImage',
    description: 'Explore powerful AI image generation features: 50+ styles, 4K resolution, batch generation, commercial rights, and more. See what makes WordToImage the best AI art tool.',
    keywords: ['AI image features', 'text to image capabilities', 'AI art tools', 'image generation technology'],
    ogImage: 'https://wordtoimage.com/og-features.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "WordToImage Features",
      "description": "AI Image Generation Features",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "50+ Art Styles",
          "description": "Wide variety of artistic styles for image generation"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "4K Resolution",
          "description": "High-quality image output up to 4K resolution"
        }
      ]
    }
  },
  '/pricing': {
    title: 'AI Image Generator Pricing - Free & Pro Plans | WordToImage',
    description: 'Affordable AI image generation pricing. Start free with daily credits or upgrade to Pro for unlimited generations. Commercial use included.',
    keywords: ['AI image generator pricing', 'text to image cost', 'AI art subscription', 'image generation plans'],
    ogImage: 'https://wordtoimage.com/og-pricing.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "WordToImage Pro",
      "description": "Professional AI image generation service",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Plan",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free daily AI image generations"
        },
        {
          "@type": "Offer",
          "name": "Pro Plan", 
          "price": "9.99",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "9.99",
            "priceCurrency": "USD",
            "billingDuration": "P1M"
          },
          "description": "Unlimited AI image generations with advanced features"
        }
      ]
    }
  },
  '/blog': {
    title: 'AI Art Blog - Latest Tips, Tutorials & News | WordToImage',
    description: 'Learn AI art techniques, discover prompting tips, and stay updated with the latest AI image generation trends and tutorials.',
    keywords: ['AI art blog', 'AI image tutorials', 'text to image tips', 'AI art news', 'prompting techniques'],
    ogImage: 'https://wordtoimage.com/og-blog.jpg'
  },
  '/tutorials': {
    title: 'AI Image Generation Tutorials - Step-by-Step Guides | WordToImage',
    description: 'Master AI image generation with our comprehensive tutorials. Learn prompting techniques, style selection, and advanced AI art creation methods.',
    keywords: ['AI image tutorials', 'text to image guide', 'AI art tutorials', 'prompting guide', 'AI image how-to'],
    ogImage: 'https://wordtoimage.com/og-tutorials.jpg'
  },
  '/design-tips': {
    title: 'AI Art Design Tips - Professional Visual Creation Guide | WordToImage',
    description: 'Professional design tips for AI-generated images. Learn composition, color theory, and visual principles for stunning AI artwork.',
    keywords: ['AI art design tips', 'AI image composition', 'visual design AI', 'AI art principles', 'design with AI'],
    ogImage: 'https://wordtoimage.com/og-design-tips.jpg'
  }
};

interface SEOManagerProps {
  customConfig?: Partial<SEOPageConfig>;
}

export const SEOManager = ({ customConfig }: SEOManagerProps) => {
  const location = useLocation();
  const pageConfig = PAGE_SEO_CONFIG[location.pathname] || PAGE_SEO_CONFIG['/'];
  const finalConfig = { ...pageConfig, ...customConfig };

  return (
    <Helmet>
      <title>{finalConfig.title}</title>
      <meta name="description" content={finalConfig.description} />
      <meta name="keywords" content={finalConfig.keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://wordtoimage.com${location.pathname}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalConfig.title} />
      <meta property="og:description" content={finalConfig.description} />
      <meta property="og:url" content={`https://wordtoimage.com${location.pathname}`} />
      <meta property="og:image" content={finalConfig.ogImage || 'https://wordtoimage.com/og-default.jpg'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WordToImage - AI Image Generator" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalConfig.title} />
      <meta name="twitter:description" content={finalConfig.description} />
      <meta name="twitter:image" content={finalConfig.ogImage || 'https://wordtoimage.com/og-default.jpg'} />
      
      {/* Robots */}
      <meta name="robots" content={finalConfig.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      
      {/* Hreflang for internationalization */}
      {finalConfig.hreflang && Object.entries(finalConfig.hreflang).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Structured Data */}
      {finalConfig.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalConfig.structuredData)}
        </script>
      )}
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//api.wordtoimage.com" />
      <link rel="dns-prefetch" href="//cdn.wordtoimage.com" />
    </Helmet>
  );
};
