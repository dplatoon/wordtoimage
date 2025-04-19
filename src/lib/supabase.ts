
import { createClient } from '@supabase/supabase-js';

// Default values for development (these are not real keys)
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MTYxNjUyMTEsImV4cCI6MTkzMTc0MTIxMX0.placeholder';

// Get environment variables or use fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackKey;

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if we're using real credentials
export const isSupabaseConfigured = () => {
  return supabaseUrl !== fallbackUrl && supabaseAnonKey !== fallbackKey;
};
