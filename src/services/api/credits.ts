import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CreditsResponse {
  credits: number;
  subscription_tier: string;
  previousCredits?: number;
}

export type CreditAction = "get" | "add" | "deduct" | "reset";

/**
 * Manage user credits (get, add, deduct, reset)
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
 * Add credits to user account
 */
export const addCredits = async (amount: number): Promise<CreditsResponse | null> => {
  return manageCredits("add", amount);
};

/**
 * Deduct credits from user account
 */
export const deductCredits = async (amount: number): Promise<CreditsResponse | null> => {
  return manageCredits("deduct", amount);
};

/**
 * Reset credits to default
 */
export const resetCredits = async (): Promise<CreditsResponse | null> => {
  return manageCredits("reset");
};
