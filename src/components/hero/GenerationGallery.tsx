
import { Download } from 'lucide-react';

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
  if (!images?.length) return null;
  // Show most recent images first
  const galleryImages = images.slice(-4).reverse();

  return (
    <div className="mt-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {galleryImages.map((img, i) => (
          <div
            key={img.url + i}
            className="relative group overflow-hidden rounded-lg shadow-md bg-white"
            style={{ borderRadius: 8 }}
          >
            <img
              src={img.url}
              alt={img.prompt || "Generated image"}
              className="w-full h-56 object-cover group-hover:brightness-90 transition-all"
              width="512"
              height="224"
              loading="lazy"
              decoding="async"
              style={{ borderRadius: 8 }}
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
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = img.url;
                    a.download = `wordtoimage-${Date.now()}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  style={{ pointerEvents: "auto" }}
                  aria-label="Download image"
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
