
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';

// Initialize the application with performance optimizations
const initApp = () => {
  const container = document.getElementById("root");
  if (!container) throw new Error('Root element not found');
  
  // Remove loading indicator if it exists
  const loader = document.querySelector('.critical-loader');
  if (loader) {
    setTimeout(() => {
      loader.remove();
    }, 100);
  }
  
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  requestIdleCallback(initApp);
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initApp, 1);
}
