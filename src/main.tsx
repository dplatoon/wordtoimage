
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// Performance optimizations
import { initPerformanceOptimizations, optimizeImageLoading, trackCoreWebVitals } from './utils/performance/performanceUtils';

// Initialize performance monitoring immediately
// Performance monitoring temporarily disabled

// Mark critical rendering start
if (typeof performance !== 'undefined') {
  performance.mark('react-render-start');
}

// Initialize all performance optimizations
initPerformanceOptimizations().catch(console.error);

// Additional optimizations after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  optimizeImageLoading();
  trackCoreWebVitals();
});

// Mobile-specific optimizations
if ('connection' in navigator) {
  const connection = (navigator as any).connection;
  
  // Adjust rendering based on connection speed
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    document.documentElement.classList.add('reduced-motion');
    console.log('📶 Slow connection detected - optimizations applied');
  }
  
  // Data saver mode
  if (connection.saveData) {
    document.documentElement.classList.add('data-saver');
    console.log('💾 Data saver mode detected');
  }
}

// Optimize for mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
  document.documentElement.classList.add('mobile-device');
  
  // Disable hover effects on mobile to improve touch performance
  document.documentElement.style.setProperty('--enable-hover', '0');
  
  // Optimize viewport for mobile with proper scaling
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover');
  }
  
  console.log('📱 Mobile optimizations applied');
}

// Critical CSS injection for immediate rendering
const injectCriticalCSS = () => {
  const criticalCSS = `
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; background: #fff; }
    .hero-section { min-height: 80vh; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); }
    .loading { opacity: 0; animation: fadeIn 0.3s ease-in-out forwards; }
    @keyframes fadeIn { to { opacity: 1; } }
    img { font-style: italic; background-repeat: no-repeat; background-size: cover; }
    @media(prefers-reduced-motion:reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  style.id = 'critical-css';
  document.head.appendChild(style);
};

// Inject critical CSS immediately
injectCriticalCSS();

// Optimize React rendering with concurrent features
const root = ReactDOM.createRoot(document.getElementById('root')!, {
  // Enable concurrent features for better performance
  identifierPrefix: 'wordtoimage'
});

// Use startTransition for non-urgent updates
React.startTransition(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// Mark rendering complete and measure performance
if (typeof performance !== 'undefined') {
  performance.mark('react-render-end');
  
  // Measure after paint
  requestAnimationFrame(() => {
    performance.measure('react-render-time', 'react-render-start', 'react-render-end');
    
    const measure = performance.getEntriesByName('react-render-time')[0];
    if (measure) {
      console.log(`⚡ React render time: ${measure.duration.toFixed(2)}ms`);
    }
  });
}

// Register network status listeners for performance adaptation
window.addEventListener('online', () => {
  console.log('🌐 App is back online');
  document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
  console.log('📴 App is offline - cached content available');
  document.body.classList.add('offline');
});

// Clean up resources periodically to prevent memory leaks
setInterval(() => {
  // Clean up blob URLs
  document.querySelectorAll('img[src^="blob:"]').forEach((img) => {
    const src = (img as HTMLImageElement).src;
    if (src.startsWith('blob:')) {
      URL.revokeObjectURL(src);
    }
  });
}, 300000); // Every 5 minutes

// Preload next likely navigation targets after initial load
window.addEventListener('load', () => {
  setTimeout(() => {
    ['/text-to-image', '/pdf-to-jpg', '/jpg-to-pdf'].forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }, 2000);
});
