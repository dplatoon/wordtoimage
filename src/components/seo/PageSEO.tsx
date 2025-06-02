
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
  voiceSearchQueries = []
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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {combinedKeywords && <meta name="keywords" content={combinedKeywords} />}
      
      {/* Voice search optimization */}
      {voiceSearchQueries.length > 0 && (
        <meta name="voice-search-queries" content={voiceSearchQueries.join(', ')} />
      )}
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      
      {/* Enhanced meta tags for AI context */}
      <meta name="category" content="Artificial Intelligence, Digital Art, Creative Tools" />
      <meta name="application-name" content="WordToImage AI Generator" />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="WordToImage - AI Image Generator" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wordtoimage" />
      
      {/* Additional AI-focused meta */}
      <meta name="subject" content="AI Image Generation and Digital Art Creation" />
      <meta name="topic" content="Artificial Intelligence, Machine Learning, Creative Technology" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
