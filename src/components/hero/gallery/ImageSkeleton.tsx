
import { Skeleton } from '@/components/ui/skeleton';

export const ImageSkeleton = () => {
  return (
    <div className="w-full h-48 bg-gray-100 animate-pulse flex items-center justify-center">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
