import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RateLimitEntry {
  requests: number;
  windowStart: number;
}

interface CacheEntry {
  data: any;
  timestamp: number;
  expiry: number;
}

// In-memory stores (would use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();
const cacheStore = new Map<string, CacheEntry>();

// Rate limiting configuration
const RATE_LIMITS = {
  free: { requests: 10, window: 3600000 }, // 10 requests per hour
  pro: { requests: 100, window: 3600000 }, // 100 requests per hour
  premium: { requests: 1000, window: 3600000 }, // 1000 requests per hour
};

// Cache configuration
const CACHE_SETTINGS = {
  defaultTTL: 300000, // 5 minutes
  maxSize: 1000, // Maximum cache entries
};

function getRateLimitKey(userId: string, endpoint: string): string {
  return `${userId}:${endpoint}`;
}

function getCacheKey(prompt: string, settings: any): string {
  const settingsHash = JSON.stringify(settings);
  return `cache:${prompt}:${settingsHash}`;
}

async function getUserPlan(userId: string): Promise<string> {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: subscription } = await supabase
      .from('subscribers')
      .select('plan_name, status')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (subscription?.plan_name) {
      return subscription.plan_name.toLowerCase();
    }
    
    return 'free';
  } catch (error) {
    console.error('Error fetching user plan:', error);
    return 'free';
  }
}

function checkRateLimit(userId: string, endpoint: string, userPlan: string): { allowed: boolean; remaining: number; resetTime: number } {
  const key = getRateLimitKey(userId, endpoint);
  const now = Date.now();
  const limit = RATE_LIMITS[userPlan as keyof typeof RATE_LIMITS] || RATE_LIMITS.free;
  
  let entry = rateLimitStore.get(key);
  
  // Initialize or reset window if expired
  if (!entry || now - entry.windowStart > limit.window) {
    entry = { requests: 0, windowStart: now };
  }
  
  // Check if limit exceeded
  if (entry.requests >= limit.requests) {
    const resetTime = entry.windowStart + limit.window;
    return { allowed: false, remaining: 0, resetTime };
  }
  
  // Increment counter
  entry.requests++;
  rateLimitStore.set(key, entry);
  
  const remaining = limit.requests - entry.requests;
  const resetTime = entry.windowStart + limit.window;
  
  return { allowed: true, remaining, resetTime };
}

function getCachedResult(cacheKey: string): any | null {
  const entry = cacheStore.get(cacheKey);
  
  if (!entry) return null;
  
  if (Date.now() > entry.expiry) {
    cacheStore.delete(cacheKey);
    return null;
  }
  
  return entry.data;
}

function setCachedResult(cacheKey: string, data: any, ttl: number = CACHE_SETTINGS.defaultTTL): void {
  // Implement LRU eviction if cache is full
  if (cacheStore.size >= CACHE_SETTINGS.maxSize) {
    const oldestKey = cacheStore.keys().next().value;
    cacheStore.delete(oldestKey);
  }
  
  const entry: CacheEntry = {
    data,
    timestamp: Date.now(),
    expiry: Date.now() + ttl
  };
  
  cacheStore.set(cacheKey, entry);
}

