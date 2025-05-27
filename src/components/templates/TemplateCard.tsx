
import { useState } from 'react';
import { ChevronRight, Lock, Eye, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLazyLoading } from '@/hooks/useLazyLoading';
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
  const [ref, isIntersecting] = useLazyLoading({ threshold: 0.1 });

  return (
    <div 
      ref={ref}
      className="bg-white rounded-xl overflow-hidden shadow-subtle hover:shadow-modern transition-all duration-300 border border-gray-100 group hover:border-brand-purple/20 hover:-translate-y-1 transform-gpu"
    >
      <div className="relative h-40 overflow-hidden bg-gray-100">
        {isIntersecting && (
          <>
            {!imageError ? (
              <img 
                src={template.image} 
                alt={template.title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
                style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-slate-100">
                <span className="text-brand-slate-400 text-sm font-medium">Image unavailable</span>
              </div>
            )}
            
            {/* Template info tooltip */}
            <TemplateTooltip 
              title={template.title}
              description={template.description}
              usage={template.usage || "General creative projects"}
            />
            
            {/* Hover overlay with consistent interaction */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(template);
                  }}
                  className="bg-white/95 hover:bg-white text-gray-800 shadow-brand font-medium"
                >
                  <Eye className="h-4 w-4 mr-1" />
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
                  className="bg-brand-purple hover:bg-brand-purple/90 shadow-brand font-medium"
                >
                  {template.isPro ? <Lock className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                  {template.isPro ? 'Pro' : 'Use'}
                </Button>
              </div>
            </div>
          </>
        )}
        
        {!imageLoaded && !imageError && isIntersecting && (
          <div className="absolute inset-0 bg-brand-slate-200 animate-pulse" />
        )}
        
        {/* Status badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {template.isPro && (
            <Badge className="bg-gradient-to-r from-brand-purple to-brand-navy text-white border-none shadow-brand font-medium">
              <Lock className="h-3 w-3 mr-1" />
              Pro
            </Badge>
          )}
          {template.isNew && (
            <Badge className="bg-green-500 text-white border-none shadow-brand font-medium">
              <Clock className="h-3 w-3 mr-1" />
              New
            </Badge>
          )}
          {template.isPopular && (
            <Badge className="bg-orange-500 text-white border-none shadow-brand font-medium">
              <Star className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 font-space flex-1">{template.title}</h3>
          {template.difficulty && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs ml-2",
                template.difficulty === 'Easy' && "border-green-200 text-green-700 bg-green-50",
                template.difficulty === 'Medium' && "border-orange-200 text-orange-700 bg-orange-50",
                template.difficulty === 'Advanced' && "border-red-200 text-red-700 bg-red-50"
              )}
            >
              {template.difficulty}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-brand-slate-600 mb-3 line-clamp-2 leading-relaxed">{template.description}</p>
        
        {template.usage && (
          <p className="text-xs text-brand-purple mb-3 font-medium">
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
            className="text-brand-purple hover:text-brand-purple/80 hover:bg-brand-purple/5 p-0 h-auto font-semibold transition-all duration-200"
            onClick={() => onUse(template)}
          >
            Use <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
