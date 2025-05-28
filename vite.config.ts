
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { performanceOptimizer } from "./src/plugins/vite-performance-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    performanceOptimizer(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode === 'development',
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 500, // Warn for chunks > 500KB
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'icons': ['lucide-react'],
          'animation': ['framer-motion'],
          'forms': ['react-hook-form', '@hookform/resolvers'],
          'query': ['@tanstack/react-query'],
        },
        // Optimize chunk loading
        entryFileNames: (chunkInfo) => {
          return `assets/[name]-[hash].js`;
        },
        chunkFileNames: (chunkInfo) => {
          return `assets/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash].css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'lucide-react',
      '@tanstack/react-query'
    ],
    exclude: ['@vite/client', '@vite/env']
  }
}));
