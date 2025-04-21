
import { Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface GalleryImage {
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
}

interface GenerationGalleryProps {
  images: GalleryImage[];
}

export const GenerationGallery = ({ images }: GenerationGalleryProps) => {
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!images?.length) return;
    // Show most recent images first
    setVisibleImages(images.slice(-4).reverse());
  }, [images]);

  useEffect(() => {
    // Set up Intersection Observer for lazy loading
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without Intersection Observer
      console.warn("Browser doesn't support IntersectionObserver");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load any deferred images as they come into view
            const lazyImages = entry.target.querySelectorAll('img[data-src]');
            lazyImages.forEach((img: Element) => {
              const imgElem = img as HTMLImageElement;
              imgElem.src = imgElem.dataset.src || '';
              imgElem.removeAttribute('data-src');
            });
          }
        });
      },
      {
        rootMargin: '200px', // Start loading images when they're 200px away
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  if (!images?.length) return null;

  return (
    <div className="mt-8 w-full" ref={galleryRef}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visibleImages.map((img, i) => (
          <div
            key={img.url + i}
            className="relative group overflow-hidden rounded-lg shadow-md bg-white"
            style={{ borderRadius: 8 }}
          >
            <img
              src={img.url}
              alt={img.prompt}
              loading="lazy"
              width="512"
              height="512"
              className="w-full h-56 object-cover group-hover:brightness-90 transition-all"
              style={{ borderRadius: 8 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg'; // Fallback image
              }}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all p-4 pointer-events-none group-hover:pointer-events-auto">
              <div className="text-white text-xs truncate">
                <span>{img.prompt}</span>
                {img.style ? <span className="ml-2 px-2 py-0.5 bg-white/20 rounded">{img.style}</span> : null}
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-white/80 hover:bg-white rounded-full p-2 shadow group-hover:shadow-lg transition"
                  title="Download"
                  aria-label={`Download image ${img.prompt}`}
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = img.url;
                    a.download = `wordtoimage-${Date.now()}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  style={{ pointerEvents: "auto" }}
                >
                  <Download className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
