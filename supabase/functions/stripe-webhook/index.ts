
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Missing Stripe secret key");
    }
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Missing Stripe signature");
    }
    
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Missing Stripe webhook secret");
    }
    
    const body = await req.text();
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
    
    console.log(`Received Stripe event: ${event.type}`);

    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object;
        console.log(`Checkout completed for session: ${checkoutSession.id}`);
        
        if (checkoutSession.mode === "subscription") {
          const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription as string);
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          
          if (customer && typeof customer === 'object' && customer.email) {
            // Map product ID to plan name
            const priceId = subscription.items.data[0].price.id;
            const price = await stripe.prices.retrieve(priceId);
            const productId = price.product as string;
            
            let planName = 'Unknown';
            switch (productId) {
              case 'prod_SGdyRu7i1RabBb':
                planName = 'Standard';
                break;
              case 'prod_SEe2MxYit85qLo':
                planName = 'Pro';
                break;
              case 'prod_SEe3iHfdBt84EE':
                planName = 'Business';
                break;
            }

            // Get user by email
            const { data: users } = await supabase.auth.admin.listUsers();
            const user = users.users.find(u => u.email === customer.email);
            
            if (user) {
              await supabase.from("subscribers").upsert({
                user_id: user.id,
                stripe_customer_id: customer.id,
                stripe_subscription_id: subscription.id,
                plan_name: planName,
                product_id: productId,
                status: subscription.status,
                current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                cancel_at_period_end: subscription.cancel_at_period_end,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'user_id' });
              
              console.log(`Subscription created for user: ${user.id}`);
            }
          }
        }
        break;
      
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object;
        console.log(`Subscription event (${event.type}): ${subscription.id}`);
        
        // Get customer ID from subscription - this matches the RPC function signature
        const customerId = subscription.customer as string;
        
        const { error: rpcError } = await supabase.rpc('update_subscription_status', {
          p_stripe_customer_id: customerId,
          p_status: subscription.status
        });
        
        if (rpcError) {
          console.error(`Failed to update subscription status: ${rpcError.message}`);
        } else {
          console.log(`Subscription status updated for customer: ${customerId}`);
        }
        break;
      
      case "invoice.paid":
        const invoice = event.data.object;
        console.log(`Invoice paid: ${invoice.id}`);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error(`Error handling webhook: ${error.message}`);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
