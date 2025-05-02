
import { Plugin } from 'vite';
import { resolve } from 'path';

// Simple plugin to add image optimization hints
export function imageOptimizer(): Plugin {
  return {
    name: 'image-optimizer',
    enforce: 'post',
    
    transformIndexHtml(html) {
      // Add preloading hints for critical resources
      const preloadHints = [
        '<link rel="preload" as="image" href="/lovable-uploads/610669b3-849e-4ee2-a163-df90a0e6704e.png" type="image/png" fetchpriority="high">'
      ].join('\n');
      
      return html.replace('</head>', `${preloadHints}\n</head>`);
    },
    
    configResolved(config) {
      console.log('✅ Image optimizer plugin enabled');
    }
  };
}
