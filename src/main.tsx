
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mobile viewport optimization
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.documentElement.classList.add('mobile-device');
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
  }
}

// Critical CSS injection - dark background to prevent flash of white
const criticalCSS = `
  body { font-family: system-ui, -apple-system, sans-serif; margin: 0; background: hsl(220 15% 5%); color: hsl(0 0% 95%); }
  .loading { opacity: 0; animation: fadeIn 0.3s ease-in-out forwards; }
  @keyframes fadeIn { to { opacity: 1; } }
  img { font-style: italic; background-repeat: no-repeat; background-size: cover; }
  @media(prefers-reduced-motion:reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }
`;

const style = document.createElement('style');
style.textContent = criticalCSS;
document.head.appendChild(style);

// Optimized React rendering
const root = ReactDOM.createRoot(document.getElementById('root')!);

React.startTransition(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// Cleanup blob URLs periodically
setInterval(() => {
  document.querySelectorAll('img[src^="blob:"]').forEach((img) => {
    const src = (img as HTMLImageElement).src;
    if (src.startsWith('blob:')) {
      URL.revokeObjectURL(src);
    }
  });
}, 300000);
