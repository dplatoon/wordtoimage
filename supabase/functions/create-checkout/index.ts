
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planId } = await req.json();
    
    if (!planId) {
      return new Response(
        JSON.stringify({ error: "Plan ID is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Initialize Stripe with the secret key from environment variables
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get the price for the selected plan
    const prices = await stripe.prices.list({
      product: planId,
      active: true,
      limit: 1,
    });

    if (prices.data.length === 0) {
      return new Response(
        JSON.stringify({ error: "No active price found for this plan" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const price = prices.data[0];

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin") || "https://example.com"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin") || "https://example.com"}/text-to-image`,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating checkout session:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
