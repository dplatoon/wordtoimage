import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { InternalLink } from '@/components/seo/InternalLink';
import { SafeHTML } from '@/components/SafeHTML';

interface BlogPostProps {
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;
  readTime?: string;
  category: string;
  tags?: string[];
  image?: string;
  slug: string;
}

export const BlogPostTemplate = ({
  title,
  excerpt,
  content,
  author,
  publishDate,
  readTime,
  category,
  tags = [],
  image,
  slug
}: BlogPostProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt,
    "author": {
      "@type": "Person",
      "name": author.name
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "image": image || "https://wordtoimage.com/blog-default.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "WordToImage",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wordtoimage.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://wordtoimage.com/blog/${slug}`
    },
    "keywords": tags.join(", "),
    "articleSection": category
  };

  return (
    <>
      <Helmet>
        <title>{title} | WordToImage Blog</title>
        <meta name="description" content={excerpt} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={image} />
        <meta property="article:author" content={author.name} />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:section" content={category} />
        {tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://wordtoimage.com/blog/${slug}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <ContentBreadcrumbs />
        
        <header className="mb-8">
          <div className="mb-4">
            <InternalLink to="/blog" className="text-sm font-medium">
              ← Back to Blog
            </InternalLink>
          </div>
          
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-ai-primary/10 text-ai-primary">
              <Tag className="h-3 w-3 mr-1" />
              {category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={publishDate}>
                {new Date(publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {readTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </header>

        {image && (
          <div className="mb-8">
            <img
              src={image}
              alt={title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )}

        <SafeHTML html={content} className="prose prose-lg max-w-none mb-12" />

        {tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <RelatedContent currentPath="/blog" className="mt-12" />
      </article>
    </>
  );
};
