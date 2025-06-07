
import React, { useState, useEffect } from 'react';
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
  Search,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';
import { storageService, StoredImage } from '@/services/storageService';
import { GalleryManager } from '@/components/gallery/GalleryManager';

interface EnhancedImageGalleryProps {
  images: { url: string; prompt?: string; timestamp?: number }[];
  loading?: boolean;
}

export function EnhancedImageGallery({ images, loading }: EnhancedImageGalleryProps) {
  const [persistentImages, setPersistentImages] = useState<StoredImage[]>([]);
  const [showManager, setShowManager] = useState(false);
  const isMobile = useIsMobile();

  // Load persistent images on mount
  useEffect(() => {
    const stored = storageService.getImages();
    setPersistentImages(stored);
  }, []);

  // Save new images to persistent storage
  useEffect(() => {
    if (images.length > 0) {
      const newImages = images.filter(img => {
        // Check if image is already in persistent storage
        return !persistentImages.some(stored => stored.url === img.url);
      });

      newImages.forEach(img => {
        const storedImage = storageService.saveImage({
          url: img.url,
          prompt: img.prompt || 'Generated image',
          timestamp: img.timestamp || Date.now(),
          favorite: false,
          style: 'auto' // Default style, could be enhanced to detect from generation
        });
        
        setPersistentImages(prev => [storedImage, ...prev]);
      });
    }
  }, [images, persistentImages]);

  const handleToggleFavorite = (imageId: string) => {
    storageService.toggleFavorite(imageId);
    setPersistentImages(prev => 
      prev.map(img => 
        img.id === imageId ? { ...img, favorite: !img.favorite } : img
      )
    );
  };

  const handleDownload = (imageUrl: string, imageName: string) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${imageName}.png`;
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

  // Show gallery manager if requested
  if (showManager) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Gallery Manager</h2>
          <Button
            variant="outline"
            onClick={() => setShowManager(false)}
          >
            Back to Gallery
          </Button>
        </div>
        <GalleryManager
          images={persistentImages}
          onImagesChange={setPersistentImages}
        />
      </div>
    );
  }

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

  if (!persistentImages || persistentImages.length === 0) {
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
                Start creating amazing AI-generated images! Your creations will appear here and be automatically saved.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show recent images (last 6) in simple view, with option to open manager
  const recentImages = persistentImages.slice(0, 6);

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
            {persistentImages.length} {persistentImages.length === 1 ? 'image' : 'images'}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          {persistentImages.length > 6 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowManager(true)}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Manage All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowManager(true)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Recent Images Grid */}
      <div className={cn(
        "gap-4",
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}>
        {recentImages.map((image) => (
          <Card 
            key={image.id}
            className="group overflow-hidden border-gray-200 hover:border-violet-300 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative w-full">
              <AspectRatio ratio={1} className="overflow-hidden">
                <img
                  src={image.url}
                  alt={image.prompt}
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
                  onClick={() => handleToggleFavorite(image.id)}
                  className={cn(
                    "h-8 w-8 p-0",
                    image.favorite && "bg-red-500 hover:bg-red-600 text-white"
                  )}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    image.favorite && "fill-current"
                  )} />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownload(image.url, `generated-${image.id}`)}
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
              {image.favorite && (
                <div className="absolute top-2 right-2">
                  <div className="bg-red-500 text-white rounded-full p-1">
                    <Heart className="h-3 w-3 fill-current" />
                  </div>
                </div>
              )}
            </div>

            {/* Image Info */}
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  "{image.prompt}"
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {new Date(image.timestamp).toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    {image.favorite && (
                      <Badge variant="secondary" className="text-xs bg-red-50 text-red-700">
                        Favorite
                      </Badge>
                    )}
                    {image.style && (
                      <Badge variant="secondary" className="text-xs">
                        {image.style}
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
                      onClick={() => handleToggleFavorite(image.id)}
                      className="flex-1 mr-1"
                    >
                      <Heart className={cn(
                        "h-3 w-3 mr-1",
                        image.favorite && "fill-current text-red-500"
                      )} />
                      {image.favorite ? 'Favorited' : 'Favorite'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(image.url, `generated-${image.id}`)}
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

      {/* Show More Button */}
      {persistentImages.length > 6 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowManager(true)}
            className="flex items-center gap-2"
          >
            View All {persistentImages.length} Images
          </Button>
        </div>
      )}

      {/* Gallery Stats */}
      <div className="flex items-center justify-center pt-4">
        <div className="bg-gray-50 rounded-lg px-4 py-2">
          <p className="text-sm text-gray-600 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-violet-500" />
            You've created {persistentImages.length} amazing {persistentImages.length === 1 ? 'image' : 'images'}!
            {persistentImages.filter(img => img.favorite).length > 0 && (
              <span className="ml-2 text-red-600">
                ({persistentImages.filter(img => img.favorite).length} favorited)
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
