import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CreditsResponse {
  credits: number;
  subscription_tier: string;
  previousCredits?: number;
}

export type CreditAction = "get" | "deduct";

/**
 * Manage user credits (get or deduct). Credit grants are handled by payment fulfillment.
 */
export const manageCredits = async (
  action: CreditAction,
  amount?: number
): Promise<CreditsResponse | null> => {
  try {
    const { data, error } = await supabase.functions.invoke<CreditsResponse>(
      "manage-user-credits",
      {
        body: { action, amount },
      }
    );

    if (error) {
      throw error;
    }

    return data || null;
  } catch (error: any) {
    console.error("Failed to manage credits:", error);
    toast.error("Credits Error", {
      description: error.message || "Failed to manage credits",
    });
    return null;
  }
};

/**
 * Get current user credits
 */
export const getCredits = async (): Promise<CreditsResponse | null> => {
  return manageCredits("get");
};

/**
 * Deduct credits from user account
 */
export const deductCredits = async (amount: number): Promise<CreditsResponse | null> => {
  return manageCredits("deduct", amount);
};
