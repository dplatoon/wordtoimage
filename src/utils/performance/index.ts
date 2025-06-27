
// Main PerformanceOptimizer class - refactored and simplified
import { WebVitalsMonitor } from './webVitalsMonitor';
import { ResourceOptimizer } from './resourceOptimizer';
import { PerformanceReporter } from './performanceReporter';

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private webVitalsMonitor: WebVitalsMonitor;
  private resourceOptimizer: ResourceOptimizer;
  private performanceReporter: PerformanceReporter;

  private constructor() {
    this.webVitalsMonitor = new WebVitalsMonitor();
    this.resourceOptimizer = new ResourceOptimizer();
    this.performanceReporter = new PerformanceReporter(this.webVitalsMonitor.getMetrics());
  }

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Delegate methods to respective modules
  preloadCriticalResources(): void {
    this.resourceOptimizer.preloadCriticalResources();
  }

  optimizeImageSrc(src: string, width: number, quality: number = 75): string {
    return this.resourceOptimizer.optimizeImageSrc(src, width, quality);
  }

  generateResponsiveSources(baseSrc: string) {
    return this.resourceOptimizer.generateResponsiveSources(baseSrc);
  }

  initWebVitalsMonitoring(): void {
    this.webVitalsMonitor.initWebVitalsMonitoring();
  }

  cleanupResources(): void {
    this.resourceOptimizer.cleanupResources();
  }

  generatePerformanceReport() {
    return this.performanceReporter.generatePerformanceReport();
  }

  // Initialize all optimizations
  init(): void {
    console.log('🚀 Initializing Performance Optimizer...');
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Start monitoring
    this.initWebVitalsMonitoring();
    
    // Set up periodic cleanup
    setInterval(() => {
      this.cleanupResources();
    }, 300000); // Every 5 minutes
    
    // Generate performance report after initial load
    setTimeout(() => {
      this.generatePerformanceReport();
    }, 5000);
    
    console.log('✅ Performance optimizer initialized');
  }
}

// Export individual modules
export { WebVitalsMonitor } from './webVitalsMonitor';
export { ResourceOptimizer } from './resourceOptimizer';
export { PerformanceReporter } from './performanceReporter';
export { initPerformanceOptimizations } from './performanceUtils';
