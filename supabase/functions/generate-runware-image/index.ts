
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateDalleImage } from "./openai.ts";
import { logImageGeneration } from "./supabaseClient.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body:", requestBody);
    const { prompt, n = 1, size = "1024x1024", quality = "standard", apiKey = null, userId = null } = JSON.parse(requestBody);

    let openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey && apiKey) {
      console.log("Using client-provided API key");
      openaiKey = apiKey;
    }

    if (!openaiKey) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "OpenAI API key not configured",
          errors: [
            {
              code: "API_NOT_FOUND",
              message: "API key not found in environment"
            }
          ]
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
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

    console.log("Processing DALL-E 3 image generation request:", {
      prompt: prompt.substring(0, 30) + "...",
      size,
      quality,
      n,
      userId: userId || "anonymous"
    });

    let data;
    try {
      data = await generateDalleImage({
        prompt,
        n,
        size,
        quality,
        openaiKey
      });
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
      await logImageGeneration({
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY,
        data: {
          user_id: userId,
          prompt,
          image_url: data.data[0].url,
          size,
          model: "dall-e-3",
          quality,
          prompt_id: promptId,
          created_at: createdAt
        }
      });
    }

    return new Response(
      JSON.stringify({
        imageUrl: data.data[0].url,
        usingServerKey: !apiKey,
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
