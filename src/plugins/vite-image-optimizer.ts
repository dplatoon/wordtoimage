
import { Plugin } from 'vite';

// Enhanced image optimizer plugin with more optimizations
export function imageOptimizer(): Plugin {
  return {
    name: 'image-optimizer',
    enforce: 'post',
    
    transformIndexHtml(html) {
      try {
        // Add resource hints for critical resources
        const resourceHints = [
          // Preload critical logo image
          '<link rel="preload" as="image" href="/lovable-uploads/01102ecb-626e-44c0-983b-c6d90083b3ee.png" type="image/png" fetchpriority="high">',
          // Preconnect to important domains
          '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>',
          '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
          '<link rel="preconnect" href="https://api.openai.com" crossorigin>',
          // DNS prefetch for other domains
          '<link rel="dns-prefetch" href="https://fonts.googleapis.com">',
          '<link rel="dns-prefetch" href="https://images.unsplash.com">',
        ].join('\n');
        
        // Add native lazy loading and other performance attributes to images
        let optimizedHtml = html.replace(/<img(?!.*?loading=)/g, '<img loading="lazy" decoding="async"');
        
        // Add sizes attribute to images that don't have it
        optimizedHtml = optimizedHtml.replace(/<img(?!.*?sizes=)/g, '<img sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"');
        
        // Add width and height attributes to images that don't have them to avoid layout shifts
        optimizedHtml = optimizedHtml.replace(/<img(?!.*?(width|height)=)/g, '<img width="300" height="300"');
        
        // Add preload hints
        optimizedHtml = optimizedHtml.replace('</head>', `${resourceHints}\n</head>`);
        
        // Add fetchpriority to hero images
        optimizedHtml = optimizedHtml.replace(
          /<img.*?src="\/lovable-uploads\/01102ecb-626e-44c0-983b-c6d90083b3ee\.png".*?>/g,
          match => match.includes('fetchpriority') ? match : match.replace('<img', '<img fetchpriority="high"')
        );
        
        return optimizedHtml;
      } catch (error) {
        console.error('Image optimizer plugin error:', error);
        return html; // Return unmodified HTML if optimization fails
      }
    },
    
    configResolved() {
      console.log('✅ Enhanced image optimizer plugin enabled');
    }
  };
}
