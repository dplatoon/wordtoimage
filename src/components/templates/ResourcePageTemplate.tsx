
import React from 'react';
import { Nav } from '@/components/Nav';
import { ModernFooter } from '@/components/home/ModernFooter';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { ContentNavigation } from '@/components/seo/ContentNavigation';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { PageSEO } from '@/components/seo/PageSEO';
import { ReadingProgress } from '@/components/content/ReadingProgress';
import { BetaBanner } from '@/components/BetaBanner';
import { useState, useEffect } from 'react';

interface ResourcePageTemplateProps {
  title: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  aiKeywords?: string[];
  voiceSearchQueries?: string[];
  children: React.ReactNode;
  currentPath: string;
  showContentNavigation?: boolean;
  showRelatedContent?: boolean;
  heroImage?: string;
  badge?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const ResourcePageTemplate: React.FC<ResourcePageTemplateProps> = ({
  title,
  description,
  seoTitle,
  seoDescription,
  keywords,
  aiKeywords,
  voiceSearchQueries,
  children,
  currentPath,
  showContentNavigation = true,
  showRelatedContent = true,
  heroImage,
  badge,
  author,
  publishedTime,
  modifiedTime
}) => {
  const [showBetaBanner, setShowBetaBanner] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem('betaBannerDismissed') === 'true';
    if (isDismissed) {
      setShowBetaBanner(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title={seoTitle || `${title} | WordToImage`}
        description={seoDescription || description}
        keywords={keywords}
        aiKeywords={aiKeywords}
        voiceSearchQueries={voiceSearchQueries}
        author={author}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
      />
      
      <ReadingProgress target="main" />
      <BetaBanner />
      
      {/* Enhanced header with proper landmarks */}
      <header role="banner" aria-label="Site header">
        <Nav />
      </header>
      
      {/* Unified spacing logic across all pages */}
      <div className={`transition-all duration-300 ${showBetaBanner ? 'pt-[106px]' : 'pt-16'}`}>
        <main 
          id="main-content" 
          className="flex-grow"
          role="main"
          aria-label="Main content"
          tabIndex={-1}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Enhanced breadcrumbs with proper ARIA */}
            <nav aria-label="Breadcrumb navigation" role="navigation">
              <ContentBreadcrumbs />
            </nav>
            
            {/* Hero Section with improved accessibility */}
            <section 
              className="text-center mb-10"
              aria-labelledby="page-title"
              role="banner"
            >
              {badge && (
                <div className="mb-4">
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    role="status"
                    aria-label={`Page category: ${badge}`}
                  >
                    {badge}
                  </span>
                </div>
              )}
              <h1 
                id="page-title"
                className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-6 leading-tight"
                tabIndex={-1}
              >
                {title}
              </h1>
              <p 
                className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
                aria-describedby="page-title"
              >
                {description}
              </p>
              {heroImage && (
                <figure className="max-w-4xl mx-auto mb-8">
                  <img
                    src={heroImage}
                    alt={`Illustration for ${title}`}
                    className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )}
            </section>
            
            {/* Enhanced content navigation with accessibility */}
            {showContentNavigation && (
              <aside 
                aria-label="Page navigation"
                role="complementary"
                className="mb-8"
              >
                <ContentNavigation />
              </aside>
            )}
            
            {/* Main Content with improved structure */}
            <section 
              className="mb-12"
              aria-label="Main page content"
              role="region"
            >
              {children}
            </section>
            
            {/* Enhanced related content with accessibility */}
            {showRelatedContent && (
              <aside 
                aria-label="Related content and suggestions"
                role="complementary"
              >
                <RelatedContent currentPath={currentPath} />
              </aside>
            )}
          </div>
        </main>
      </div>
      
      {/* Enhanced footer with proper landmark */}
      <footer role="contentinfo" aria-label="Site footer">
        <ModernFooter />
      </footer>
    </div>
  );
};
