-- Create analytics tables for advanced tracking
CREATE TABLE public.user_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversion funnel tracking
CREATE TABLE public.conversion_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  funnel_step TEXT NOT NULL,
  funnel_stage INTEGER NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create A/B testing table
CREATE TABLE public.ab_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_name TEXT NOT NULL UNIQUE,
  description TEXT,
  variants JSONB NOT NULL DEFAULT '[]',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create A/B test assignments
CREATE TABLE public.ab_test_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID REFERENCES public.ab_tests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  variant TEXT NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(test_id, user_id),
  UNIQUE(test_id, session_id)
);

-- Create user behavior analytics
CREATE TABLE public.user_behavior (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  time_on_page INTEGER, -- seconds
  scroll_depth DECIMAL(5,2), -- percentage
  interactions JSONB DEFAULT '[]',
  exit_page BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all analytics tables
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_behavior ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics (admin access only for viewing)
CREATE POLICY "Service can insert analytics" ON public.user_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can insert conversion events" ON public.conversion_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can insert behavior data" ON public.user_behavior FOR INSERT WITH CHECK (true);

-- A/B tests can be viewed by anyone, managed by service
CREATE POLICY "Anyone can view active AB tests" ON public.ab_tests FOR SELECT USING (active = true);
CREATE POLICY "Service can manage AB tests" ON public.ab_tests FOR ALL USING (true);

CREATE POLICY "Service can manage AB assignments" ON public.ab_test_assignments FOR ALL USING (true);
CREATE POLICY "Users can view their AB assignments" ON public.ab_test_assignments FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX idx_user_analytics_session_id ON public.user_analytics(session_id);
CREATE INDEX idx_user_analytics_event_type ON public.user_analytics(event_type);
CREATE INDEX idx_user_analytics_created_at ON public.user_analytics(created_at);

CREATE INDEX idx_conversion_events_user_id ON public.conversion_events(user_id);
CREATE INDEX idx_conversion_events_funnel_step ON public.conversion_events(funnel_step);
CREATE INDEX idx_conversion_events_created_at ON public.conversion_events(created_at);

CREATE INDEX idx_user_behavior_user_id ON public.user_behavior(user_id);
CREATE INDEX idx_user_behavior_page_path ON public.user_behavior(page_path);
CREATE INDEX idx_user_behavior_created_at ON public.user_behavior(created_at);