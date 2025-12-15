import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max submissions per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  
  entry.count++;
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 5000); // Hard limit
}

interface ContactSubmission {
  firstName?: string;
  lastName?: string;
  email: string;
  subject?: string;
  message: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    // Parse request body
    const body: ContactSubmission = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    // Validate required fields
    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: "Email and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check rate limit by email and IP
    const rateLimitKey = `${email}:${clientIP}`;
    if (isRateLimited(rateLimitKey)) {
      console.log(`Rate limited: ${rateLimitKey}`);
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate and sanitize inputs with length limits
    const sanitizedData = {
      first_name: firstName ? sanitizeString(firstName).slice(0, 100) : null,
      last_name: lastName ? sanitizeString(lastName).slice(0, 100) : null,
      email: email.trim().toLowerCase().slice(0, 255),
      subject: subject ? sanitizeString(subject).slice(0, 200) : null,
      message: sanitizeString(message).slice(0, 2000),
    };

    // Validate message has content after sanitization
    if (sanitizedData.message.length < 10) {
      return new Response(
        JSON.stringify({ error: "Message must be at least 10 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert into database using service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const { data: insertedData, error: dbError } = await supabase
      .from('contact_submissions')
      .insert(sanitizedData)
      .select('id')
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to submit message" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Audit log for contact form submission
    const userAgent = req.headers.get('user-agent') || null;
    await supabase.rpc('log_audit_event', {
      p_user_id: null, // Anonymous submission
      p_action: 'contact_form_submit',
      p_resource_type: 'contact_submission',
      p_resource_id: insertedData?.id || null,
      p_details: {
        email_domain: sanitizedData.email.split('@')[1], // Only log domain, not full email
        has_subject: !!sanitizedData.subject,
        message_length: sanitizedData.message.length,
      },
      p_ip_address: clientIP,
      p_user_agent: userAgent,
    });

    console.log(`Contact form submitted successfully from ${clientIP}`);
    
    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
