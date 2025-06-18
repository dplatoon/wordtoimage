
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: (error: string) => void;
  structuredData?: {
    caption?: string;
    creator?: string;
    keywords?: string[];
    dateCreated?: string;
    license?: string;
  };
}

export const EnhancedOptimizedImage: React.FC<EnhancedOptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 80,
  onLoad,
  onError,
  structuredData
}) => {
  const [imageState, setImageState] = useState<{
    status: 'loading' | 'loaded' | 'error';
    optimizedSrc?: string;
    error?: string;
  }>({ status: 'loading' });

  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate multiple format sources for better browser support
  const generateOptimizedSources = useCallback(() => {
    if (!src) return { avif: src, webp: src, fallback: src };

    // For external URLs, try to add optimization parameters
    try {
      const url = new URL(src);
      const baseParams = new URLSearchParams();
      
      if (width) baseParams.set('w', width.toString());
      if (quality) baseParams.set('q', quality.toString());
      
      // Check if it's a service that supports format conversion
      if (url.hostname.includes('unsplash') || url.hostname.includes('images')) {
        baseParams.set('auto', 'format');
        
        const baseUrl = `${url.origin}${url.pathname}?${baseParams.toString()}`;
        return {
          avif: `${baseUrl}&fm=avif`,
          webp: `${baseUrl}&fm=webp`,
          fallback: baseUrl
        };
      }
    } catch {
      // If URL parsing fails, return original
    }

    return { avif: src, webp: src, fallback: src };
  }, [src, width, quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observerRef.current?.disconnect();
            }
          });
        },
        { 
          threshold: 0.1, 
          rootMargin: window.innerWidth <= 768 ? '50px' : '100px' // Smaller margin for mobile
        }
      );

      const imgElement = imgRef.current;
      if (imgElement) {
        observerRef.current.observe(imgElement);
      }
    } else {
      setIsInView(true);
    }

    return () => observerRef.current?.disconnect();
  }, [priority, isInView]);

  // Load optimized image when in view
  useEffect(() => {
    if (!isInView || !src) return;

    const sources = generateOptimizedSources();
    setImageState({ status: 'loading', optimizedSrc: sources.fallback });
    
    // Test AVIF support first, then WebP, then fallback
    const testImage = new Image();
    testImage.onload = () => {
      setImageState(prev => ({ ...prev, status: 'loaded' }));
      onLoad?.();
    };
    testImage.onerror = () => {
      const errorMessage = 'Failed to load optimized image';
      setImageState(prev => ({ ...prev, status: 'error', error: errorMessage }));
      onError?.(errorMessage);
    };

    // Try AVIF first if browser supports it
    if ('HTMLImageElement' in window && 'decode' in HTMLImageElement.prototype) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx?.drawImage) {
        testImage.src = sources.avif;
      } else {
        testImage.src = sources.webp;
      }
    } else {
      testImage.src = sources.fallback;
    }
  }, [isInView, src, generateOptimizedSources, onLoad, onError]);

  // Generate structured data script if provided
  const generateStructuredData = () => {
    if (!structuredData) return null;

    const imageData = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": imageState.optimizedSrc || src,
      "contentUrl": imageState.optimizedSrc || src,
      "name": alt,
      "description": alt,
      "caption": structuredData.caption || alt,
      ...(structuredData.creator && { 
        "creator": { 
          "@type": "Person", 
          "name": structuredData.creator 
        } 
      }),
      ...(structuredData.dateCreated && { "dateCreated": structuredData.dateCreated }),
      ...(structuredData.keywords && { "keywords": structuredData.keywords.join(", ") }),
      ...(structuredData.license && { "license": structuredData.license }),
      ...(width && height && { 
        "width": width,
        "height": height
      }),
      "encodingFormat": "image/webp"
    };

    return (
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageData) }}
      />
    );
  };

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={cn("bg-gray-100 rounded-lg animate-pulse", className)}
        style={{ width, height, aspectRatio: width && height ? `${width}/${height}` : '1/1' }}
      />
    );
  }

  return (
    <>
      {generateStructuredData()}
      <div className="relative">
        {imageState.status === 'loading' && (
          <div
            className={cn("bg-gray-100 rounded-lg flex items-center justify-center", className)}
            style={{ width, height }}
          >
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}
        
        {imageState.status === 'error' && (
          <div
            className={cn("bg-red-50 border border-red-200 rounded-lg flex items-center justify-center", className)}
            style={{ width, height }}
          >
            <div className="flex flex-col items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <span className="text-sm">Failed to load</span>
            </div>
          </div>
        )}

        {imageState.status === 'loaded' && (
          <picture>
            <source 
              srcSet={generateOptimizedSources().avif} 
              type="image/avif" 
            />
            <source 
              srcSet={generateOptimizedSources().webp} 
              type="image/webp" 
            />
            <img
              ref={imgRef}
              src={imageState.optimizedSrc || src}
              alt={alt}
              className={cn("transition-opacity duration-300", className)}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priority ? 'high' : 'auto'}
              width={width}
              height={height}
            />
          </picture>
        )}
      </div>
    </>
  );
};
