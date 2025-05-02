
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { trackEvent, events } from '@/utils/analytics';

interface GalleryImage {
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
}

export const useGallery = (images: GalleryImage[]) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

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

  return {
    favorites,
    loadedImages,
    errorImages,
    handleDownload,
    handleShare,
    toggleFavorite
  };
};
