
export interface GalleryImage {
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
  timestamp?: number;
}

export class GalleryService {
  static createGalleryEntry(
    url: string, 
    prompt: string, 
    style?: string, 
    resolution?: string
  ): GalleryImage {
    // Add unique timestamp and ID to prevent caching/duplicates
    const timestamp = new Date().getTime();
    const uniqueId = Math.random().toString(36).substring(2, 10);
    const uniqueUrl = `${url}?id=${uniqueId}`;
    
    return {
      url: uniqueUrl,
      prompt,
      style,
      resolution,
      timestamp
    };
  }
}
