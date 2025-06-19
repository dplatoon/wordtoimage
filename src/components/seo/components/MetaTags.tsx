
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  noindex?: boolean;
  hreflang?: { [key: string]: string };
}

export const MetaTags = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  noindex,
  hreflang
}: MetaTagsProps) => {
  // Ensure canonical URL doesn't have trailing slash (except for root)
  const normalizedCanonical = canonicalUrl === 'https://wordtoimage.com/' 
    ? canonicalUrl 
    : canonicalUrl.replace(/\/$/, '');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Essential SEO tags for proper indexing */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="bingbot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL - Critical for preventing duplicate content */}
      <link rel="canonical" href={normalizedCanonical} />
      
      {/* Prevent soft 404s with proper status indication */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Open Graph with absolute URLs */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={normalizedCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WordToImage - AI Image Generator" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@wordtoimage" />
      <meta name="twitter:creator" content="@wordtoimage" />
      
      {/* Additional indexing signals */}
      <meta name="author" content="WordToImage" />
      <meta name="publisher" content="WordToImage" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Prevent redirect chains */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      
      {/* Hreflang for internationalization */}
      {hreflang && Object.entries(hreflang).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Self-referencing hreflang */}
      <link rel="alternate" hrefLang="en" href={normalizedCanonical} />
      <link rel="alternate" hrefLang="x-default" href={normalizedCanonical} />
    </Helmet>
  );
};
