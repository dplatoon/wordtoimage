-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create profiles table (extends Supabase auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT,
  credits INT DEFAULT 10 NOT NULL,
  subscription_tier TEXT DEFAULT 'free' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, role)
);

-- Create generations table for image generations
CREATE TABLE public.generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  enhanced_prompt TEXT,
  style TEXT,
  resolution TEXT DEFAULT '1024x1024' NOT NULL,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create favorites table for user favorites
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  generation_id UUID REFERENCES public.generations ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, generation_id)
);

-- Create style_templates table for style presets
CREATE TABLE public.style_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  prompt_template TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  is_premium BOOLEAN DEFAULT false NOT NULL,
  usage_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_generations_user_id ON public.generations(user_id);
CREATE INDEX idx_generations_created_at ON public.generations(created_at DESC);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_generation_id ON public.favorites(generation_id);
CREATE INDEX idx_style_templates_category ON public.style_templates(category);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.style_templates ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for generations
CREATE POLICY "Users can view own generations"
  ON public.generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create generations"
  ON public.generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own generations"
  ON public.generations FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all generations"
  ON public.generations FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for style_templates (public read, admin write)
CREATE POLICY "Anyone can view templates"
  ON public.style_templates FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage templates"
  ON public.style_templates FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for generated images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'generated-images',
  'generated-images',
  true,
  10485760, -- 10MB
  ARRAY['image/png', 'image/jpeg', 'image/webp']
);

-- Storage policies for generated-images bucket
CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'generated-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own images"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'generated-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'generated-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Public images are viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'generated-images');

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1))
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some default style templates
INSERT INTO public.style_templates (name, description, prompt_template, category, is_premium) VALUES
  ('Photorealistic', 'Ultra-realistic photography style', '{prompt}, photorealistic, 8k uhd, high quality, detailed', 'photography', false),
  ('Digital Art', 'Modern digital artwork style', '{prompt}, digital art, trending on artstation, highly detailed', 'art', false),
  ('Oil Painting', 'Classic oil painting aesthetic', '{prompt}, oil painting, canvas texture, masterpiece', 'art', false),
  ('Anime', 'Japanese anime style illustration', '{prompt}, anime style, studio ghibli, vibrant colors', 'illustration', false),
  ('Cyberpunk', 'Futuristic cyberpunk aesthetic', '{prompt}, cyberpunk, neon lights, futuristic, dark atmosphere', 'scifi', true),
  ('Watercolor', 'Soft watercolor painting style', '{prompt}, watercolor painting, soft colors, artistic', 'art', false),
  ('3D Render', 'High-quality 3D rendering', '{prompt}, 3d render, octane render, unreal engine, volumetric lighting', 'digital', true),
  ('Minimalist', 'Clean minimalist design', '{prompt}, minimalist, clean design, simple, modern', 'design', false),
  ('Fantasy', 'Epic fantasy illustration', '{prompt}, fantasy art, epic, magical, detailed environment', 'fantasy', false),
  ('Sketch', 'Hand-drawn sketch style', '{prompt}, pencil sketch, detailed linework, artistic drawing', 'art', false);