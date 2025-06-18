
import { useLocation } from 'react-router-dom';
import { PAGE_SEO_CONFIG, type SEOPageConfig } from './config/pageSEOConfig';
import { MetaTags } from './components/MetaTags';
import { StructuredData } from './components/StructuredData';
import { PreconnectLinks } from './components/PreconnectLinks';

interface SEOManagerProps {
  customConfig?: Partial<SEOPageConfig>;
}

export const SEOManager = ({ customConfig }: SEOManagerProps) => {
  const location = useLocation();
  const pageConfig = PAGE_SEO_CONFIG[location.pathname] || PAGE_SEO_CONFIG['/'];
  const finalConfig = { ...pageConfig, ...customConfig };

  // Ensure canonical URL is always set and properly formatted
  const canonicalUrl = finalConfig.canonical || `https://wordtoimage.com${location.pathname}`;

  return (
    <>
      <MetaTags
        title={finalConfig.title}
        description={finalConfig.description}
        keywords={finalConfig.keywords}
        canonicalUrl={canonicalUrl}
        ogImage={finalConfig.ogImage || 'https://wordtoimage.com/og-default.jpg'}
        noindex={finalConfig.noindex}
        hreflang={finalConfig.hreflang}
      />
      
      {finalConfig.structuredData && (
        <StructuredData data={finalConfig.structuredData} />
      )}
      
      <PreconnectLinks />
    </>
  );
};
