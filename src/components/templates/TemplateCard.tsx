
import { useState } from 'react';
import { ChevronRight, Lock, Eye, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEnhancedLazyLoading } from '@/hooks/useEnhancedLazyLoading';
import { TemplateTooltip } from './TemplateTooltip';

interface TemplateCardProps {
  template: {
    id: number;
    title: string;
    description: string;
    image: string;
    style: string;
    isPro?: boolean;
    isNew?: boolean;
    isPopular?: boolean;
    tags?: string[];
    usage?: string;
    difficulty?: 'Easy' | 'Medium' | 'Advanced';
  };
  onUse: (template: any) => void;
  onPreview: (template: any) => void;
}

export const TemplateCard = ({ template, onUse, onPreview }: TemplateCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [ref, isIntersecting] = useEnhancedLazyLoading({ threshold: 0.1 });

  return (
    <article 
      ref={ref}
      className="bg-card/30 backdrop-blur-xl rounded-xl overflow-hidden shadow-glass hover:shadow-neon transition-all duration-300 border border-primary/20 group hover:border-primary/40 hover:-translate-y-1 transform-gpu focus-within:ring-2 focus-within:ring-primary/50"
      role="article"
      aria-labelledby={`template-title-${template.id}`}
      aria-describedby={`template-description-${template.id}`}
    >
      <div className="relative h-40 overflow-hidden bg-card/50">
        {isIntersecting && (
          <>
            {!imageError ? (
              <img 
                src={template.image} 
                alt={`${template.title} template preview - ${template.description}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
                decoding="async"
                fetchPriority={template.isPopular ? "high" : "auto"}
                style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-card" role="img" aria-label="Template image unavailable">
                <span className="text-muted-foreground text-sm font-medium">Image unavailable</span>
              </div>
            )}
            
            {/* Enhanced template info tooltip */}
            <TemplateTooltip 
              title={template.title}
              description={template.description}
              usage={template.usage || "General creative projects"}
            />
            
            {/* Improved hover overlay with better accessibility */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="flex gap-2" role="group" aria-label="Template actions">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(template);
                  }}
                  aria-label={`Preview ${template.title} template`}
                >
                  <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                  Preview
                </Button>
                <Button
                  variant="neon"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUse(template);
                  }}
                  disabled={template.isPro}
                  aria-label={template.isPro ? `${template.title} requires Pro subscription` : `Use ${template.title} template`}
                >
                  {template.isPro ? <Lock className="h-4 w-4 mr-1" aria-hidden="true" /> : <ChevronRight className="h-4 w-4 mr-1" aria-hidden="true" />}
                  {template.isPro ? 'Pro' : 'Use'}
                </Button>
              </div>
            </div>
          </>
        )}
        
        {!imageLoaded && !imageError && isIntersecting && (
          <div className="absolute inset-0 bg-card animate-pulse" aria-label="Loading template image" />
        )}
        
        {/* Enhanced status badges with better visual hierarchy */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {template.isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none shadow-neon font-medium animate-pulse">
              <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
              New
            </Badge>
          )}
          {template.isPopular && (
            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none shadow-neon font-medium">
              <Star className="h-3 w-3 mr-1" aria-hidden="true" />
              Popular
            </Badge>
          )}
          {template.isPro && (
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-none shadow-neon font-medium">
              <Lock className="h-3 w-3 mr-1" aria-hidden="true" />
              Pro
            </Badge>
          )}
        </div>

        {/* Subtle image frame overlay for consistency */}
        <div className="absolute inset-0 ring-1 ring-primary/10 ring-inset rounded-t-xl pointer-events-none" />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 id={`template-title-${template.id}`} className="font-semibold text-foreground flex-1 text-base leading-tight">
            {template.title}
          </h3>
          {template.difficulty && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs ml-2 shrink-0",
                template.difficulty === 'Easy' && "border-green-500/30 text-green-400 bg-green-500/10",
                template.difficulty === 'Medium' && "border-orange-500/30 text-orange-400 bg-orange-500/10",
                template.difficulty === 'Advanced' && "border-red-500/30 text-red-400 bg-red-500/10"
              )}
              aria-label={`Difficulty level: ${template.difficulty}`}
            >
              {template.difficulty}
            </Badge>
          )}
        </div>
        
        <p id={`template-description-${template.id}`} className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
        
        {template.usage && (
          <p className="text-xs text-primary mb-3 font-medium">
            <span className="sr-only">Best used for: </span>
            Best for: {template.usage}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            <span className="inline-block px-2.5 py-1 bg-card text-xs rounded-full text-muted-foreground font-medium border border-primary/20">
              {template.style}
            </span>
            {template.tags?.slice(0, 2).map((tag, index) => (
              <span key={index} className="inline-block px-2.5 py-1 bg-primary/10 text-xs rounded-full text-primary font-medium">
                {tag}
              </span>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-semibold transition-all duration-200 focus:ring-2 focus:ring-primary"
            onClick={() => onUse(template)}
            aria-label={`Use ${template.title} template`}
          >
            Use <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
};
