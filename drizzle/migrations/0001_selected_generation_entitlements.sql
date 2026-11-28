CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_paid_style_access()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = pg_catalog AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.subscribers s
    WHERE s.user_id = auth.uid() AND s.subscribed = true
      AND lower(s.subscription_tier) IN ('standard', 'pro', 'business')
      AND s.subscription_end > now()
  );
$$;
REVOKE ALL ON FUNCTION private.has_paid_style_access() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_paid_style_access() TO anon, authenticated;
DROP POLICY IF EXISTS "Anyone can view templates" ON public.style_templates;
CREATE POLICY "View entitled templates" ON public.style_templates FOR SELECT TO anon, authenticated
USING (is_premium = false OR private.has_paid_style_access());

ALTER TABLE public.generation_usage ADD COLUMN request_key text;
CREATE UNIQUE INDEX generation_usage_request_key ON public.generation_usage(user_id, request_key) WHERE request_key IS NOT NULL;

CREATE OR REPLACE FUNCTION public.reserve_secure_generation(p_user_id uuid, p_request_id text)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog AS $$
DECLARE
  v_credits integer;
  v_tier text := 'free';
  v_limit integer;
  v_count bigint;
BEGIN
  IF p_request_id IS NULL OR length(p_request_id) NOT BETWEEN 1 AND 200 THEN
    RETURN jsonb_build_object('allowed', false, 'status', 400, 'code', 'INVALID_REQUEST_ID');
  END IF;
  SELECT credits INTO v_credits FROM public.profiles WHERE id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('allowed', false, 'status', 403, 'code', 'PROFILE_REQUIRED');
  END IF;
  IF EXISTS (SELECT 1 FROM public.generation_usage WHERE user_id = p_user_id AND request_key = 'secure:' || p_request_id) THEN
    RETURN jsonb_build_object('allowed', false, 'status', 409, 'code', 'REQUEST_ALREADY_USED');
  END IF;
  SELECT lower(subscription_tier) INTO v_tier FROM public.subscribers
  WHERE user_id = p_user_id AND subscribed = true AND subscription_end > now()
    AND lower(subscription_tier) IN ('standard', 'pro', 'business') LIMIT 1;
  v_tier := coalesce(v_tier, 'free');
  v_limit := CASE v_tier WHEN 'standard' THEN 150 WHEN 'pro' THEN 500 WHEN 'business' THEN NULL ELSE 50 END;
  SELECT count(*) INTO v_count FROM public.generation_usage
  WHERE user_id = p_user_id AND created_at >= date_trunc('month', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC';
  IF v_limit IS NOT NULL AND v_count >= v_limit THEN
    RETURN jsonb_build_object('allowed', false, 'status', 429, 'code', 'MONTHLY_LIMIT_EXCEEDED');
  END IF;
  IF v_tier = 'free' AND coalesce(v_credits, 0) <= 0 THEN
    RETURN jsonb_build_object('allowed', false, 'status', 402, 'code', 'INSUFFICIENT_CREDITS');
  END IF;
  INSERT INTO public.generation_usage(user_id, request_key) VALUES (p_user_id, 'secure:' || p_request_id);
  IF v_tier = 'free' THEN
    UPDATE public.profiles SET credits = credits - 1 WHERE id = p_user_id;
  END IF;
  RETURN jsonb_build_object('allowed', true, 'tier', v_tier);
END;
$$;
REVOKE ALL ON FUNCTION public.reserve_secure_generation(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_secure_generation(uuid, text) TO service_role;