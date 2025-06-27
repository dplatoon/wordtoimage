// Main entry point for performance optimization - now uses modular structure
export { 
  PerformanceOptimizer,
  WebVitalsMonitor,
  ResourceOptimizer,
  PerformanceReporter,
  initPerformanceOptimizations
} from './performance';

// Keep the old export for backward compatibility
export const initPerformanceOptimizations = () => {
  import('./performance').then(({ initPerformanceOptimizations }) => {
    initPerformanceOptimizations();
  });
};
