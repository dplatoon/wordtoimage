import { supabase } from "@/integrations/supabase/client";

/**
 * Get a signed URL for an image stored in the generated-images bucket.
 * This is needed because the bucket is private for security.
 * 
 * @param storagePath - The path within the bucket (e.g., "user-id/image-id.png")
 * @param expiresIn - Seconds until URL expires (default 1 hour)
 * @returns The signed URL or null if error
 */
export const getSignedImageUrl = async (
  storagePath: string,
  expiresIn: number = 3600
): Promise<string | null> => {
  if (!storagePath) return null;

  const { data, error } = await supabase.storage
    .from("generated-images")
    .createSignedUrl(storagePath, expiresIn);

  if (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }

  return data.signedUrl;
};

/**
 * Batch get signed URLs for multiple images.
 * 
 * @param storagePaths - Array of paths within the bucket
 * @param expiresIn - Seconds until URLs expire (default 1 hour)
 * @returns Map of path to signed URL
 */
export const getSignedImageUrls = async (
  storagePaths: string[],
  expiresIn: number = 3600
): Promise<Map<string, string>> => {
  const urlMap = new Map<string, string>();
  
  // Filter out empty paths
  const validPaths = storagePaths.filter(p => p);
  if (validPaths.length === 0) return urlMap;

  // Use batch signed URL API
  const { data, error } = await supabase.storage
    .from("generated-images")
    .createSignedUrls(validPaths, expiresIn);

  if (error || !data) {
    console.error("Error creating signed URLs:", error);
    return urlMap;
  }

  data.forEach((item) => {
    if (item.signedUrl && item.path) {
      urlMap.set(item.path, item.signedUrl);
    }
  });

  return urlMap;
};

/**
 * Check if a URL is a signed URL (contains token parameter).
 * Useful for determining if a URL needs refreshing.
 */
export const isSignedUrl = (url: string): boolean => {
  return url?.includes("token=");
};

/**
 * Check if a URL is expired (based on signed URL format).
 * Note: This is a rough check. The actual expiry is encoded in the token.
 */
export const isUrlExpired = (url: string): boolean => {
  if (!isSignedUrl(url)) return false;
  
  // For now, assume URLs older than 50 minutes might be expiring soon
  // In production, you'd want to decode the token or track expiry times
  return false;
};
