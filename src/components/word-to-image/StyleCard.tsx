
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check, Star, TrendingUp, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StylePreset } from '@/data/stylePresets';
import { OptimizedImage } from '@/components/performance/OptimizedImage';

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
        "cursor-pointer transition-all duration-300 hover:shadow-lg group overflow-hidden relative",
        isSelected 
          ? "ring-2 ring-violet-500 bg-violet-50 shadow-lg transform scale-[1.02]" 
          : "hover:shadow-md hover:border-violet-300 hover:-translate-y-1"
      )}
      onClick={() => onSelect(style.id)}
      onMouseEnter={() => setShowExamplePrompt(true)}
      onMouseLeave={() => setShowExamplePrompt(false)}
    >
      <CardContent className={sizeClasses[size]}>
        {/* Image with Overlay */}
        <div className="relative overflow-hidden rounded-lg mb-3">
          <AspectRatio ratio={4/3}>
            <OptimizedImage
              src={style.preview}
              alt={`${style.name} AI art style example - ${style.description}`}
              className={cn(
                "w-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-lg",
                imageSizes[size]
              )}
              enableCompression={true}
              quality={0.9}
              lazy={true}
              structuredData={{
                caption: `${style.name} style example`,
                creator: 'AI Generated',
                keywords: style.keywords || []
              }}
            />
          </AspectRatio>
          
          {/* Overlay with Badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Top-left badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {style.trending && (
              <Badge className="bg-orange-500 text-white border-none text-xs flex items-center gap-1 shadow-lg">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
            {style.popular && (
              <Badge className="bg-yellow-500 text-yellow-900 border-none text-xs flex items-center gap-1 shadow-lg">
                <Star className="h-3 w-3" />
                Popular
              </Badge>
            )}
          </div>

          {/* Selection indicator */}
          {isSelected && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center animate-scale-in shadow-lg">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}

          {/* Example prompt overlay */}
          {showExamplePrompt && style.examplePrompt && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-2 transition-opacity duration-200">
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-1">
                  <Lightbulb className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Example Prompt:</span>
                </div>
                <p className="text-xs leading-relaxed">{style.examplePrompt}</p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-200 pointer-events-none",
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

          {/* Keywords */}
          {style.keywords && style.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {style.keywords.slice(0, 3).map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded-full border border-violet-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

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
