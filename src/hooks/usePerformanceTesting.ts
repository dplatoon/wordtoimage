
import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  
  // Additional metrics
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  domContentLoaded: number | null;
  loadComplete: number | null;
  
  // Mobile-specific
  memoryUsage: any | null;
  connectionType: string | null;
  
  // Bundle analysis
  totalBundleSize: number | null;
  resourceCount: number;
  slowResources: string[];
}

interface PerformanceComparison {
  before: Partial<PerformanceMetrics>;
  after: Partial<PerformanceMetrics>;
  improvements: Record<string, number>;
}

export const usePerformanceTesting = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    domContentLoaded: null,
    loadComplete: null,
    memoryUsage: null,
    connectionType: null,
    totalBundleSize: null,
    resourceCount: 0,
    slowResources: []
  });

  const [isTestingComplete, setIsTestingComplete] = useState(false);

  // Measure Core Web Vitals
  const measureWebVitals = useCallback(() => {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      setMetrics(prev => ({ ...prev, lcp: Math.round(lastEntry.startTime) }));
      console.log('📊 LCP:', Math.round(lastEntry.startTime), 'ms');
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        setMetrics(prev => ({ ...prev, fid: Math.round(fid) }));
        console.log('📊 FID:', Math.round(fid), 'ms');
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setMetrics(prev => ({ ...prev, cls: parseFloat(clsValue.toFixed(4)) }));
      console.log('📊 CLS:', clsValue.toFixed(4));
    }).observe({ entryTypes: ['layout-shift'] });

    // FCP (First Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }));
        console.log('📊 FCP:', Math.round(entry.startTime), 'ms');
      });
    }).observe({ entryTypes: ['paint'] });
  }, []);

  // Measure navigation timing
  const measureNavigationTiming = useCallback(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.fetchStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      const loadComplete = navigation.loadEventEnd - navigation.fetchStart;

      setMetrics(prev => ({
        ...prev,
        ttfb: Math.round(ttfb),
        domContentLoaded: Math.round(domContentLoaded),
        loadComplete: Math.round(loadComplete)
      }));

      console.log('📊 TTFB:', Math.round(ttfb), 'ms');
      console.log('📊 DOM Content Loaded:', Math.round(domContentLoaded), 'ms');
      console.log('📊 Load Complete:', Math.round(loadComplete), 'ms');
    }
  }, []);

  // Measure memory usage
  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryInfo = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
      
      setMetrics(prev => ({ ...prev, memoryUsage: memoryInfo }));
      console.log('📊 Memory Usage:', memoryInfo);
    }
  }, []);

  // Analyze resources
  const analyzeResources = useCallback(() => {
    const resources = performance.getEntriesByType('resource');
    const totalSize = resources.reduce((total: number, resource: any) => {
      return total + (resource.transferSize || 0);
    }, 0);

    const slowResources = resources
      .filter((resource: any) => resource.duration > 1000)
      .map((resource: any) => resource.name);

    setMetrics(prev => ({
      ...prev,
      totalBundleSize: Math.round(totalSize / 1024), // KB
      resourceCount: resources.length,
      slowResources
    }));

    console.log('📊 Total Bundle Size:', Math.round(totalSize / 1024), 'KB');
    console.log('📊 Resource Count:', resources.length);
    if (slowResources.length > 0) {
      console.log('⚠️ Slow Resources:', slowResources);
    }
  }, []);

  // Get connection info
  const getConnectionInfo = useCallback(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const connectionType = connection?.effectiveType || 'unknown';
      setMetrics(prev => ({ ...prev, connectionType }));
      console.log('📊 Connection Type:', connectionType);
    }
  }, []);

  // Run all tests
  const runPerformanceTest = useCallback(() => {
    console.log('🚀 Starting Performance Test...');
    
    measureWebVitals();
    measureNavigationTiming();
    measureMemoryUsage();
    analyzeResources();
    getConnectionInfo();
    
    setTimeout(() => {
      setIsTestingComplete(true);
      console.log('✅ Performance Test Complete');
    }, 3000);
  }, [measureWebVitals, measureNavigationTiming, measureMemoryUsage, analyzeResources, getConnectionInfo]);

  // Generate performance score
  const generatePerformanceScore = useCallback((): number => {
    let score = 100;

    // LCP scoring (0-2.5s = good, 2.5-4s = needs improvement, >4s = poor)
    if (metrics.lcp) {
      if (metrics.lcp > 4000) score -= 30;
      else if (metrics.lcp > 2500) score -= 15;
    }

    // FID scoring (0-100ms = good, 100-300ms = needs improvement, >300ms = poor)
    if (metrics.fid) {
      if (metrics.fid > 300) score -= 25;
      else if (metrics.fid > 100) score -= 10;
    }

    // CLS scoring (0-0.1 = good, 0.1-0.25 = needs improvement, >0.25 = poor)
    if (metrics.cls) {
      if (metrics.cls > 0.25) score -= 25;
      else if (metrics.cls > 0.1) score -= 10;
    }

    // Bundle size penalty
    if (metrics.totalBundleSize && metrics.totalBundleSize > 1000) {
      score -= Math.min(20, (metrics.totalBundleSize - 1000) / 100);
    }

    return Math.max(0, Math.round(score));
  }, [metrics]);

  // Export results
  const exportResults = useCallback(() => {
    const results = {
      timestamp: new Date().toISOString(),
      metrics,
      score: generatePerformanceScore(),
      recommendations: generateRecommendations()
    };
    
    console.log('📈 Performance Results:', results);
    return results;
  }, [metrics, generatePerformanceScore]);

  // Generate recommendations
  const generateRecommendations = useCallback((): string[] => {
    const recommendations = [];

    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('Optimize LCP by preloading critical images and reducing render-blocking resources');
    }

    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('Reduce FID by breaking up long tasks and optimizing JavaScript execution');
    }

    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('Improve CLS by setting dimensions on images and avoiding layout shifts');
    }

    if (metrics.totalBundleSize && metrics.totalBundleSize > 1000) {
      recommendations.push('Reduce bundle size with code splitting and tree shaking');
    }

    if (metrics.slowResources.length > 0) {
      recommendations.push('Optimize slow-loading resources or consider lazy loading');
    }

    return recommendations;
  }, [metrics]);

  useEffect(() => {
    // Auto-run test when component mounts
    const timer = setTimeout(() => {
      runPerformanceTest();
    }, 1000);

    return () => clearTimeout(timer);
  }, [runPerformanceTest]);

  return {
    metrics,
    isTestingComplete,
    runPerformanceTest,
    generatePerformanceScore,
    exportResults,
    generateRecommendations
  };
};
