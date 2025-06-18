
import { Helmet } from 'react-helmet-async';

interface EnhancedSchemaMarkupProps {
  type: 'homepage' | 'product' | 'service' | 'gallery' | 'tutorial' | 'blog';
  pageData?: {
    title?: string;
    description?: string;
    url?: string;
    images?: string[];
    datePublished?: string;
    dateModified?: string;
    author?: string;
    category?: string;
  };
}

export const EnhancedSchemaMarkup = ({ type, pageData }: EnhancedSchemaMarkupProps) => {
  const generateSchema = () => {
    const baseUrl = 'https://wordtoimage.com';
    const currentUrl = pageData?.url || baseUrl;

    switch (type) {
      case 'homepage':
        return {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "@id": `${baseUrl}/#software`,
              "name": "WordToImage - AI Image Generator",
              "description": "AI-powered text-to-image generator that creates stunning visuals from simple text prompts",
              "url": baseUrl,
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "browserRequirements": "Requires JavaScript. Compatible with Chrome, Firefox, Safari, Edge.",
              "softwareVersion": "2.0",
              "datePublished": "2024-01-01",
              "dateModified": "2025-01-01",
              "author": {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`
              },
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Free AI image generation with daily credits",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "price": "9.99",
                  "priceCurrency": "USD",
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
                "bestRating": "5"
              },
              "featureList": [
                "AI-powered text to image generation",
                "50+ artistic styles and formats",
                "High-resolution 4K image output",
                "Instant AI image generation",
                "Commercial use rights included"
              ]
            },
            {
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`,
              "name": "WordToImage",
              "url": baseUrl,
              "logo": `${baseUrl}/logo.png`,
              "description": "Leading AI text-to-image generation platform",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "support@wordtoimage.com",
                "availableLanguage": ["English"]
              },
              "sameAs": [
                "https://twitter.com/wordtoimage",
                "https://facebook.com/wordtoimage",
                "https://linkedin.com/company/wordtoimage"
              ]
            },
            {
              "@type": "WebSite",
              "@id": `${baseUrl}/#website`,
              "url": baseUrl,
              "name": "WordToImage",
              "description": "AI Image Generator - Create Stunning AI Art from Text",
              "publisher": {
                "@id": `${baseUrl}/#organization`
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            }
          ]
        };

      case 'gallery':
        return {
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": pageData?.title || "AI Art Style Gallery",
          "description": pageData?.description || "Browse AI-generated art styles and templates",
          "url": currentUrl,
          "creator": {
            "@type": "Organization",
            "name": "WordToImage"
          },
          "image": pageData?.images || [],
          "numberOfItems": pageData?.images?.length || 0,
          "about": {
            "@type": "Thing",
            "name": "AI Art Generation",
            "description": "Artificial Intelligence powered image creation"
          }
        };

      case 'tutorial':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": pageData?.title || "How to Generate AI Images",
          "description": pageData?.description || "Step-by-step guide to creating AI images",
          "url": currentUrl,
          "datePublished": pageData?.datePublished,
          "dateModified": pageData?.dateModified,
          "author": {
            "@type": "Organization",
            "name": "WordToImage"
          },
          "step": [
            {
              "@type": "HowToStep",
              "name": "Enter Your Text Prompt",
              "text": "Describe what you want to see in your image using clear, descriptive language"
            },
            {
              "@type": "HowToStep", 
              "name": "Select Art Style",
              "text": "Choose from 50+ artistic styles including anime, realistic, abstract, and more"
            },
            {
              "@type": "HowToStep",
              "name": "Generate Image",
              "text": "Click generate and watch AI create your unique image in seconds"
            }
          ],
          "totalTime": "PT1M",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Text description of desired image"
            }
          ]
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "AI Image Generation",
          "name": "Professional AI Image Generation Service",
          "description": "Create high-quality images from text using advanced AI technology",
          "url": currentUrl,
          "provider": {
            "@type": "Organization",
            "name": "WordToImage"
          },
          "areaServed": "Worldwide",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": baseUrl,
            "serviceType": "Online"
          },
          "category": "Digital Art Creation",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free tier available with paid upgrades"
          }
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
