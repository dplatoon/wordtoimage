
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonGallery = () => (
  <div 
    className="mt-8 w-full"
    role="alert"
    aria-busy="true"
    aria-label="Loading gallery images"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
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

// Add keyframe animation for better performance
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
`;
document.head.appendChild(style);
