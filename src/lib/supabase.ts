
import { createClient } from '@supabase/supabase-js';

// Default values for development (these are not real keys)
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MTYxNjUyMTEsImV4cCI6MTkzMTc0MTIxMX0.placeholder';

// Use the existing values from integrations/supabase/client.ts
const supabaseUrl = "https://itkfghwxbodjlmpgydsq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0a2ZnaHd4Ym9kamxtcGd5ZHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzMzOTQsImV4cCI6MjA2MDYwOTM5NH0.1QFLzTYlsFK6eGi_kpnN-pF1xqz3FJP5fphD8wGCC9M";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage,
  }
});

// Helper function to check if we're using real credentials
export const isSupabaseConfigured = () => {
  // Use type casting to avoid TypeScript literal type comparison errors
  return true; // We're now using the real credentials directly from the client file
};
