
// Web Worker for image processing to prevent main thread blocking
interface ImageProcessingMessage {
  type: 'PROCESS_IMAGE' | 'COMPRESS_IMAGE' | 'CONVERT_FORMAT';
  imageData: string;
  options?: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    format?: 'webp' | 'jpeg' | 'png';
  };
}

interface ImageProcessingResponse {
  type: 'PROCESSING_COMPLETE' | 'PROCESSING_ERROR';
  result?: string;
  error?: string;
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
}

self.onmessage = async function(e: MessageEvent<ImageProcessingMessage>) {
  const { type, imageData, options = {} } = e.data;

  try {
    switch (type) {
      case 'PROCESS_IMAGE':
        const processed = await processImage(imageData, options);
        self.postMessage(processed);
        break;

      case 'COMPRESS_IMAGE':
        const compressed = await compressImage(imageData, options);
        self.postMessage(compressed);
        break;

      case 'CONVERT_FORMAT':
        const converted = await convertFormat(imageData, options);
        self.postMessage(converted);
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    const response: ImageProcessingResponse = {
      type: 'PROCESSING_ERROR',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    self.postMessage(response);
  }
};

async function processImage(imageData: string, options: any): Promise<ImageProcessingResponse> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve({
          type: 'PROCESSING_ERROR',
          error: 'Could not get canvas context'
        });
        return;
      }

      // Apply any image processing here
      ctx.drawImage(img, 0, 0);
      
      // Convert to blob and then to data URL
      canvas.convertToBlob({
        type: 'image/webp',
        quality: options.quality || 0.8
      }).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            type: 'PROCESSING_COMPLETE',
            result: reader.result as string,
            originalSize: imageData.length,
            compressedSize: (reader.result as string).length
          });
        };
        reader.readAsDataURL(blob);
      });
    };
    
    img.onerror = () => {
      resolve({
        type: 'PROCESSING_ERROR',
        error: 'Failed to load image'
      });
    };
    
    img.src = imageData;
  });
}

async function compressImage(imageData: string, options: any): Promise<ImageProcessingResponse> {
  const { quality = 0.8, maxWidth = 1920, maxHeight = 1080 } = options;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve({
          type: 'PROCESSING_ERROR',
          error: 'Could not get canvas context'
        });
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.convertToBlob({
        type: 'image/webp',
        quality
      }).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          const originalSize = imageData.length;
          const compressedSize = (reader.result as string).length;
          
          resolve({
            type: 'PROCESSING_COMPLETE',
            result: reader.result as string,
            originalSize,
            compressedSize,
            compressionRatio: ((originalSize - compressedSize) / originalSize) * 100
          });
        };
        reader.readAsDataURL(blob);
      });
    };
    
    img.onerror = () => {
      resolve({
        type: 'PROCESSING_ERROR',
        error: 'Failed to load image'
      });
    };
    
    img.src = imageData;
  });
}

async function convertFormat(imageData: string, options: any): Promise<ImageProcessingResponse> {
  const { format = 'webp', quality = 0.9 } = options;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve({
          type: 'PROCESSING_ERROR',
          error: 'Could not get canvas context'
        });
        return;
      }

      ctx.drawImage(img, 0, 0);
      
      canvas.convertToBlob({
        type: `image/${format}`,
        quality
      }).then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            type: 'PROCESSING_COMPLETE',
            result: reader.result as string
          });
        };
        reader.readAsDataURL(blob);
      });
    };
    
    img.onerror = () => {
      resolve({
        type: 'PROCESSING_ERROR',
        error: 'Failed to load image'
      });
    };
    
    img.src = imageData;
  });
}
