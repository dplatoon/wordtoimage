
import { Plugin } from 'vite';

export function enhancedPerformanceOptimizer(): Plugin {
  return {
    name: 'enhanced-performance-optimizer',
    enforce: 'post',
    
    transformIndexHtml(html) {
      // Critical performance optimizations
      const performanceOptimizations = [
        // Preload critical resources with high priority
        '<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" as="style" fetchpriority="high">',
        '<link rel="preload" href="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png" as="image" type="image/png" fetchpriority="high">',
        '<link rel="preload" href="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png" as="image" type="image/png" fetchpriority="high">',
        
        // Enhanced preconnect for critical domains
        '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="dns-prefetch" href="//images.unsplash.com">',
        
        // Critical CSS to prevent FOUC and layout shifts
        `<style>
          *{box-sizing:border-box}
          body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Inter",sans-serif;margin:0;background:#fff;color:#111827;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          img,picture,video,canvas,svg{display:block;max-width:100%;height:auto;font-style:italic;background-repeat:no-repeat;background-size:cover;shape-margin:1rem}
          img[data-src]{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s infinite}
          @keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
          .aspect-ratio-16-9{aspect-ratio:16/9}
          .aspect-ratio-4-3{aspect-ratio:4/3}
          .aspect-ratio-1-1{aspect-ratio:1/1}
          @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
          .loading-skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s infinite}
        </style>`,
        
        // Resource hints for modern image formats
        '<link rel="preload" as="image" type="image/avif" href="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.avif" media="(min-width: 768px)">',
        '<link rel="preload" as="image" type="image/webp" href="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.webp" media="(max-width: 767px)">',
      ].join('\n');
      
      // Optimize images with modern formats and proper attributes
      let optimizedHtml = html
        // Add native lazy loading with improved attributes
        .replace(/<img(?!.*?loading=)(?!.*?fetchpriority="high")/g, '<img loading="lazy" decoding="async"')
        // Add aspect ratio to prevent layout shifts
        .replace(/<img(?!.*?style=.*aspect-ratio)/g, '<img style="aspect-ratio: attr(width) / attr(height);"')
        // Optimize viewport meta
        .replace(/<meta name="viewport"[^>]*>/g, '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">')
        // Add performance hints
        .replace(/<head>/g, '<head>\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="format-detection" content="telephone=no">');
      
      // Defer non-critical scripts
      optimizedHtml = optimizedHtml.replace(
        /<script(?!.*?async)(?!.*?defer)(?!.*?type="module")(?!.*?data-critical)/g,
        '<script defer'
      );
      
      // Optimize CSS loading
      optimizedHtml = optimizedHtml.replace(
        /<link rel="stylesheet"(?!.*?data-critical)/g,
        '<link rel="stylesheet" media="print" onload="this.media=\'all\'"'
      );
      
      // Add performance optimizations before closing head
      optimizedHtml = optimizedHtml.replace('</head>', `${performanceOptimizations}\n</head>`);
      
      // Add enhanced performance monitoring script
      const performanceScript = `
        <script data-critical>
          (function() {
            var perfData = window.performance;
            if (!perfData) return;
            
            // Track Core Web Vitals
            var observer = new PerformanceObserver(function(list) {
              list.getEntries().forEach(function(entry) {
                if (entry.entryType === 'largest-contentful-paint') {
                  var lcp = Math.round(entry.startTime);
                  console.log('LCP:', lcp + 'ms', lcp > 2500 ? '⚠️ Slow' : '✅ Good');
                }
                if (entry.entryType === 'first-input') {
                  var fid = Math.round(entry.processingStart - entry.startTime);
                  console.log('FID:', fid + 'ms', fid > 100 ? '⚠️ Slow' : '✅ Good');
                }
                if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                  console.log('CLS shift detected:', entry.value.toFixed(4));
                }
              });
            });
            
            if ('observe' in observer) {
              observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
            }
            
            // Track page load performance
            window.addEventListener('load', function() {
              setTimeout(function() {
                var navigation = perfData.getEntriesByType('navigation')[0];
                if (navigation) {
                  var loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
                  console.log('Page Load:', loadTime + 'ms', loadTime > 3000 ? '⚠️ Slow' : '✅ Good');
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
      // Enhanced bundle analysis
      const chunks = Object.entries(bundle).filter(([, chunk]) => 'code' in chunk);
      const totalSize = chunks.reduce((total, [, chunk]) => {
        return total + Buffer.byteLength((chunk as any).code, 'utf8');
      }, 0);
      
      console.log(`📦 Bundle Analysis:`);
      console.log(`   Total size: ${(totalSize / 1024).toFixed(2)} KB`);
      
      // Warn about large chunks with suggestions
      chunks.forEach(([name, chunk]) => {
        const size = Buffer.byteLength((chunk as any).code, 'utf8');
        const sizeKB = (size / 1024).toFixed(2);
        
        if (size > 500 * 1024) {
          console.warn(`⚠️  Large chunk: ${name} (${sizeKB} KB) - Consider code splitting`);
        } else if (size > 200 * 1024) {
          console.log(`📄 Chunk: ${name} (${sizeKB} KB)`);
        }
      });
      
      // Performance recommendations
      if (totalSize > 1024 * 1024) {
        console.warn('💡 Bundle is large. Consider:');
        console.warn('   - Dynamic imports for non-critical code');
        console.warn('   - Tree shaking unused dependencies');
        console.warn('   - Code splitting by route');
      }
    },
    
    configResolved(config) {
      console.log('🚀 Enhanced performance optimizer plugin enabled');
      
      // Optimize build settings
      if (config.build) {
        config.build.cssCodeSplit = true;
        config.build.minify = 'esbuild';
        config.build.target = 'es2020';
      }
    }
  };
}
