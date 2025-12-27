
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check, Star, TrendingUp, Lightbulb, Palette, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StylePreset } from '@/data/stylePresets';

interface ProfessionalStyleCardProps {
  style: StylePreset;
  isSelected: boolean;
  onSelect: (styleId: string) => void;
  size?: 'small' | 'medium' | 'large';
  showCategory?: boolean;
}

export function ProfessionalStyleCard({ 
  style, 
  isSelected, 
  onSelect, 
  size = 'medium',
  showCategory = false 
}: ProfessionalStyleCardProps) {
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

  // Professional gradient fallback based on style category
  const getFallbackGradient = (category: string) => {
    const gradients = {
      realistic: 'from-blue-400 via-purple-500 to-pink-500',
      artistic: 'from-amber-400 via-orange-500 to-red-500',
      digital: 'from-green-400 via-blue-500 to-purple-600',
      anime: 'from-pink-400 via-purple-500 to-indigo-500'
    };
    return gradients[category as keyof typeof gradients] || gradients.digital;
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-500 hover:shadow-2xl group overflow-hidden relative backdrop-blur-sm",
        isSelected 
          ? "ring-2 ring-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-2xl transform scale-[1.02] z-10" 
          : "hover:shadow-xl hover:border-violet-300 hover:-translate-y-2 hover:rotate-1"
      )}
      onClick={() => onSelect(style.id)}
      onMouseEnter={() => setShowExamplePrompt(true)}
      onMouseLeave={() => setShowExamplePrompt(false)}
    >
      <CardContent className={sizeClasses[size]}>
        {/* Premium image container */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          <AspectRatio ratio={4/3}>
            <div className={cn(
              "w-full rounded-xl flex items-center justify-center relative overflow-hidden",
              imageSizes[size]
            )}>
              {imageError ? (
                // Professional fallback with branded gradient
                <div className={cn(
                  "w-full h-full bg-gradient-to-br flex items-center justify-center text-white relative overflow-hidden",
                  getFallbackGradient(style.category)
                )}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative text-center z-10">
                    <Palette className="h-8 w-8 mx-auto mb-2 opacity-90" />
                    <p className="text-sm font-medium opacity-95">{style.name}</p>
                    <p className="text-xs opacity-75 mt-1">Style Preview</p>
                  </div>
                  {/* Animated background elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6" />
                </div>
              ) : (
                <>
                  {!imageLoaded && (
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br animate-pulse rounded-xl",
                      getFallbackGradient(style.category)
                    )}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-white animate-spin" />
                      </div>
                    </div>
                  )}
                  <img
                    src={style.preview}
                    alt={`${style.name} AI art style example`}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700 rounded-xl group-hover:scale-110",
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                  />
                </>
              )}
            </div>
          </AspectRatio>
          
          {/* Premium overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Professional badges with glassmorphism */}
          <div className="absolute top-3 left-3 flex gap-2 z-20">
            {style.trending && (
              <Badge className="bg-gradient-to-r from-primary to-violet-500 text-white border-none text-xs flex items-center gap-1 shadow-lg backdrop-blur-md">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
            {style.popular && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-none text-xs flex items-center gap-1 shadow-lg backdrop-blur-md">
                <Star className="h-3 w-3" />
                Popular
              </Badge>
            )}
          </div>

          {/* Premium selection indicator */}
          {isSelected && (
            <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center animate-scale-in shadow-xl z-20 ring-2 ring-white">
              <Check className="h-5 w-5 text-white font-bold" />
            </div>
          )}

          {/* Professional example prompt overlay */}
          {showExamplePrompt && style.examplePrompt && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 flex items-center justify-center p-4 transition-all duration-300 rounded-xl z-30 backdrop-blur-sm">
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-3">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  <span className="text-sm font-semibold">Example Prompt:</span>
                </div>
                <p className="text-sm leading-relaxed max-w-xs">{style.examplePrompt}</p>
              </div>
            </div>
          )}
        </div>

        {/* Professional content section */}
        <div className="space-y-3">
          <div>
            <h4 className={cn(
              "font-bold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-1",
              size === 'small' ? 'text-sm' : 'text-base'
            )}>
              {style.name}
            </h4>
            <p className={cn(
              "text-gray-600 leading-relaxed line-clamp-2 font-medium",
              size === 'small' ? 'text-xs' : 'text-sm'
            )}>
              {style.description}
            </p>
          </div>

          {/* Premium keywords section */}
          {style.keywords && style.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {style.keywords.slice(0, 2).map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-xs rounded-full border border-violet-200 font-medium truncate max-w-20 hover:from-violet-200 hover:to-purple-200 transition-colors"
                >
                  {keyword}
                </span>
              ))}
              {style.keywords.length > 2 && (
                <span className="px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs rounded-full font-medium">
                  +{style.keywords.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Professional category badge */}
          {showCategory && (
            <Badge 
              variant="outline" 
              className={cn(
                "capitalize w-fit bg-white/50 backdrop-blur-sm",
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
