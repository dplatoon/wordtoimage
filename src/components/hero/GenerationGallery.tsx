
import { Download, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { trackEvent, events } from '@/utils/analytics';

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
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  if (!images?.length) return null;
  
  // Track gallery view once we have images
  if (images.length > 0) {
    trackEvent(events.VIEW_GALLERY, { imageCount: images.length });
  }
  
  const galleryImages = images.slice(-8).reverse();

  const handleDownload = (img: GalleryImage, index: number) => {
    const a = document.createElement('a');
    a.href = img.url;
    a.download = `wordtoimage-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Track download event
    trackEvent(events.DOWNLOAD_IMAGE, {
      prompt: img.prompt,
      style: img.style
    });
    
    toast.success("Image downloaded!");
  };

  const handleShare = (img: GalleryImage, index: number) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this AI-generated image!',
        text: `AI-generated image from prompt: "${img.prompt}"`,
        url: window.location.href,
      })
      .then(() => {
        trackEvent(events.SHARE_IMAGE, { 
          method: 'web_share_api',
          prompt: img.prompt
        });
      })
      .catch((error) => console.log('Sharing failed', error));
    } else {
      // Fallback - copy image URL to clipboard
      navigator.clipboard.writeText(img.url).then(() => {
        toast.success("Image URL copied to clipboard!");
        trackEvent(events.SHARE_IMAGE, { 
          method: 'clipboard',
          prompt: img.prompt
        });
      });
    }
  };

  const toggleFavorite = (index: number) => {
    const key = `${images[index].url}_${index}`;
    setFavorites(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      return newState;
    });
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Your Recent Creations</h3>
        {images.length > 4 && (
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
            View All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {galleryImages.map((img, i) => (
          <div
            key={`${img.url}_${i}`}
            className="relative group overflow-hidden rounded-lg shadow-md bg-white transition-all hover:shadow-lg"
            style={{ borderRadius: 8 }}
          >
            <img
              src={img.url}
              alt={img.prompt || "Generated image"}
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              width="512"
              height="192"
              loading="lazy"
              decoding="async"
              style={{ borderRadius: 8, contentVisibility: 'auto' }}
            />
            {/* Image details overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-medium line-clamp-2 mb-2">{img.prompt}</p>
              {img.style && (
                <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs rounded mb-2">{img.style}</span>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow"
                onClick={() => handleDownload(img, i)}
                title="Download"
              >
                <Download className="h-4 w-4 text-gray-700" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow"
                onClick={() => handleShare(img, i)}
                title="Share"
              >
                <Share2 className="h-4 w-4 text-gray-700" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className={`h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow ${
                  favorites[`${img.url}_${i}`] ? 'text-red-500' : 'text-gray-700'
                }`}
                onClick={() => toggleFavorite(i)}
                title="Favorite"
              >
                <Heart className={`h-4 w-4 ${favorites[`${img.url}_${i}`] ? 'fill-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
