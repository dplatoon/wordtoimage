import { supabase } from "@/integrations/supabase/client";

export interface StyleTemplate {
  id: string;
  name: string;
  description: string | null;
  prompt_template: string;
  category: string | null;
  image_url: string | null;
  is_premium: boolean;
  usage_count: number;
  created_at: string;
}

/**
 * Get all available style templates
 */
export const getAllStyleTemplates = async (): Promise<StyleTemplate[]> => {
  const { data, error } = await supabase
    .from("style_templates")
    .select("*")
    .order("usage_count", { ascending: false });

  if (error) {
    console.error("Error fetching style templates:", error);
    return [];
  }

  return data || [];
};

/**
 * Get style templates by category
 */
export const getStyleTemplatesByCategory = async (
  category: string
): Promise<StyleTemplate[]> => {
  const { data, error } = await supabase
    .from("style_templates")
    .select("*")
    .eq("category", category)
    .order("usage_count", { ascending: false });

  if (error) {
    console.error("Error fetching style templates:", error);
    return [];
  }

  return data || [];
};

/**
 * Get free (non-premium) style templates
 */
export const getFreeStyleTemplates = async (): Promise<StyleTemplate[]> => {
  const { data, error } = await supabase
    .from("style_templates")
    .select("*")
    .eq("is_premium", false)
    .order("usage_count", { ascending: false });

  if (error) {
    console.error("Error fetching free templates:", error);
    return [];
  }

  return data || [];
};

/**
 * Get a single style template by name
 */
export const getStyleTemplateByName = async (
  name: string
): Promise<StyleTemplate | null> => {
  const { data, error } = await supabase
    .from("style_templates")
    .select("*")
    .eq("name", name)
    .single();

  if (error) {
    console.error("Error fetching style template:", error);
    return null;
  }

  return data;
};

/**
 * Increment usage count for a style template
 */
export const incrementStyleUsage = async (styleId: string): Promise<void> => {
  // Get current template
  const { data: template } = await supabase
    .from("style_templates")
    .select("usage_count")
    .eq("id", styleId)
    .single();

  if (!template) return;

  // Increment count
  const { error } = await supabase
    .from("style_templates")
    .update({ usage_count: template.usage_count + 1 })
    .eq("id", styleId);

  if (error) {
    console.error("Error incrementing style usage:", error);
  }
};
