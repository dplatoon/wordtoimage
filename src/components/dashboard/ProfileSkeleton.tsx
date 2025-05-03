
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileSkeleton() {
  return (
    <div className="container max-w-4xl py-12">
      <Skeleton className="h-10 w-64 mb-8" />
      <Card className="shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 max-w-md" />
            <Skeleton className="h-4 w-64" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 max-w-md" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-24 max-w-md" />
            <Skeleton className="h-4 w-48" />
          </div>
          
          <div className="pt-2">
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
