
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
      className="bg-white rounded-xl overflow-hidden shadow-subtle hover:shadow-modern transition-all duration-300 border border-gray-100 group hover:border-brand-purple/20 hover:-translate-y-1 transform-gpu focus-within:ring-2 focus-within:ring-brand-purple/50"
      role="article"
      aria-labelledby={`template-title-${template.id}`}
      aria-describedby={`template-description-${template.id}`}
    >
      <div className="relative h-40 overflow-hidden bg-gray-100">
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
              <div className="w-full h-full flex items-center justify-center bg-brand-slate-100" role="img" aria-label="Template image unavailable">
                <span className="text-brand-slate-400 text-sm font-medium">Image unavailable</span>
              </div>
            )}
            
            {/* Enhanced template info tooltip */}
            <TemplateTooltip 
              title={template.title}
              description={template.description}
              usage={template.usage || "General creative projects"}
            />
            
            {/* Improved hover overlay with better accessibility */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2" role="group" aria-label="Template actions">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(template);
                  }}
                  className="bg-white/95 hover:bg-white text-gray-800 shadow-brand font-medium focus:ring-2 focus:ring-brand-purple"
                  aria-label={`Preview ${template.title} template`}
                >
                  <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                  Preview
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUse(template);
                  }}
                  disabled={template.isPro}
                  className="bg-brand-purple hover:bg-brand-purple/90 shadow-brand font-medium focus:ring-2 focus:ring-brand-purple disabled:opacity-60"
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
          <div className="absolute inset-0 bg-brand-slate-200 animate-pulse" aria-label="Loading template image" />
        )}
        
        {/* Enhanced status badges with better visual hierarchy */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {template.isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none shadow-brand font-medium animate-pulse">
              <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
              New
            </Badge>
          )}
          {template.isPopular && (
            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none shadow-brand font-medium">
              <Star className="h-3 w-3 mr-1" aria-hidden="true" />
              Popular
            </Badge>
          )}
          {template.isPro && (
            <Badge className="bg-gradient-to-r from-brand-purple to-brand-navy text-white border-none shadow-brand font-medium">
              <Lock className="h-3 w-3 mr-1" aria-hidden="true" />
              Pro
            </Badge>
          )}
        </div>

        {/* Subtle image frame overlay for consistency */}
        <div className="absolute inset-0 ring-1 ring-black/5 ring-inset rounded-t-xl pointer-events-none" />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 id={`template-title-${template.id}`} className="font-semibold text-gray-900 font-space flex-1 text-base leading-tight">
            {template.title}
          </h3>
          {template.difficulty && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs ml-2 shrink-0",
                template.difficulty === 'Easy' && "border-green-200 text-green-700 bg-green-50",
                template.difficulty === 'Medium' && "border-orange-200 text-orange-700 bg-orange-50",
                template.difficulty === 'Advanced' && "border-red-200 text-red-700 bg-red-50"
              )}
              aria-label={`Difficulty level: ${template.difficulty}`}
            >
              {template.difficulty}
            </Badge>
          )}
        </div>
        
        <p id={`template-description-${template.id}`} className="text-sm text-brand-slate-600 mb-3 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
        
        {template.usage && (
          <p className="text-xs text-brand-purple mb-3 font-medium">
            <span className="sr-only">Best used for: </span>
            Best for: {template.usage}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            <span className="inline-block px-2.5 py-1 bg-brand-slate-100 text-xs rounded-full text-brand-slate-700 font-medium">
              {template.style}
            </span>
            {template.tags?.slice(0, 2).map((tag, index) => (
              <span key={index} className="inline-block px-2.5 py-1 bg-brand-purple/10 text-xs rounded-full text-brand-purple font-medium">
                {tag}
              </span>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-brand-purple hover:text-brand-purple/80 hover:bg-brand-purple/5 p-0 h-auto font-semibold transition-all duration-200 focus:ring-2 focus:ring-brand-purple"
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
