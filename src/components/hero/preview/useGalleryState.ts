
import { useState, useEffect } from 'react';

interface GalleryImage {
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
}

export const useGalleryState = (imageUrl: string, isGenerating: boolean) => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);

  // Add new image to gallery when generated
  useEffect(() => {
    if (imageUrl && !isGenerating) {
      setGallery((g) => {
        if (g.find((img) => img.url === imageUrl)) return g;
        return [...g, { url: imageUrl, prompt: '' }].slice(-8); // Limit to 8 images
      });
    }
  }, [imageUrl, isGenerating]);

  return { gallery };
};
