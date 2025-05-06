
import { Plugin } from 'vite';

// Enhanced image optimizer plugin with more optimizations
export function imageOptimizer(): Plugin {
  return {
    name: 'image-optimizer',
    enforce: 'post',
    
    transformIndexHtml(html) {
      // Add resource hints for critical resources
      const resourceHints = [
        // Preload critical logo image
        '<link rel="preload" as="image" href="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png" type="image/png" fetchpriority="high">',
        // Preconnect to important domains
        '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
      ].join('\n');
      
      // Add native lazy loading and other performance attributes to images
      let optimizedHtml = html.replace(/<img(?!.*?loading=)/g, '<img loading="lazy" decoding="async"');
      
      // Add preload hints
      optimizedHtml = optimizedHtml.replace('</head>', `${resourceHints}\n</head>`);
      
      return optimizedHtml;
    },
    
    configResolved() {
      console.log('✅ Image optimizer plugin enabled');
    }
  };
}
