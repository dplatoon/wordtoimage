
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ command, mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(command === 'serve' ? [componentTagger()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome90',
    rollupOptions: {
      output: {
        // Aggressive code splitting for better performance
        manualChunks: {
          // Core React chunk (smallest possible)
          'react-core': ['react', 'react-dom'],
          
          // Router chunk
          'router': ['react-router-dom'],
          
          // UI components - split by usage
          'ui-core': [
            '@radix-ui/react-slot',
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast'
          ],
          
          // Form components
          'ui-forms': [
            '@radix-ui/react-select',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            'react-hook-form'
          ],
          
          // Data fetching
          'data': ['@tanstack/react-query'],
          
          // Auth
          'auth': ['@supabase/supabase-js'],
          
          // Icons and utilities
          'utils': ['lucide-react', 'clsx', 'tailwind-merge'],
          
          // Charts (lazy loaded)
          'charts': ['recharts'],
        },
        
        // Optimize file naming for caching
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|webp|avif/i.test(extType)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps for production
    minify: mode === 'production' ? 'terser' : false,
    chunkSizeWarningLimit: 500, // Smaller chunks
    ...(mode === 'production' && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        },
        mangle: {
          safari10: true,
        },
      },
    }),
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@radix-ui/react-slot',
      '@radix-ui/react-toast',
      '@tanstack/react-query'
    ],
  },
}));
