
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

// CORS headers for preflight requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get the Stripe secret key from environment variables
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Missing Stripe secret key");
    }
    
    // Initialize Stripe client
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Get the Stripe signature from the request headers
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Missing Stripe signature");
    }
    
    // Get the webhook secret from environment variables
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Missing Stripe webhook secret");
    }
    
    // Get the request body as text for the webhook verification
    const body = await req.text();
    
    // Verify and construct the event
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
    
    // Log the event
    console.log(`Received Stripe event: ${event.type}`);
    
    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object;
        console.log(`Checkout completed for session: ${checkoutSession.id}`);
        
        // Here you would fulfill the order, enable access to your service, etc.
        // For example, update user's subscription status in your database
        // This depends on your specific application needs
        
        break;
      
      case "invoice.paid":
        const invoice = event.data.object;
        console.log(`Invoice paid: ${invoice.id}`);
        
        // Here you could update subscription status, extend access, etc.
        
        break;
      
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object;
        console.log(`Subscription event (${event.type}): ${subscription.id}`);
        
        // Update subscription status in your database
        
        break;
      
      // Add more cases for other events you want to handle
      
      default:
        // For events not explicitly handled, just acknowledge receipt
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return a 200 response to acknowledge receipt of the event
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error(`Error handling webhook: ${error.message}`);
    
    // Return an error response, but still with status 200
    // This prevents Stripe from retrying the webhook
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
});
