-- Add explicit deny policies for unauthenticated users on all tables
-- This ensures security scanners see explicit denials rather than implicit ones

-- Profiles: Deny all operations for unauthenticated users
CREATE POLICY "Deny unauthenticated access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false);

-- Generations: Deny all operations for unauthenticated users
CREATE POLICY "Deny unauthenticated access to generations"
ON public.generations
FOR ALL
TO anon
USING (false);

-- Favorites: Deny all operations for unauthenticated users
CREATE POLICY "Deny unauthenticated access to favorites"
ON public.favorites
FOR ALL
TO anon
USING (false);

-- User roles: Deny all operations for unauthenticated users
CREATE POLICY "Deny unauthenticated access to user_roles"
ON public.user_roles
FOR ALL
TO anon
USING (false);

-- Style templates: Keep public read but deny write for unauthenticated users
CREATE POLICY "Deny unauthenticated write to style_templates"
ON public.style_templates
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny unauthenticated update to style_templates"
ON public.style_templates
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Deny unauthenticated delete from style_templates"
ON public.style_templates
FOR DELETE
TO anon
USING (false);