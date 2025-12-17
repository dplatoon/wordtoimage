
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check, Star, TrendingUp, Lightbulb, ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StylePreset } from '@/data/stylePresets';

interface StyleCardProps {
  style: StylePreset;
  isSelected: boolean;
  onSelect: (styleId: string) => void;
  size?: 'small' | 'medium' | 'large';
  showCategory?: boolean;
}

export function StyleCard({ 
  style, 
  isSelected, 
  onSelect, 
  size = 'medium',
  showCategory = false 
}: StyleCardProps) {
  const [showExamplePrompt, setShowExamplePrompt] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4', 
    large: 'p-6'
  };

  const imageSizes = {
    small: 'h-24',
    medium: 'h-32',
    large: 'h-40'
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg group overflow-hidden relative",
        isSelected 
          ? "ring-2 ring-primary bg-primary/10 shadow-lg transform scale-[1.02]" 
          : "hover:shadow-md hover:border-primary/30 hover:-translate-y-1"
      )}
      onClick={() => onSelect(style.id)}
      onMouseEnter={() => setShowExamplePrompt(true)}
      onMouseLeave={() => setShowExamplePrompt(false)}
    >
      <CardContent className={sizeClasses[size]}>
        {/* Image with Overlay */}
        <div className="relative overflow-hidden rounded-lg mb-3">
          <AspectRatio ratio={4/3}>
            <div className={cn(
              "w-full bg-card/50 rounded-lg flex items-center justify-center",
              imageSizes[size]
            )}>
              {imageError ? (
                <div className="text-center p-2">
                  <ImageOff className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Image unavailable</p>
                </div>
              ) : (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-card/70 animate-pulse rounded-lg" />
                  )}
                  <img
                    src={style.preview}
                    alt={`${style.name} AI art style example`}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-300 group-hover:scale-110 rounded-lg",
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    width={200}
                    height={150}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                  />
                </>
              )}
            </div>
          </AspectRatio>
          
          {/* Overlay with better positioning */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg" />
          
          {/* Top badges with better spacing */}
          <div className="absolute top-2 left-2 flex gap-1 z-10">
            {style.trending && (
              <Badge className="bg-orange-500/90 text-white border-none text-xs flex items-center gap-1 shadow-sm backdrop-blur-sm">
                <TrendingUp className="h-3 w-3" />
                Hot
              </Badge>
            )}
            {style.popular && (
              <Badge className="bg-yellow-500/90 text-yellow-900 border-none text-xs flex items-center gap-1 shadow-sm backdrop-blur-sm">
                <Star className="h-3 w-3" />
                Popular
              </Badge>
            )}
          </div>

          {/* Selection indicator with better positioning */}
          {isSelected && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in shadow-lg z-10">
              <Check className="h-4 w-4 text-primary-foreground" />
            </div>
          )}

          {/* Example prompt overlay with better styling */}
          {showExamplePrompt && style.examplePrompt && !imageError && (
            <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-3 transition-all duration-200 rounded-lg z-20">
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <Lightbulb className="h-4 w-4 mr-1 text-yellow-400" />
                  <span className="text-xs font-medium">Example:</span>
                </div>
                <p className="text-xs leading-relaxed">{style.examplePrompt}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content with better spacing */}
        <div className="space-y-3">
          <div>
            <h4 className={cn(
              "font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1",
              size === 'small' ? 'text-sm' : 'text-base'
            )}>
              {style.name}
            </h4>
            <p className={cn(
              "text-muted-foreground leading-relaxed line-clamp-2",
              size === 'small' ? 'text-xs' : 'text-sm'
            )}>
              {style.description}
            </p>
          </div>

          {/* Keywords with better wrapping */}
          {style.keywords && style.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {style.keywords.slice(0, 2).map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30 truncate max-w-20"
                >
                  {keyword}
                </span>
              ))}
              {style.keywords.length > 2 && (
                <span className="px-2 py-1 bg-card/50 text-muted-foreground text-xs rounded-full">
                  +{style.keywords.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Category badge */}
          {showCategory && (
            <Badge 
              variant="outline" 
              className={cn(
                "capitalize w-fit",
                size === 'small' ? 'text-xs' : 'text-xs'
              )}
            >
              {style.category}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
