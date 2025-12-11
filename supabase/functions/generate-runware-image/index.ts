
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { generateDalleImage } from "./openai.ts";
import { logImageGeneration } from "./supabaseClient.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Maximum number of free generations for first day and subsequent days
const FIRST_DAY_MAX_FREE_GENERATIONS = 3;
const DAILY_FREE_GENERATIONS = 1;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body:", requestBody);
    let parsedBody;
    
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Invalid JSON in request body",
          errors: [{ code: "VALIDATION_ERROR", message: "Invalid JSON format" }]
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Security: Extract userId from JWT token, ignore any client-supplied userId
    const { prompt, n = 1, size = "1024x1024", quality = "standard", sourceImage = null } = parsedBody;
    
    // SECURITY: Require authentication - extract user from JWT token
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Authentication required",
          errors: [{ code: "UNAUTHORIZED", message: "Authorization header is required" }]
        }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } }
    });
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.log("Auth verification failed:", authError?.message || "No user found");
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Invalid or expired authentication token",
          errors: [{ code: "UNAUTHORIZED", message: authError?.message || "Authentication failed" }]
        }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const userId = user.id;
    console.log("Authenticated user:", userId);

    // SECURITY: Only use server-side API key, never accept client-provided keys
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) {
      console.error("OPENAI_API_KEY not configured on server");
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Image generation service not configured",
          errors: [{ code: "SERVICE_UNAVAILABLE", message: "Service not configured" }]
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Invalid prompt",
          errors: [
            {
              code: "VALIDATION_ERROR",
              message: "Prompt is required and must be a non-empty string"
            }
          ]
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Clean the prompt for DALL-E
    // Remove style tags like [Photorealistic] that may be causing issues
    const cleanedPrompt = prompt.replace(/^\[(.*?)\]\s*/i, '');
    
    // Test prompt for validation purposes
    if (cleanedPrompt.trim().toLowerCase() === "server key check") {
      // If it's just a server key check, return a success message without calling OpenAI
      console.log("Server key check successful");
      return new Response(
        JSON.stringify({
          imageUrl: "https://via.placeholder.com/1024x1024?text=Server+Key+Valid",
          usingServerKey: true,
          metadata: { model: "server-check", promptId: "test-check", size: size, createdAt: new Date().toISOString() }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Enforce daily limit for free users
    if (userId) {
      try {
        const now = new Date();
        
        // Get the user's first generation date
        const userFirstGenerationRes = await fetch(`${SUPABASE_URL}/rest/v1/generations?user_id=eq.${userId}&select=created_at&order=created_at.asc&limit=1`, {
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY!,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY!}`,
            Accept: "application/json",
          },
        });

        if (!userFirstGenerationRes.ok) {
          console.error("Failed to check user's first generation:", await userFirstGenerationRes.text());
          return new Response(
            JSON.stringify({
              error: true,
              errorMessage: "Failed to verify usage history",
              errors: [{ code: "API_ERROR", message: "Failed to verify usage history" }]
            }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const userFirstGenData = await userFirstGenerationRes.json();
        const isFirstDay = userFirstGenData.length === 0 || 
                           (new Date(userFirstGenData[0].created_at).toDateString() === now.toDateString());

        // Set limit based on whether it's the user's first day
        const dailyLimit = isFirstDay ? FIRST_DAY_MAX_FREE_GENERATIONS : DAILY_FREE_GENERATIONS;
        console.log(`User ${userId} is on ${isFirstDay ? 'first' : 'subsequent'} day. Limit: ${dailyLimit} images`);
        
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

        // Query to count number of images generated by user today under 'free' plan
        const countRes = await fetch(`${SUPABASE_URL}/rest/v1/generations?user_id=eq.${userId}&created_at=gte.${startOfDay}&created_at=lt.${endOfDay}&select=id`, {
          method: "HEAD",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY!,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY!}`,
            Accept: "application/json",
          },
        });

        if (!countRes.ok) {
          console.error("Failed to count image generations for user", await countRes.text());
          return new Response(
            JSON.stringify({
              error: true,
              errorMessage: "Failed to verify usage limit",
              errors: [{ code: "API_ERROR", message: "Failed to verify usage limit" }]
            }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // The count is in the Content-Range header for HEAD request.
        // Format of Content-Range: items start-end/total
        const range = countRes.headers.get("content-range");
        // Parse total from content-range header
        let totalCount = 0;
        if (range) {
          const parts = range.split("/");
          if (parts.length === 2) {
            totalCount = parseInt(parts[1], 10);
          }
        }

        if (totalCount >= dailyLimit) {
          const errorMessage = isFirstDay ? 
            `Free plan users can generate only ${dailyLimit} images on their first day.` :
            `Free plan users can generate only ${dailyLimit} image per day after the first day.`;
            
          return new Response(
            JSON.stringify({
              error: true,
              errorMessage: errorMessage + " Please upgrade your plan for more.",
              errors: [{ 
                code: "LIMIT_EXCEEDED", 
                message: "Daily generation limit reached",
                details: isFirstDay ? "first_day_limit" : "daily_limit"
              }]
            }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } catch (err) {
        console.error("Error checking daily limit:", err);
        return new Response(
          JSON.stringify({
            error: true,
            errorMessage: "Unexpected error during usage check",
            errors: [{ code: "RUNTIME_ERROR", message: "Unexpected error during usage check" }]
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    console.log("Processing DALL-E 3 image generation request:", {
      prompt: cleanedPrompt.substring(0, 30) + "...",
      size,
      quality,
      n,
      userId: userId || "anonymous"
    });

    let data;
    try {
      console.log("Calling OpenAI API with prompt:", cleanedPrompt.substring(0, 30) + "...");
      data = await generateDalleImage({
        prompt: cleanedPrompt,
        n,
        size,
        quality,
        openaiKey
      });
      
      console.log("OpenAI API response received");
      
      if (!data || !data.data || !data.data[0] || !data.data[0].url) {
        console.error("Invalid response format from OpenAI:", data);
        throw new Error("Invalid response format from OpenAI");
      }
      
    } catch (err) {
      console.error("OpenAI API Error:", err);

      let code = "API_ERROR";
      let msg = "Failed to generate image";
      let errorType = undefined;

      if (err.isOpenAI && err.errorData?.error?.type) {
        errorType = err.errorData.error.type;
        msg = err.errorData.error.message || msg;
        if (errorType === "invalid_request_error") {
          code = err.errorData.error.param === "api_key" ? "INVALID_API_KEY" : "VALIDATION_ERROR";
        } else if (err.response?.status === 429) {
          code = "RATE_LIMIT";
        }
      }

      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: msg,
          errors: [
            {
              code,
              message: msg,
              details: errorType
            }
          ]
        }),
        {
          status: err.response?.status || 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    if (!data.data?.[0]?.url) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "No image URL received from OpenAI",
          errors: [
            {
              code: "API_ERROR",
              message: "Invalid response format"
            }
          ]
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const promptId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const metadata = {
      model: "dall-e-3",
      promptId,
      size: size,
      createdAt,
      userId: userId || undefined
    };

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        await logImageGeneration({
          SUPABASE_URL,
          SUPABASE_SERVICE_ROLE_KEY,
          data: {
            user_id: userId,
            prompt: cleanedPrompt,
            image_url: data.data[0].url,
            size,
            model: "dall-e-3",
            quality,
            prompt_id: promptId,
            created_at: createdAt,
            plan: 'free'
          }
        });
      } catch (logError) {
        console.error("Failed to log image generation:", logError);
        // Continue anyway, this is not critical
      }
    }

    console.log("Successfully generated image, returning URL");
    return new Response(
      JSON.stringify({
        imageUrl: data.data[0].url,
        usingServerKey: true,
        metadata: metadata
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Edge function error:", error.stack || error);
    return new Response(
      JSON.stringify({
        error: true,
        errorMessage: error.message || "An unexpected error occurred",
        errors: [
          {
            code: "RUNTIME_ERROR",
            message: error.message || "Unknown error"
          }
        ]
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
