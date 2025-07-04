-- Fix security warnings by setting search_path on database functions

-- Update increment_image_views function with proper search_path
CREATE OR REPLACE FUNCTION public.increment_image_views(image_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.image_generations 
  SET views_count = views_count + 1 
  WHERE id = image_uuid AND is_public = true;
END;
$function$;

-- Update update_image_likes_count function with proper search_path
CREATE OR REPLACE FUNCTION public.update_image_likes_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
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
$function$;

-- Update process_image function with proper search_path
CREATE OR REPLACE FUNCTION public.process_image(img_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Function logic using img_id
  -- This function appears to be a placeholder, maintaining existing structure
  NULL;
END;
$function$;