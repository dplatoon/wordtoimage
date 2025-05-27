
import { useState } from 'react';
import { ChevronRight, Lock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLazyLoading } from '@/hooks/useLazyLoading';

interface TemplateCardProps {
  template: {
    id: number;
    title: string;
    description: string;
    image: string;
    style: string;
    isPro?: boolean;
    tags?: string[];
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
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
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
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400 text-sm">Image unavailable</span>
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(template);
                  }}
                  className="bg-white/90 hover:bg-white text-gray-800"
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
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {template.isPro ? <Lock className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                  {template.isPro ? 'Pro' : 'Use'}
                </Button>
              </div>
            </div>
          </>
        )}
        
        {!imageLoaded && !imageError && isIntersecting && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {template.isPro && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none">
            <Lock className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{template.title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{template.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
              {template.style}
            </span>
            {template.tags?.slice(0, 2).map((tag, index) => (
              <span key={index} className="inline-block px-2 py-1 bg-blue-50 text-xs rounded-full text-blue-600">
                {tag}
              </span>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
            onClick={() => onUse(template)}
          >
            Use <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
