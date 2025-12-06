-- First, delete any existing generations with NULL user_id (orphaned data)
DELETE FROM public.generations WHERE user_id IS NULL;

-- Make user_id NOT NULL to ensure all generations are tied to authenticated users
ALTER TABLE public.generations ALTER COLUMN user_id SET NOT NULL;