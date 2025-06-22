
import React, { useState } from 'react';
import { ResponsiveImage } from '../common/ResponsiveImage';

interface EnhancedImageSEOProps {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  // AI-specific props for better SEO
  prompt?: string;
  style?: string;
  category?: string;
  tags?: string[];
  aiGenerated?: boolean;
}

export const EnhancedImageSEO: React.FC<EnhancedImageSEOProps> = ({
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
  prompt,
  style,
  category,
  tags = [],
  aiGenerated = true
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate comprehensive alt text based on available information
  const generateOptimizedAltText = () => {
    if (alt) return alt;
    
    let optimizedAlt = '';
    
    if (aiGenerated) {
      optimizedAlt += 'AI-generated ';
    }
    
    if (category) {
      optimizedAlt += `${category} `;
    }
    
    if (style) {
      optimizedAlt += `in ${style} style `;
    }
    
    if (prompt) {
      // Extract key descriptive words from prompt (first 60 characters)
      const promptPreview = prompt.length > 60 ? prompt.substring(0, 60) + '...' : prompt;
      optimizedAlt += `showing ${promptPreview}`;
    } else {
      optimizedAlt += 'image';
    }
    
    if (tags.length > 0) {
      optimizedAlt += ` (${tags.slice(0, 3).join(', ')})`;
    }
    
    return optimizedAlt.trim();
  };

  // Generate structured data for the image
  const generateImageStructuredData = () => {
    const imageData = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": src,
      "caption": generateOptimizedAltText(),
      "description": prompt || generateOptimizedAltText(),
      "name": title || generateOptimizedAltText(),
      ...(width && height && { 
        "width": width,
        "height": height
      }),
      "encodingFormat": src.split('.').pop()?.toLowerCase() || "jpeg",
      "uploadDate": new Date().toISOString(),
      ...(aiGenerated && {
        "creator": {
          "@type": "SoftwareApplication",
          "name": "WordToImage AI",
          "url": "https://wordtoimage.com"
        },
        "copyrightHolder": {
          "@type": "Organization",
          "name": "WordToImage"
        }
      }),
      ...(tags.length > 0 && { "keywords": tags.join(", ") }),
      ...(style && { "artMedium": style }),
      ...(category && { "genre": category })
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
      window.gtag('event', 'seo_image_loaded', {
        event_category: 'SEO_Performance',
        event_label: src,
        custom_parameter: priority ? 'priority' : 'normal'
      });
    }
  };

  const handleImageError = () => {
    console.error('Failed to load SEO optimized image:', src);
    
    // Track image errors for SEO monitoring
    if (window.gtag) {
      window.gtag('event', 'seo_image_error', {
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
        alt={generateOptimizedAltText()}
        className={className}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        onError={handleImageError}
        trackEvent="seo_optimized_image"
        // Add data attributes for SEO analysis
        data-seo-category={category}
        data-seo-style={style}
        data-seo-ai-generated={aiGenerated}
        data-seo-tags={tags.join(',')}
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

// Hook for automatic SEO heading structure
export const useSEOHeadings = () => {
  const [headingStructure, setHeadingStructure] = React.useState<{
    h1?: string;
    h2Headings?: string[];
  }>({});

  React.useEffect(() => {
    const script = document.getElementById('seo-heading-structure');
    if (script) {
      try {
        const structure = JSON.parse(script.textContent || '{}');
        setHeadingStructure(structure);
      } catch (e) {
        console.error('Failed to parse SEO heading structure:', e);
      }
    }
  }, []);

  return headingStructure;
};
