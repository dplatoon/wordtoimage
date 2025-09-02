-- Secure subscribers table: remove overly permissive RLS and restrict writes to service role only (which bypasses RLS)
-- 1) Ensure RLS is enabled (idempotent)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 2) Drop permissive INSERT/UPDATE policies that used `true`
DROP POLICY IF EXISTS "Service can insert subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "Service can update subscriptions" ON public.subscribers;

-- 3) Keep existing SELECT-own policy or recreate it if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'subscribers' AND policyname = 'Users can view their own subscriptions'
  ) THEN
    CREATE POLICY "Users can view their own subscriptions"
    ON public.subscribers
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Note:
-- - No INSERT/UPDATE policies for authenticated users are created on purpose.
--   Only Edge Functions using the Service Role key (which bypasses RLS) can write.
-- - This prevents any client-side user from modifying sensitive subscription data.