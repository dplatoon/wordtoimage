-- Make the generated-images bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'generated-images';

-- Remove the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Public images are viewable" ON storage.objects;

-- The existing "Users can view own images" policy will now be the only SELECT policy
-- ensuring only authenticated users can view their own images