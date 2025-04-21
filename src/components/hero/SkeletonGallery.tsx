
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export const SkeletonGallery = () => {
  const isMobile = useIsMobile();
  const skeletonCount = isMobile ? 2 : 4;

  return (
    <div 
      className="mt-8 w-full"
      role="alert"
      aria-busy="true"
      aria-label="Loading gallery images"
    >
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-6`}>
        {[...Array(skeletonCount)].map((_, i) => (
          <Skeleton 
            key={i}
            className="h-56 w-full rounded-lg shadow-md bg-gray-100 animate-pulse"
            style={{ 
              borderRadius: 8,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add keyframe animation for better performance
if (typeof document !== 'undefined') {
  // Check if we're in a browser environment
  const existingStyle = document.getElementById('skeleton-animation');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'skeleton-animation';
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
      }
    `;
    document.head.appendChild(style);
  }
}
