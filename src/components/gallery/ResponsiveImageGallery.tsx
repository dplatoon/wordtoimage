import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Heart, Share2, Maximize2, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  prompt?: string;
  style?: string;
  timestamp?: number;
}

interface ResponsiveImageGalleryProps {
  images: GalleryImage[];
  loading?: boolean;
  onImageClick?: (image: GalleryImage) => void;
  onDownload?: (image: GalleryImage) => void;
  onShare?: (image: GalleryImage) => void;
  className?: string;
}

export const ResponsiveImageGallery: React.FC<ResponsiveImageGalleryProps> = ({
  images,
  loading = false,
  onImageClick,
  onDownload,
  onShare,
  className
}) => {
  const { isMobile, isTablet, isTouch, screenSize } = useResponsiveDesign();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Responsive grid calculation
  const gridCols = useMemo(() => {
    if (viewMode === 'list') return 1;
    
    // Calculate grid columns based on screen size
    if (screenSize.width < 480) return 1;
    if (screenSize.width < 768) return 2;
    if (screenSize.width < 1024) return 3;
    return 4;
  }, [viewMode, screenSize.width]);

  const toggleFavorite = (imageId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId);
      } else {
        newFavorites.add(imageId);
      }
      return newFavorites;
    });
  };

  const handleImageAction = (action: 'download' | 'share' | 'view', image: GalleryImage) => {
    switch (action) {
      case 'download':
        onDownload?.(image);
        break;
      case 'share':
        onShare?.(image);
        break;
      case 'view':
        onImageClick?.(image);
        break;
    }
  };

  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <div className={`grid gap-4 ${
          isMobile ? 'grid-cols-1' : 
          isTablet ? 'grid-cols-2' : 
          'grid-cols-3 lg:grid-cols-4'
        }`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Grid className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
        <p className="text-gray-500 max-w-sm">
          Start generating AI images to see them appear here. Your creations will be saved and organized automatically.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Enhanced Gallery Header with View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Your Gallery ({images.length})
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isMobile ? 'Tap to expand' : 'Click to view full size'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size={isMobile ? 'sm' : 'default'}
            onClick={() => setViewMode('grid')}
            className={isTouch ? 'min-h-[44px] min-w-[44px]' : ''}
            aria-label="Grid view"
          >
            <Grid className="h-4 w-4" />
            {!isMobile && <span className="ml-2">Grid</span>}
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size={isMobile ? 'sm' : 'default'}
            onClick={() => setViewMode('list')}
            className={isTouch ? 'min-h-[44px] min-w-[44px]' : ''}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
            {!isMobile && <span className="ml-2">List</span>}
          </Button>
        </div>
      </div>

      {/* Responsive Gallery Grid */}
      <div 
        className={cn(
          "grid gap-4 transition-all duration-300",
          viewMode === 'grid' 
            ? `grid-cols-${gridCols} ${isMobile ? 'gap-3' : 'gap-4 md:gap-6'}` 
            : 'grid-cols-1 gap-6'
        )}
        role="grid"
        aria-label="Image gallery"
      >
        <AnimatePresence mode="wait">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className={cn(
                "relative group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300",
                viewMode === 'list' && "flex items-center p-4",
                isTouch && "touch-manipulation"
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onMouseEnter={() => !isTouch && setHoveredImage(image.id)}
              onMouseLeave={() => !isTouch && setHoveredImage(null)}
              role="gridcell"
            >
              {viewMode === 'grid' ? (
                // Grid View
                <>
                  <div className="aspect-square relative overflow-hidden">
                    <ResponsiveImage
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      aspectRatio={1}
                      onLoad={() => console.log(`Image ${image.id} loaded`)}
                    />
                    
                    {/* Enhanced Mobile-Friendly Overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300",
                      isTouch 
                        ? "opacity-0 active:opacity-100" 
                        : hoveredImage === image.id ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="flex gap-2" role="group" aria-label="Image actions">
                        <Button
                          size={isMobile ? "sm" : "default"}
                          variant="secondary"
                          className={cn(
                            "bg-white/90 hover:bg-white text-gray-900 shadow-sm",
                            isTouch && "min-h-[44px] min-w-[44px]"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageAction('view', image);
                          }}
                          aria-label={`View ${image.alt} full size`}
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          size={isMobile ? "sm" : "default"}
                          variant="secondary"
                          className={cn(
                            "bg-white/90 hover:bg-white text-gray-900 shadow-sm",
                            isTouch && "min-h-[44px] min-w-[44px]"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(image.id);
                          }}
                          aria-label={`${favorites.has(image.id) ? 'Remove from' : 'Add to'} favorites`}
                        >
                          <Heart className={cn(
                            "h-4 w-4",
                            favorites.has(image.id) && "fill-red-500 text-red-500"
                          )} />
                        </Button>
                        
                        <Button
                          size={isMobile ? "sm" : "default"}
                          variant="secondary"
                          className={cn(
                            "bg-white/90 hover:bg-white text-gray-900 shadow-sm",
                            isTouch && "min-h-[44px] min-w-[44px]"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageAction('download', image);
                          }}
                          aria-label={`Download ${image.alt}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Image Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate mb-1">
                      {image.prompt || image.alt}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {image.style && `${image.style} • `}
                        Generated
                      </span>
                      {favorites.has(image.id) && (
                        <Heart className="h-3 w-3 text-red-500 fill-current" />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // List View
                <div className="flex items-center w-full gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <ResponsiveImage
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      aspectRatio={1}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {image.prompt || image.alt}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {image.style && `${image.style} • `}
                      Generated {image.timestamp && new Date(image.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleFavorite(image.id)}
                      className={isTouch ? 'min-h-[44px] min-w-[44px]' : ''}
                      aria-label={`${favorites.has(image.id) ? 'Remove from' : 'Add to'} favorites`}
                    >
                      <Heart className={cn(
                        "h-4 w-4",
                        favorites.has(image.id) && "fill-red-500 text-red-500"
                      )} />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleImageAction('download', image)}
                      className={isTouch ? 'min-h-[44px] min-w-[44px]' : ''}
                      aria-label={`Download ${image.alt}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
