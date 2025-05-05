
import { Plugin } from 'vite';

// Enhanced image optimizer plugin with more optimizations
export function imageOptimizer(): Plugin {
  return {
    name: 'image-optimizer',
    enforce: 'post',
    
    transformIndexHtml(html) {
      // Add resource hints for critical resources
      const resourceHints = [
        // Preload critical images
        '<link rel="preload" as="image" href="/lovable-uploads/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93.png" type="image/png" fetchpriority="high">',
        // Preconnect to important domains
        '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="preconnect" href="https://api.openai.com" crossorigin>',
        // DNS prefetch for other domains
        '<link rel="dns-prefetch" href="https://fonts.googleapis.com">',
      ].join('\n');
      
      // Add native lazy loading and other performance attributes to images
      let optimizedHtml = html.replace(/<img(?!.*?loading=)/g, '<img loading="lazy" decoding="async"');
      
      // Add preload hints
      optimizedHtml = optimizedHtml.replace('</head>', `${resourceHints}\n</head>`);
      
      // Add fetchpriority to hero images
      optimizedHtml = optimizedHtml.replace(
        /<img.*?src="\/lovable-uploads\/5cc3bb2f-158e-4a9d-8ff5-0efe1c96ab93\.png".*?>/g,
        match => match.includes('fetchpriority') ? match : match.replace('<img', '<img fetchpriority="high"')
      );
      
      return optimizedHtml;
    },
    
    configResolved(config) {
      console.log('✅ Enhanced image optimizer plugin enabled');
    }
  };
}
