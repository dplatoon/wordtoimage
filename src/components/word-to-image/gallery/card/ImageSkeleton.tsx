
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from 'lucide-react';

export function ImageSkeleton() {
  return (
    <div className="relative w-full h-48">
      <Skeleton className="w-full h-full rounded-lg" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader className="h-6 w-6 text-gray-400 animate-spin" />
      </div>
    </div>
  );
}
