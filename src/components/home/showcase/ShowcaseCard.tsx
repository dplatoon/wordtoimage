
import React from 'react';
import { Download, Heart, ExternalLink, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

interface ShowcaseCardProps {
  title: string;
  prompt: string;
  imageUrl: string;
  style: string;
  category: string;
  likes: number;
  onLike: () => void;
  onUsePrompt: () => void;
  className?: string;
}

export const ShowcaseCard = ({
  title,
  prompt,
  imageUrl,
  style,
  category,
  likes,
  onLike,
  onUsePrompt,
  className = ""
}: ShowcaseCardProps) => {
  const navigate = useNavigate();

  const handleUsePrompt = () => {
    // Navigate to text-to-image page and pre-fill the prompt
    navigate('/text-to-image', { 
      state: { 
        prompt: prompt,
        style: style 
      } 
    });
    toast.success("Prompt loaded! Ready to generate your image.");
  };

  const handleGenerateSimilar = () => {
    // Navigate to text-to-image with a modified prompt for similar generation
    const similarPrompt = `${prompt}, ${style} style, similar composition`;
    navigate('/text-to-image', { 
      state: { 
        prompt: similarPrompt,
        style: style 
      } 
    });
    toast.success("Similar prompt loaded! Generate your variation.");
  };

  return (
    <div className={`group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in ${className}`}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900">
              <ExternalLink className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" variant="secondary" onClick={handleUsePrompt} className="bg-white/90 text-gray-900">
              <Wand2 className="h-4 w-4 mr-1" />
              Try
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {prompt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {style}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onLike}
              className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">{likes}</span>
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={handleUsePrompt} className="flex-1 text-xs">
            Use Prompt
          </Button>
          <Button size="sm" onClick={handleGenerateSimilar} className="flex-1 text-xs">
            Generate Similar
          </Button>
        </div>
      </div>
    </div>
  );
};
