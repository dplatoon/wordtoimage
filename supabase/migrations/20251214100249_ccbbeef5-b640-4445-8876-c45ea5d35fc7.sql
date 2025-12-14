-- Fix 1: Add restrictive SELECT policy for contact_submissions (admin only)
CREATE POLICY "Only admins can read contact submissions"
ON public.contact_submissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Fix 2: Add UPDATE policy for subscribers table (users can update their own)
CREATE POLICY "Users can update their own subscription"
ON public.subscribers
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);