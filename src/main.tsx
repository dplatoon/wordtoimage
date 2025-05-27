
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initPerformanceMonitoring } from './utils/performance';

// Initialize performance monitoring
initPerformanceMonitoring();

// Mark critical rendering start
if (typeof performance !== 'undefined') {
  performance.mark('react-render-start');
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
