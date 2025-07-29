import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'image' | 'card' | 'circle' | 'button';
  lines?: number;
  height?: string;
  width?: string;
  animate?: boolean;
}

export const LoadingSkeleton = ({ 
  className, 
  variant = 'text',
  lines = 1,
  height,
  width,
  animate = true
}: LoadingSkeletonProps) => {
  const baseClasses = cn(
    'bg-gray-200 rounded',
    animate && 'animate-pulse',
    className
  );

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4';
      case 'image':
        return 'aspect-square w-full';
      case 'card':
        return 'h-32 w-full';
      case 'circle':
        return 'rounded-full w-12 h-12';
      case 'button':
        return 'h-10 w-24';
      default:
        return 'h-4';
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              getVariantClasses(),
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={{ height, width }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, getVariantClasses())}
      style={{ height, width }}
    />
  );
};

interface ImageGallerySkeletonProps {
  count?: number;
  className?: string;
}

export const ImageGalleryskeleton = ({ count = 6, className }: ImageGallerySkeletonProps) => {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-2">
          <LoadingSkeleton variant="image" />
          <LoadingSkeleton variant="text" />
          <LoadingSkeleton variant="text" width="60%" />
        </div>
      ))}
    </div>
  );
};

interface NavigationSkeletonProps {
  className?: string;
}

export const NavigationSkeleton = ({ className }: NavigationSkeletonProps) => {
  return (
    <div className={cn("flex items-center justify-between p-4", className)}>
      {/* Logo skeleton */}
      <div className="flex items-center space-x-2">
        <LoadingSkeleton variant="circle" className="w-8 h-8" />
        <LoadingSkeleton variant="text" width="120px" />
      </div>
      
      {/* Navigation items skeleton */}
      <div className="hidden md:flex space-x-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton key={index} variant="text" width="80px" />
        ))}
      </div>
      
      {/* Action buttons skeleton */}
      <div className="flex space-x-2">
        <LoadingSkeleton variant="button" />
        <LoadingSkeleton variant="button" />
      </div>
    </div>
  );
};

interface HeroSkeletonProps {
  className?: string;
}

export const HeroSkeleton = ({ className }: HeroSkeletonProps) => {
  return (
    <div className={cn("space-y-8 p-8", className)}>
      {/* Title skeleton */}
      <div className="text-center space-y-4">
        <LoadingSkeleton variant="text" height="48px" width="80%" className="mx-auto" />
        <LoadingSkeleton variant="text" lines={2} width="60%" className="mx-auto" />
      </div>
      
      {/* Form skeleton */}
      <div className="max-w-2xl mx-auto space-y-4">
        <LoadingSkeleton variant="card" height="120px" />
        <div className="flex space-x-4">
          <LoadingSkeleton variant="button" className="flex-1" />
          <LoadingSkeleton variant="button" width="120px" />
        </div>
      </div>
      
      {/* Feature grid skeleton */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="text-center space-y-2">
            <LoadingSkeleton variant="circle" className="mx-auto" />
            <LoadingSkeleton variant="text" width="80%" className="mx-auto" />
            <LoadingSkeleton variant="text" lines={2} className="mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};