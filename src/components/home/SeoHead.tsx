
import { Helmet } from 'react-helmet-async';

export const SeoHead = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WordToImage",
    "description": "AI-powered text-to-image generator that creates stunning visuals from simple text prompts. Generate high-quality images for social media, marketing, and creative projects.",
    "url": "https://wordtoimage.com",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "browserRequirements": "Requires JavaScript. Compatible with Chrome, Firefox, Safari, Edge.",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
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
        "description": "Free plan with daily image generations",
        "category": "Free"
      },
      {
        "@type": "Offer",
        "price": "9.99",
        "priceCurrency": "USD",
        "description": "Pro plan with unlimited generations",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "9.99",
          "priceCurrency": "USD",
          "billingDuration": "P1M"
        }
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
      "Multiple art styles and formats",
      "High-resolution image output",
      "Instant generation",
      "No design skills required",
      "Commercial use allowed"
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WordToImage",
    "url": "https://wordtoimage.com",
    "logo": "https://wordtoimage.com/logo.png",
    "description": "Leading AI text-to-image generation platform",
    "sameAs": [
      "https://twitter.com/wordtoimage",
      "https://facebook.com/wordtoimage",
      "https://linkedin.com/company/wordtoimage"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "Customer Service",
      "email": "support@wordtoimage.com",
      "availableLanguage": "English"
    }
  };

  return (
    <Helmet>
      {/* Enhanced Primary Meta Tags */}
      <title>WordToImage - AI Text to Image Generator | Create Stunning Visuals from Text</title>
      <meta 
        name="description" 
        content="Transform text into stunning AI-generated images in seconds. Create professional visuals for social media, marketing, and creative projects. Free to try, no design skills required." 
      />
      <meta 
        name="keywords" 
        content="AI image generator, text to image, AI art generator, create images from text, social media graphics, AI artwork, digital art generator, free AI image creation, artificial intelligence, machine learning, visual content creation" 
      />
      
      {/* Enhanced SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="author" content="WordToImage Team" />
      <meta name="publisher" content="WordToImage" />
      <meta name="copyright" content="© 2025 WordToImage. All rights reserved." />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <link rel="canonical" href="https://wordtoimage.com/" />
      
      {/* Enhanced Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WordToImage" />
      <meta property="og:url" content="https://wordtoimage.com/" />
      <meta property="og:title" content="WordToImage - AI Text to Image Generator | Create Stunning Visuals" />
      <meta property="og:description" content="Transform text into stunning AI-generated images in seconds. Create professional visuals for social media, marketing, and creative projects. Free to try!" />
      <meta property="og:image" content="https://wordtoimage.com/og-image-homepage.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="WordToImage AI text-to-image generator interface showing text input and generated artwork" />
      <meta property="og:locale" content="en_US" />

      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wordtoimage" />
      <meta name="twitter:creator" content="@wordtoimage" />
      <meta name="twitter:url" content="https://wordtoimage.com/" />
      <meta name="twitter:title" content="WordToImage - AI Text to Image Generator" />
      <meta name="twitter:description" content="Transform text into stunning AI-generated images in seconds. Create professional visuals for social media, marketing, and creative projects." />
      <meta name="twitter:image" content="https://wordtoimage.com/twitter-card-image.jpg" />
      <meta name="twitter:image:alt" content="WordToImage AI generator creating beautiful artwork from text prompts" />

      {/* Additional Social Media Tags */}
      <meta property="article:publisher" content="https://facebook.com/wordtoimage" />
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* Technical SEO */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="WordToImage" />
      
      {/* Enhanced Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  );
};
