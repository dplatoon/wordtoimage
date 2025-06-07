
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Download, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Sparkles,
  Grid3X3,
  List,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';

interface EnhancedImageGalleryProps {
  images: { url: string; prompt?: string; timestamp?: number }[];
  loading?: boolean;
}

export function EnhancedImageGallery({ images, loading }: EnhancedImageGalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const toggleFavorite = (index: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(index)) {
      newFavorites.delete(index);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(index);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const handleDownload = (imageUrl: string, index: number) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started');
    } catch (error) {
      window.open(imageUrl, '_blank');
      toast.success('Image opened in new tab');
    }
  };

  const handleShare = async (imageUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Generated Image',
          url: imageUrl
        });
      } catch (error) {
        navigator.clipboard.writeText(imageUrl);
        toast.success('Image URL copied to clipboard');
      }
    } else {
      navigator.clipboard.writeText(imageUrl);
      toast.success('Image URL copied to clipboard');
    }
  };

  if (loading) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating your image...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!images || images.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Your Gallery Awaits
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Start creating amazing AI-generated images! Your creations will appear here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Sparkles className="h-5 w-5 text-violet-600 mr-2" />
            Your Gallery
          </h2>
          <Badge variant="secondary" className="bg-violet-100 text-violet-800">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className={cn(
        "gap-4",
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "space-y-4"
      )}>
        {images.map((image, index) => (
          <Card 
            key={index}
            className={cn(
              "group overflow-hidden border-gray-200 hover:border-violet-300 transition-all duration-300 hover:shadow-lg",
              viewMode === 'list' && "flex"
            )}
            onMouseEnter={() => setHoveredImage(index)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <div className={cn(
              "relative",
              viewMode === 'list' ? "w-32 flex-shrink-0" : "w-full"
            )}>
              <AspectRatio ratio={1} className="overflow-hidden">
                <img
                  src={image.url}
                  alt={`Generated image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </AspectRatio>
              
              {/* Overlay Actions */}
              <div className={cn(
                "absolute inset-0 bg-black/50 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                isMobile && "opacity-100 bg-black/30"
              )}>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => toggleFavorite(index)}
                  className={cn(
                    "h-8 w-8 p-0",
                    favorites.has(index) && "bg-red-500 hover:bg-red-600 text-white"
                  )}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    favorites.has(index) && "fill-current"
                  )} />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownload(image.url, index)}
                  className="h-8 w-8 p-0"
                >
                  <Download className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleShare(image.url)}
                  className="h-8 w-8 p-0"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Favorite Badge */}
              {favorites.has(index) && (
                <div className="absolute top-2 right-2">
                  <div className="bg-red-500 text-white rounded-full p-1">
                    <Heart className="h-3 w-3 fill-current" />
                  </div>
                </div>
              )}
            </div>

            {/* Image Info */}
            <CardContent className={cn(
              "p-4",
              viewMode === 'list' && "flex-1"
            )}>
              <div className="space-y-2">
                {image.prompt && (
                  <p className={cn(
                    "text-sm text-gray-600 line-clamp-2",
                    viewMode === 'list' && "line-clamp-3"
                  )}>
                    "{image.prompt}"
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {image.timestamp 
                      ? new Date(image.timestamp).toLocaleDateString()
                      : 'Just now'
                    }
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    {favorites.has(index) && (
                      <Badge variant="secondary" className="text-xs bg-red-50 text-red-700">
                        Favorite
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Mobile Actions */}
                {isMobile && (
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(index)}
                      className="flex-1 mr-1"
                    >
                      <Heart className={cn(
                        "h-3 w-3 mr-1",
                        favorites.has(index) && "fill-current text-red-500"
                      )} />
                      {favorites.has(index) ? 'Favorited' : 'Favorite'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(image.url, index)}
                      className="flex-1 ml-1"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gallery Stats */}
      {images.length > 0 && (
        <div className="flex items-center justify-center pt-4">
          <div className="bg-gray-50 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-600 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-violet-500" />
              You've created {images.length} amazing {images.length === 1 ? 'image' : 'images'}!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
