
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
  badge
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
      />
      
      <ReadingProgress target="main" />
      <BetaBanner />
      
      <header>
        <Nav />
      </header>
      
      {/* Unified spacing logic across all pages */}
      <div className={`transition-all duration-300 ${showBetaBanner ? 'pt-[106px]' : 'pt-16'}`}>
        <main id="main-content" className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ContentBreadcrumbs />
            
            {/* Hero Section with improved mobile layout */}
            <div className="text-center mb-10">
              {badge && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {badge}
                  </span>
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                {description}
              </p>
              {heroImage && (
                <div className="max-w-4xl mx-auto mb-8">
                  <img
                    src={heroImage}
                    alt={title}
                    className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
            
            {showContentNavigation && <ContentNavigation />}
            
            {/* Main Content with improved spacing */}
            <div className="mb-12">
              {children}
            </div>
            
            {showRelatedContent && <RelatedContent currentPath={currentPath} />}
          </div>
        </main>
      </div>
      
      <footer>
        <ModernFooter />
      </footer>
    </div>
  );
};
