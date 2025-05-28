
import { Plugin } from 'vite';

export function performanceOptimizer(): Plugin {
  return {
    name: 'performance-optimizer',
    enforce: 'post',
    
    transformIndexHtml(html) {
      // Critical resource hints
      const resourceHints = [
        // Preload critical fonts with high priority
        '<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" as="style">',
        '<link rel="preload" href="https://fonts.gstatic.com" as="font" type="font/woff2" crossorigin>',
        
        // Preload critical images
        '<link rel="preload" as="image" href="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png" type="image/png" fetchpriority="high">',
        '<link rel="preload" as="image" href="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png" type="image/png" fetchpriority="high">',
        
        // DNS prefetch for external domains
        '<link rel="dns-prefetch" href="//fonts.googleapis.com">',
        '<link rel="dns-prefetch" href="//fonts.gstatic.com">',
        '<link rel="dns-prefetch" href="//images.unsplash.com">',
        
        // Preconnect to critical external domains
        '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        
        // Critical CSS inline to prevent FOUC
        `<style>
          body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",sans-serif;margin:0;background:#fff;color:#111827}
          img{max-width:100%;height:auto;font-style:italic;background-repeat:no-repeat;background-size:cover;shape-margin:1rem}
          .loading{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s infinite}
          @keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
          @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
        </style>`,
      ].join('\n');
      
      // Optimize images with native lazy loading and proper sizing
      let optimizedHtml = html
        // Add native lazy loading to all images except those marked as priority
        .replace(/<img(?!.*?loading=)(?!.*?fetchpriority="high")/g, '<img loading="lazy" decoding="async"')
        // Add proper caching headers hint
        .replace(/<meta charset="utf-8">/g, '<meta charset="utf-8">\n<meta http-equiv="Cache-Control" content="public, max-age=31536000">')
        // Add viewport meta if not present
        .replace(/<head>/g, '<head>\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">');
      
      // Optimize script loading - defer non-critical scripts
      optimizedHtml = optimizedHtml.replace(
        /<script(?!.*?async)(?!.*?defer)(?!.*?type="module")/g,
        '<script defer'
      );
      
      // Add resource hints before closing head
      optimizedHtml = optimizedHtml.replace('</head>', `${resourceHints}\n</head>`);
      
      // Add performance monitoring script
      const performanceScript = `
        <script>
          // Critical performance monitoring
          (function() {
            var perfData = window.performance;
            if (!perfData) return;
            
            window.addEventListener('load', function() {
              setTimeout(function() {
                var navigation = perfData.getEntriesByType('navigation')[0];
                if (navigation) {
                  var loadTime = navigation.loadEventEnd - navigation.fetchStart;
                  console.log('Page Load Time:', Math.round(loadTime) + 'ms');
                  
                  // Track slow loads
                  if (loadTime > 3000) {
                    console.warn('Slow page load detected:', Math.round(loadTime) + 'ms');
                  }
                }
                
                // Monitor resource loading
                var resources = perfData.getEntriesByType('resource');
                var slowResources = resources.filter(function(r) { return r.duration > 1000; });
                if (slowResources.length > 0) {
                  console.warn('Slow resources detected:', slowResources.map(function(r) { return r.name; }));
                }
              }, 0);
            });
          })();
        </script>
      `;
      
      optimizedHtml = optimizedHtml.replace('</body>', `${performanceScript}\n</body>`);
      
      return optimizedHtml;
    },
    
    generateBundle(options, bundle) {
      // Log bundle analysis
      const totalSize = Object.values(bundle).reduce((total, chunk) => {
        if ('code' in chunk) {
          return total + Buffer.byteLength(chunk.code, 'utf8');
        }
        return total;
      }, 0);
      
      console.log(`📦 Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
      
      // Warn about large chunks
      Object.entries(bundle).forEach(([name, chunk]) => {
        if ('code' in chunk) {
          const size = Buffer.byteLength(chunk.code, 'utf8');
          if (size > 500 * 1024) { // > 500KB
            console.warn(`⚠️  Large chunk detected: ${name} (${(size / 1024).toFixed(2)} KB)`);
          }
        }
      });
    },
    
    configResolved(config) {
      console.log('✅ Performance optimizer plugin enabled');
    }
  };
}
