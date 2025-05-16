
import { cn } from "@/lib/utils";

export const SkipToContent = () => {
  return (
    <a 
      href="#main-content" 
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50",
        "focus:p-4 focus:bg-white focus:text-indigo-700 focus:shadow-lg focus:rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500"
      )}
    >
      Skip to main content
    </a>
  );
};
