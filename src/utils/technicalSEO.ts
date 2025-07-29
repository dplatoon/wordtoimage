
// Technical SEO utilities for WordToImage

export const generateCanonicalUrl = (pathname: string): string => {
  const baseUrl = 'https://wordtoimage.online';
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  return `${baseUrl}${normalizedPath}`;
};

export const setupRedirects = () => {
  // Client-side redirect handling for secondary domains
  const currentHost = window.location.hostname;
  const primaryDomain = 'wordtoimage.online';
  
  // List of secondary domains that should redirect to primary
  const secondaryDomains = [
    'wordtoimage.xyz',
    'wordtoimage.org',
    'wordtoimage.com',
    'wordtoimage.net'
  ];
  
  if (secondaryDomains.includes(currentHost)) {
    const newUrl = `https://${primaryDomain}${window.location.pathname}${window.location.search}`;
    window.location.replace(newUrl);
  }
};

export const preventDuplicateContent = () => {
  // Add trailing slash handling
  const currentPath = window.location.pathname;
  const hasTrailingSlash = currentPath.endsWith('/') && currentPath !== '/';
  
  if (hasTrailingSlash) {
    const newPath = currentPath.slice(0, -1);
    const newUrl = `${window.location.origin}${newPath}${window.location.search}`;
    window.history.replaceState(null, '', newUrl);
  }
};

// Auto-generate sitemap entries for dynamic content
export const generateSitemapEntry = (
  url: string,
  lastmod: string = new Date().toISOString().split('T')[0],
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly',
  priority: number = 0.5
) => {
  return {
    loc: `https://wordtoimage.online${url}`,
    lastmod,
    changefreq,
    priority,
    mobile: true
  };
};

// Submit sitemap to search engines
export const submitSitemapToSearchEngines = async () => {
  const sitemapUrl = 'https://wordtoimage.online/sitemap.xml';
  
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];
  
  try {
    await Promise.all(
      searchEngines.map(url => 
        fetch(url, { mode: 'no-cors' }).catch(() => {
          // Silently fail for CORS issues, this is expected
        })
      )
    );
    console.log('Sitemap submitted to search engines');
  } catch (error) {
    console.log('Sitemap submission completed (some may have CORS restrictions)');
  }
};
