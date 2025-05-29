
import { Helmet } from 'react-helmet-async';

interface OptimizedSeoHeadProps {
  page?: 'home' | 'features' | 'pricing' | 'contact';
  title?: string;
  description?: string;
}

export const OptimizedSeoHead = ({ 
  page = 'home', 
  title, 
  description 
}: OptimizedSeoHeadProps) => {
  const pageData = {
    home: {
      title: title || "WordToImage - AI Image Generator | Create Stunning AI Art from Text",
      description: description || "Transform text into stunning AI-generated images instantly. Best free AI art generator with 50+ styles. Create professional images for social media and marketing in seconds.",
      keywords: "AI image generator, text to image AI, AI art generator, free AI image maker, create AI images from text, AI graphics generator, text-to-image converter"
    },
    features: {
      title: title || "Features - WordToImage AI Image Generator",
      description: description || "Discover WordToImage's powerful AI features: 50+ artistic styles, 4K resolution, instant generation, and commercial usage rights. Create professional AI art effortlessly.",
      keywords: "AI image features, text to image capabilities, AI art styles, 4K AI images, AI image customization, professional AI graphics"
    },
    pricing: {
      title: title || "Pricing Plans - WordToImage AI Generator",
      description: description || "Choose the perfect plan for your AI image generation needs. Free tier available. Pro plans start at $9.99/month with unlimited generations and premium features.",
      keywords: "AI image generator pricing, subscription plans, free AI art generator, pro AI image plans, AI graphics pricing"
    },
    contact: {
      title: title || "Contact Us - WordToImage Support",
      description: description || "Get in touch with the WordToImage team. Contact us for support, partnerships, or questions about our AI image generation platform.",
      keywords: "contact WordToImage, AI image generator support, customer service, technical support"
    }
  };

  const currentPage = pageData[page];
  const canonicalUrl = `https://wordtoimage.com${page === 'home' ? '' : `/${page}`}`;

  return (
    <Helmet>
      {/* Essential Meta Tags */}
      <title>{currentPage.title}</title>
      <meta name="description" content={currentPage.description} />
      <meta name="keywords" content={currentPage.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      
      {/* SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="author" content="WordToImage" />
      <meta name="language" content="English" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={currentPage.title} />
      <meta property="og:description" content={currentPage.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="WordToImage" />
      <meta property="og:image" content="https://wordtoimage.com/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="WordToImage AI art generator interface" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentPage.title} />
      <meta name="twitter:description" content={currentPage.description} />
      <meta name="twitter:image" content="https://wordtoimage.com/twitter-card.jpg" />
      <meta name="twitter:site" content="@wordtoimage" />
      
      {/* Structured Data for Homepage */}
      {page === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "WordToImage",
            "description": "AI-powered text-to-image generator",
            "url": "https://wordtoimage.com",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Free AI image generation"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1250"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};
