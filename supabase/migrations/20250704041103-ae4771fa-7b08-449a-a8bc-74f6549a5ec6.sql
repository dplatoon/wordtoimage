-- Add public sharing and community features to image_generations
ALTER TABLE public.image_generations 
ADD COLUMN is_public BOOLEAN DEFAULT false,
ADD COLUMN featured BOOLEAN DEFAULT false,
ADD COLUMN likes_count INTEGER DEFAULT 0,
ADD COLUMN views_count INTEGER DEFAULT 0;

-- Create likes table for tracking user likes
CREATE TABLE public.image_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_id UUID REFERENCES public.image_generations(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, image_id)
);

-- Enable RLS on image_likes
ALTER TABLE public.image_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for image_likes
CREATE POLICY "Users can view all likes" 
ON public.image_likes 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own likes" 
ON public.image_likes 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Update image_generations policies for public viewing
CREATE POLICY "Anyone can view public images" 
ON public.image_generations 
FOR SELECT 
USING (is_public = true);

-- Create function to update likes count
CREATE OR REPLACE FUNCTION public.update_image_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.image_generations 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.image_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.image_generations 
    SET likes_count = GREATEST(likes_count - 1, 0) 
    WHERE id = OLD.image_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic likes count updates
CREATE TRIGGER update_image_likes_count_trigger
  AFTER INSERT OR DELETE ON public.image_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_image_likes_count();

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_image_views(image_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.image_generations 
  SET views_count = views_count + 1 
  WHERE id = image_uuid AND is_public = true;
END;
$$ LANGUAGE plpgsql;