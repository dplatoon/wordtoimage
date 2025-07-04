import { useEffect } from 'react';

interface LighthouseOptimizations {
  preloadCriticalAssets: boolean;
  enableImageOptimization: boolean;
  reduceJavaScriptPayload: boolean;
  optimizeFonts: boolean;
  deferNonCriticalScripts: boolean;
}

export const EnhancedLighthouseOptimizer = ({
  preloadCriticalAssets = true,
  enableImageOptimization = true,
  reduceJavaScriptPayload = true,
  optimizeFonts = true,
  deferNonCriticalScripts = true
}: Partial<LighthouseOptimizations> = {}) => {
  
  useEffect(() => {
    console.log('🚀 Lighthouse Optimizer: Starting performance optimizations...');
    
    // 1. Preload Critical Assets for faster FCP/LCP
    if (preloadCriticalAssets) {
      preloadCriticalResources();
    }
    
    // 2. Optimize Images for faster loading
    if (enableImageOptimization) {
      optimizeImages();
    }
    
    // 3. Reduce JavaScript payload
    if (reduceJavaScriptPayload) {
      optimizeJavaScript();
    }
    
    // 4. Optimize fonts
    if (optimizeFonts) {
      optimizeFontLoading();
    }
    
    // 5. Defer non-critical scripts
    if (deferNonCriticalScripts) {
      deferScripts();
    }
    
    // Monitor and report improvements
    monitorPerformanceImprovements();
    
  }, [preloadCriticalAssets, enableImageOptimization, reduceJavaScriptPayload, optimizeFonts, deferNonCriticalScripts]);

  const preloadCriticalResources = () => {
    // Preload hero image for faster LCP
    const heroImageUrls = [
      'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=800&q=75',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=75'
    ];
    
    heroImageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = '/src/index.css';
    document.head.appendChild(criticalCSS);

    // Preload essential chunks
    const essentialChunks = ['/src/main.tsx', '/src/App.tsx'];
    essentialChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = chunk;
      document.head.appendChild(link);
    });

    console.log('✅ Critical resources preloaded');
  };

  const optimizeImages = () => {
    // Convert images to WebP when supported
    const images = document.querySelectorAll('img[src]');
    
    images.forEach((img: HTMLImageElement) => {
      if (!img.src.includes('webp')) {
        // Add intersection observer for lazy loading
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const originalSrc = img.src;
                
                // Try WebP first
                const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)/, '.webp');
                
                const testImg = new Image();
                testImg.onload = () => {
                  img.src = webpSrc;
                };
                testImg.onerror = () => {
                  // Keep original if WebP fails
                  console.log('WebP not available, keeping original');
                };
                testImg.src = webpSrc;
                
                observer.unobserve(img);
              }
            });
          },
          { threshold: 0.1, rootMargin: '50px' }
        );
        
        observer.observe(img);
      }
    });

    console.log('✅ Image optimization applied');
  };

  const optimizeJavaScript = () => {
    // Remove unused event listeners
    const cleanupUnusedListeners = () => {
      // Remove any duplicate analytics or tracking scripts
      const scripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"]');
      if (scripts.length > 1) {
        // Keep only the first one
        Array.from(scripts).slice(1).forEach(script => script.remove());
      }
    };

    // Defer non-critical JavaScript
    const deferredScripts = document.querySelectorAll('script:not([async]):not([defer]):not([type="module"])');
    deferredScripts.forEach((script: HTMLScriptElement) => {
      if (!script.src.includes('main') && !script.src.includes('critical')) {
        script.defer = true;
      }
    });

    // Clean up after 5 seconds
    setTimeout(cleanupUnusedListeners, 5000);

    console.log('✅ JavaScript optimization applied');
  };

  const optimizeFontLoading = () => {
    // Preload critical fonts
    const fontPreloads = [
      { family: 'Inter', weight: '400', display: 'swap' },
      { family: 'Inter', weight: '600', display: 'swap' }
    ];

    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `https://fonts.googleapis.com/css2?family=${font.family}:wght@${font.weight}&display=${font.display}`;
      document.head.appendChild(link);
    });

    // Add font-display: swap to existing fonts
    const fontFaces = document.querySelectorAll('style, link[href*="fonts"]');
    fontFaces.forEach(element => {
      if (element.textContent && !element.textContent.includes('font-display')) {
        element.textContent = element.textContent.replace(
          /font-family: ([^;]+);/g,
          'font-family: $1; font-display: swap;'
        );
      }
    });

    console.log('✅ Font optimization applied');
  };

  const deferScripts = () => {
    // Defer third-party scripts
    const thirdPartyScripts = [
      'gtag', 'analytics', 'tracking', 'social', 'chat', 'support'
    ];

    thirdPartyScripts.forEach(pattern => {
      const scripts = document.querySelectorAll(`script[src*="${pattern}"]`);
      scripts.forEach((script: HTMLScriptElement) => {
        if (!script.async && !script.defer) {
          script.defer = true;
        }
      });
    });

    // Load non-critical scripts after window load
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Load analytics after 2 seconds
        loadDeferredAnalytics();
      }, 2000);
    });

    console.log('✅ Script deferral applied');
  };

  const loadDeferredAnalytics = () => {
    // Only load analytics if not already loaded
    if (!window.gtag && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);
      
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      };
    }
  };

  const monitorPerformanceImprovements = () => {
    if ('PerformanceObserver' in window) {
      // Monitor LCP improvements
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        console.log(`📊 LCP after optimization: ${lcp.toFixed(2)}ms`);
        
        if (lcp < 2500) {
          console.log('🎉 LCP is now in good range (<2.5s)');
        } else if (lcp < 4000) {
          console.log('⚠️ LCP needs improvement (2.5s-4s)');
        } else {
          console.log('❌ LCP still poor (>4s)');
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor FCP improvements
      const fcpObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            console.log(`📊 FCP after optimization: ${fcp.toFixed(2)}ms`);
            
            if (fcp < 1800) {
              console.log('🎉 FCP is now in good range (<1.8s)');
            } else if (fcp < 3000) {
              console.log('⚠️ FCP needs improvement (1.8s-3s)');
            } else {
              console.log('❌ FCP still poor (>3s)');
            }
          }
        });
      });
      
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Generate performance report after optimizations
      setTimeout(() => {
        generateOptimizationReport();
      }, 10000);
    }
  };

  const generateOptimizationReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      optimizations: {
        criticalResourcesPreloaded: preloadCriticalAssets,
        imagesOptimized: enableImageOptimization,
        javascriptOptimized: reduceJavaScriptPayload,
        fontsOptimized: optimizeFonts,
        scriptsDeferred: deferNonCriticalScripts
      },
      recommendations: [
        'Consider implementing service worker for caching',
        'Use CDN for static assets',
        'Implement code splitting for large components',
        'Consider using skeleton screens for loading states',
        'Optimize third-party script loading'
      ]
    };

    console.log('📋 Lighthouse Optimization Report:', report);
    
    // Store in localStorage for debugging
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lighthouse-optimization-report', JSON.stringify(report));
    }
  };

  return null; // This component doesn't render anything
};
