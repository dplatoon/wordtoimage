
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check, Star, TrendingUp } from 'lucide-react';
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

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg group overflow-hidden",
        isSelected 
          ? "ring-2 ring-violet-500 bg-violet-50 shadow-lg transform scale-[1.02]" 
          : "hover:shadow-md hover:border-violet-300 hover:-translate-y-1"
      )}
      onClick={() => onSelect(style.id)}
    >
      <CardContent className={sizeClasses[size]}>
        {/* Image with Overlay */}
        <div className="relative overflow-hidden rounded-lg mb-3">
          <AspectRatio ratio={4/3}>
            <img
              src={style.preview}
              alt={style.name}
              className={cn(
                "w-full object-cover transition-transform duration-300 group-hover:scale-110",
                imageSizes[size]
              )}
              loading="lazy"
            />
          </AspectRatio>
          
          {/* Overlay with Badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Top-left badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {style.trending && (
              <Badge className="bg-orange-500 text-white text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
            {style.popular && (
              <Badge className="bg-yellow-500 text-yellow-900 text-xs flex items-center gap-1">
                <Star className="h-3 w-3" />
                Popular
              </Badge>
            )}
          </div>

          {/* Selection indicator */}
          {isSelected && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center animate-scale-in">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}

          {/* Hover overlay */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-200",
            isSelected 
              ? "bg-violet-600/20" 
              : "bg-black/0 group-hover:bg-black/10"
          )} />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={cn(
                "font-semibold text-gray-900 group-hover:text-violet-600 transition-colors",
                size === 'small' ? 'text-sm' : 'text-base'
              )}>
                {style.name}
              </h4>
              <p className={cn(
                "text-gray-600 leading-relaxed",
                size === 'small' ? 'text-xs' : 'text-sm'
              )}>
                {style.description}
              </p>
            </div>
          </div>

          {/* Category badge */}
          {showCategory && (
            <div className="flex justify-between items-center">
              <Badge 
                variant="outline" 
                className={cn(
                  "capitalize",
                  size === 'small' ? 'text-xs' : 'text-xs'
                )}
              >
                {style.category}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
