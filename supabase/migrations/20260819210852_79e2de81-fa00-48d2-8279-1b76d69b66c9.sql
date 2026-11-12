CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, anon, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, anon, service_role;

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
CREATE POLICY "Only admins can insert roles" ON public.user_roles
AS RESTRICTIVE FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
CREATE POLICY "Only admins can update roles" ON public.user_roles
AS RESTRICTIVE FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
CREATE POLICY "Only admins can delete roles" ON public.user_roles
AS RESTRICTIVE FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all generations" ON public.generations;
CREATE POLICY "Admins can view all generations" ON public.generations
FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage templates" ON public.style_templates;
CREATE POLICY "Admins can manage templates" ON public.style_templates
FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view all audit logs" ON public.audit_logs
FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);