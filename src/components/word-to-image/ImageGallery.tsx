
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Edit, Heart } from 'lucide-react';

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
          <Card key={idx} className="overflow-hidden">
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
      <div className="text-center py-10 text-gray-500">
        No images generated yet. Enter a prompt above and click Generate!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((img, idx) => (
        <Card key={idx} className="relative group rounded-2xl shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <img
              src={img.url}
              loading="lazy"
              alt={`Generated ${idx}`}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              decoding="async"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 rounded-2xl transition-opacity">
              <Button size="sm" className="bg-white/80 hover:bg-white text-gray-800">
                <Download className="mr-1 h-4 w-4" /> Save
              </Button>
              <Button size="sm" onClick={() => onEdit(img.url)} className="bg-white/80 hover:bg-white text-gray-800">
                <Edit className="mr-1 h-4 w-4" /> Edit
              </Button>
              <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0 bg-white/80 hover:bg-white text-gray-800">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
