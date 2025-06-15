
import React, { useState } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageDisplayProps {
  imageUrl: string;
  index: number;
  onLoad: () => void;
  onError: () => void;
  prompt?: string;
  style?: string;
}

export function ImageDisplay({ imageUrl, index, onLoad, onError, prompt, style }: ImageDisplayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);
  
  // Generate descriptive alt text based on available information
  const generateAltText = () => {
    let altText = `AI-generated image ${index + 1}`;
    
    if (style) {
      altText += ` in ${style} style`;
    }
    
    if (prompt) {
      // Extract key descriptive words from prompt (first 50 characters)
      const promptPreview = prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt;
      altText += `: ${promptPreview}`;
    }
    
    return altText;
  };
  
  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad();
  };
  
  const handleImageError = () => {
    console.error('Failed to load image:', imageUrl);
    setIsLoading(false);
    setHasError(true);
    onError();
    
    // Try fallback image
    if (imageSrc === imageUrl) {
      const fallbackUrl = "https://images.unsplash.com/photo-1686002359940-6a51b0d8184b?auto=format&fit=crop&w=400&q=75";
      setImageSrc(fallbackUrl);
      setIsLoading(true);
      setHasError(false);
    }
  };
  
  // Error state
  if (hasError && imageSrc !== imageUrl) {
    return (
      <div className="relative w-full">
        <AspectRatio ratio={1}>
          <div className="absolute inset-0 bg-gray-100 rounded-t-lg flex items-center justify-center">
            <div className="text-center p-4">
              <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Image unavailable</p>
            </div>
          </div>
        </AspectRatio>
      </div>
    );
  }
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="relative w-full">
        <AspectRatio ratio={1}>
          <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="h-6 w-6 text-gray-400 animate-spin" />
          </div>
        </AspectRatio>
      </div>
    );
  }
  
  // Successfully loaded image
  return (
    <div className="relative w-full overflow-hidden">
      <AspectRatio ratio={1}>
        <img
          src={imageSrc}
          alt={generateAltText()}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          data-seo-structured={JSON.stringify({
            contentUrl: imageUrl,
            caption: prompt,
            keywords: style ? [style, 'AI art', 'generated image'] : ['AI art', 'generated image'],
            encodingFormat: imageUrl.split('.').pop()?.toLowerCase() || 'jpeg'
          })}
        />
      </AspectRatio>
    </div>
  );
}
