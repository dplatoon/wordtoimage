
import { PageSEO } from '@/components/seo/PageSEO';

export const SeoHead = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://wordtoimage.com/#website",
        "url": "https://wordtoimage.com",
        "name": "WordToImage - AI Image Generator",
        "description": "Create stunning AI-generated images from text descriptions. Fast, easy, and high-quality results.",
        "publisher": {
          "@id": "https://wordtoimage.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://wordtoimage.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://wordtoimage.com/#organization",
        "name": "WordToImage",
        "url": "https://wordtoimage.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wordtoimage.com/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/wordtoimage",
          "https://github.com/wordtoimage"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://wordtoimage.com/#softwareapplication",
        "name": "WordToImage - AI Image Generator",
        "description": "Create stunning AI-generated images from text descriptions. Fast, easy, and high-quality results with 50+ artistic styles.",
        "url": "https://wordtoimage.com",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript. Compatible with Chrome, Firefox, Safari, Edge.",
        "softwareVersion": "2.0",
        "datePublished": "2024-01-01",
        "dateModified": "2025-01-01",
        "keywords": "AI image generator, text to image AI, AI art generator, artificial intelligence image creation, machine learning art, AI-powered visual content, automated image generation, free AI image maker, online AI art tool, AI graphics generator, text-to-image converter, AI illustration generator, digital art AI, AI design tool, smart image creation",
        "author": {
          "@id": "https://wordtoimage.com/#organization"
        },
        "publisher": {
          "@id": "https://wordtoimage.com/#organization"
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Free Plan",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free AI image generation with daily credits",
            "category": "Free",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01"
          },
          {
            "@type": "Offer",
            "name": "Pro Plan",
            "price": "9.99",
            "priceCurrency": "USD",
            "description": "Pro plan with unlimited AI image generations and advanced features",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "9.99",
              "priceCurrency": "USD",
              "billingDuration": "P1M",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitCode": "MON"
              }
            },
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01"
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
        "video": "https://wordtoimage.com/demo-video.mp4",
        "installUrl": "https://wordtoimage.com",
        "memoryRequirements": "512MB",
        "storageRequirements": "100MB"
      },
      {
        "@type": "FAQPage",
        "@id": "https://wordtoimage.com/#faqpage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is WordToImage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WordToImage is an AI-powered tool that creates stunning images from text descriptions using advanced machine learning algorithms."
            }
          },
          {
            "@type": "Question", 
            "name": "Is WordToImage free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, WordToImage offers a free plan with daily credits for AI image generation. Pro plans are available for unlimited usage."
            }
          },
          {
            "@type": "Question",
            "name": "What image formats are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WordToImage supports popular formats including PNG, JPEG, and WebP with resolutions up to 4K."
            }
          }
        ]
      }
    ]
  };

  return (
    <PageSEO
      title="WordToImage – AI Text-to-Image Generator"
      description="Create stunning AI-generated images from text descriptions. Fast, easy, and high-quality results with 50+ artistic styles. Free to start, no design skills required."
      keywords="AI image generator, text to image, AI art generator, image creation, artificial intelligence, free AI tool"
      structuredData={structuredData}
      aiKeywords={[
        'AI text-to-image generator',
        'create images from text',
        'AI art creation tool',
        'artificial intelligence image maker',
        'free AI image generator',
        'text to visual converter',
        'AI powered design tool'
      ]}
      voiceSearchQueries={[
        'how to create AI images from text',
        'best AI image generator',
        'text to image AI tool',
        'free AI art generator online',
        'AI image maker for beginners'
      ]}
    />
  );
};
