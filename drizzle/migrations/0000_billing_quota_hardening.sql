CREATE OR REPLACE FUNCTION public.protect_profile_billing_fields()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF coalesce(auth.role(), '') IN ('authenticated','anon')
     AND (NEW.credits IS DISTINCT FROM OLD.credits
          OR NEW.subscription_tier IS DISTINCT FROM OLD.subscription_tier) THEN
    RAISE EXCEPTION 'Not allowed to modify credits or subscription tier';
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS protect_profile_billing_fields ON public.profiles;
CREATE TRIGGER protect_profile_billing_fields BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_billing_fields();

CREATE TABLE public.generation_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX generation_usage_user_time ON public.generation_usage(user_id, created_at);
GRANT SELECT ON public.generation_usage TO authenticated;
GRANT ALL ON public.generation_usage TO service_role;
ALTER TABLE public.generation_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own usage" ON public.generation_usage FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.record_generation_usage()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    INSERT INTO public.generation_usage(user_id, created_at) VALUES (NEW.user_id, now());
  END IF;
  RETURN NEW;
END $$;
REVOKE EXECUTE ON FUNCTION public.record_generation_usage() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS record_generation_usage ON public.generations;
CREATE TRIGGER record_generation_usage AFTER INSERT ON public.generations
FOR EACH ROW EXECUTE FUNCTION public.record_generation_usage();

INSERT INTO public.generation_usage(user_id, created_at)
SELECT user_id, created_at FROM public.generations WHERE user_id IS NOT NULL AND created_at > now() - interval '1 day';