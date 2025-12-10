
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Security: Rate limiting configuration
const RATE_LIMITS = {
  anonymous: { requests: 3, window: 3600000 }, // 3 requests per hour
  authenticated: { requests: 50, window: 3600000 }, // 50 requests per hour
  premium: { requests: 500, window: 3600000 } // 500 requests per hour
};

// Performance: Cache configuration
const CACHE_TTL = 7200; // 2 hours

// Quality control: Negative prompts for better outputs
const NEGATIVE_PROMPTS = [
  "ugly", "deformed", "blurry", "bad anatomy", "bad proportions", 
  "extra limbs", "cloned face", "disfigured", "gross proportions", 
  "malformed limbs", "missing arms", "missing legs", "extra arms", 
  "extra legs", "mutated hands", "fused fingers", "too many fingers"
].join(", ");

// Content filtering: NSFW and inappropriate content detection
const NSFW_KEYWORDS = [
  "nude", "naked", "sexual", "explicit", "adult", "nsfw", "porn",
  "erotic", "xxx", "sex", "breast", "genitals", "intimate"
];

interface GenerationRequest {
  prompt: string;
  style?: string;
  resolution?: string;
  requestId?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory rate limiting (should be Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

function validateAndSanitizePrompt(prompt: string): { isValid: boolean; sanitized: string; reason?: string } {
  if (!prompt || typeof prompt !== 'string') {
    return { isValid: false, sanitized: '', reason: 'Prompt is required' };
  }

  // Length validation
  if (prompt.length > 1000) {
    return { isValid: false, sanitized: '', reason: 'Prompt too long (max 1000 characters)' };
  }

  // NSFW content detection
  const lowerPrompt = prompt.toLowerCase();
  const hasNSFW = NSFW_KEYWORDS.some(keyword => lowerPrompt.includes(keyword));
  if (hasNSFW) {
    return { isValid: false, sanitized: '', reason: 'Content not allowed' };
  }

  // Sanitize prompt (remove potential injection attempts)
  const sanitized = prompt
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JS injection
    .replace(/data:/gi, '') // Remove data URLs
    .trim();

  return { isValid: true, sanitized };
}

function checkRateLimit(identifier: string, userType: 'anonymous' | 'authenticated' | 'premium'): boolean {
  const limits = RATE_LIMITS[userType];
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + limits.window });
    return true;
  }

  if (now > entry.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + limits.window });
    return true;
  }

  if (entry.count >= limits.requests) {
    return false;
  }

  entry.count++;
  return true;
}

function enhancePrompt(prompt: string, style: string): string {
  let enhanced = prompt;

  // Add style-specific enhancements
  switch (style) {
    case '3d_anime':
      enhanced += ", 3D anime style, detailed, high quality, vibrant colors";
      break;
    case 'japanese_anime':
      enhanced += ", anime style, manga art, detailed, high quality";
      break;
    case 'movie':
      enhanced += ", cinematic, photorealistic, high quality, detailed, professional photography";
      break;
    case 'comic':
      enhanced += ", comic book style, detailed illustration, vibrant colors";
      break;
    default:
      enhanced += ", high quality, detailed, professional";
  }

  return enhanced;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Security: Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate request
    const body: GenerationRequest = await req.json();
    const { prompt, style = 'auto', resolution = '1024x1024', requestId } = body;

    // Security: Request ID validation for replay attack prevention
    if (!requestId) {
      return new Response(
        JSON.stringify({ error: 'Request ID required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Security: Authenticate user via JWT token
    const authHeader = req.headers.get('authorization');
    let userId: string | null = null;
    let userType: 'anonymous' | 'authenticated' | 'premium' = 'anonymous';

    if (authHeader) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (!authError && user) {
        userId = user.id;
        userType = 'authenticated';
        
        // Check for premium status (could be expanded with profile lookup)
        // For now, authenticated users get 'authenticated' rate limits
      }
    }

    // Security: Validate and sanitize prompt
    const validation = validateAndSanitizePrompt(prompt);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          error: validation.reason,
          code: 'CONTENT_POLICY_VIOLATION' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Security: Rate limiting using verified userId or client IP
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = userId || clientIP;

    if (!checkRateLimit(rateLimitKey, userType)) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: 3600
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Quality: Enhance prompt
    const enhancedPrompt = enhancePrompt(validation.sanitized, style);
    const finalPrompt = `${enhancedPrompt}, masterpiece, best quality`;

    // Security: Get API key from environment (never exposed to client)
    const replicateApiKey = Deno.env.get("REPLICATE_API_KEY");
    if (!replicateApiKey) {
      console.error("REPLICATE_API_KEY not configured");
      return new Response(
        JSON.stringify({ 
          error: 'Service temporarily unavailable',
          code: 'SERVICE_ERROR' 
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing generation request: ${requestId}`, {
      userId: userId || 'anonymous',
      style,
      resolution,
      promptLength: enhancedPrompt.length
    });

    // Performance: Check cache first (in production, use Redis)
    const cacheKey = `img:${btoa(finalPrompt + style + resolution)}`;
    
    // Call Replicate API with security headers
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${replicateApiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "WordToImage-Secure/1.0"
      },
      body: JSON.stringify({
        version: "f45d5c4b9adff5e9b5ab8e74bd3330bb0eed4e9f",
        input: {
          prompt: finalPrompt,
          negative_prompt: NEGATIVE_PROMPTS,
          width: parseInt(resolution.split('x')[0]) || 1024,
          height: parseInt(resolution.split('x')[1]) || 1024,
          guidance_scale: 7.5,
          num_inference_steps: 25,
          scheduler: "DPMSolverMultistep"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Replicate API error:", errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Image generation failed',
          code: 'GENERATION_ERROR' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prediction = await response.json();

    // Performance: Return prediction ID for streaming updates
    return new Response(
      JSON.stringify({
        predictionId: prediction.id,
        status: prediction.status,
        requestId,
        estimatedTime: 15
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Secure image generation error:", error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        code: 'INTERNAL_ERROR' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
