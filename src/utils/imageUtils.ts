
/**
 * Collection of utility functions for handling images throughout the application
 */

// Sample images from our uploads folder that can be used as gallery content
export const localGalleryImages = [
  {
    src: "/lovable-uploads/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93.png",
    alt: "AI-generated futuristic cityscape",
    style: "Futuristic",
  },
  {
    src: "/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png", 
    alt: "AI-generated abstract art with flowing colors",
    style: "Abstract",
  },
  {
    src: "/lovable-uploads/7f38eaf1-216c-4148-b05c-9a2f87de6ffc.png", 
    alt: "AI-generated fantasy landscape",
    style: "Fantasy",
  },
  {
    src: "/lovable-uploads/806c4eee-2b54-4f82-8d75-7bd3e7137f5c.png", 
    alt: "AI-generated character portrait in anime style",
    style: "Illustration",
  },
  {
    src: "/lovable-uploads/9baa5403-54fd-4d41-9dff-b6762b238e3e.png", 
    alt: "AI-generated surreal dreamscape",
    style: "Surreal",
  },
  {
    src: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png", 
    alt: "AI-generated cyberpunk scene",
    style: "Cyberpunk",
  },
  {
    src: "/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png", 
    alt: "WordToImage logo graphic",
    style: "Logo",
  },
  {
    src: "/lovable-uploads/60da266c-4810-4f41-9449-ae54c2026373.png",
    alt: "AI-generated digital painting",
    style: "Digital Art",
  }
];

// Default fallback image to use if a primary image fails to load
export const defaultFallbackImage = "/lovable-uploads/9baa5403-54fd-4d41-9dff-b6762b238e3e.png";

// Generate a random image from our local gallery 
export const getRandomGalleryImage = () => {
  const randomIndex = Math.floor(Math.random() * localGalleryImages.length);
  return localGalleryImages[randomIndex].src;
};

// Check if a URL is an external URL
export const isExternalUrl = (url: string) => {
  if (!url) return false;
  return url.startsWith('http') || url.startsWith('//');
};

// Ensure a URL always has the proper format
export const formatImageUrl = (url: string | undefined) => {
  if (!url) return defaultFallbackImage;
  
  // If it's already a local path, return as is
  if (url.startsWith('/')) return url;
  
  // For external URLs, we don't modify them
  return url;
};
