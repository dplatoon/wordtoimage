
import React from 'react';
import { ModernResponsiveImage } from '@/components/common/ModernResponsiveImage';

interface AccessibleImageProps {
  src: string;
  alt: string;
  decorative?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  decorative = false,
  className,
  width,
  height,
  aspectRatio,
  priority,
  sizes,
  objectFit = 'cover'
}) => {
  // For decorative images, use empty alt text and add aria-hidden
  const imageAlt = decorative ? '' : alt;
  const ariaHidden = decorative ? true : undefined;

  return (
    <ModernResponsiveImage
      src={src}
      alt={imageAlt}
      className={className}
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      priority={priority}
      sizes={sizes}
      objectFit={objectFit}
      aria-hidden={ariaHidden}
      role={decorative ? 'presentation' : undefined}
    />
  );
};
