
import { Link } from 'react-router-dom';
import { Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { ImageSEO } from '@/components/seo/ImageSEO';
import { localGalleryImages } from '@/utils/imageUtils';

export const GallerySection = () => {
  // Define trending styles
  const trendingStyles = ['Cyberpunk', 'Fantasy Art', 'Abstract Digital'];
  
  // Generate gallery structured data
  const generateGalleryStructuredData = () => {
    const galleryData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "AI Image Gallery Showcase",
      "description": "Featured collection of AI-generated artwork showcasing various artistic styles and techniques",
      "numberOfItems": localGalleryImages.length,
      "mainEntity": localGalleryImages.map((image, index) => ({
        "@type": "ImageObject",
        "url": image.src,
        "name": `AI Generated ${image.style} Artwork`,
        "description": image.alt,
        "caption": image.alt,
        "position": index + 1,
        "keywords": [image.style, 'AI art', 'generated image', 'digital art'].join(", "),
        "creator": {
          "@type": "Organization",
          "name": "WordToImage AI"
        },
        "contentLocation": {
          "@type": "VirtualLocation",
          "name": "WordToImage Platform"
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
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="gallery-section-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 animate-fade-in">
            <h2 id="gallery-section-title" className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              AI Image Gallery
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore the possibilities of AI-generated imagery across multiple artistic styles
            </p>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" role="list">
            {localGalleryImages.map((image, i) => (
              <article 
                key={i} 
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                role="listitem"
              >
                {/* Trending Badge */}
                {image.style && trendingStyles.includes(image.style) && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-primary to-violet-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <TrendingUp className="h-3 w-3" />
                      Hot
                    </div>
                  </div>
                )}
                
                <div className="w-full h-full relative overflow-hidden">
                  <ImageSEO
                    src={image.src}
                    alt={`AI-generated ${image.style} artwork: ${image.alt}`}
                    title={`${image.style} Style AI Art`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={300}
                    height={300}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    priority={i < 2}
                    structuredData={{
                      caption: image.alt,
                      creator: 'WordToImage AI',
                      keywords: [image.style, 'AI art', 'generated image', 'digital artwork'],
                      contentUrl: image.src,
                      creditText: 'Generated with WordToImage AI',
                      dateCreated: new Date().toISOString()
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white text-sm font-medium truncate">{image.alt}</p>
                      <p className="text-white/80 text-xs mt-1">Style: {image.style}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="default" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md" asChild>
              <Link to="/text-to-image">
                <Download className="mr-2 h-5 w-5" />
                Create Your Own AI Art
              </Link>
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              No credit card needed • Free trial available • Start creating in seconds
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
