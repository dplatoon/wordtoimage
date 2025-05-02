
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Edit, Heart, Share2, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Image {
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  onEdit: (url: string) => void;
  loading?: boolean;
}

export function ImageGallery({ images, onEdit, loading }: ImageGalleryProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="overflow-hidden rounded-xl shadow-md">
            <CardContent className="p-0">
              <Skeleton className="h-48 w-full" />
              <div className="p-3 flex justify-center gap-2">
                <Skeleton className="h-8 w-14" />
                <Skeleton className="h-8 w-14" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <ImagePlus className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No images generated yet</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Enter a prompt above and click Generate to create your first AI-powered image.
        </p>
        <Button 
          variant="outline" 
          onClick={() => document.querySelector<HTMLButtonElement>('button:contains("Generate")').click()}
          className="bg-white"
        >
          Try it now
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((img, idx) => (
        <Card key={idx} className="relative group rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            <img
              src={img.url}
              loading="lazy"
              alt={`Generated ${idx}`}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              decoding="async"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between p-4 transition-opacity duration-300">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white text-gray-800">
                        <Download className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">Save</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" onClick={() => onEdit(img.url)} className="bg-white/80 hover:bg-white text-gray-800">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit this image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0 bg-white/80 hover:bg-white text-gray-800">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0 bg-white/80 hover:bg-white text-gray-800">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save to favorites</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Import ImagePlus from lucide-react at the top
import { ImagePlus } from 'lucide-react';
