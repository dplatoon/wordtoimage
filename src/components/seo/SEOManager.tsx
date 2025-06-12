
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
  '/dashboard': {
    title: 'AI Image Dashboard - Manage Your Generated Images | WordToImage',
    description: 'Access your AI-generated image gallery, manage projects, and track your creative journey with WordToImage dashboard.',
    keywords: ['AI image dashboard', 'image gallery', 'AI art management', 'generated images'],
    ogImage: 'https://wordtoimage.com/og-dashboard.jpg'
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
  '/templates': {
    title: 'AI Image Templates - Professional Designs & Styles | WordToImage',
    description: 'Browse professional AI image templates for social media, marketing, and creative projects. Ready-to-use AI art templates with commercial rights.',
    keywords: ['AI image templates', 'AI art templates', 'social media templates', 'marketing templates'],
    ogImage: 'https://wordtoimage.com/og-templates.jpg'
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
  },
  '/help': {
    title: 'Help & Support - AI Image Generator Guide | WordToImage',
    description: 'Get help with AI image generation. Find answers to common questions, troubleshooting guides, and support resources.',
    keywords: ['AI image help', 'support', 'troubleshooting', 'FAQ', 'AI art guide'],
    ogImage: 'https://wordtoimage.com/og-help.jpg'
  },
  '/about': {
    title: 'About WordToImage - Leading AI Image Generation Platform',
    description: 'Learn about WordToImage, the leading AI-powered text-to-image generation platform. Our mission to democratize AI art creation.',
    keywords: ['about WordToImage', 'AI company', 'image generation platform', 'AI art technology'],
    ogImage: 'https://wordtoimage.com/og-about.jpg'
  },
  '/contact': {
    title: 'Contact Us - AI Image Generator Support | WordToImage',
    description: 'Contact WordToImage for support, partnerships, or questions about our AI image generation platform. Get in touch with our team.',
    keywords: ['contact WordToImage', 'AI image support', 'customer service', 'partnerships'],
    ogImage: 'https://wordtoimage.com/og-contact.jpg'
  },
  '/community': {
    title: 'AI Art Community - Share & Discover Amazing Creations | WordToImage',
    description: 'Join the WordToImage community to share AI art, get inspiration, and connect with other AI artists and creators.',
    keywords: ['AI art community', 'AI art gallery', 'share AI images', 'AI artist community'],
    ogImage: 'https://wordtoimage.com/og-community.jpg'
  },
  '/api': {
    title: 'AI Image API Documentation - Developer Resources | WordToImage',
    description: 'Integrate AI image generation into your applications with WordToImage API. Complete documentation, examples, and SDKs.',
    keywords: ['AI image API', 'text to image API', 'developer tools', 'API documentation'],
    ogImage: 'https://wordtoimage.com/og-api.jpg'
  },
  '/updates': {
    title: 'Latest Updates - New AI Features & Improvements | WordToImage',
    description: 'Stay updated with the latest AI image generation features, improvements, and announcements from WordToImage.',
    keywords: ['AI updates', 'new features', 'product updates', 'AI improvements'],
    ogImage: 'https://wordtoimage.com/og-updates.jpg'
  },
  '/careers': {
    title: 'Careers - Join the AI Revolution | WordToImage',
    description: 'Join WordToImage and help build the future of AI image generation. Explore career opportunities in AI, engineering, and design.',
    keywords: ['AI careers', 'jobs', 'AI engineer jobs', 'machine learning careers'],
    ogImage: 'https://wordtoimage.com/og-careers.jpg'
  },
  '/beta': {
    title: 'Beta Features - Early Access to AI Tools | WordToImage',
    description: 'Get early access to cutting-edge AI image generation features. Join our beta program and help shape the future of AI art.',
    keywords: ['AI beta', 'early access', 'beta features', 'AI testing'],
    ogImage: 'https://wordtoimage.com/og-beta.jpg'
  },
  '/beta-landing': {
    title: 'Beta Program - Join Early Access | WordToImage',
    description: 'Sign up for WordToImage beta program and get exclusive access to new AI features before they launch.',
    keywords: ['beta signup', 'early access program', 'AI beta testing', 'exclusive features'],
    ogImage: 'https://wordtoimage.com/og-beta-landing.jpg'
  },
  '/privacy': {
    title: 'Privacy Policy - Data Protection & Privacy | WordToImage',
    description: 'Read WordToImage privacy policy to understand how we protect your data and respect your privacy while using our AI services.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy rights'],
    ogImage: 'https://wordtoimage.com/og-privacy.jpg'
  },
  '/terms': {
    title: 'Terms of Service - Usage Agreement | WordToImage',
    description: 'Review WordToImage terms of service and usage agreement for our AI image generation platform and services.',
    keywords: ['terms of service', 'usage agreement', 'legal terms', 'service terms'],
    ogImage: 'https://wordtoimage.com/og-terms.jpg'
  },
  '/cookies': {
    title: 'Cookie Policy - How We Use Cookies | WordToImage',
    description: 'Learn about how WordToImage uses cookies to improve your experience on our AI image generation platform.',
    keywords: ['cookie policy', 'cookies', 'tracking', 'website cookies'],
    ogImage: 'https://wordtoimage.com/og-cookies.jpg'
  }
};

interface SEOManagerProps {
  customConfig?: Partial<SEOPageConfig>;
}

export const SEOManager = ({ customConfig }: SEOManagerProps) => {
  const location = useLocation();
  const pageConfig = PAGE_SEO_CONFIG[location.pathname] || PAGE_SEO_CONFIG['/'];
  const finalConfig = { ...pageConfig, ...customConfig };

  // Ensure canonical URL is always set and properly formatted
  const canonicalUrl = finalConfig.canonical || `https://wordtoimage.com${location.pathname}`;

  return (
    <Helmet>
      <title>{finalConfig.title}</title>
      <meta name="description" content={finalConfig.description} />
      <meta name="keywords" content={finalConfig.keywords.join(', ')} />
      
      {/* Essential SEO tags */}
      <meta name="robots" content={finalConfig.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL - Critical for indexing */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalConfig.title} />
      <meta property="og:description" content={finalConfig.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalConfig.ogImage || 'https://wordtoimage.com/og-default.jpg'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WordToImage - AI Image Generator" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalConfig.title} />
      <meta name="twitter:description" content={finalConfig.description} />
      <meta name="twitter:image" content={finalConfig.ogImage || 'https://wordtoimage.com/og-default.jpg'} />
      <meta name="twitter:site" content="@wordtoimage" />
      
      {/* Additional indexing hints */}
      <meta name="author" content="WordToImage" />
      <meta name="publisher" content="WordToImage" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
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
