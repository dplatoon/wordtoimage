import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { action, amount } = await req.json();

    // Validate action type
    const validActions = ["get", "add", "deduct", "reset"];
    if (!validActions.includes(action)) {
      throw new Error("Invalid action. Use: get, add, deduct, or reset");
    }

    console.log("Managing credits for user:", user.id, "action:", action, "amount:", amount);

    // Check admin role for privileged actions (add, reset)
    if (action === "add" || action === "reset") {
      const { data: adminRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!adminRole) {
        console.error("Unauthorized admin action attempt by user:", user.id);
        throw new Error("Unauthorized: admin access required for this action");
      }
    }

    // Fetch current profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits, subscription_tier")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      throw new Error("Failed to fetch user profile");
    }

    let newCredits = profile.credits;

    switch (action) {
      case "get":
        // Just return current credits
        return new Response(
          JSON.stringify({
            credits: profile.credits,
            subscription_tier: profile.subscription_tier,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case "add":
        if (!amount || typeof amount !== "number" || amount <= 0 || amount > 10000) {
          throw new Error("Invalid amount for add action (must be 1-10000)");
        }
        newCredits = profile.credits + amount;
        break;

      case "deduct":
        if (!amount || typeof amount !== "number" || amount <= 0) {
          throw new Error("Invalid amount for deduct action");
        }
        newCredits = Math.max(0, profile.credits - amount);
        break;

      case "reset":
        // Reset to default (10 credits for free tier)
        newCredits = profile.subscription_tier === "free" ? 10 : profile.credits;
        break;
    }

    // Update credits if changed
    if (action !== "get") {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ credits: newCredits })
        .eq("id", user.id);

      if (updateError) {
        console.error("Update error:", updateError);
        throw new Error("Failed to update credits");
      }

      console.log("Credits updated:", profile.credits, "->", newCredits);

      // Audit log for credit modifications
      const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                        req.headers.get('cf-connecting-ip') || null;
      const userAgent = req.headers.get('user-agent') || null;

      await supabase.rpc('log_audit_event', {
        p_user_id: user.id,
        p_action: `credits_${action}`,
        p_resource_type: 'profile',
        p_resource_id: user.id,
        p_details: {
          previous_credits: profile.credits,
          new_credits: newCredits,
          amount: amount || null,
          subscription_tier: profile.subscription_tier,
        },
        p_ip_address: ipAddress,
        p_user_agent: userAgent,
      });
    }

    return new Response(
      JSON.stringify({
        credits: newCredits,
        subscription_tier: profile.subscription_tier,
        previousCredits: profile.credits,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in manage-user-credits:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
