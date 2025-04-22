
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
          <div key={idx} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((img, idx) => (
        <Card key={idx} className="relative group rounded-2xl shadow-lg">
          <CardContent className="p-0">
            <img
              src={img.url}
              loading="lazy"
              alt={`Generated ${idx}`}
              className="w-full h-48 object-cover rounded-2xl"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 rounded-2xl transition-opacity">
              <Button size="sm">Download</Button>
              <Button size="sm" onClick={() => onEdit(img.url)}>Edit</Button>
              <Button size="sm">❤</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
