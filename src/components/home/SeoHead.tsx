
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
    "offers": [
      {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free plan with daily image generations"
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
      "reviewCount": "1250"
    },
    "creator": {
      "@type": "Organization",
      "name": "WordToImage",
      "url": "https://wordtoimage.com"
    }
  };

  return (
    <Helmet>
      <title>WordToImage - AI Text to Image Generator | Create Stunning Visuals from Text</title>
      <meta 
        name="description" 
        content="Transform text into stunning AI-generated images in seconds. Create professional visuals for social media, marketing, and creative projects. Free to try, no design skills required." 
      />
      <meta 
        name="keywords" 
        content="AI image generator, text to image, AI art generator, create images from text, social media graphics, AI artwork, digital art generator, free AI image creation" 
      />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://wordtoimage.com/" />
      <meta property="og:title" content="WordToImage - AI Text to Image Generator" />
      <meta property="og:description" content="Transform text into stunning AI-generated images in seconds. Create professional visuals for social media, marketing, and creative projects." />
      <meta property="og:image" content="https://wordtoimage.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://wordtoimage.com/" />
      <meta property="twitter:title" content="WordToImage - AI Text to Image Generator" />
      <meta property="twitter:description" content="Transform text into stunning AI-generated images in seconds. Create professional visuals for social media, marketing, and creative projects." />
      <meta property="twitter:image" content="https://wordtoimage.com/og-image.jpg" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="WordToImage" />
      <link rel="canonical" href="https://wordtoimage.com/" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
