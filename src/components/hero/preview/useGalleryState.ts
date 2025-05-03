
import { useState, useEffect } from 'react';

interface GalleryImage {
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
  timestamp?: number; // Add timestamp property to the interface
}

export const useGalleryState = (imageUrl: string, isGenerating: boolean) => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [lastAddedUrl, setLastAddedUrl] = useState<string>('');

  // Reset the gallery when navigating away or refreshing
  useEffect(() => {
    const savedGallery = localStorage.getItem('imageGenerationGallery');
    if (savedGallery) {
      try {
        const parsed = JSON.parse(savedGallery);
        if (Array.isArray(parsed)) {
          setGallery(parsed.slice(-8)); // Limit to last 8 images
        }
      } catch (e) {
        console.error('Failed to parse gallery from localStorage:', e);
      }
    }
  }, []);

  // Add new image to the gallery whenever imageUrl changes (and isn't the one we just added)
  useEffect(() => {
    if (imageUrl && !isGenerating && imageUrl !== lastAddedUrl) {
      setLastAddedUrl(imageUrl);
      
      // Create a unique ID for this image to ensure we don't show duplicates
      const timestamp = new Date().getTime();
      const uniqueId = `${timestamp}-${Math.random().toString(36).substring(2, 10)}`;
      
      const newImage: GalleryImage = {
        url: `${imageUrl}?id=${uniqueId}`, // Add unique query param to prevent caching issues
        prompt: "Your generated image", // We don't have prompt context here
        timestamp: timestamp, // Add timestamp for sorting
      };

      setGallery(prevGallery => {
        const updatedGallery = [...prevGallery, newImage].slice(-8); // Keep only the last 8 images
        
        // Save to localStorage for persistence
        try {
          localStorage.setItem('imageGenerationGallery', JSON.stringify(updatedGallery));
        } catch (e) {
          console.error('Failed to save gallery to localStorage:', e);
        }
        
        return updatedGallery;
      });
    }
  }, [imageUrl, isGenerating, lastAddedUrl]);

  return { gallery };
};
