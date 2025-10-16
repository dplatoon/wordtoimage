import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface GenerateImageRequest {
  prompt: string;
  style?: string;
  resolution?: string;
  settings?: Record<string, any>;
}

export interface GenerateImageResponse {
  success: boolean;
  generation?: {
    id: string;
    prompt: string;
    enhanced_prompt: string;
    image_url: string;
    style: string;
    resolution: string;
  };
  creditsRemaining?: number | "unlimited";
  error?: string;
}

export interface CheckStatusResponse {
  status: "completed" | "pending" | "failed";
  generation?: any;
  error?: string;
}

/**
 * Generate a new image using the unified generation endpoint
 */
export const generateImage = async (
  request: GenerateImageRequest
): Promise<GenerateImageResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke<GenerateImageResponse>(
      "generate-image",
      {
        body: request,
      }
    );

    if (error) {
      console.error("Image generation error:", error);
      throw error;
    }

    if (!data) {
      throw new Error("No response from server");
    }

    if (!data.success) {
      throw new Error(data.error || "Generation failed");
    }

    return data;
  } catch (error: any) {
    console.error("Failed to generate image:", error);
    
    const errorMessage = error.message || "Failed to generate image";
    toast.error("Generation Failed", {
      description: errorMessage,
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Check the status of an image generation
 */
export const checkGenerationStatus = async (
  generationId: string
): Promise<CheckStatusResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke<CheckStatusResponse>(
      "check-generation-status",
      {
        body: { generationId },
      }
    );

    if (error) {
      throw error;
    }

    return data || { status: "failed", error: "No response from server" };
  } catch (error: any) {
    console.error("Failed to check status:", error);
    return {
      status: "failed",
      error: error.message,
    };
  }
};
