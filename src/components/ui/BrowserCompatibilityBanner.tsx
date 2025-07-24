import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { detectBrowser, showBrowserCompatibilityWarning, getRecommendedBrowser } from '@/utils/browserCompatibility';

interface BrowserCompatibilityBannerProps {
  feature?: string;
  showAlways?: boolean;
}

export const BrowserCompatibilityBanner = ({ 
  feature, 
  showAlways = false 
}: BrowserCompatibilityBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bannerType, setBannerType] = useState<'warning' | 'info' | 'error'>('info');
  const [message, setMessage] = useState('');
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    // Check if banner has been dismissed
    const dismissed = localStorage.getItem('browser-compatibility-dismissed');
    if (dismissed && !showAlways) {
      setHasBeenDismissed(true);
      return;
    }

    const browser = detectBrowser();
    
    if (!browser.isSupported) {
      setBannerType('error');
      setMessage('Your browser may not support all features. Please update to a modern browser for the best experience.');
      setIsVisible(true);
      return;
    }

    if (feature) {
      const warning = showBrowserCompatibilityWarning(feature);
      if (warning) {
        setBannerType('warning');
        setMessage(warning);
        setIsVisible(true);
        return;
      }
    }

    // Show general recommendation for non-optimal browsers
    if (!browser.features.webgpu && !hasBeenDismissed) {
      setBannerType('info');
      setMessage(getRecommendedBrowser());
      setIsVisible(true);
    }
  }, [feature, showAlways, hasBeenDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('browser-compatibility-dismissed', 'true');
    setHasBeenDismissed(true);
  };

  const handleLearnMore = () => {
    window.open('https://caniuse.com/webgpu', '_blank');
  };

  if (!isVisible || hasBeenDismissed) return null;

  const getIcon = () => {
    switch (bannerType) {
      case 'error':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (bannerType) {
      case 'error':
        return 'destructive' as const;
      case 'warning':
        return 'default' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <Alert variant={getVariant()} className="mb-4 border-l-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {getIcon()}
          <AlertDescription className="flex-1">
            {message}
          </AlertDescription>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {bannerType !== 'info' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLearnMore}
              className="text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Learn More
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Alert>
  );
};