import { supabase } from "@/integrations/supabase/client";
import { getSignedImageUrls } from "@/utils/signedUrls";

export interface Generation {
  id: string;
  user_id: string;
  prompt: string;
  enhanced_prompt: string | null;
  style: string | null;
  resolution: string;
  image_url: string;
  storage_path: string | null;
  settings: any;
  created_at: string;
}

/**
 * Fetch all generations for the current user with fresh signed URLs
 */
export const getUserGenerations = async (): Promise<Generation[]> => {
  const { data, error } = await supabase
    .from("generations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching generations:", error);
    throw error;
  }

  if (!data || data.length === 0) return [];

  // Get fresh signed URLs for all images with storage paths
  const storagePaths = data
    .filter(gen => gen.storage_path)
    .map(gen => gen.storage_path!);
  
  const signedUrls = await getSignedImageUrls(storagePaths);

  // Update image_url with signed URLs where available
  return data.map(gen => ({
    ...gen,
    image_url: gen.storage_path && signedUrls.has(gen.storage_path)
      ? signedUrls.get(gen.storage_path)!
      : gen.image_url
  }));
};

/**
 * Fetch a single generation by ID with a fresh signed URL
 */
export const getGenerationById = async (id: string): Promise<Generation | null> => {
  const { data, error } = await supabase
    .from("generations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching generation:", error);
    return null;
  }

  if (!data) return null;

  // Get fresh signed URL if storage path exists
  if (data.storage_path) {
    const signedUrls = await getSignedImageUrls([data.storage_path]);
    if (signedUrls.has(data.storage_path)) {
      return { ...data, image_url: signedUrls.get(data.storage_path)! };
    }
  }

  return data;
};

/**
 * Delete a generation
 */
export const deleteGeneration = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from("generations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting generation:", error);
    return false;
  }

  return true;
};

/**
 * Get generation count for user
 */
export const getGenerationCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error counting generations:", error);
    return 0;
  }

  return count || 0;
};
