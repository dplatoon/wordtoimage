
import React from 'react';
import { ImageSEO } from '../seo/ImageSEO';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Download, Share2, Eye } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  prompt?: string;
  style?: string;
  author?: string;
  dateCreated?: string;
  tags?: string[];
  resolution?: string;
}

interface SEOOptimizedGalleryProps {
  images: GalleryImage[];
  title: string;
  description?: string;
  className?: string;
}

export const SEOOptimizedGallery: React.FC<SEOOptimizedGalleryProps> = ({
  images,
  title,
  description,
  className = ""
}) => {
  // Generate gallery structured data
  const generateGalleryStructuredData = () => {
    const galleryData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": title,
      "description": description || `Gallery of ${images.length} AI-generated images`,
      "numberOfItems": images.length,
      "about": {
        "@type": "Thing",
        "name": "AI Generated Art",
        "description": "Artificial Intelligence generated artwork and images"
      },
      "mainEntity": images.map((image, index) => ({
        "@type": "ImageObject",
        "url": image.url,
        "name": image.title,
        "description": image.description,
        "caption": image.prompt || image.description,
        "position": index + 1,
        ...(image.author && {
          "creator": {
            "@type": "Person",
            "name": image.author
          }
        }),
        ...(image.dateCreated && { "dateCreated": image.dateCreated }),
        ...(image.tags && { "keywords": image.tags.join(", ") }),
        "contentLocation": {
          "@type": "VirtualLocation",
          "name": "WordToImage AI Gallery"
        }
      }))
    };

    return (
      <script type="application/ld+json">
        {JSON.stringify(galleryData)}
      </script>
    );
  };

  return (
    <>
      {generateGalleryStructuredData()}
      <section 
        className={`space-y-6 ${className}`}
        aria-labelledby="gallery-title"
        role="region"
      >
        <header>
          <h2 id="gallery-title" className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <article 
              key={image.id}
              className="group bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
              aria-labelledby={`image-title-${image.id}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <ImageSEO
                  src={image.url}
                  alt={`AI-generated ${image.style || 'artwork'}: ${image.description}`}
                  title={image.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading={index < 4 ? 'eager' : 'lazy'}
                  priority={index < 2}
                  structuredData={{
                    caption: image.prompt || image.description,
                    creator: image.author,
                    dateCreated: image.dateCreated,
                    keywords: image.tags,
                    contentUrl: image.url,
                    creditText: image.author ? `Created by ${image.author}` : 'AI Generated'
                  }}
                />
                
                {/* Quick actions overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" aria-label={`View ${image.title}`}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" aria-label={`Download ${image.title}`}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" aria-label={`Share ${image.title}`}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Style badge */}
                {image.style && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                      {image.style}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 id={`image-title-${image.id}`} className="font-medium text-gray-900 mb-1 line-clamp-1">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {image.description}
                </p>
                
                {image.prompt && (
                  <details className="mb-2">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                      View prompt
                    </summary>
                    <p className="text-xs text-gray-600 mt-1 p-2 bg-gray-50 rounded">
                      {image.prompt}
                    </p>
                  </details>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  {image.resolution && <span>{image.resolution}</span>}
                  {image.author && <span>by {image.author}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
