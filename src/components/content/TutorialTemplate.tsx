import { Helmet } from 'react-helmet-async';
import { Clock, BarChart3, CheckCircle } from 'lucide-react';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { InternalLink } from '@/components/seo/InternalLink';
import { SafeHTML } from '@/components/SafeHTML';

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
}

interface TutorialProps {
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: TutorialStep[];
  slug: string;
  category?: string;
}

export const TutorialTemplate = ({
  title,
  description,
  duration,
  level,
  steps,
  slug,
  category = "AI Tutorial"
}: TutorialProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "totalTime": duration,
    "supply": ["Computer", "Internet connection", "WordToImage account"],
    "tool": ["WordToImage AI Generator"],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.content,
      ...(step.image && { "image": step.image })
    })),
    "author": {
      "@type": "Organization",
      "name": "WordToImage"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WordToImage",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wordtoimage.com/logo.png"
      }
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>{title} | WordToImage Tutorials</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`AI tutorial, ${title.toLowerCase()}, how to, step by step, ${level.toLowerCase()}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://wordtoimage.com/tutorials/${slug}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <ContentBreadcrumbs />
        
        <header className="mb-8">
          <div className="mb-4">
            <InternalLink to="/tutorials" className="text-sm font-medium">
              ← Back to Tutorials
            </InternalLink>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(level)}`}>
                {level}
              </span>
            </div>
          </div>
        </header>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Step-by-Step Guide</h2>
          {steps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-ai-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              </div>
              
              {step.image && (
                <div className="mb-4">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              
              <SafeHTML html={step.content} className="prose max-w-none" />
            </div>
          ))}
        </div>

        <RelatedContent currentPath="/tutorials" className="mt-12" />
      </article>
    </>
  );
};
