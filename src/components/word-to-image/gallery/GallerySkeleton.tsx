
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, idx) => (
        <Card key={idx} className="overflow-hidden rounded-xl shadow-md border-border">
          <CardContent className="p-0">
            <div className="relative h-48 w-full bg-gradient-to-br from-primary/20 to-accent/10 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
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
