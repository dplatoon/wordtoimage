
import { cn } from "@/lib/utils";

export const SkipToContent = () => {
  return (
    <div className="skip-links">
      <a 
        href="#main-content" 
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50",
          "focus:p-4 focus:bg-primary focus:text-primary-foreground focus:shadow-lg focus:rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary",
          "font-semibold text-sm transition-all duration-200"
        )}
      >
        Skip to main content
      </a>
      <a 
        href="#navigation" 
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 z-50",
          "focus:p-4 focus:bg-primary focus:text-primary-foreground focus:shadow-lg focus:rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary",
          "font-semibold text-sm transition-all duration-200"
        )}
      >
        Skip to navigation
      </a>
      <a 
        href="#footer" 
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-96 z-50",
          "focus:p-4 focus:bg-blue-600 focus:text-white focus:shadow-lg focus:rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600",
          "font-semibold text-sm transition-all duration-200"
        )}
      >
        Skip to footer
      </a>
    </div>
  );
};
