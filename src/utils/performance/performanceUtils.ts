
// Utility functions for performance optimization

// Utility function for debouncing
export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced initialization function
export const initPerformanceOptimizations = () => {
  // Import the main optimizer dynamically to avoid circular imports
  import('./index').then(({ PerformanceOptimizer }) => {
    const optimizer = PerformanceOptimizer.getInstance();
    optimizer.init();
    
    // Additional performance optimizations
    if (typeof window !== 'undefined') {
      // Prevent unnecessary re-renders
      window.addEventListener('resize', debounce(() => {
        console.log('📱 Viewport resized - optimizations may apply');
      }, 250));
      
      // Monitor memory usage
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
          console.warn('⚠️ High memory usage detected - consider optimizing');
        }
      }
    }
  });
};
