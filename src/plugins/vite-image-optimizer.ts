
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
        '<link rel="preload" as="image" href="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png" type="image/png" fetchpriority="high">',
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
      
      // Add fetchPriority to hero images (using correct capitalization)
      optimizedHtml = optimizedHtml.replace(
        /<img.*?src="\/lovable-uploads\/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a\.png".*?>/g,
        match => match.includes('fetchPriority') ? match : match.replace('<img', '<img fetchPriority="high"')
      );
      
      return optimizedHtml;
    },
    
    configResolved(config) {
      console.log('✅ Enhanced image optimizer plugin enabled');
    }
  };
}
