
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
    chunkSizeWarningLimit: 300, // Smaller chunks for mobile
    rollupOptions: {
      output: {
        manualChunks: {
          // Optimized vendor chunks for mobile
          'react-core': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-core': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'ui-extended': ['@radix-ui/react-toast', '@radix-ui/react-tooltip'],
          'icons': ['lucide-react'],
          'forms': ['react-hook-form', '@hookform/resolvers'],
          'query': ['@tanstack/react-query'],
        },
        // Optimize for mobile loading
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
  },
  // Mobile-specific optimizations
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    '__MOBILE_OPTIMIZED__': true
  }
}));