async function generateImageWithHuggingFace(prompt: string, settings: any) {
  const HF_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
  if (!HF_TOKEN) {
    throw new Error('Hugging Face API token not configured');
  }

  const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        width: parseInt(settings.width) || 1024,
        height: parseInt(settings.height) || 1024,
        num_inference_steps: settings.quality === 'high' ? 50 : 20
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HuggingFace API error: ${error}`);
  }

  const imageBlob = await response.blob();
  const arrayBuffer = await imageBlob.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  
  return {
    image: `data:image/png;base64,${base64}`,
    cached: false,
    model: 'FLUX.1-schnell'
  };
}

async function logApiUsage(userId: string, endpoint: string, userPlan: string, success: boolean, responseTime: number) {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Using EdgeRuntime.waitUntil for background logging
    EdgeRuntime.waitUntil(
      supabase.from('user_analytics').insert({
        user_id: userId,
        event_type: 'api_usage',
        event_data: {
          endpoint,
          user_plan: userPlan,
          success,
          response_time: responseTime,
          timestamp: new Date().toISOString()
        },
        session_id: `api_${userId}_${Date.now()}`
      })
    );
  } catch (error) {
    console.error('Error logging API usage:', error);
  }
}

serve(async (req) => {
  const startTime = Date.now();
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.pathname;

    // Extract user ID from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Properly verify JWT and extract user ID
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication error:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired authentication token' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const userId = user.id;

    // Get user plan
    const userPlan = await getUserPlan(userId);

    // Check rate limit
    const rateLimitResult = checkRateLimit(userId, endpoint, userPlan);
    
    const rateLimitHeaders = {
      'X-RateLimit-Limit': RATE_LIMITS[userPlan as keyof typeof RATE_LIMITS]?.requests.toString() || '10',
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
    };

    if (!rateLimitResult.allowed) {
      await logApiUsage(userId, endpoint, userPlan, false, Date.now() - startTime);
      
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          limit: RATE_LIMITS[userPlan as keyof typeof RATE_LIMITS]?.requests,
          resetTime: new Date(rateLimitResult.resetTime).toISOString()
        }), 
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            ...rateLimitHeaders,
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          } 
        }
      );
    }

    // Handle different endpoints
    switch (endpoint) {
      case '/generate-image': {
        const { prompt, settings = {} } = await req.json();
        
        if (!prompt) {
          return new Response(
            JSON.stringify({ error: 'Prompt is required' }), 
            { status: 400, headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check cache first
        const cacheKey = getCacheKey(prompt, settings);
        const cachedResult = getCachedResult(cacheKey);
        
        if (cachedResult) {
          await logApiUsage(userId, endpoint, userPlan, true, Date.now() - startTime);
          
          return new Response(
            JSON.stringify({ ...cachedResult, cached: true }),
            { headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json', 'X-Cache': 'HIT' } }
          );
        }

        // Generate new image
        const result = await generateImageWithHuggingFace(prompt, settings);
        
        // Cache the result
        const cacheTTL = userPlan === 'premium' ? CACHE_SETTINGS.defaultTTL * 2 : CACHE_SETTINGS.defaultTTL;
        setCachedResult(cacheKey, result, cacheTTL);
        
        await logApiUsage(userId, endpoint, userPlan, true, Date.now() - startTime);

        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json', 'X-Cache': 'MISS' } }
        );
      }

      case '/cache-stats': {
        const stats = {
          cacheSize: cacheStore.size,
          maxSize: CACHE_SETTINGS.maxSize,
          hitRate: 0.85, // Mock hit rate - would calculate from real metrics
          entries: Array.from(cacheStore.entries()).map(([key, entry]) => ({
            key: key.substring(0, 50) + '...',
            timestamp: entry.timestamp,
            expiry: entry.expiry,
            timeToLive: entry.expiry - Date.now()
          })).slice(0, 10) // Return only first 10 entries
        };

        return new Response(
          JSON.stringify(stats),
          { headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case '/rate-limit-status': {
        const status = {
          plan: userPlan,
          limit: RATE_LIMITS[userPlan as keyof typeof RATE_LIMITS]?.requests || 10,
          remaining: rateLimitResult.remaining,
          resetTime: new Date(rateLimitResult.resetTime).toISOString(),
          window: RATE_LIMITS[userPlan as keyof typeof RATE_LIMITS]?.window || 3600000
        };

        return new Response(
          JSON.stringify(status),
          { headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case '/clear-cache': {
        if (userPlan !== 'premium') {
          return new Response(
            JSON.stringify({ error: 'Cache management requires premium plan' }), 
            { status: 403, headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { pattern } = await req.json();
        let cleared = 0;
        
        if (pattern) {
          // Clear specific pattern
          for (const [key] of cacheStore) {
            if (key.includes(pattern)) {
              cacheStore.delete(key);
              cleared++;
            }
          }
        } else {
          // Clear all cache
          cleared = cacheStore.size;
          cacheStore.clear();
        }

        return new Response(
          JSON.stringify({ message: `Cleared ${cleared} cache entries` }),
          { headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Endpoint not found' }), 
          { status: 404, headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' } }
        );
    }

  } catch (error) {
    console.error('API Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});