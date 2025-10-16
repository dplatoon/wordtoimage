import { supabase } from "@/integrations/supabase/client";

export interface Favorite {
  id: string;
  user_id: string;
  generation_id: string;
  created_at: string;
}

/**
 * Get all favorites for current user with generation details
 */
export const getUserFavorites = async () => {
  const { data, error } = await supabase
    .from("favorites")
    .select(`
      *,
      generations (*)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }

  return data || [];
};

/**
 * Add a generation to favorites
 */
export const addFavorite = async (generationId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { error } = await supabase
    .from("favorites")
    .insert({ user_id: user.id, generation_id: generationId });

  if (error) {
    console.error("Error adding favorite:", error);
    return false;
  }

  return true;
};

/**
 * Remove a generation from favorites
 */
export const removeFavorite = async (generationId: string): Promise<boolean> => {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("generation_id", generationId);

  if (error) {
    console.error("Error removing favorite:", error);
    return false;
  }

  return true;
};

/**
 * Check if a generation is favorited
 */
export const isFavorite = async (generationId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("generation_id", generationId)
    .single();

  if (error) {
    return false;
  }

  return !!data;
};

/**
 * Toggle favorite status
 */
export const toggleFavorite = async (generationId: string): Promise<boolean> => {
  const isFav = await isFavorite(generationId);
  
  if (isFav) {
    return await removeFavorite(generationId);
  } else {
    return await addFavorite(generationId);
  }
};
