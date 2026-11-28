CREATE OR REPLACE FUNCTION public.protect_profile_billing_fields()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF coalesce(auth.role(), '') IN ('authenticated','anon') THEN
    IF TG_OP = 'INSERT' THEN
      NEW.credits := 10;
      NEW.subscription_tier := 'free';
    ELSIF NEW.credits IS DISTINCT FROM OLD.credits
          OR NEW.subscription_tier IS DISTINCT FROM OLD.subscription_tier THEN
      RAISE EXCEPTION 'Not allowed to modify credits or subscription tier';
    END IF;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS protect_profile_billing_fields ON public.profiles;
CREATE TRIGGER protect_profile_billing_fields BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_billing_fields();