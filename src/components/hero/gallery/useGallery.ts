
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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const handleDownload = (imageUrl: string) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `wordtoimage-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Track download event
    trackEvent(events.DOWNLOAD_IMAGE, {
      prompt: images.find(img => img.url === imageUrl)?.prompt || '',
      style: images.find(img => img.url === imageUrl)?.style || ''
    });
    
    toast.success("Image downloaded!");
  };

  const handleShare = (imageUrl: string) => {
    const img = images.find(img => img.url === imageUrl);
    
    if (navigator.share) {
      navigator.share({
        title: 'Check out this AI-generated image!',
        text: `AI-generated image from prompt: "${img?.prompt || ''}"`,
        url: window.location.href,
      })
      .then(() => {
        trackEvent(events.SHARE_IMAGE, { 
          method: 'web_share_api',
          prompt: img?.prompt || ''
        });
      })
      .catch((error) => console.log('Sharing failed', error));
    } else {
      // Fallback - copy image URL to clipboard
      navigator.clipboard.writeText(imageUrl).then(() => {
        toast.success("Image URL copied to clipboard!");
        trackEvent(events.SHARE_IMAGE, { 
          method: 'clipboard',
          prompt: img?.prompt || ''
        });
      });
    }
  };

  const toggleFavorite = (imageUrl: string) => {
    setFavorites(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl);
      } else {
        return [...prev, imageUrl];
      }
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
