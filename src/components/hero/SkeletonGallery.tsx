
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonGallery = () => (
  <div className="mt-8 w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton 
          key={i}
          className="h-56 w-full rounded-lg shadow-md bg-gray-100 animate-pulse"
          style={{ borderRadius: 8 }}
        />
      ))}
    </div>
  </div>
);
