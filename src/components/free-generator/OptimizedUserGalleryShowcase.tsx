
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizedResponsiveImage } from '@/components/common/OptimizedResponsiveImage';
import { localGalleryImages } from '@/utils/imageUtils';
import { Filter, Upload, Heart, Eye } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface OptimizedUserGalleryShowcaseProps {
  userImages: Array<{
    url: string;
    prompt: string;
    style?: string;
    timestamp?: number;
  }>;
}

const categories = ['All', 'Animals', 'Art', 'Photography', 'Fantasy', 'Architecture', 'Portrait'];

export const OptimizedUserGalleryShowcase = ({ userImages }: OptimizedUserGalleryShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  // Combine user images with gallery examples
  const allImages = [
    ...userImages.map((img, index) => ({
      id: `user-${index}`,
      src: img.url,
      prompt: img.prompt,
      style: img.style || 'Custom',
      category: 'User Generated',
      isUserGenerated: true,
      likes: Math.floor(Math.random() * 50) + 10
    })),
    ...localGalleryImages.map((img, index) => ({
      id: `gallery-${index}`,
      src: img.src,
      prompt: img.alt,
      style: img.style,
      category: getCategoryFromStyle(img.style),
      isUserGenerated: false,
      likes: Math.floor(Math.random() * 200) + 50
    }))
  ];

  function getCategoryFromStyle(style: string): string {
    const styleMap: Record<string, string> = {
      'Cyberpunk': 'Art',
      'Fantasy Art': 'Fantasy',
      'Abstract Digital': 'Art',
      'Cinematic Landscape': 'Photography',
      'Classical Portrait': 'Portrait',
      'Futuristic Architecture': 'Architecture'
    };
    return styleMap[style] || 'Art';
  }

  const filteredImages = selectedCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory);

  const handleLike = (imageId: string) => {
    const numericId = parseInt(imageId.replace(/\D/g, ''));
    setLikedImages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(numericId)) {
        newLiked.delete(numericId);
      } else {
        newLiked.add(numericId);
      }
      return newLiked;
    });
  };

  const handleUploadSubmission = () => {
    toast.success("Upload feature coming soon!", {
      description: "We're working on a community gallery where you can share your creations."
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Gallery
          </h2>
          <p className="text-xl text-gray-600">
            Explore amazing creations from our community and get inspired
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'border-purple-300 text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Filter className="w-3 h-3 mr-1" />
              {category}
            </Button>
          ))}
        </div>

        {/* Upload Button */}
        <div className="text-center mb-8">
          <Button
            onClick={handleUploadSubmission}
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Your Creation
          </Button>
        </div>

        {/* Optimized Image Grid - Pinterest-style masonry with lazy loading */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <Card 
              key={image.id}
              className="break-inside-avoid mb-4 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative">
                <OptimizedResponsiveImage
                  src={image.src}
                  alt={`${image.style} artwork: ${image.prompt}`}
                  className="w-full h-auto"
                  priority={index < 4} // Only prioritize first 4 images
                  quality={index < 4 ? 90 : 75} // Higher quality for visible images
                  aspectRatio={index % 3 === 0 ? 1.2 : index % 2 === 0 ? 0.8 : 1} // Varied aspect ratios for masonry
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Hover Overlay */}
                {hoveredImage === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 text-white transition-opacity duration-300">
                    <p className="text-sm font-medium mb-2 line-clamp-2">
                      {image.prompt}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                        {image.style}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(image.id);
                          }}
                          className={`text-white hover:bg-white/20 p-1 ${
                            likedImages.has(parseInt(image.id.replace(/\D/g, ''))) 
                              ? 'text-red-400' 
                              : 'text-white'
                          }`}
                        >
                          <Heart 
                            className="w-4 h-4" 
                            fill={likedImages.has(parseInt(image.id.replace(/\D/g, ''))) ? 'currentColor' : 'none'}
                          />
                        </Button>
                        <span className="text-xs flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {image.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Generated Badge */}
                {image.isUserGenerated && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-500 text-white text-xs">
                      New
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No images found for "{selectedCategory}". Try a different category or generate your first image!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
