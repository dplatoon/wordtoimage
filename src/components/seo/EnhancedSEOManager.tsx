
import { useLocation } from 'react-router-dom';
import { PAGE_SEO_CONFIG, type SEOPageConfig } from './config/pageSEOConfig';
import { MetaTags } from './components/MetaTags';
import { StructuredData } from './components/StructuredData';
import { PreconnectLinks } from './components/PreconnectLinks';
import { TechnicalSEOManager } from './TechnicalSEOManager';

interface EnhancedSEOManagerProps {
  customConfig?: Partial<SEOPageConfig>;
  pageContent?: {
    h1?: string;
    h2Headings?: string[];
  };
}

export const EnhancedSEOManager = ({ customConfig, pageContent }: EnhancedSEOManagerProps) => {
  const location = useLocation();
  
  // Normalize pathname to handle trailing slashes
  const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
  
  const pageConfig = PAGE_SEO_CONFIG[normalizedPath] || PAGE_SEO_CONFIG['/'];
  const finalConfig = { ...pageConfig, ...customConfig };

  // Merge page content with config
  const headingStructure = {
    h1: pageContent?.h1 || finalConfig.h1,
    h2Headings: pageContent?.h2Headings || finalConfig.h2Headings || []
  };

  // Ensure canonical URL is always set and properly formatted without trailing slash
  const canonicalUrl = finalConfig.canonical || `https://wordtoimage.com${normalizedPath}`;

  return (
    <>
      <TechnicalSEOManager />
      
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

      {/* Inject heading structure data for components to use */}
      <script type="application/json" id="seo-heading-structure">
        {JSON.stringify(headingStructure)}
      </script>
    </>
  );
};
