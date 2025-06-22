
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ImageSEO } from '@/components/seo/ImageSEO';
import { defaultFallbackImage } from '@/utils/imageUtils';

interface ShowcaseMobileCarouselProps {
  items: Array<{
    id: number;
    imageUrl: string;
    prompt: string;
    style: string;
    author: string;
  }>;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

export const ShowcaseMobileCarousel = ({ items, hoveredIndex, setHoveredIndex }: ShowcaseMobileCarouselProps) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  const handleImageError = (id: number) => {
    console.log('Failed to load carousel image:', id);
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Generate carousel structured data
  const generateCarouselStructuredData = () => {
    const carouselData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Featured AI Art Showcase",
      "description": "Curated collection of exceptional AI-generated artwork",
      "numberOfItems": items.length,
      "itemListElement": items.map((item, index) => ({
        "@type": "ImageObject",
        "position": index + 1,
        "url": item.imageUrl,
        "name": `${item.style} AI Art by ${item.author}`,
        "description": item.prompt,
        "caption": item.prompt,
        "creator": {
          "@type": "Person",
          "name": item.author
        },
        "keywords": [item.style, 'AI art', 'featured artwork', 'digital art'].join(", ")
      }))
    };

    return (
      <script type="application/ld+json">
        {JSON.stringify(carouselData)}
      </script>
    );
  };

  return (
    <>
      {generateCarouselStructuredData()}
      <section aria-label="Featured AI artwork showcase carousel">
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={item.id} className="pl-1">
                <article className="relative overflow-hidden rounded-xl aspect-square">
                  <ImageSEO
                    src={imageErrors[item.id] ? defaultFallbackImage : item.imageUrl}
                    alt={`AI-generated ${item.style} artwork: ${item.prompt} created by ${item.author}`}
                    title={`${item.style} Style AI Art`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                    structuredData={{
                      caption: item.prompt,
                      creator: item.author,
                      keywords: [item.style, 'AI art', 'featured', 'showcase'],
                      contentUrl: item.imageUrl,
                      creditText: `Created by ${item.author}`,
                      dateCreated: new Date().toISOString()
                    }}
                    onError={() => handleImageError(item.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <p className="font-medium text-sm">{item.prompt}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-purple-500 bg-opacity-50 rounded-full px-2 py-0.5 inline-block">
                        {item.style}
                      </span>
                      <span className="text-xs">by {item.author}</span>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="View previous artwork" />
          <CarouselNext aria-label="View next artwork" />
        </Carousel>
      </section>
    </>
  );
};
