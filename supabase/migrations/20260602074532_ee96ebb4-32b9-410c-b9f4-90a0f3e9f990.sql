-- 1) Subscribers: remove user-side write access. Managed by Stripe webhook (service_role).
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can create own subscription" ON public.subscribers;

-- 2) user_roles: restrictive policies to prevent privilege escalation.
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles AS RESTRICTIVE FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
  ON public.user_roles AS RESTRICTIVE FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
  ON public.user_roles AS RESTRICTIVE FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3) Lock down SECURITY DEFINER functions from direct API execution.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_subscription_status(text, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_audit_event(uuid, text, text, text, jsonb, text, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_rate_limit(text, text, integer, integer) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits(integer) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM anon, authenticated, PUBLIC;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.update_subscription_status(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_audit_event(uuid, text, text, text, jsonb, text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits(integer) TO service_role;