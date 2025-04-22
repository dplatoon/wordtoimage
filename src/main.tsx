
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById("root");
if (!container) throw new Error('Root element not found');
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
