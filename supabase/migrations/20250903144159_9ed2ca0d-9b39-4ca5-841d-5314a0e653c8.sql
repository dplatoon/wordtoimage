-- Harden RLS on AB testing tables by removing overly permissive policies
-- 1) Ensure RLS is enabled
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_assignments ENABLE ROW LEVEL SECURITY;

-- 2) Drop dangerous policies that allowed ALL actions with true conditions
DROP POLICY IF EXISTS "Service can manage AB tests" ON public.ab_tests;
DROP POLICY IF EXISTS "Service can manage AB assignments" ON public.ab_test_assignments;

-- 3) Ensure safe SELECT policies exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'ab_tests' AND policyname = 'Anyone can view active AB tests'
  ) THEN
    CREATE POLICY "Anyone can view active AB tests"
    ON public.ab_tests
    FOR SELECT
    TO public
    USING (active = true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'ab_test_assignments' AND policyname = 'Users can view their AB assignments'
  ) THEN
    CREATE POLICY "Users can view their AB assignments"
    ON public.ab_test_assignments
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;