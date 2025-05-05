
// Define all events that we want to track
export const events = {
  GENERATE_IMAGE: 'generate_image',
  SIGN_UP: 'sign_up',
  SIGN_OUT: 'sign_out',
  DOWNLOAD_IMAGE: 'download_image',
  SHARE_IMAGE: 'share_image',
  VIEW_GALLERY: 'view_gallery',
  GENERATION_STARTED: 'generation_started',
  IMAGE_DISPLAYED: 'image_displayed',
  RETRY_GENERATION: 'retry_generation',
  IMAGE_LOADED: 'image_loaded',
};

// Simple analytics tracking function
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // In a real app, this would send the event to your analytics platform
  console.log(`[Analytics] Event: ${eventName}`, properties || {});
  
  // You would typically call your analytics service here, e.g.:
  // if (window.gtag) {
  //   window.gtag('event', eventName, properties);
  // }
  
  // or
  // if (window.mixpanel) {
  //   window.mixpanel.track(eventName, properties);
  // }
};
