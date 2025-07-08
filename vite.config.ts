
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imageOptimizer } from "./src/plugins/vite-image-optimizer";

export default defineConfig(({ command, mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(command === 'serve' ? [componentTagger()] : []),
    imageOptimizer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React chunks
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // UI Library chunks
          'radix-ui': [
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-tooltip'
          ],
          
          // Heavy dependencies
          'heavy-deps': ['@tanstack/react-query', 'react-helmet-async'],
          
          // Icons and utils
          'icons-utils': ['lucide-react', 'clsx', 'tailwind-merge'],
          
          // Charts and analytics (lazy loaded)
          'charts': ['recharts'],
          
          // Supabase and auth
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'terser' : false,
    chunkSizeWarningLimit: 1000, // Increase to reduce warnings
    ...(mode === 'production' && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
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
      '@radix-ui/react-toast'
    ],
    exclude: ['@tanstack/react-query'] // Let this be dynamically imported
  },
}));
