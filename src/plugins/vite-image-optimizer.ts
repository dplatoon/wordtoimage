
import { Plugin } from 'vite';

// Enhanced image optimizer plugin with more optimizations
export function imageOptimizer(): Plugin {
  return {
    name: 'image-optimizer',
    enforce: 'post',
    
    transformIndexHtml(html) {
      // Add resource hints for critical resources
      const resourceHints = [
        // Preload critical images with high priority
        '<link rel="preload" as="image" href="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png" type="image/png" fetchpriority="high">',
        '<link rel="preload" as="image" href="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png" type="image/png" fetchpriority="high">',
        // Preconnect to important domains
        '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="preconnect" href="https://api.openai.com" crossorigin>',
        // DNS prefetch for other domains
        '<link rel="dns-prefetch" href="https://fonts.googleapis.com">',
        '<link rel="dns-prefetch" href="https://cdn.gpteng.co">',
        // Critical CSS inline
        '<style>body{font-family:system-ui,-apple-system,sans-serif;margin:0;background:#fff}img{max-width:100%;height:auto}</style>',
      ].join('\n');
      
      // Add native lazy loading and performance attributes to images
      let optimizedHtml = html.replace(/<img(?!.*?loading=)/g, '<img loading="lazy" decoding="async"');
      
      // Add fetchPriority to critical images
      optimizedHtml = optimizedHtml.replace(
        /<img.*?src="\/lovable-uploads\/(da1df0c4-3f9d-47c9-913f-1e5ed78bb52a|01102ecb-626e-44c0-983b-c6d90083b3ee)\.png".*?>/g,
        match => match.includes('fetchPriority') ? match : match.replace('<img', '<img fetchPriority="high"')
      );
      
      // Optimize script loading
      optimizedHtml = optimizedHtml.replace(
        /<script(?!.*?defer)(?!.*?async)/g,
        '<script defer'
      );
      
      // Add resource hints before closing head
      optimizedHtml = optimizedHtml.replace('</head>', `${resourceHints}\n</head>`);
      
      // Add performance observer script
      const performanceScript = `
        <script>
          window.addEventListener('load', function() {
            // Critical performance measurement
            if (window.performance && window.performance.getEntriesByType) {
              const navigation = window.performance.getEntriesByType('navigation')[0];
              if (navigation) {
                console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart + 'ms');
              }
            }
          });
        </script>
      `;
      optimizedHtml = optimizedHtml.replace('</body>', `${performanceScript}\n</body>`);
      
      return optimizedHtml;
    },
    
    configResolved(config) {
      console.log('✅ Enhanced image optimizer plugin enabled with performance monitoring');
    }
  };
}
