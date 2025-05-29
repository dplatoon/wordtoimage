
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { enhancedPerformanceOptimizer } from "./src/plugins/vite-enhanced-performance";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    enhancedPerformanceOptimizer(),
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
    cssCodeSplit: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 400, // Stricter limit for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunks
          'react-core': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // UI library chunks
          'ui-primitives': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'ui-components': ['@radix-ui/react-accordion', '@radix-ui/react-tabs', '@radix-ui/react-select'],
          
          // Utility chunks
          'icons': ['lucide-react'],
          'animation': ['framer-motion'],
          'forms': ['react-hook-form', '@hookform/resolvers'],
          'data': ['@tanstack/react-query'],
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        // Optimize chunk file names for caching
        entryFileNames: (chunkInfo) => {
          return `assets/[name]-[hash].js`;
        },
        chunkFileNames: (chunkInfo) => {
          return chunkInfo.name === 'vendor' 
            ? `assets/vendor-[hash].js`
            : `assets/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/styles-[hash].css';
          }
          if (assetInfo.name?.match(/\.(png|jpe?g|gif|svg|webp|avif)$/)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Enhanced build optimizations
    reportCompressedSize: false, // Faster builds
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log'] : [],
      },
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'lucide-react',
      '@tanstack/react-query',
      'framer-motion',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  // CSS optimizations
  css: {
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
}));
