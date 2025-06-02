
import { Helmet } from 'react-helmet-async';

export const SeoHead = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WordToImage - AI Image Generator",
    "description": "AI-powered text-to-image generator that creates stunning visuals from simple text prompts. Generate high-quality images for social media, marketing, and creative projects with artificial intelligence.",
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

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WordToImage",
    "url": "https://wordtoimage.com",
    "logo": "https://wordtoimage.com/logo.png",
    "description": "Leading AI text-to-image generation platform powered by advanced machine learning algorithms",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/wordtoimage",
      "https://facebook.com/wordtoimage", 
      "https://linkedin.com/company/wordtoimage",
      "https://instagram.com/wordtoimage"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "Customer Service",
      "email": "support@wordtoimage.com",
      "availableLanguage": ["English"],
      "areaServed": "Worldwide"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning", 
      "Computer Vision",
      "Digital Art Creation",
      "Text-to-Image Technology",
      "Generative AI",
      "Creative AI Tools"
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AI image generation work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI uses advanced machine learning models trained on millions of images to understand the relationship between text descriptions and visual elements. When you enter a prompt, the AI analyzes your words and generates unique images that match your description using neural networks and diffusion models."
        }
      },
      {
        "@type": "Question", 
        "name": "What is the best AI art generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WordToImage is among the top AI art generators, offering high-quality image generation with 50+ styles, 4K resolution output, and instant results. We provide both free and pro plans with commercial usage rights included."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use AI generated images commercially?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All images generated with WordToImage come with full commercial usage rights. You can use them in business projects, marketing campaigns, products, and any commercial application without additional licensing fees."
        }
      },
      {
        "@type": "Question",
        "name": "How to create AI images from text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply enter a descriptive text prompt into WordToImage, select your preferred style, and click generate. Our AI will create unique images based on your description in seconds. Be specific about details like style, lighting, and composition for best results."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Enhanced Primary Meta Tags with AI Keywords */}
      <title>WordToImage - AI Image Generator | Create Stunning AI Art from Text in 2025</title>
      <meta 
        name="description" 
        content="Transform text into stunning AI-generated images instantly. Best AI art generator for social media, marketing, and creative projects. Free AI image maker with 50+ styles. Create AI art from text prompts in seconds." 
      />
      <meta 
        name="keywords" 
        content="AI image generator, text to image AI, AI art generator, artificial intelligence image creation, machine learning art, create AI images from text, best AI art generator 2025, free AI image maker, AI graphics generator, text-to-image converter, AI illustration generator, generate AI images for Instagram, AI images for marketing campaigns, AI art prompts for designers, create ad images with AI, AI product image generator, AI visuals for digital marketing, AI graphic design tool, AI logo creation tool, AI images for blog posts, how to create images with AI, what are the best AI art prompts, how can I generate AI images, AI art creation tool online" 
      />
      
      {/* Enhanced SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="author" content="WordToImage AI Team" />
      <meta name="publisher" content="WordToImage" />
      <meta name="copyright" content="© 2025 WordToImage. All rights reserved." />
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="category" content="Artificial Intelligence, Digital Art, Creative Tools" />
      <link rel="canonical" href="https://wordtoimage.com/" />
      
      {/* Enhanced Open Graph / Facebook with AI Focus */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WordToImage - AI Image Generator" />
      <meta property="og:url" content="https://wordtoimage.com/" />
      <meta property="og:title" content="WordToImage - Best AI Image Generator | Create AI Art from Text" />
      <meta property="og:description" content="Transform text into stunning AI-generated images instantly. The best AI art generator for creators, marketers, and designers. Free to try with 50+ artistic styles!" />
      <meta property="og:image" content="https://wordtoimage.com/og-image-ai-generator.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="WordToImage AI art generator interface showing text prompt converting to beautiful AI-generated artwork" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content="2025-01-01T00:00:00Z" />

      {/* Enhanced Twitter Card with AI Keywords */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wordtoimage" />
      <meta name="twitter:creator" content="@wordtoimage" />
      <meta name="twitter:url" content="https://wordtoimage.com/" />
      <meta name="twitter:title" content="WordToImage - AI Image Generator | Create AI Art from Text" />
      <meta name="twitter:description" content="Best AI image generator for 2025. Transform text prompts into stunning AI art instantly. Free AI image maker with commercial rights included." />
      <meta name="twitter:image" content="https://wordtoimage.com/twitter-ai-generator.jpg" />
      <meta name="twitter:image:alt" content="AI-powered text-to-image generator creating beautiful artwork from simple text descriptions" />

      {/* Voice Search & Additional Social Meta */}
      <meta property="article:publisher" content="https://facebook.com/wordtoimage" />
      <meta name="pinterest-rich-pin" content="true" />
      <meta name="apple-mobile-web-app-title" content="WordToImage AI" />
      
      {/* Technical SEO */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Enhanced Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
    </Helmet>
  );
};
