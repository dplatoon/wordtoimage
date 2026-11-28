
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_ORIGINS = ["https://wordtoimage.com","https://www.wordtoimage.com","https://wordtoimage-ai.lovable.app","https://id-preview--721910ee-f437-4eac-8223-3967b0776ac5.lovable.app"];
const safeOrigin = (o: string | null) => (o && ALLOWED_ORIGINS.includes(o) ? o : "https://wordtoimage.com");
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    if (!user.email_confirmed_at) throw new Error("Email address must be verified");
    logStep("User authenticated", { userId: user.id });

    const { planId } = await req.json();
    if (!planId) throw new Error("Plan ID is required");
    logStep("Plan ID received", { planId });

    // Map plan ID to plan name and price
    const planMapping: Record<string, { name: string; price: string; }> = {
      'prod_SGdyRu7i1RabBb': { name: 'Standard', price: 'price_1QZTJcCKt9MG4Q7PrxELCnPP' },
      'prod_SEe2MxYit85qLo': { name: 'Pro', price: 'price_1QXmg1CKt9MG4Q7PnO2vhutg' },
      'prod_SEe3iHfdBt84EE': { name: 'Business', price: 'price_1QXmhICKt9MG4Q7PKQPBbFH0' }
    };

    const planConfig = planMapping[planId];
    if (!planConfig) throw new Error("Invalid plan ID");
    logStep("Plan configuration found", planConfig);

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Reuse only a customer linked to this account by our backend or by the
    // authenticated user ID stored in Stripe metadata, never an email match.
    const { data: subscriber, error: subscriberError } = await supabaseClient
      .from("subscribers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (subscriberError) throw new Error("Unable to load subscription link");

    let customerId = subscriber?.stripe_customer_id ?? null;
    if (customerId) {
      await stripe.customers.update(customerId, { metadata: { user_id: user.id } });
      logStep("Existing account-linked customer found", { customerId });
    } else {
      const customers = await stripe.customers.search({
        query: `metadata['user_id']:'${user.id}'`,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Existing metadata-linked customer found", { customerId });
      } else {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { user_id: user.id }
        });
        customerId = customer.id;
        logStep("New account-linked customer created", { customerId });
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: user.id,
      line_items: [
        {
          price: planConfig.price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${safeOrigin(req.headers.get("origin"))}/pricing?success=true`,
      cancel_url: `${safeOrigin(req.headers.get("origin"))}/pricing?canceled=true`,
      metadata: {
        user_id: user.id,
        plan_name: planConfig.name,
        product_id: planId
      }
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: "An unexpected error occurred. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
