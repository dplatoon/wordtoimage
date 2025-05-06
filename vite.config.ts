
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imageOptimizer } from "./src/plugins/vite-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Create PostCSS configuration safely
  const postcssPlugins = [];
  
  try {
    // Dynamically import autoprefixer and cssnano
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');
    
    postcssPlugins.push(autoprefixer());
    postcssPlugins.push(cssnano({
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: mode === 'production',
      }]
    }));
  } catch (error) {
    console.warn('PostCSS plugins (autoprefixer, cssnano) could not be loaded:', error.message);
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      imageOptimizer(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      sourcemap: mode === 'development',
      target: "esnext",
      minify: "esbuild",
      cssMinify: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false, // Speed up build
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            ui: ['@/components/ui'],
            icons: ['lucide-react'],
            routing: ['react-router-dom'],
            forms: ['react-hook-form', 'zod', '@hookform/resolvers'],
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    },
    css: {
      devSourcemap: false,
      modules: {
        scopeBehaviour: 'local',
      },
      postcss: {
        plugins: postcssPlugins
      }
    },
  };
});
