
import React, { useState } from 'react';
import { ResponsiveImage } from '../common/ResponsiveImage';

interface ImageSEOProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  structuredData?: {
    caption?: string;
    creator?: string;
    dateCreated?: string;
    keywords?: string[];
    contentUrl?: string;
    thumbnailUrl?: string;
    license?: string;
    acquireLicensePage?: string;
    creditText?: string;
  };
}

export const ImageSEO: React.FC<ImageSEOProps> = ({
  src,
  alt,
  title,
  width,
  height,
  className,
  loading = 'lazy',
  sizes,
  srcSet,
  priority = false,
  structuredData
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate comprehensive structured data for the image
  const generateImageStructuredData = () => {
    if (!structuredData) return null;

    const imageData = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": src,
      "contentUrl": structuredData.contentUrl || src,
      "caption": structuredData.caption || alt,
      "description": alt,
      "name": title || alt,
      ...(structuredData.creator && { 
        "creator": { 
          "@type": "Person", 
          "name": structuredData.creator 
        } 
      }),
      ...(structuredData.dateCreated && { "dateCreated": structuredData.dateCreated }),
      ...(structuredData.keywords && { "keywords": structuredData.keywords.join(", ") }),
      ...(structuredData.license && { "license": structuredData.license }),
      ...(structuredData.acquireLicensePage && { "acquireLicensePage": structuredData.acquireLicensePage }),
      ...(structuredData.creditText && { "creditText": structuredData.creditText }),
      ...(width && height && { 
        "width": width,
        "height": height,
        "thumbnail": {
          "@type": "ImageObject",
          "url": structuredData.thumbnailUrl || src.replace(/\.(jpg|jpeg|png|webp)$/i, '_thumb.$1'),
          "width": Math.min(width, 300),
          "height": Math.min(height, 300)
        }
      }),
      "encodingFormat": src.split('.').pop()?.toLowerCase() || "jpeg",
      "uploadDate": structuredData.dateCreated || new Date().toISOString()
    };

    return (
      <script type="application/ld+json">
        {JSON.stringify(imageData)}
      </script>
    );
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    
    // Track image load for SEO performance
    if (window.gtag) {
      window.gtag('event', 'image_loaded', {
        event_category: 'SEO_Performance',
        event_label: src,
        custom_parameter: priority ? 'priority' : 'normal',
        value: performance.now()
      });
    }
  };

  const handleImageError = () => {
    console.error('Failed to load SEO optimized image:', src);
    
    // Track image errors for SEO monitoring
    if (window.gtag) {
      window.gtag('event', 'image_error', {
        event_category: 'SEO_Performance',
        event_label: src,
        error_type: 'load_failure'
      });
    }
  };

  return (
    <>
      {generateImageStructuredData()}
      <ResponsiveImage
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        onError={handleImageError}
        trackEvent="seo_optimized_image"
      />
      
      {/* Preload critical images for better LCP */}
      {priority && !imageLoaded && (
        <link
          rel="preload"
          as="image"
          href={src}
          {...(sizes && { imageSizes: sizes })}
          {...(srcSet && { imageSrcSet: srcSet })}
        />
      )}
    </>
  );
};

// HOC for automatic image SEO optimization
export const withImageSEO = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return React.forwardRef<HTMLDivElement, P & { seoOptimization?: boolean }>((props, ref) => {
    const { seoOptimization = true, ...otherProps } = props;

    React.useEffect(() => {
      if (seoOptimization) {
        // Add lazy loading to all images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
          img.setAttribute('loading', 'lazy');
        });

        // Add alt text validation
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
          console.warn(`Found ${imagesWithoutAlt.length} images without alt text - this affects SEO and accessibility`);
        }

        // Add structured data for images with data attributes
        const imageElements = document.querySelectorAll('img[data-seo-structured]');
        imageElements.forEach(img => {
          const imgElement = img as HTMLImageElement;
          const structuredData = JSON.parse(imgElement.getAttribute('data-seo-structured') || '{}');
          if (Object.keys(structuredData).length > 0) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "url": imgElement.src,
              "description": imgElement.alt,
              ...structuredData
            });
            document.head.appendChild(script);
          }
        });
      }
    }, [seoOptimization]);

    return <WrappedComponent ref={ref} {...(otherProps as P)} />;
  });
};
