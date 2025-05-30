
import { Helmet } from 'react-helmet-async';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object;
  aiKeywords?: string[];
  voiceSearchQueries?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const PageSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://wordtoimage.com/og-image-default.jpg",
  ogType = "website",
  noindex = false,
  structuredData,
  aiKeywords = [],
  voiceSearchQueries = [],
  author,
  publishedTime,
  modifiedTime
}: PageSEOProps) => {
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Enhanced AI-focused keywords
  const baseAiKeywords = [
    'AI image generator',
    'text to image AI', 
    'AI art generator',
    'artificial intelligence image creation',
    'machine learning art'
  ];
  
  const combinedKeywords = [
    ...(keywords ? keywords.split(', ') : []),
    ...baseAiKeywords,
    ...aiKeywords
  ].join(', ');

  // Enhanced structured data with better organization context
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": currentUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "WordToImage",
      "url": "https://wordtoimage.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://wordtoimage.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "WordToImage",
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
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "WordToImage AI Generator",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {combinedKeywords && <meta name="keywords" content={combinedKeywords} />}
      
      {/* Enhanced meta tags for better SEO */}
      <meta name="language" content="en" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Author and publication info */}
      {author && <meta name="author" content={author} />}
      {publishedTime && <meta name="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta name="article:modified_time" content={modifiedTime} />}
      
      {/* Voice search optimization */}
      {voiceSearchQueries.length > 0 && (
        <meta name="voice-search-queries" content={voiceSearchQueries.join(', ')} />
      )}
      
      {/* Robots and indexing */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      
      {/* Enhanced meta tags for AI context */}
      <meta name="category" content="Artificial Intelligence, Digital Art, Creative Tools" />
      <meta name="application-name" content="WordToImage AI Generator" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Enhanced Open Graph with additional properties */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="WordToImage - AI Image Generator" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wordtoimage" />
      <meta name="twitter:creator" content="@wordtoimage" />
      
      {/* Additional social meta */}
      <meta property="fb:app_id" content="your_facebook_app_id" />
      
      {/* Performance and loading optimization hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.openai.com" />
      
      {/* Additional AI-focused meta */}
      <meta name="subject" content="AI Image Generation and Digital Art Creation" />
      <meta name="topic" content="Artificial Intelligence, Machine Learning, Creative Technology" />
      <meta name="coverage" content="worldwide" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};
