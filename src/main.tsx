
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initPerformanceMonitoring } from './utils/performance';
import { initServiceWorker, preloadCriticalResources } from './utils/serviceWorker';

// Initialize performance monitoring
initPerformanceMonitoring();

// Mark critical rendering start
if (typeof performance !== 'undefined') {
  performance.mark('react-render-start');
}

// Preload critical resources immediately
preloadCriticalResources();

// Initialize service worker for offline functionality
if (import.meta.env.PROD) {
  initServiceWorker().catch(console.error);
}

// Mobile-specific optimizations
if ('connection' in navigator) {
  const connection = (navigator as any).connection;
  
  // Adjust rendering based on connection speed
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    // Reduce rendering complexity for slow connections
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Data saver mode
  if (connection.saveData) {
    document.documentElement.classList.add('data-saver');
  }
}

// Optimize for mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
  document.documentElement.classList.add('mobile-device');
  
  // Disable hover effects on mobile
  document.documentElement.style.setProperty('--enable-hover', '0');
  
  // Optimize viewport for mobile
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Mark rendering complete
if (typeof performance !== 'undefined') {
  performance.mark('react-render-end');
  performance.measure('react-render-time', 'react-render-start', 'react-render-end');
}

// Register offline event listeners
window.addEventListener('online', () => {
  console.log('App is back online');
  document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  document.body.classList.add('offline');
});
