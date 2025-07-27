-- Database optimization: Add indexes for better performance

-- Index for image_generations table (most accessed table)
CREATE INDEX IF NOT EXISTS idx_image_generations_user_id_created_at 
ON public.image_generations (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_image_generations_is_public_created_at 
ON public.image_generations (is_public, created_at DESC) 
WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_image_generations_likes_count 
ON public.image_generations (likes_count DESC) 
WHERE is_public = true;

-- Index for image_likes table
CREATE INDEX IF NOT EXISTS idx_image_likes_user_image 
ON public.image_likes (user_id, image_id);

CREATE INDEX IF NOT EXISTS idx_image_likes_image_id 
ON public.image_likes (image_id);

-- Index for subscribers table
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id_status 
ON public.subscribers (user_id, status) 
WHERE status IN ('active', 'trialing', 'past_due');

-- Optimize image_generations table for better performance
ANALYZE public.image_generations;
ANALYZE public.image_likes;
ANALYZE public.subscribers;