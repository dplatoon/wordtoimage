
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface BrokenLinkCheckerProps {
  enabled?: boolean;
  checkInterval?: number; // in milliseconds
}

export const BrokenLinkChecker = ({ 
  enabled = false, 
  checkInterval = 300000 // 5 minutes
}: BrokenLinkCheckerProps) => {
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkLinks = async () => {
    if (!enabled) return;
    
    setIsChecking(true);
    const links = Array.from(document.querySelectorAll('a[href]'));
    const brokenUrls: string[] = [];

    for (const link of links) {
      const href = (link as HTMLAnchorElement).href;
      
      // Skip internal links and non-http links
      if (!href.startsWith('http') || href.includes(window.location.hostname)) {
        continue;
      }

      try {
        const response = await fetch(href, { method: 'HEAD', mode: 'no-cors' });
        // Note: no-cors mode will not give us status, so we assume success if no error
      } catch (error) {
        brokenUrls.push(href);
        console.warn(`Broken link detected: ${href}`, error);
      }
    }

    setBrokenLinks(brokenUrls);
    setIsChecking(false);

    if (brokenUrls.length > 0) {
      toast.error(`Found ${brokenUrls.length} broken link(s)`, {
        description: 'Check console for details'
      });
    }
  };

  useEffect(() => {
    if (!enabled) return;

    // Initial check
    checkLinks();

    // Set up interval checking
    const interval = setInterval(checkLinks, checkInterval);
    return () => clearInterval(interval);
  }, [enabled, checkInterval]);

  if (!enabled || brokenLinks.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm">
      <div className="flex items-center gap-2 text-red-700">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm font-medium">
          {brokenLinks.length} broken link(s) detected
        </span>
      </div>
    </div>
  );
};
