
/**
 * Collection of utility functions for handling images throughout the application
 */

// Sample images from our uploads folder that can be used as gallery content
export const localGalleryImages = [
  {
    src: "/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png",
    alt: "Twin baby girls wearing sun hats and sunglasses playing on the beach",
    style: "Photorealistic",
  },
  {
    src: "/lovable-uploads/f0dea1ce-ca91-4c0b-9849-6b3649a98249.png", 
    alt: "Adorable golden retriever puppy with big eyes",
    style: "Digital Art",
  },
  {
    src: "/lovable-uploads/53e8165c-d2db-4f0c-9509-f0e76e5c179f.png", 
    alt: "Fluffy orange and white cat with bright eyes",
    style: "Illustration",
  },
  {
    src: "/lovable-uploads/8916d6c1-4854-473f-b0fb-0c6d9833633e.png", 
    alt: "Digital neural network forming a human brain",
    style: "Futuristic",
  },
  {
    src: "/lovable-uploads/e3ece80c-0df0-4887-a227-c06cf52b3c6e.png", 
    alt: "Baby with dark hair in pink sweater playing with toys",
    style: "Portrait",
  },
  {
    src: "/lovable-uploads/b8bd59bc-46c8-4f5f-9ad8-8eacbf6c7c20.png", 
    alt: "Astronaut in space with cosmic reflection in helmet",
    style: "Sci-Fi",
  },
  {
    src: "/lovable-uploads/fa9c9164-9cf5-482f-9a30-662c41b9b386.png", 
    alt: "Dramatic volcano eruption with lava flow and misty landscape",
    style: "Landscape",
  },
  {
    src: "/lovable-uploads/8398d1f3-db95-4f78-b05e-1fbba4750e81.png",
    alt: "Tropical beach paradise with palm trees and colorful seashells",
    style: "Tropical",
  },
  {
    src: "/lovable-uploads/db49271b-8575-4763-9439-0e4d86479b29.png",
    alt: "Purple and orange sunset over mountain lake with reflections",
    style: "Sunset",
  },
  {
    src: "/lovable-uploads/4dbfcf42-6fbd-45a6-ae36-ab0f8a65cbd3.png",
    alt: "Abstract geometric pattern with colorful squares and circles",
    style: "Abstract",
  },
  {
    src: "/lovable-uploads/3f1260dc-bc27-4e4b-8546-f12263780ee2.png",
    alt: "Vibrant sunset over mountain lake with purple and orange sky",
    style: "Nature",
  }
];

// Default fallback image to use if a primary image fails to load
export const defaultFallbackImage = "/lovable-uploads/c0cd939b-5fe6-4732-af93-ee61f070b689.png";

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
