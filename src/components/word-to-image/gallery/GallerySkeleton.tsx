
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, idx) => (
        <Card key={idx} className="overflow-hidden rounded-xl shadow-md">
          <CardContent className="p-0">
            <div className="relative h-48 w-full bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            </div>
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
