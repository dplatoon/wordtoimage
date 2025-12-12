-- Create subscribers table for Stripe payment integration
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  subscription_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX idx_subscribers_stripe_customer_id ON public.subscribers(stripe_customer_id);
CREATE INDEX idx_subscribers_email ON public.subscribers(email);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Deny unauthenticated access
CREATE POLICY "Deny unauthenticated access to subscribers"
ON public.subscribers
AS RESTRICTIVE
FOR ALL
USING (false);

-- Users can view their own subscription
CREATE POLICY "Users can view own subscription"
ON public.subscribers
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own subscription record
CREATE POLICY "Users can create own subscription"
ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Service role can manage all subscriptions (for webhooks)
CREATE POLICY "Service role can manage all subscriptions"
ON public.subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create update_subscription_status RPC function for webhook updates
CREATE OR REPLACE FUNCTION public.update_subscription_status(
  p_stripe_customer_id TEXT,
  p_status TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_subscribed BOOLEAN;
  v_tier TEXT;
BEGIN
  -- Determine subscription status based on Stripe status
  v_subscribed := p_status IN ('active', 'trialing');
  
  -- Set tier based on status
  IF p_status = 'canceled' OR p_status = 'unpaid' THEN
    v_tier := 'free';
  END IF;

  -- Update the subscriber record
  UPDATE public.subscribers
  SET 
    subscribed = v_subscribed,
    subscription_tier = COALESCE(v_tier, subscription_tier),
    subscription_end = CASE 
      WHEN NOT v_subscribed THEN now()
      ELSE subscription_end
    END,
    updated_at = now()
  WHERE stripe_customer_id = p_stripe_customer_id;
  
  -- Also update the user's profile subscription_tier
  UPDATE public.profiles
  SET 
    subscription_tier = COALESCE(v_tier, (
      SELECT subscription_tier FROM public.subscribers 
      WHERE stripe_customer_id = p_stripe_customer_id
    )),
    updated_at = now()
  WHERE id = (
    SELECT user_id FROM public.subscribers 
    WHERE stripe_customer_id = p_stripe_customer_id
  );
END;
$$;

-- Create trigger for updated_at
CREATE TRIGGER update_subscribers_updated_at
BEFORE UPDATE ON public.subscribers
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();