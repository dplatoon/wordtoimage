import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const TechnicalSEOManager = () => {
  const location = useLocation();
  
  // Normalize pathname to handle trailing slashes
  const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
  const canonicalUrl = `https://wordtoimage.online${normalizedPath}`;

  return (
    <Helmet>
      {/* Canonical URL - Critical for preventing duplicate content */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Prevent duplicate content from trailing slashes */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Enhanced crawling directives */}
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Prevent soft 404s with proper status indication */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Additional technical SEO meta tags */}
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      
      {/* Prevent redirect chains */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      
      {/* Site verification tags (add your actual verification codes) */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      
      {/* Structured data for sitemap */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "WordToImage - AI Image Generator",
          "url": "https://wordtoimage.online",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://wordtoimage.online/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://twitter.com/wordtoimage",
            "https://facebook.com/wordtoimage",
            "https://linkedin.com/company/wordtoimage"
          ]
        })}
      </script>
    </Helmet>
  );
};
