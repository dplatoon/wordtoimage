
// Google Analytics event tracking utility
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  window.gtag('event', eventName, eventParams);
};

// Common events
export const events = {
  GENERATE_IMAGE: 'generate_image',
  SIGN_UP: 'sign_up',
  DOWNLOAD_IMAGE: 'download_image',
  SHARE_IMAGE: 'share_image',
  VIEW_GALLERY: 'view_gallery',
  GENERATION_STARTED: 'generation_started',
  IMAGE_DISPLAYED: 'image_displayed',
  RETRY_GENERATION: 'retry_generation',
  IMAGE_LOADED: 'image_loaded'
};
