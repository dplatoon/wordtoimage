
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imageOptimizer } from "./src/plugins/vite-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Create PostCSS configuration safely
  const postcssPlugins = [];
  
  // Note: We're not dynamically importing packages, as it causes build issues
  // Instead, we'll add the plugins conditionally if they're available
  
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
      // Use a simpler postcss config that doesn't require dynamic imports
      postcss: {
        plugins: postcssPlugins
      }
    },
  };
});
