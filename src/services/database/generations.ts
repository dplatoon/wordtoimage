import { supabase } from "@/integrations/supabase/client";

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
 * Fetch all generations for the current user
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

  return data || [];
};

/**
 * Fetch a single generation by ID
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
