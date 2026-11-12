
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

// Mobile viewport optimization
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.documentElement.classList.add('mobile-device');
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
  }
}

// Optimized React rendering
const root = ReactDOM.createRoot(document.getElementById('root')!);

React.startTransition(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
