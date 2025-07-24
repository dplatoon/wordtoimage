// Browser compatibility utilities for WordToImage

export interface BrowserInfo {
  name: string;
  version: string;
  isSupported: boolean;
  features: {
    webgpu: boolean;
    webgl: boolean;
    canvas: boolean;
    fileApi: boolean;
    workers: boolean;
  };
}

export const detectBrowser = (): BrowserInfo => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  // Detect browser
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'Chrome';
    browserVersion = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
    browserVersion = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari';
    browserVersion = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Edg')) {
    browserName = 'Edge';
    browserVersion = userAgent.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
  }

  // Check feature support
  const features = {
    webgpu: checkWebGPUSupport(),
    webgl: checkWebGLSupport(),
    canvas: checkCanvasSupport(),
    fileApi: checkFileAPISupport(),
    workers: checkWorkerSupport()
  };

  // Determine if browser is supported for our features
  const isSupported = features.canvas && features.fileApi;

  return {
    name: browserName,
    version: browserVersion,
    isSupported,
    features
  };
};

export const checkWebGPUSupport = (): boolean => {
  return !!(navigator as any).gpu;
};

export const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
};

export const checkCanvasSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  } catch (e) {
    return false;
  }
};

export const checkFileAPISupport = (): boolean => {
  return !!(window.File && window.FileReader && window.FileList && window.Blob);
};

export const checkWorkerSupport = (): boolean => {
  return typeof Worker !== 'undefined';
};

export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const getOptimalProcessingMode = (): 'webgpu' | 'webgl' | 'cpu' => {
  if (checkWebGPUSupport()) {
    return 'webgpu';
  } else if (checkWebGLSupport()) {
    return 'webgl';
  } else {
    return 'cpu';
  }
};

export const showBrowserCompatibilityWarning = (feature: string): string => {
  const browser = detectBrowser();
  
  if (feature === 'background-removal') {
    if (!browser.features.webgpu) {
      return `Background removal works best with WebGPU acceleration. Your browser (${browser.name}) may process images slower. For best performance, try Chrome or Edge with WebGPU enabled.`;
    }
  }
  
  if (feature === 'image-processing' && isMobileDevice()) {
    return 'Advanced image processing may be slower on mobile devices due to memory limitations. For best performance, try using a desktop browser.';
  }

  return '';
};

export const getRecommendedBrowser = (): string => {
  const browser = detectBrowser();
  
  if (browser.name === 'Chrome' || browser.name === 'Edge') {
    return 'Your browser supports all features!';
  }
  
  if (browser.name === 'Safari') {
    return 'For advanced features like background removal, consider using Chrome or Edge with WebGPU support.';
  }
  
  if (browser.name === 'Firefox') {
    return 'Firefox works great! For GPU-accelerated features, Chrome or Edge may offer better performance.';
  }
  
  return 'For the best experience, we recommend using Chrome, Edge, or Firefox.';
};